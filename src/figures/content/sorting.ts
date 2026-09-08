import { compileLoopFrame, compileTableJoin, compileWorkflowRunFrame, resolveExplanationStep, validateWorkflowSpec,
  type LoopFrame, type LoopSceneSpec, type TableJoinSpec, type WorkflowSpec } from '../core';

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

