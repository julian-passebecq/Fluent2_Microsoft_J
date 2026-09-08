import { lessonMetadata } from './metadata';
import { joinLesson, joinInput } from './joins';
import { bubble,validateSort } from './sorting';
import { workflow, workflowCaptions, validateRetry } from './retry';
import { groupingFrames, validateGrouping } from './grouping';
import { compileLoopFrame, compileWorkflowRunFrame, validateWorkflowSpec } from '../core';
export interface LessonVariant { id:string; steps:readonly {id:string;caption:string}[]; validate:(steps:LessonVariant['steps'])=>void }
export const catalog = lessonMetadata.map(meta=>({...meta, variants: variantsFor(meta.id)}));
function variantsFor(id:typeof lessonMetadata[number]['id']):LessonVariant[]{
  switch(id){
    case 'join':return (['left','inner'] as const).flatMap(mode=>[false,true].map(duplicate=>({id:`${mode}-${duplicate}`,steps:joinLesson(mode,duplicate).steps,validate:()=>{joinLesson(mode,duplicate).steps.forEach((_,i)=>joinInput(i,mode,duplicate));}})));
    case 'sort':return [{id:'baseline',steps:bubble.frames.map(f=>({id:f.id,caption:String(f.caption)})),validate:()=>validateSort()}];
    case 'workflow':return [{id:'retry',steps:workflow.runs![0].frames.map((f,i)=>({id:f.id,caption:workflowCaptions[i]})),validate:()=>{if(!validateWorkflowSpec(workflow).valid)throw Error('Invalid workflow');workflowCaptions.forEach((_,i)=>compileWorkflowRunFrame(workflow,'retry',i));}}];
    case 'group':return (['baseline','null-amounts'] as const).map(variant=>({id:variant,steps:groupingFrames(variant),validate:steps=>validateGrouping(variant,steps)}));
  }
}
export function validateCatalog(lessons=catalog){
  const unique=(ids:readonly string[])=>{if(ids.some(id=>!id.trim()) || new Set(ids).size!==ids.length)throw Error('IDs must be nonempty and unique');};
  unique(lessons.map(l=>l.id));let frames=0,variants=0;
  validateRetry();
  for(const lesson of lessons){
    if(!lessonMetadata.some(meta=>meta.id===lesson.id))throw Error('Unknown lesson');
    unique(lesson.variants.map(v=>v.id));
    const canonical=variantsFor(lesson.id);
    for(const variant of lesson.variants){
      if(!variant.steps.length)throw Error('Empty trace');unique(variant.steps.map(s=>s.id));if(variant.steps.some(s=>!s.caption.trim()))throw Error('Missing caption');
      const expected=canonical.find(v=>v.id===variant.id);
      if(!expected||JSON.stringify(variant.steps.map(s=>[s.id,s.caption]))!==JSON.stringify(expected.steps.map(s=>[s.id,s.caption])))throw Error('Frame/caption or alignment mismatch');
      expected.validate(variant.steps);frames+=variant.steps.length;variants++;
    }
    if(lesson.variants.length!==canonical.length)throw Error('Missing lesson variant');
  }
  if(lessonMetadata.some(meta=>!lessons.some(lesson=>lesson.id===meta.id)))throw Error('Missing supported lesson');
  return {visuals:lessons.length,variants,frames};
}
