import { compileAggregation, type AggregationSpec, type AggregationFrame } from '../core/aggregation';
import type { TableData } from '../core';
export const groupingStepIds=['source-grain','choose-key','group-c1','group-c2','group-c3','emit-groups','compare-grain'] as const;
export type GroupingStepId=typeof groupingStepIds[number];
export type GroupingVariant='baseline'|'null-amounts';
export const groupOrders:TableData={id:'Orders',columns:[{id:'customer',label:'Customer'},{id:'amount',label:'Amount'}],rows:[
  {id:'O1',values:{customer:'C1',amount:40}},{id:'O2',values:{customer:'C1',amount:60}},
  {id:'O3',values:{customer:'C2',amount:25}},{id:'O4',values:{customer:'C3',amount:10}},
  {id:'O5',values:{customer:'C3',amount:15}},{id:'O6',values:{customer:'C3',amount:5}},
]};
export function groupingSpec(variant:GroupingVariant):AggregationSpec{return {id:'orders-by-customer',table:variant==='baseline'?groupOrders:{...groupOrders,rows:groupOrders.rows.map(row=>row.values.customer==='C3'?{...row,values:{...row.values,amount:null}}:row)},groupColumnId:'customer',aggregates:[{id:'order_count',kind:'countRows'},{id:'known_amount_count',kind:'countNonNull',columnId:'amount'},{id:'total_amount',kind:'sum',columnId:'amount'}]};}
export interface GroupFrame extends AggregationFrame { id:GroupingStepId }
const assignments:Record<GroupingStepId,readonly string[]>={ 'source-grain':[], 'choose-key':[], 'group-c1':['C1'],'group-c2':['C1','C2'],'group-c3':['C1','C2','C3'],'emit-groups':['C1','C2','C3'],'compare-grain':['C1','C2','C3'] };
export function compileGroupingFrame(variant:GroupingVariant,id:GroupingStepId):GroupFrame {
  if(!groupingStepIds.includes(id))throw Error('Unknown grouping step');
  const spec=groupingSpec(variant),result=compileAggregation(spec);
  const knownTotal=spec.table.rows.reduce((sum,row)=>sum+Number(row.values.amount??0),0);
  const captions:Record<GroupingStepId,string>={
    'source-grain':`${spec.table.rows.length} input rows: one row per order. No orders have been assigned yet.`,
    'choose-key':'Group by customer. Group identities are visible, but their values are pending.',
    'group-c1':'Assign O1 and O2 to C1: COUNT(*) = 2, COUNT(amount) = 2, SUM(amount) = 100.',
    'group-c2':'Assign O3 to C2: COUNT(*) = 1, COUNT(amount) = 1, SUM(amount) = 25.',
    'group-c3':variant==='baseline'?'Assign O4, O5 and O6 to C3: counts are 3 and 3; SUM = 30.': 'O4, O5 and O6 still belong to C3. COUNT(*) = 3, COUNT(amount) = 0; SUM(amount) = NULL, not zero.',
    'emit-groups':`Emit ${result.groups.length} customer-key group rows. Every order contributes to exactly one group.`,
    'compare-grain':`${spec.table.rows.length} order rows become ${result.groups.length} group rows. ${variant==='null-amounts'?'The sum of known amounts':'The amount total'} is ${knownTotal}; ${variant==='null-amounts'?'unknown amounts are not treated as known zeroes.':'the row grain changed, the total did not.'}`,
  };
  const groups=id==='source-grain'?[]:result.groups.map(group=>{const complete=assignments[id].includes(String(group.key));return {...group,sourceRowIds:complete?group.sourceRowIds:[],values:complete?group.values:null,phase:complete?'complete' as const:'pending' as const};});
  return {id,caption:captions[id],table:spec.table,groups,assignedRowIds:groups.flatMap(g=>g.sourceRowIds),knownTotal,phase:id==='source-grain'?'source':id==='emit-groups'||id==='compare-grain'?'result':'grouping'};
}
export function groupingFrames(variant:GroupingVariant){return groupingStepIds.map(id=>compileGroupingFrame(variant,id));}
// These are fixed authored traces, not arbitrary aggregation inputs. Check every
// supplied semantic field against its named step, ignoring object property order.
function sameFrameData(actual:unknown,expected:unknown):boolean {
  if(Object.is(actual,expected))return true;
  if(Array.isArray(expected))return Array.isArray(actual)&&actual.length===expected.length&&expected.every((value,i)=>sameFrameData(actual[i],value));
  if(typeof expected!=='object'||expected===null||typeof actual!=='object'||actual===null||Array.isArray(actual))return false;
  const actualFields:Record<string,unknown>=Object.fromEntries(Object.entries(actual));
  const expectedFields=Object.entries(expected);
  return Object.keys(actualFields).length===expectedFields.length&&expectedFields.every(([key,value])=>Object.hasOwn(actualFields,key)&&sameFrameData(actualFields[key],value));
}
function assertGroupingFrames(frames:readonly unknown[],variant:GroupingVariant):asserts frames is readonly GroupFrame[] {
  const expected=groupingFrames(variant);
  if(frames.length!==expected.length||expected.some((frame,i)=>!sameFrameData(frames[i],frame)))throw Error('Invalid supplied grouping frame state');
}
export function validateGrouping(variant:GroupingVariant,frames:readonly unknown[]=groupingFrames(variant)){
  assertGroupingFrames(frames,variant);
  const expected=compileAggregation(groupingSpec(variant));let prior:string[]=[];
  for(const frame of frames){
    const assigned=frame.groups.flatMap(g=>g.sourceRowIds);
    if(new Set(assigned).size!==assigned.length||prior.some(id=>!assigned.includes(id)))throw Error('Invalid grouping membership progression');
    for(const group of frame.groups){const full=expected.groups.find(g=>g.id===group.id);if(!full)throw Error('Unknown group');if(group.phase==='pending'&&(group.values!==null||group.sourceRowIds.length))throw Error('Pending group exposes aggregates');if(group.phase==='complete'&&(!sameFrameData(group.values,full.values)||!sameFrameData(group.sourceRowIds,full.sourceRowIds)))throw Error('Incomplete contributor result');}
    prior=[...assigned];
  }
  if(prior.length!==groupOrders.rows.length||groupOrders.rows.some(row=>!prior.includes(row.id)))throw Error('Unreconciled contributors');
}
