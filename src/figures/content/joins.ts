import { compileLoopFrame, compileTableJoin, compileWorkflowRunFrame, resolveExplanationStep, validateWorkflowSpec,
  type LoopFrame, type LoopSceneSpec, type TableJoinSpec, type WorkflowSpec } from '../core';

export const join: TableJoinSpec = {
  id: 'customer-orders', joinType: 'left', leftKey: 'customer', rightKey: 'customer',
  left: { id: 'Customers', columns: [{ id: 'customer', label: 'Customer key' }, { id: 'name', label: 'Name' }], rows: [
    { id: 'C1', values: { customer: 'C1', name: 'Alice' } },
    { id: 'C2', values: { customer: 'C2', name: 'Bob' } },
    { id: 'C3', values: { customer: 'C3', name: 'Chloé' } },
  ] },
  right: { id: 'Orders', columns: [{ id: 'order', label: 'Order' }, { id: 'customer', label: 'Customer key' }], rows: [
    { id: 'O1', values: { order: 'O1', customer: 'C1' } },
    { id: 'O2', values: { order: 'O2', customer: 'C1' } },
    { id: 'O3', values: { order: 'O3', customer: 'C3' } },
  ] },
};
export const joined = compileTableJoin(join);
export const joinSteps = [
  { caption: 'Select Alice (C1) from Customers. Look for the same key in Orders.', reveal: 0, focus: ['left:C1'] },
  { caption: 'C1 matches O1 and O2. One customer will produce two rows.', reveal: 0, focus: ['left:C1', 'right:O1', 'right:O2'] },
  { caption: 'Emit Alice × O1 and Alice × O2: both matches survive.', reveal: 2, focus: ['left:C1', 'right:O1', 'right:O2', ...joined.rowOrder.slice(0, 2)] },
  { caption: 'Select Bob (C2). No order has customer key C2.', reveal: 2, focus: ['left:C2'] },
  { caption: 'Preserve Bob. Emit a row with NULL for every order column.', reveal: 3, focus: ['left:C2', joined.rowOrder[2]] },
  { caption: 'Select Chloé (C3). Order O3 has the matching customer key.', reveal: 3, focus: ['left:C3', 'right:O3'] },
  { caption: 'Emit Chloé × O3. All three customers survive in four output rows.', reveal: 4, focus: ['left:C3', 'right:O3', joined.rowOrder[3]] },
];
export type JoinMode = 'left' | 'inner';
export const innerJoin: TableJoinSpec = { ...join, joinType: 'inner' };
export const innerJoined = compileTableJoin(innerJoin);
export const innerJoinSteps = joinSteps.map((step, index) => {
  if (index === 4) return { caption: 'Exclude Bob. Without a matching order, INNER JOIN emits no row for C2.', reveal: 2, focus: ['left:C2'] };
  if (index === 5) return { ...step, reveal: 2 };
  if (index === 6) return { caption: 'Emit Chloé × O3. Two customers survive in three matched output rows; Bob is excluded.', reveal: 3, focus: ['left:C3', 'right:O3', innerJoined.rowOrder[2]] };
  return step;
});
export const duplicateJoin: TableJoinSpec = { ...join, left: { ...join.left, rows: [join.left.rows[0], { id: 'C1-copy', values: { customer: 'C1', name: 'Alice (copy)' } }, ...join.left.rows.slice(1)] } };
const duplicateResults = { left: compileTableJoin(duplicateJoin), inner: compileTableJoin({ ...duplicateJoin, joinType: 'inner' }) };
function buildJoinLesson(mode: JoinMode, duplicate = false) {
  if (duplicate) {
    const result = duplicateResults[mode];
    const pairs = result.rows.filter(row => row.values['left.Customers.customer'] === 'C1').map(row => row.id);
    const steps = [
      { caption: 'Customers contains two separate records with key C1: Alice and Alice (copy). Their record IDs are different.', reveal: 0, focus: ['left:C1', 'left:C1-copy'] },
      { caption: 'Both C1 records match both orders, O1 and O2. Two records × two orders means four matching pairs.', reveal: 0, focus: ['left:C1', 'left:C1-copy', 'right:O1', 'right:O2'] },
      { caption: 'Emit all four C1 pairs. O1 and O2 each appear twice; counting output rows would overcount orders.', reveal: 4, focus: [...pairs, 'left:C1', 'left:C1-copy'] },
      { caption: 'Select Bob (C2). The duplicate C1 key does not create a match for C2.', reveal: 4, focus: ['left:C2'] },
      { caption: mode === 'left' ? 'LEFT preserves Bob with NULL order values, adding a fifth row.' : 'INNER excludes Bob because no order matches C2. Four rows remain.', reveal: mode === 'left' ? 5 : 4, focus: mode === 'left' ? ['left:C2', result.rowOrder[4]] : ['left:C2'] },
      { caption: 'Chloé (C3) matches O3 once. Only C1 has repeated keys on both sides.', reveal: mode === 'left' ? 5 : 4, focus: ['left:C3', 'right:O3'] },
      { caption: `${mode === 'left' ? 'Six' : 'Five'} output rows: four C1 pairs, one C3 pair${mode === 'left' ? ', and Bob’s NULL row' : ''}. There are still only three input orders.`, reveal: result.rows.length, focus: result.rowOrder },
    ];
    return { spec: { ...duplicateJoin, joinType: mode }, result, steps };
  }
  return mode === 'left' ? { spec: join, result: joined, steps: joinSteps } : { spec: innerJoin, result: innerJoined, steps: innerJoinSteps };
}
export const joinStepIds = ['select-alice', 'match-alice', 'emit-alice', 'select-bob', 'resolve-bob', 'match-chloe', 'emit-chloe'] as const;
export function joinLesson(mode: JoinMode, duplicate = false) {
  const lesson = buildJoinLesson(mode, duplicate);
  return { ...lesson, steps: lesson.steps.map((step, i) => ({ ...step, id: joinStepIds[i],
    outcome: ['resolve-bob', 'match-chloe', 'emit-chloe'].includes(joinStepIds[i]) ? (mode === 'left' ? 'Bob preserved with NULL' : 'Bob excluded: no matching order') : '',
  })) };
}
export function compileJoinFrame(index: number, mode: JoinMode, duplicate: boolean) {
  const lesson = joinLesson(mode, duplicate);
  const step = lesson.steps[index];
  if (!step) throw new Error('Unknown join step');
  const rows = lesson.result.rows.slice(0, step.reveal);
  return { ...lesson, step, rows, input: joinInput(index, mode, duplicate),
    represented: new Set(rows.map(row => row.leftRowId)).size,
    activeLeft: lesson.spec.left.rows.filter(row => step.focus.includes(`left:${row.id}`)).map(row => row.id),
    activeRight: lesson.spec.right.rows.filter(row => step.focus.includes(`right:${row.id}`)).map(row => row.id),
    output: { id: 'Joined result', columns: [{ id: 'name', label: 'Customer' }, { id: 'order', label: 'Order' }], rows: rows.map(row => ({ id: row.id, values: { name: row.values['left.Customers.name'], order: row.values['right.Orders.order'] } })) },
  };
}
export function joinInput(index: number, mode: JoinMode = 'left', duplicate = false) {
  const { spec, result, steps } = joinLesson(mode, duplicate);
  const step = steps[index];
  const track = { steps: steps.map((s, i) => ({ id: `join-${i}`, title: mode === 'left' ? 'Match keys → preserve every customer' : 'Match keys → keep matching pairs only', focus: { entityIds: s.focus } })) };
  return { spec, result, revealCount: step.reveal, title: 'Customers → matching orders → result',
    description: `${step.reveal} output rows · solid links: customer · dashed links: order`,
    explanation: resolveExplanationStep(track, index, { entityIds: [...spec.left.rows.map(r => `left:${r.id}`), ...spec.right.rows.map(r => `right:${r.id}`), ...result.rowOrder], frameCount: steps.length }) };
}
