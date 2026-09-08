import { useState } from 'react';
import { Button, FluentProvider, webLightTheme } from '@fluentui/react-components';
import { compileLoopFrame, compileWorkflowRunFrame, type TableData } from './figures/core';
import { bubble, join, joined, joinInput, joinSteps, workflow, workflowCaptions } from './figures/content/proofs';
import { FigurePlayer } from './figures/react/FigurePlayer';
import { RendererHost } from './figures/react/renderer-host';
import './styles.css';

const concepts = [
  { id: 'join', domain: 'SQL & TABLES', title: 'LEFT JOIN', question: 'What happens when a customer has no orders?', description: 'Follow each customer through the join. Matching orders multiply rows; a missing match leaves NULLs.', takeaway: 'A LEFT JOIN preserves every left row. It does not promise one output row per customer.' },
  { id: 'sort', domain: 'ALGORITHMS', title: 'Bubble sort', question: 'How does the largest value reach the end?', description: 'Compare neighbors, swap when they are out of order, then shorten the unsorted portion.', takeaway: 'Each pass fixes one more value at the end. Dashed boxes mark the sorted suffix. Time: O(n²) · Extra space: O(1).' },
  { id: 'workflow', domain: 'PIPELINES & RELIABILITY', title: 'Retry & blocked downstream', question: 'Why can’t publishing continue after a failed check?', description: 'Follow a quality check through failure and retry. Dependencies stay in place while task states change.', takeaway: 'Retry the failed task. Release downstream work only when its prerequisite succeeds; successful upstream tasks keep their state.' },
] as const;
function DataTable({ data, active = [] }: { data: TableData; active?: readonly string[] }) {
  return <table><caption>{data.id} <span>· {data.rows.length} rows</span></caption>
    <thead><tr>{data.columns.map(c => <th scope="col" key={c.id}>{String(c.label ?? c.id)}</th>)}</tr></thead>
    <tbody>{data.rows.map(row => <tr key={row.id} data-active={active.includes(row.id)}>{data.columns.map(c => <td key={c.id}>{row.values[c.id] === null ? <strong>NULL</strong> : String(row.values[c.id])}</td>)}</tr>)}</tbody>
  </table>;
}
function Proof({ id, frame, reducedMotion }: { id: string; frame: number; reducedMotion: boolean }) {
  const options = { width: 960, height: id === 'join' ? 300 : 320, reducedMotion, transitionDurationMs: 450 };
  const canvas = id === 'join'
    ? <RendererHost rendererId="table.join" input={joinInput(frame)} options={options} ariaLabel="Customer and order row correspondence" fallback={joinSteps[frame].caption} />
    : id === 'sort'
      ? <RendererHost rendererId="algorithm.loop" input={{ spec: bubble, frame: compileLoopFrame(bubble, frame), description: 'Compare neighbors · dashed boxes are sorted' }} options={options} ariaLabel="Bubble sort values and active code" fallback={String(bubble.frames[frame].caption)} />
      : <RendererHost rendererId="workflow.topology" input={{ spec: workflow, frame: compileWorkflowRunFrame(workflow, 'retry', frame), mode: 'run' as const, description: 'Dependencies stay fixed; task status changes' }} options={options} ariaLabel="Source, Transform, Quality and Publish dependency chain" fallback={workflowCaptions[frame]} />;
  return <>
    <p className="pan-hint">Scroll the diagram sideways on smaller screens. Keyboard: focus it and use the arrow keys.</p>
    <div className="canvas-scroll" role="region" aria-label="Scrollable concept diagram" tabIndex={0}><div className="canvas">{canvas}</div></div>
    {id === 'join' && <div className="tables">
      <DataTable data={join.left} active={joinSteps[frame].focus.filter(id => id.startsWith('left:')).map(id => id.slice(5))} />
      <DataTable data={join.right} active={joinSteps[frame].focus.filter(id => id.startsWith('right:')).map(id => id.slice(6))} />
      <DataTable data={{ id: 'Joined result', columns: [{ id: 'name', label: 'Customer' }, { id: 'order', label: 'Order' }], rows: joined.rows.slice(0, joinSteps[frame].reveal).map(row => ({ id: row.id, values: { name: row.values['left.Customers.name'], order: row.values['right.Orders.order'] } })) }} active={joinSteps[frame].focus} />
    </div>}
    {id === 'workflow' && <ol className="task-states">{workflow.nodes.map(node => {
      const state = compileWorkflowRunFrame(workflow, 'retry', frame).states[node.id];
      const status = state.status === 'upstream_failed' ? 'Blocked by failed check' : state.status === 'pending' ? 'Waiting for prerequisite' : state.status === 'queued' ? 'Ready to run' : state.status;
      return <li key={node.id}><b>{String(node.label)}</b><span>{status}{state.attempt ? ` · attempt ${state.attempt}` : ''}</span></li>;
    })}</ol>}
  </>;
}
export function App() {
  const [selected, setSelected] = useState(0);
  const concept = concepts[selected];
  const captions = concept.id === 'join' ? joinSteps.map(s => s.caption) : concept.id === 'sort' ? bubble.frames.map(f => String(f.caption)) : workflowCaptions;
  return <FluentProvider theme={webLightTheme}>
    <a className="skip-link" href="#lesson">Skip to concept</a>
    <main className="page">
      <header className="hero"><p className="eyebrow">DATAPASS / VISUAL IT CONCEPTS</p><h1>See the logic.</h1><p className="lede">Small examples. Visible state. Understand what changes—and why.</p></header>
      <nav className="concept-nav" aria-label="Choose a concept">{concepts.map((item, index) => <Button key={item.id} appearance={selected === index ? 'primary' : 'secondary'} aria-pressed={selected === index} onClick={() => setSelected(index)}>{item.title}</Button>)}</nav>
      <article id="lesson" tabIndex={-1} aria-labelledby="lesson-title">
        <div className="lesson-heading"><p className="eyebrow">{concept.domain}</p><h2 id="lesson-title">{concept.title}</h2><p className="question">{concept.question}</p><p>{concept.description}</p></div>
        <FigurePlayer key={concept.id} captions={captions}>{(frame, reduced) => <Proof id={concept.id} frame={frame} reducedMotion={reduced} />}</FigurePlayer>
        <aside className="takeaway"><h3>What to remember</h3><p>{concept.takeaway}</p></aside>
      </article>
      <footer>Explore at your pace. Every step works as a still picture.</footer>
    </main>
  </FluentProvider>;
}
