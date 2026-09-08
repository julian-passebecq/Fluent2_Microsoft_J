import { expect, it } from 'vitest';
import { catalog, validateCatalog } from '../src/figures/content/catalog';
import { joinLesson, joinSteps, joinInput, validateJoinLesson, type JoinMode, type JoinStep } from '../src/figures/content/joins';

const variants: [JoinMode, boolean, number[]][] = [
  ['left', false, [0, 0, 2, 2, 3, 3, 4]],
  ['inner', false, [0, 0, 2, 2, 2, 2, 3]],
  ['left', true, [0, 0, 4, 4, 5, 5, 6]],
  ['inner', true, [0, 0, 4, 4, 4, 4, 5]],
];

it.each(variants)('accepts the independent %s duplicate=%s reveal oracle', (mode, duplicate, oracle) => {
  const steps = joinLesson(mode, duplicate).steps;
  expect(steps.map(step => step.reveal)).toEqual(oracle);
  expect(steps.map(step => step.outcome)).toEqual([
    '', '', '', '', ...Array(3).fill(mode === 'left' ? 'Bob preserved with NULL' : 'Bob excluded: no matching order'),
  ]);
  expect(() => validateJoinLesson(mode, duplicate, steps)).not.toThrow();
});

const mutations: [string, (steps: JoinStep[]) => void][] = [
  ['negative reveal', steps => { steps[2].reveal = -1; }],
  ['fractional reveal', steps => { steps[2].reveal = 0.5; }],
  ['NaN reveal', steps => { steps[2].reveal = NaN; }],
  ['infinite reveal', steps => { steps[2].reveal = Infinity; }],
  ['overlarge reveal', steps => { steps[2].reveal = 999; }],
  ['reveal regression', steps => { steps[3].reveal = 0; }],
  ['incomplete final', steps => { steps[6].reveal -= 1; }],
  ['nonzero first', steps => { steps[0].reveal = 1; }],
  ['wrong bounded reveal', steps => { steps[2].reveal = 1; }],
  ['unknown left', steps => { steps[2].focus = ['left:missing']; }],
  ['unknown right', steps => { steps[2].focus = ['right:missing']; }],
  ['unknown result', steps => { steps[2].focus = ['missing-result']; }],
  ['un-emitted output', steps => { steps[0].focus = [steps[6].focus.at(-1)!]; }],
  ['wrong existing focus', steps => { steps[0].focus = ['left:C2']; }],
  ['early Bob outcome', steps => { steps[0].outcome = steps[4].outcome; }],
  ['wrong Bob outcome', steps => { steps[4].outcome = steps[4].outcome === 'Bob preserved with NULL' ? 'Bob excluded: no matching order' : 'Bob preserved with NULL'; }],
  ['missing reveal', steps => { Reflect.deleteProperty(steps[2], 'reveal'); }],
  ['missing focus', steps => { Reflect.deleteProperty(steps[2], 'focus'); }],
  ['missing outcome', steps => { Reflect.deleteProperty(steps[2], 'outcome'); }],
];

it.each(mutations)('rejects %s directly and through trusted catalog dispatch in all variants', (_, mutate) => {
  for (const [mode, duplicate] of variants) {
    const steps = structuredClone(joinLesson(mode, duplicate).steps);
    mutate(steps);
    expect(() => validateJoinLesson(mode, duplicate, steps)).toThrow();
    const altered = catalog.map(lesson => lesson.id === 'join' ? {
      ...lesson,
      variants: lesson.variants.map(variant => variant.id === `${mode}-${duplicate}` ? { ...variant, steps, validate: () => {} } : variant),
    } : lesson);
    expect(() => validateCatalog(altered)).toThrow();
  }
});

it('rejects malformed authored data before preparing render input, including bounded but wrong semantics', () => {
  const frame = joinSteps[2];
  const previous = { ...frame, focus: [...frame.focus] };
  try {
    frame.reveal = 1;
    expect(() => validateJoinLesson('left')).toThrow();
    expect(() => joinInput(2)).toThrow();
    Object.assign(frame, previous);
    frame.focus = ['left:C2'];
    expect(() => validateJoinLesson('left')).toThrow();
    expect(() => joinInput(2)).toThrow();
  } finally {
    Object.assign(frame, previous);
  }
});
