import { describe, expect, it } from 'vitest';
import { bubble, join, joined, innerJoined, innerJoinSteps, joinInput, joinLesson, joinSteps, workflow, validateProofs } from '../src/figures/content/proofs';
import { compileLoopFrame, compileWorkflowRunFrame, validateWorkflowSpec } from '../src/figures/core';
import { LoopRenderer } from '../src/figures/renderers/renderers/loop';
import { JoinRenderer } from '../src/figures/renderers/renderers/join';
import { WorkflowRenderer } from '../src/figures/renderers/renderers/workflow';
const host = () => document.createElementNS('http://www.w3.org/2000/svg', 'svg');
describe('proof semantics and retained renderers', () => {
  it('validates every frame', () => expect(validateProofs().visuals).toBe(3));
  it('emits one row per matching pair and preserves unmatched Bob with NULLs', () => {
    expect(joined.rows.map(r => [r.leftRowId, r.rightRowId])).toEqual([['C1','O1'], ['C1','O2'], ['C2',null], ['C3','O3']]);
    expect(joined.rows[2].values['right.Orders.order']).toBeNull();
    expect(joined.rows[2].values['right.Orders.customer']).toBeNull();
    expect(new Set(joined.rows.map(r => r.leftRowId)).size).toBe(join.left.rows.length);
  });
  it('INNER excludes Bob while preserving exactly the same matched pair IDs', () => {
    expect(innerJoined.rows.map(r => [r.leftRowId, r.rightRowId])).toEqual([['C1','O1'], ['C1','O2'], ['C3','O3']]);
    expect(innerJoined.rowOrder).toEqual(joined.rows.filter(r => r.rightRowId !== null).map(r => r.id));
    expect(innerJoinSteps).toHaveLength(joinSteps.length);
    expect(innerJoinSteps[4].reveal).toBe(2);
    expect(joinSteps[4].reveal).toBe(3);
    expect(joinInput(4, 'inner').explanation?.step.focus.entityIds).toEqual(['left:C2']);
  });
  it('expands repeated C1 keys into every matching pair without merging records', () => {
    for (const mode of ['left','inner'] as const) {
      const { spec, result } = joinLesson(mode, true);
      expect(new Set(spec.left.rows.map(row => row.id)).size).toBe(4);
      expect(result.rows.filter(row => row.values['left.Customers.customer'] === 'C1').map(row => [row.leftRowId,row.rightRowId])).toEqual([['C1','O1'],['C1','O2'],['C1-copy','O1'],['C1-copy','O2']]);
      expect(result.rows).toHaveLength(mode === 'left' ? 6 : 5);
      expect(result.rows.filter(row => row.rightRowId === null)).toHaveLength(mode === 'left' ? 1 : 0);
      expect(joinLesson(mode).result.rowOrder.every(id => result.rowOrder.includes(id))).toBe(true);
    }
  });
  it('switches join types in place without recreating sources or surviving output pairs', () => {
    const svg = host(), renderer = new JoinRenderer();
    renderer.mount(svg, joinInput(6), { reducedMotion: true });
    const source = svg.querySelector('[data-role="source-row"]');
    const matched = [...svg.querySelectorAll('[data-role="result-row"]')].filter(n => n.getAttribute('data-null-extended') === 'false');
    renderer.update(joinInput(6, 'inner'));
    expect(svg.querySelector('[data-role="source-row"]')).toBe(source);
    const surviving = [...svg.querySelectorAll('[data-role="result-row"]')];
    expect(surviving).toHaveLength(3);
    surviving.forEach((node,i) => expect(node).toBe(matched[i]));
    renderer.update(joinInput(6));
    expect(svg.querySelectorAll('[data-role="result-row"]')).toHaveLength(4);
    expect(svg.querySelectorAll('[data-null-extended="true"]')).toHaveLength(1);
    renderer.destroy();
  });
  it('sorts a permutation with stable IDs, comparisons and an increasing sorted suffix', () => {
    const original = bubble.items.map(i => i.id).sort();
    let done = 0;
    for (let i = 0; i < bubble.frames.length; i++) {
      const frame = compileLoopFrame(bubble, i);
      expect([...frame.itemOrder].sort()).toEqual(original);
      const suffix = frame.frame.doneItemIds ?? [];
      expect(suffix.length).toBeGreaterThanOrEqual(done); done = suffix.length;
    }
    expect(compileLoopFrame(bubble, bubble.frames.length - 1).itemOrder.map(id => bubble.items.find(item => item.id === id)!.value)).toEqual([1,2,3,4,5]);
    expect(bubble.frames.some(f => f.operation === 'no swap')).toBe(true);
    expect(() => compileLoopFrame({ ...bubble, frames: [{ ...bubble.frames[0], order: ['missing'] }] }, 0)).toThrow();
  });
  it('keeps upstream success while retry blocks and then releases Publish', () => {
    expect(compileWorkflowRunFrame(workflow,'retry',3).states.Publish.status).toBe('upstream_failed');
    const retry = compileWorkflowRunFrame(workflow,'retry',4).states;
    expect(retry.Source.status).toBe('success'); expect(retry.Transform.status).toBe('success');
    expect(retry.Quality).toEqual({ status: 'retrying', attempt: 2 });
    expect(compileWorkflowRunFrame(workflow,'retry',5).states.Publish.status).toBe('queued');
    expect(compileWorkflowRunFrame(workflow,'retry',7).states.Publish.status).toBe('success');
    expect(validateWorkflowSpec({ ...workflow, edges: [{ from: 'missing', to: 'Publish' }] }).valid).toBe(false);
  });
  it('moves existing algorithm DOM nodes and freezes deterministically', () => {
    const svg = host(), renderer = new LoopRenderer();
    renderer.mount(svg, { spec: bubble, frame: compileLoopFrame(bubble,0) }, { reducedMotion: true });
    const node = svg.querySelector('[data-item-id="value-0"]');
    renderer.update({ spec: bubble, frame: compileLoopFrame(bubble,2) });
    expect(svg.querySelector('[data-item-id="value-0"]')).toBe(node);
    const frozen = renderer.freeze(); renderer.update({ spec: bubble, frame: compileLoopFrame(bubble,2) });
    expect(renderer.freeze()).toBe(frozen);
    renderer.destroy(); expect(svg.children).toHaveLength(0);
  });
  it('preserves source and emitted join rows through subsequent frames', () => {
    const svg = host(), renderer = new JoinRenderer();
    renderer.mount(svg, joinInput(2), { reducedMotion: true });
    const source = svg.querySelector('[data-role="source-row"]'), result = svg.querySelector('[data-role="result-row"]');
    renderer.update(joinInput(joinSteps.length - 1));
    expect(svg.querySelector('[data-role="source-row"]')).toBe(source);
    expect(svg.querySelector('[data-role="result-row"]')).toBe(result);
    expect(svg.querySelectorAll('[data-null-extended="true"]')).toHaveLength(1);
    renderer.destroy();
  });
  it('preserves DAG geometry and node DOM identity through every state', () => {
    const svg = host(), renderer = new WorkflowRenderer();
    renderer.mount(svg, { spec: workflow, frame: compileWorkflowRunFrame(workflow,'retry',0) }, { reducedMotion: true });
    const nodes = [...svg.querySelectorAll('[data-node-id]')];
    expect(nodes.length).toBe(4);
    expect([...svg.querySelectorAll('[data-role="port"]')].every(port => port.getAttribute('role') === 'group')).toBe(true);
    const transforms = nodes.map(n => n.getAttribute('transform'));
    for (let i=1;i<8;i++) {
      renderer.update({ spec: workflow, frame: compileWorkflowRunFrame(workflow,'retry',i) });
      expect([...svg.querySelectorAll('[data-node-id]')]).toEqual(nodes);
      expect(nodes.map(n => n.getAttribute('transform'))).toEqual(transforms);
      if (i === 3) expect(svg.querySelector('[data-node-id="Publish"] [data-role="status"]')?.textContent).toContain('BLOCKED');
    }
    renderer.destroy();
  });
});
