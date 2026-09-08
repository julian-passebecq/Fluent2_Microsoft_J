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
const joinTrack = { steps: joinSteps.map((step, i) => ({ id: `join-${i}`, title: 'Match keys → preserve every customer', focus: { entityIds: step.focus } })) };
export function joinInput(index: number) {
  const step = joinSteps[index];
  return { spec: join, result: joined, revealCount: step.reveal, title: 'Customers → matching orders → result',
    description: `${step.reveal} output rows · solid links: customer · dashed links: order`,
    explanation: resolveExplanationStep(joinTrack, index, { entityIds: [...join.left.rows.map(r => `left:${r.id}`), ...join.right.rows.map(r => `right:${r.id}`), ...joined.rowOrder], frameCount: joinSteps.length }) };
}

const values = [5, 1, 4, 2, 3];
const items = values.map((value, i) => ({ id: `value-${i}`, value, label: `Item ${String.fromCharCode(65 + i)}` }));
const order = items.map(item => item.id);
const frames: LoopFrame[] = [];
const valueOf = (id: string) => items.find(item => item.id === id)!.value;
function add(operation: string, caption: string, activeItemIds: string[] = [], doneItemIds: string[] = []) {
  frames.push({ id: `sort-${frames.length}`, iteration: frames.length, operation, caption,
    order: [...order], activeItemIds, doneItemIds: [...doneItemIds], codeLineIds: [operation === 'swap' ? 'swap' : operation === 'compare' ? 'compare' : 'pass'] });
}
add('ready', 'Start with 5, 1, 4, 2, 3. Compare adjacent values from left to right.');
for (let end = order.length - 1; end > 0; end--) {
  for (let i = 0; i < end; i++) {
    const pair = [order[i], order[i + 1]];
    const a = valueOf(pair[0]), b = valueOf(pair[1]);
    add('compare', `Compare ${a} and ${b}: ${a > b ? `${a} > ${b}, so swap.` : `${a} ≤ ${b}, so keep their order.`}`, pair, order.slice(end + 1));
    if (a > b) {
      [order[i], order[i + 1]] = [order[i + 1], order[i]];
      add('swap', `Swap ${a} and ${b}. The same items move to new positions.`, pair, order.slice(end + 1));
    } else add('no swap', `Keep ${a} before ${b}; this pair is already ordered.`, pair, order.slice(end + 1));
  }
  add('pass complete', `${valueOf(order[end])} is in its final position. The dashed boxes mark the sorted suffix.`, [], order.slice(end));
}
add('sorted', 'Sorted: 1, 2, 3, 4, 5. Every item kept its identity.', [], [...order]);
export const bubble: LoopSceneSpec = { kind: 'loop', version: '1', id: 'bubble-sort', title: 'Bubble sort', items,
  codeLines: [{ id: 'pass', text: 'repeat for each unsorted pass' }, { id: 'compare', text: 'if left.value > right.value:' }, { id: 'swap', text: '    swap(left, right)' }], frames };

export const workflowCaptions = [
  'Source succeeds. Transform can now run; later tasks are still waiting.',
  'Transform succeeds. Quality can now check the transformed data.',
  'Quality fails. Publish is blocked by the failed prerequisite.',
  'Publish remains blocked. A failed check cannot release data.',
  'Quality retries on attempt 2. Publish keeps waiting for success.',
  'Quality succeeds on attempt 2. Publish becomes runnable.',
  'Publish runs after every prerequisite has succeeded.',
  'Publish succeeds. The retry recovered this run without repeating successful upstream tasks.',
];
export const workflow: WorkflowSpec = { kind: 'workflow', version: '1', id: 'quality-retry', title: 'Retry a failed quality check',
  nodes: ['Source', 'Transform', 'Quality', 'Publish'].map(id => ({ id, label: id })),
  edges: [['Source', 'Transform'], ['Transform', 'Quality'], ['Quality', 'Publish']].map(([from, to]) => ({ from, to, condition: 'success' })),
  runs: [{ id: 'retry', frames: [
    { id: 'source-success', states: { Source: { status: 'success' }, Transform: { status: 'queued' } } },
    { id: 'transform-success', states: { Transform: { status: 'success' }, Quality: { status: 'queued' } } },
    { id: 'quality-failed', states: { Quality: { status: 'failed', attempt: 1 }, Publish: { status: 'upstream_failed' } } },
    { id: 'publish-blocked', states: {} },
    { id: 'quality-retry', states: { Quality: { status: 'retrying', attempt: 2 } } },
    { id: 'quality-success', states: { Quality: { status: 'success', attempt: 2 }, Publish: { status: 'queued' } } },
    { id: 'publish-running', states: { Publish: { status: 'running' } } },
    { id: 'publish-success', states: { Publish: { status: 'success' } } },
  ] }],
};
export function validateProofs() {
  const result = validateWorkflowSpec(workflow);
  if (!result.valid) throw new Error(JSON.stringify(result.issues));
  joinSteps.forEach((_, i) => joinInput(i));
  bubble.frames.forEach((_, i) => compileLoopFrame(bubble, i));
  workflowCaptions.forEach((_, i) => compileWorkflowRunFrame(workflow, 'retry', i));
  return { visuals: 3, frames: joinSteps.length + bubble.frames.length + workflowCaptions.length };
}
