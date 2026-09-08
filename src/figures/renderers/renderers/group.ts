import { BaseSvgRenderer } from '../base-renderer';
import { ensureChild,keyedChildren,setAttributes,setText,setSvgTransform,setAccessibleText } from '../dom';
import type { AggregationFrame } from '../../core/aggregation';
import type { RendererRegistration } from '../types';
/** Draw an authoritative grouping frame; never recompute aggregation here. */
export class GroupRenderer extends BaseSvgRenderer<AggregationFrame>{
  constructor(){super('group');}
  protected render(frame:AggregationFrame){
    const surface=this.surface!;
    setAccessibleText(surface,'Orders grouped by customer',frame.caption);
    const label=(parent:SVGElement,role:string,x:number,y:number,value:string,size=13)=>{const text=ensureChild(parent,`text[data-role="${role}"]`,'text',{'data-role':role,x,y,fill:surface.theme.ink,'font-size':size});setText(text,value);};
    label(surface.root,'heading',20,26,'GROUP BY customer · one group per key',16);
    label(surface.root,'phase',20,49,frame.phase==='source'?'Input grain: one row per order':frame.phase==='result'?'Output grain: one row per customer key':'Assign records; pending groups have no computed values');
    const layer=ensureChild(surface.root,'g[data-role="groups-lesson"]','g',{'data-role':'groups-lesson'});
    const rowY=new Map(frame.table.rows.map((r,i)=>[r.id,90+i*48]));
    const groupY=new Map(frame.groups.map((g,i)=>[g.id,85+i*112]));
    const links=frame.groups.flatMap(g=>g.sourceRowIds.map(rowId=>({id:`${g.id}:${rowId}`,groupId:g.id,rowId})));
    keyedChildren(layer,'path[data-role="member-link"]','path',links,l=>l.id,(path,link)=>setAttributes(path,{'data-role':'member-link','data-source-row':link.rowId,'data-group-id':link.groupId,d:`M330 ${(rowY.get(link.rowId)??0)+18} L430 ${(rowY.get(link.rowId)??0)+18} L430 ${(groupY.get(link.groupId)??0)+48} L510 ${(groupY.get(link.groupId)??0)+48}`,fill:'none',stroke:surface.theme.accent,'stroke-width':1.5}));
    keyedChildren(layer,'g[data-role="group-source"]','g',frame.table.rows,r=>r.id,(node,row)=>{
      const assigned=frame.assignedRowIds.includes(row.id);
      setAttributes(node,{'data-role':'group-source','data-row-id':row.id,role:'group','aria-label':`${row.id}, customer ${row.values.customer}, amount ${row.values.amount===null?'NULL':row.values.amount}, ${assigned?'assigned':'unassigned'}`});
      setSvgTransform(node,20,rowY.get(row.id)!,this.reducedMotion,this.durationMs);
      ensureChild(node,'rect','rect',{width:310,height:38,rx:5,fill:assigned?surface.theme.accentSubtle:surface.theme.surface,stroke:surface.theme.border,'stroke-dasharray':assigned?undefined:'4 2'});
      label(node,'values',10,24,`${row.id} · ${row.values.customer} · ${row.values.amount===null?'NULL':row.values.amount} · ${assigned?'assigned':'unassigned'}`);
    });
    keyedChildren(layer,'g[data-role="aggregate-group"]','g',frame.groups,g=>g.id,(node,group)=>{
      setAttributes(node,{'data-role':'aggregate-group','data-group-id':group.id,'data-phase':group.phase,role:'group','aria-label':`Customer ${group.key}, ${group.phase}`});
      setSvgTransform(node,510,groupY.get(group.id)!,this.reducedMotion,this.durationMs);
      ensureChild(node,'rect','rect',{width:425,height:100,rx:6,fill:surface.theme.surfaceRaised,stroke:surface.theme.accent,'stroke-dasharray':group.phase==='pending'?'5 3':undefined});
      label(node,'key',12,22,`Customer ${group.key} · ${group.phase}`,15);
      label(node,'counts',12,45,group.values?`COUNT(*) ${group.values.order_count} · COUNT(amount) ${group.values.known_amount_count}`:'Counts: pending');
      label(node,'sum',12,67,group.values?`SUM(amount): ${group.values.total_amount===null?'NULL':group.values.total_amount}`:'SUM(amount): pending');
      label(node,'members',12,89,`Members: ${group.sourceRowIds.join(', ')||'none assigned'}`);
    });
  }
}
export const groupRendererRegistration:RendererRegistration<AggregationFrame>={id:'table.group',family:'table',create:()=>new GroupRenderer()};
