import { expect,it } from 'vitest';
import { compileAggregation, type AggregationSpec } from '../src/figures/core/aggregation';
import { groupingSpec,groupingFrames,validateGrouping } from '../src/figures/content/grouping';
import { assertSuccessDependencies,workflow } from '../src/figures/content/retry';
import { catalog,validateCatalog } from '../src/figures/content/catalog';
const compile=(spec=groupingSpec('baseline'))=>compileAggregation(spec);
it('G01/G02: matches independent complete oracle and NULL membership',()=>{
  const base=compile(),nil=compile(groupingSpec('null-amounts'));
  expect(base.groups.map(g=>[g.key,g.sourceRowIds,g.values])).toEqual([
    ['C1',['O1','O2'],{order_count:2,known_amount_count:2,total_amount:100}],
    ['C2',['O3'],{order_count:1,known_amount_count:1,total_amount:25}],
    ['C3',['O4','O5','O6'],{order_count:3,known_amount_count:3,total_amount:30}],
  ]);
  expect(nil.groups[2].values).toEqual({order_count:3,known_amount_count:0,total_amount:null});
  expect(nil.groups.map(g=>g.id)).toEqual(base.groups.map(g=>g.id));
  expect(nil.groups.map(g=>g.sourceRowIds)).toEqual(base.groups.map(g=>g.sourceRowIds));
  expect(base.groups.reduce((s,g)=>s+Number(g.values.total_amount),0)).toBe(155);
  expect(nil.groups.reduce((s,g)=>s+Number(g.values.total_amount),0)).toBe(125);
});
it('G03/G04: empty, singleton, negative, repeated, typed/escaped keys and negative zero',()=>{
  const spec=groupingSpec('baseline');expect(compile({...spec,table:{...spec.table,rows:[]}}).groups).toEqual([]);
  const keys=[null,'null',1,'1','a:|"',false,-0,0] as const;
  const result=compile({...spec,table:{...spec.table,rows:keys.map((customer,i)=>({id:`r${i}`,values:{customer,amount:i===0?-5:0}}))}});
  expect(result.groups).toHaveLength(7);expect(new Set(result.groups.map(g=>g.id)).size).toBe(7);
  expect(result.groups[0].values.total_amount).toBe(-5);expect(result.groups[6].sourceRowIds).toEqual(['r6','r7']);
  expect(result.groups[0].values.order_count).toBe(1);
});
it('G05: shuffle changes only presentation/member order; frozen inputs remain untouched',()=>{
  const spec=groupingSpec('baseline');const frozen=JSON.stringify(spec);
  spec.table.rows.forEach(row=>{Object.freeze(row.values);Object.freeze(row);});Object.freeze(spec.table.rows);
  const base=compile(spec),shuffled=compile({...spec,table:{...spec.table,rows:[...spec.table.rows].reverse()}});
  expect(shuffled.groups.map(g=>g.key)).toEqual(['C3','C2','C1']);
  for(const g of shuffled.groups){const old=base.groups.find(b=>b.id===g.id)!;expect(g.values).toEqual(old.values);expect([...g.sourceRowIds].sort()).toEqual([...old.sourceRowIds].sort());}
  expect(JSON.stringify(spec)).toBe(frozen);
});
it('G06: malformed inputs and overflowing sums fail',()=>{
  const s=groupingSpec('baseline');
  const bad:AggregationSpec[]=[{...s,id:''},{...s,groupColumnId:'missing'},{...s,aggregates:[{id:'customer',kind:'countRows'}]},
    {...s,table:{...s.table,id:''}}, {...s,aggregates:[{id:'',kind:'countRows'}]},
    {...s,table:{...s.table,columns:[{id:''},...s.table.columns]}},
    {...s,table:{...s.table,columns:[...s.table.columns,s.table.columns[0]]}},
    {...s,table:{...s.table,rows:[{...s.table.rows[0],id:''}]}},
    {...s,aggregates:[{id:'x',kind:'countRows'},{id:'x',kind:'countRows'}]}, {...s,aggregates:[{id:'x',kind:'sum',columnId:'missing'}]},
    {...s,table:{...s.table,rows:[s.table.rows[0],s.table.rows[0]]}}, {...s,table:{...s.table,rows:[{id:'x',values:{customer:'C1'}}]}},
    ...[NaN,Infinity,'bad'].map(amount=>({...s,table:{...s.table,rows:[{id:'x',values:{customer:'C1',amount}}]}})),
    {...s,table:{...s.table,rows:[{id:'a',values:{customer:'C1',amount:Number.MAX_VALUE}},{id:'b',values:{customer:'C1',amount:Number.MAX_VALUE}}]}},
  ];
  for(const input of bad)expect(()=>compile(input)).toThrow();
  expect(()=>compile({...s,aggregates:[{id:'x',kind:'unsupported'} as unknown as AggregationSpec['aggregates'][number]]})).toThrow();
});
it('G07/L01: all grouping states, pending semantics and catalog corruption',()=>{
  for(const variant of ['baseline','null-amounts'] as const){validateGrouping(variant);const frames=groupingFrames(variant);expect(frames).toHaveLength(7);expect(frames[0].assignedRowIds).toEqual([]);expect(frames[1].groups.every(g=>g.values===null&&g.sourceRowIds.length===0)).toBe(true);expect(frames[2].assignedRowIds).toEqual(['O1','O2']);expect(frames[3].assignedRowIds).toEqual(['O1','O2','O3']);expect(frames[4].assignedRowIds).toHaveLength(6);}
  expect(validateCatalog()).toEqual({visuals:4,variants:8,frames:76});
  expect(()=>validateCatalog([{...catalog[0],variants:[{...catalog[0].variants[0],steps:[]}]}])).toThrow('Empty trace');
  const broken=catalog.map(lesson=>({...lesson,variants:lesson.variants.map((v,i)=>i===0?{...v,steps:v.steps.map((s,j)=>j===0?{...s,id:'corrupted-reference'}:s)}:v)}));
  expect(()=>validateCatalog(broken)).toThrow('alignment mismatch');
});
it('W01: success policy rejects premature dependent and permits same-frame release',()=>{
  expect(()=>assertSuccessDependencies(workflow)).not.toThrow();
  for(const status of ['queued','running','success'] as const)expect(()=>assertSuccessDependencies({...workflow,runs:[{id:'bad',frames:[{id:'early',states:{Publish:{status}}}]}]})).toThrow('Premature');
});
