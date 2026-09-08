import { lessonMetadata } from './metadata';
import { joinLesson, validateJoinLesson, type JoinStep } from './joins';
import { bubble, validateSort } from './sorting';
import { workflow, workflowCaptions, validateRetry } from './retry';
import { groupingFrames, validateGrouping, type GroupFrame } from './grouping';
import { compileWorkflowRunFrame, validateWorkflowSpec } from '../core';

// JOIN and grouping carry semantic steps; sort/workflow carry descriptors and
// retain their separate trusted spec validators. Supplied callbacks are ignored.
type StepDescriptor = { id: string; caption: string };
export interface LessonVariant {
  id: string;
  steps: readonly (StepDescriptor | JoinStep | GroupFrame)[];
  validate: (steps: LessonVariant['steps']) => void;
}
export const catalog = lessonMetadata.map(meta => ({ ...meta, variants: variantsFor(meta.id) }));

function variantsFor(id: typeof lessonMetadata[number]['id']): LessonVariant[] {
  switch (id) {
    case 'join':
      return (['left', 'inner'] as const).flatMap(mode => [false, true].map(duplicate => ({
        id: `${mode}-${duplicate}`,
        steps: joinLesson(mode, duplicate).steps,
        validate: steps => validateJoinLesson(mode, duplicate, steps),
      })));
    case 'sort':
      return [{ id: 'baseline', steps: bubble.frames.map(frame => ({ id: frame.id, caption: String(frame.caption) })), validate: () => validateSort() }];
    case 'workflow':
      return [{
        id: 'retry',
        steps: workflow.runs![0].frames.map((frame, i) => ({ id: frame.id, caption: workflowCaptions[i] })),
        validate: () => {
          if (!validateWorkflowSpec(workflow).valid) throw Error('Invalid workflow');
          workflowCaptions.forEach((_, i) => compileWorkflowRunFrame(workflow, 'retry', i));
        },
      }];
    case 'group':
      return (['baseline', 'null-amounts'] as const).map(variant => ({
        id: variant,
        steps: groupingFrames(variant),
        validate: steps => validateGrouping(variant, steps),
      }));
  }
}

export function validateCatalog(lessons = catalog) {
  const unique = (ids: readonly string[]) => {
    if (ids.some(id => !id.trim()) || new Set(ids).size !== ids.length) throw Error('IDs must be nonempty and unique');
  };
  unique(lessons.map(lesson => lesson.id));
  let frames = 0;
  let variants = 0;
  validateRetry();
  for (const lesson of lessons) {
    if (!lessonMetadata.some(meta => meta.id === lesson.id)) throw Error('Unknown lesson');
    unique(lesson.variants.map(variant => variant.id));
    const canonical = variantsFor(lesson.id);
    for (const variant of lesson.variants) {
      if (!variant.steps.length) throw Error('Empty trace');
      unique(variant.steps.map(step => step.id));
      if (variant.steps.some(step => !step.caption.trim())) throw Error('Missing caption');
      const expected = canonical.find(item => item.id === variant.id);
      if (!expected || variant.steps.length !== expected.steps.length || variant.steps.some((step, i) =>
        step.id !== expected.steps[i].id || step.caption !== expected.steps[i].caption)) {
        throw Error('Frame/caption or alignment mismatch');
      }
      expected.validate(variant.steps);
      frames += variant.steps.length;
      variants++;
    }
    if (lesson.variants.length !== canonical.length) throw Error('Missing lesson variant');
  }
  if (lessonMetadata.some(meta => !lessons.some(lesson => lesson.id === meta.id))) throw Error('Missing supported lesson');
  return { visuals: lessons.length, variants, frames };
}
