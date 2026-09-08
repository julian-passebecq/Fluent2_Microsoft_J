import { bubble } from '../figures/content/sorting';
import { compileLoopFrame } from '../figures/core';
import { FigurePlayer } from '../figures/react/FigurePlayer';
import { RendererHost } from '../figures/react/renderer-host';
import { Canvas } from './shared';
function SortFrame({index,reduced}:{index:number;reduced:boolean}) {
  const frame=compileLoopFrame(bubble,index);
  const value=(id:string)=>String(bubble.items.find(item=>item.id===id)!.value);
  return <><Canvas><RendererHost rendererId="algorithm.loop" input={{spec:bubble,frame,description:'Compare neighbors · dashed boxes are sorted'}} options={{width:960,height:320,reducedMotion:reduced}} ariaLabel="Bubble sort values and active code" fallback={String(frame.frame.caption)}/></Canvas>
    <section className="takeaway" aria-label="Current sorting state"><h3>Current sorting state</h3><p>Operation: {frame.frame.operation}</p><p>Current order: {frame.itemOrder.map(value).join(', ')}</p><p>Active pair: {frame.frame.activeItemIds?.map(value).join(', ') || 'None'}</p><p>Sorted suffix: {frame.frame.doneItemIds?.map(value).join(', ') || 'None yet'}</p></section></>;
}
export function SortLesson(){return <FigurePlayer captions={bubble.frames.map(f=>String(f.caption))} stepIds={bubble.frames.map(f=>f.id)} alignmentKey="sort">{(index,reduced)=><SortFrame index={index} reduced={reduced}/>}</FigurePlayer>;}
