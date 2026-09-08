import type { TableCellValue, TableData } from './table';

export type AggregateDefinition = { id:string; kind:'countRows' } | { id:string; kind:'countNonNull'|'sum'; columnId:string };
export interface AggregationSpec { id:string; table:TableData; groupColumnId:string; aggregates:readonly AggregateDefinition[] }
export interface AggregateGroup { id:string; key:TableCellValue; sourceRowIds:readonly string[]; values:Readonly<Record<string,number|null>> }
export interface AggregationResult { id:string; groupColumnId:string; groups:readonly AggregateGroup[] }
export interface AggregationFrame { id:string; caption:string; table:TableData; groups:readonly {id:string;key:AggregateGroup['key'];sourceRowIds:readonly string[];values:AggregateGroup['values']|null;phase:'pending'|'complete'}[];assignedRowIds:readonly string[];knownTotal:number; phase:'source'|'grouping'|'result'; }
function required(value:unknown,label:string):asserts value is string {
  if(typeof value!=='string'||!value.trim())throw Error(`${label} must be nonempty`);
}
function cell(value:unknown):asserts value is TableCellValue {
  if(value===null||typeof value==='string'||typeof value==='boolean')return;
  if(typeof value==='number'&&Number.isFinite(value))return;
  throw Error('Cells must be scalar and numbers must be finite');
}
export function groupIdentity(specId:string,columnId:string,key:TableCellValue):string {
  cell(key);
  return `group:${encodeURIComponent(JSON.stringify([specId,columnId,key===null?'null':typeof key,typeof key==='number'&&Object.is(key,-0)?0:key]))}`;
}
/** Bounded GROUP BY: finite JS numbers, first-encounter display order, no global aggregation. */
export function compileAggregation(spec:AggregationSpec):AggregationResult {
  required(spec.id,'Spec ID');required(spec.table.id,'Table ID');required(spec.groupColumnId,'Grouping column');
  const columns=new Set<string>();
  for(const column of spec.table.columns){required(column.id,'Column ID');if(columns.has(column.id))throw Error('Duplicate column ID');columns.add(column.id);}
  if(!columns.has(spec.groupColumnId))throw Error('Unknown grouping column');
  if(!spec.aggregates.length)throw Error('At least one aggregate is required');
  const outputs=new Set([spec.groupColumnId]);
  for(const aggregate of spec.aggregates){
    required(aggregate.id,'Aggregate output ID');if(outputs.has(aggregate.id))throw Error('Aggregate output name collision');outputs.add(aggregate.id);
    if(!['countRows','countNonNull','sum'].includes(aggregate.kind))throw Error('Unsupported aggregate kind');
    if(aggregate.kind!=='countRows'&&!columns.has(aggregate.columnId))throw Error('Unknown aggregate column');
  }
  const rows=new Set<string>();
  const groups=new Map<string,{id:string;key:TableCellValue;sourceRowIds:string[];values:Record<string,number|null>}>();
  for(const row of spec.table.rows){
    required(row.id,'Row ID');if(rows.has(row.id))throw Error('Duplicate row ID');rows.add(row.id);
    for(const column of columns){if(!Object.hasOwn(row.values,column))throw Error(`Missing cell ${column}`);cell(row.values[column]);}
    const rawKey=row.values[spec.groupColumnId];const key=typeof rawKey==='number'&&Object.is(rawKey,-0)?0:rawKey;
    const id=groupIdentity(spec.id,spec.groupColumnId,key);
    let group=groups.get(id);
    if(!group){group={id,key,sourceRowIds:[],values:Object.fromEntries(spec.aggregates.map(a=>[a.id,a.kind==='sum'?null:0]))};groups.set(id,group);}
    group.sourceRowIds.push(row.id);
    for(const aggregate of spec.aggregates){
      if(aggregate.kind==='countRows'){group.values[aggregate.id]=Number(group.values[aggregate.id])+1;continue;}
      const value=row.values[aggregate.columnId];
      if(value===null)continue;
      if(aggregate.kind==='countNonNull'){group.values[aggregate.id]=Number(group.values[aggregate.id])+1;continue;}
      if(typeof value!=='number')throw Error('SUM requires numeric or NULL input');
      const total=(group.values[aggregate.id]??0)+value;
      if(!Number.isFinite(total))throw Error('SUM result must be finite');
      group.values[aggregate.id]=total;
    }
  }
  return {id:spec.id,groupColumnId:spec.groupColumnId,groups:[...groups.values()]};
}
