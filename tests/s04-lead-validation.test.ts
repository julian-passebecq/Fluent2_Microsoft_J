import { expect, it } from 'vitest';
import { catalog, validateCatalog } from '../src/figures/content/catalog';
import { joinLesson, joinSteps } from '../src/figures/content/joins';

type JoinStep = ReturnType<typeof joinLesson>['steps'][number];

const corruptions: [string, (step: JoinStep) => JoinStep][] = [
  ['reveal count', step => ({ ...step, reveal: 999 })],
  ['focus reference', step => ({ ...step, focus: ['missing-order'] })],
  ['outcome', step => ({ ...step, outcome: 'invented outcome' })],
];

it.each(corruptions)('S04-LEAD-01: rejects supplied JOIN %s corruption in every variant', (_, corrupt) => {
  for (const mode of ['left', 'inner'] as const) {
    for (const duplicate of [false, true]) {
      const variantId = `${mode}-${duplicate}`;
      const steps = joinLesson(mode, duplicate).steps.map(step =>
        step.id === 'emit-alice' ? corrupt(step) : step,
      );
      const altered = catalog.map(lesson => lesson.id === 'join'
        ? {
            ...lesson,
            variants: lesson.variants.map(variant => variant.id === variantId
              ? { ...variant, steps, validate: () => {} }
              : variant),
          }
        : lesson);
      expect(() => validateCatalog(altered)).toThrow();
    }
  }
});

it('S04-LEAD-01: rejects an invalid authored reveal even when canonical data shares the error', () => {
  const frame = joinSteps.find(step => step.caption.startsWith('Emit Alice'))!;
  const previous = frame.reveal;
  try {
    frame.reveal = -1;
    expect(() => validateCatalog()).toThrow();
  } finally {
    frame.reveal = previous;
  }
});

it('S04-LEAD-01: accepts equivalent copied JOIN steps with reordered properties', () => {
  const copied = catalog.map(lesson => lesson.id === 'join'
    ? {
        ...lesson,
        variants: lesson.variants.map(variant => ({
          ...variant,
          steps: variant.steps.map(({ id, caption, ...semantic }) => ({ id, caption, ...semantic })),
        })),
      }
    : lesson);
  expect(validateCatalog(copied)).toEqual({ visuals: 4, variants: 8, frames: 76 });
});
