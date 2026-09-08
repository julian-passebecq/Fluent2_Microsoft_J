import { useState } from 'react';
import { compileJoinFrame, joinLesson, type JoinMode } from '../figures/content/joins';
import { FigurePlayer } from '../figures/react/FigurePlayer';
import { RendererHost } from '../figures/react/renderer-host';
import { Canvas, DataTable } from './shared';
function JoinFrame({index,mode,duplicate,reduced}:{index:number;mode:JoinMode;duplicate:boolean;reduced:boolean}) {
  const frame=compileJoinFrame(index,mode,duplicate);
  return <><Canvas><RendererHost rendererId="table.join" input={frame.input} options={{width:960,height:360,reducedMotion:reduced,transitionDurationMs:450}} ariaLabel="Customer and order row correspondence" fallback={frame.step.caption}/></Canvas>
    <p className="join-count" role="status">{frame.rows.length} output rows · {frame.represented} of {frame.spec.left.rows.length} {duplicate?'customer records':'customers'} represented{frame.step.outcome && ` · ${frame.step.outcome}`}</p>
    <div className="tables"><DataTable data={frame.spec.left} active={frame.activeLeft}/><DataTable data={frame.spec.right} active={frame.activeRight}/><DataTable data={frame.output} active={frame.step.focus}/></div></>;
}
export function JoinLesson() {
  const [mode,setMode]=useState<JoinMode>('left'); const [duplicate,setDuplicate]=useState(false);
  const lesson=joinLesson(mode,duplicate);
  return <><div className="join-choice">
    <fieldset><legend>Compare join types</legend>{(['left','inner'] as const).map(value=><label key={value}><input type="radio" name="join-type" checked={mode===value} onChange={()=>setMode(value)}/>{value.toUpperCase()} JOIN</label>)}</fieldset>
    <fieldset className="dataset-choice"><legend>Customer keys</legend>{[false,true].map(value=><label key={String(value)}><input type="radio" name="dataset" checked={duplicate===value} onChange={()=>setDuplicate(value)}/>{value?'Duplicate C1 key':'Unique keys'}</label>)}</fieldset>
    {duplicate && <p className="cardinality-note">Two C1 records × two C1 orders = four pairs. A customer key is not a unique record ID here.</p>}
    <pre aria-label="SQL query"><code>{`SELECT c.name, o."order"\nFROM Customers c\n${mode.toUpperCase()} JOIN Orders o\n  ON c.customer = o.customer`}</code></pre>
  </div><FigurePlayer captions={lesson.steps.map(s=>s.caption)} stepIds={lesson.steps.map(s=>s.id)} alignmentKey="join" playbackKey={`${mode}-${duplicate}`}>{(index,reduced)=><JoinFrame index={index} mode={mode} duplicate={duplicate} reduced={reduced}/>}</FigurePlayer></>;
}
