import { useState } from 'react';
import { groupingFrames,type GroupFrame,type GroupingVariant } from '../figures/content/grouping';
import { FigurePlayer } from '../figures/react/FigurePlayer';
import { RendererHost } from '../figures/react/renderer-host';
import { Canvas,DataTable } from './shared';
function GroupView({frame,reduced}:{frame:GroupFrame;reduced:boolean}){
  return <><Canvas><RendererHost rendererId="table.group" input={frame} options={{width:960,height:440,reducedMotion:reduced}} ariaLabel="Order membership and customer aggregates" fallback={frame.caption}/></Canvas>
    <div className="group-tables"><DataTable data={{...frame.table,columns:[{id:'record',label:'Order'},...frame.table.columns],rows:frame.table.rows.map(row=>({...row,values:{record:row.id,...row.values}}))}} active={frame.assignedRowIds}/>
      <section aria-label="Customer groups"><h3>Customer groups · {frame.groups.length} identities</h3><div className="group-cards">{frame.groups.map(g=><table key={g.id}><caption>Customer {String(g.key)} · {g.phase}</caption><tbody>
        <tr><th scope="row">Members</th><td>{g.sourceRowIds.join(', ')||'None assigned'}</td></tr>
        <tr><th scope="row">COUNT(*)</th><td>{g.values?.order_count??'Pending'}</td></tr>
        <tr><th scope="row">COUNT(amount)</th><td>{g.values?.known_amount_count??'Pending'}</td></tr>
        <tr><th scope="row">SUM(amount)</th><td>{!g.values?'Pending':g.values.total_amount===null?'NULL':g.values.total_amount}</td></tr>
      </tbody></table>)}</div></section>
    </div><p className="group-summary" role="status">{frame.assignedRowIds.length} of {frame.table.rows.length} orders assigned. Sum of known input amounts: {frame.knownTotal}. {frame.groups.filter(g=>g.phase==='complete').length} groups complete.</p></>;
}
export function GroupLesson(){
  const [variant,setVariant]=useState<GroupingVariant>('baseline');const frames=groupingFrames(variant);
  return <><div className="join-choice"><fieldset><legend>Order amounts</legend>{(['baseline','null-amounts'] as const).map(value=><label key={value}><input type="radio" name="amounts" checked={variant===value} onChange={()=>setVariant(value)}/>{value==='baseline'?'All amounts known':'C3 amounts NULL'}</label>)}</fieldset></div>
    <FigurePlayer captions={frames.map(f=>f.caption)} stepIds={frames.map(f=>f.id)} alignmentKey="grouping" playbackKey={variant}>{(index,reduced)=><GroupView frame={frames[index]} reduced={reduced}/>}</FigurePlayer>
    <div className="join-choice"><p>This is a teaching sequence, not a database execution plan. Groups use a fixed display order; this query does not promise output order.</p><pre><code>{`SELECT customer,\n       COUNT(*) AS order_count,\n       COUNT(amount) AS known_amount_count,\n       SUM(amount) AS total_amount\nFROM Orders\nGROUP BY customer;`}</code></pre><p>NULL amounts remain members. COUNT(*) counts orders; COUNT(amount) counts known amounts. SUM is NULL when a group has no known amounts.</p></div></>;
}
