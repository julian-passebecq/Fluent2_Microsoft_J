import { expect, it } from 'vitest';
import { compileAggregation } from '../src/figures/core/aggregation';
import { groupingFrames, groupingSpec } from '../src/figures/content/grouping';
import { catalog, validateCatalog } from '../src/figures/content/catalog';

it('G07 independent oracle: exact membership and pending values in all fourteen frames', () => {
  const assigned = [[], [], ['O1','O2'], ['O1','O2','O3'], ['O1','O2','O3','O4','O5','O6'], ['O1','O2','O3','O4','O5','O6'], ['O1','O2','O3','O4','O5','O6']];
  for (const variant of ['baseline','null-amounts'] as const) {
    const oracle = [
      { members: ['O1','O2'], values: {order_count:2,known_amount_count:2,total_amount:100} },
      { members: ['O3'], values: {order_count:1,known_amount_count:1,total_amount:25} },
      { members: ['O4','O5','O6'], values: {order_count:3,known_amount_count:variant==='baseline'?3:0,total_amount:variant==='baseline'?30:null} },
    ];
    groupingFrames(variant).forEach((frame, index) => {
      expect(frame.assignedRowIds).toEqual(assigned[index]);
      expect(frame.knownTotal).toBe(variant==='baseline'?155:125);
      expect(frame.groups.map(g=>g.key)).toEqual(index===0?[]:['C1','C2','C3']);
      frame.groups.forEach((group, g) => {
        const complete = index >= g+2;
        expect(group.phase).toBe(complete?'complete':'pending');
        expect(group.sourceRowIds).toEqual(complete?oracle[g].members:[]);
        expect(group.values).toEqual(complete?oracle[g].values:null);
      });
    });
  }
});

it('G03/G06: mixed NULL, repeated and signed amounts; missing non-aggregate cell and nonfinite key', () => {
  const spec=groupingSpec('baseline');
  const table={...spec.table,rows:[null,10,10,-20,0].map((amount,i)=>({id:`r${i}`,values:{customer:'one',amount}}))};
  expect(compileAggregation({...spec,table}).groups[0].values).toEqual({order_count:5,known_amount_count:4,total_amount:0});
  expect(()=>compileAggregation({...spec,aggregates:[{id:'n',kind:'countRows'}],table:{...table,rows:[{id:'a',values:{customer:'one'}}]}})).toThrow();
  expect(()=>compileAggregation({...spec,table:{...table,rows:[{id:'a',values:{customer:Infinity,amount:1}}]}})).toThrow();
});

it('L01: rejects a catalog that silently omits a supported lesson', () => {
  expect(()=>validateCatalog(catalog.filter(lesson=>lesson.id!=='group'))).toThrow();
});

it('L01/G07: validates supplied grouping contributor references, not a fresh fixture', () => {
  const frames=groupingFrames('baseline').map(frame=>frame.id==='group-c1'
    ? {...frame,assignedRowIds:['missing-order'],groups:frame.groups.map((group,i)=>i===0?{...group,sourceRowIds:['missing-order']}:group)}
    : frame);
  const corrupted=catalog.map(lesson=>lesson.id==='group'
    ? {...lesson,variants:lesson.variants.map(variant=>variant.id==='baseline'?{...variant,steps:frames}:variant)}
    : lesson);
  expect(()=>validateCatalog(corrupted)).toThrow();
});
