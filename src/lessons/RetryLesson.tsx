import { workflow, workflowCaptions } from '../figures/content/retry';
import { compileWorkflowRunFrame } from '../figures/core';
import { FigurePlayer } from '../figures/react/FigurePlayer';
import { RendererHost } from '../figures/react/renderer-host';
import { Canvas } from './shared';
function RetryFrame({index,reduced}:{index:number;reduced:boolean}){
  const frame=compileWorkflowRunFrame(workflow,'retry',index);
  return <><Canvas><RendererHost rendererId="workflow.topology" input={{spec:workflow,frame,mode:'run',description:'Dependencies stay fixed; task status changes'}} options={{width:960,height:320,reducedMotion:reduced}} ariaLabel="Source, Transform, Quality and Publish dependency chain" fallback={workflowCaptions[index]}/></Canvas>
    <ol className="task-states">{workflow.nodes.map(node=>{const state=frame.states[node.id];const status=state.status==='upstream_failed'?'Blocked by failed check':state.status==='pending'?'Waiting for prerequisite':state.status==='queued'?'Ready to run':state.status;return <li key={node.id}><b>{String(node.label)}</b><span>{status}{state.attempt?` · attempt ${state.attempt}`:''}</span></li>;})}</ol></>;
}
export function RetryLesson(){return <FigurePlayer captions={workflowCaptions} stepIds={workflow.runs![0].frames.map(f=>f.id)} alignmentKey="retry">{(index,reduced)=><RetryFrame index={index} reduced={reduced}/>}</FigurePlayer>;}
