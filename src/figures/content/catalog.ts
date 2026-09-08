import { lessonMetadata } from './metadata';
import { joinLesson, joinInput } from './joins';
import { bubble } from './sorting';
import { workflow, workflowCaptions } from './retry';
import { compileLoopFrame, compileWorkflowRunFrame, validateWorkflowSpec } from '../core';
export interface LessonVariant { id:string; steps:readonly {id:string;caption:string}[]; validate:()=>void }
export const catalog = lessonMetadata.map(meta=>({...meta, variants: variantsFor(meta.id)}));
function variantsFor(id:typeof lessonMetadata[number]['id']):LessonVariant[]{
  switch(id){
    case 'join':return (['left','inner'] as const).flatMap(mode=>[false,true].map(duplicate=>({id:`${mode}-${duplicate}`,steps:joinLesson(mode,duplicate).steps,validate:()=>{joinLesson(mode,duplicate).steps.forEach((_,i)=>joinInput(i,mode,duplicate));}})));
    case 'sort':return [{id:'baseline',steps:bubble.frames.map(f=>({id:f.id,caption:String(f.caption)})),validate:()=>{bubble.frames.forEach((_,i)=>compileLoopFrame(bubble,i));}}];
    case 'workflow':return [{id:'retry',steps:workflow.runs![0].frames.map((f,i)=>({id:f.id,caption:workflowCaptions[i]})),validate:()=>{if(!validateWorkflowSpec(workflow).valid)throw Error('Invalid workflow');workflowCaptions.forEach((_,i)=>compileWorkflowRunFrame(workflow,'retry',i));}}];
  }
}
export function validateCatalog(lessons=catalog){
  const unique=(ids:readonly string[])=>{if(ids.some(id=>!id.trim()) || new Set(ids).size!==ids.length)throw Error('IDs must be nonempty and unique');};
  unique(lessons.map(l=>l.id));let frames=0,variants=0;
  for(const lesson of lessons){unique(lesson.variants.map(v=>v.id));for(const variant of lesson.variants){if(!variant.steps.length)throw Error('Empty trace');unique(variant.steps.map(s=>s.id));if(variant.steps.some(s=>!s.caption.trim()))throw Error('Missing caption');variant.validate();frames+=variant.steps.length;variants++;}}
  return {visuals:lessons.length,variants,frames};
}
