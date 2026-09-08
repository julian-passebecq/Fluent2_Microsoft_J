import { expect, it } from 'vitest';
import { catalog, validateCatalog } from '../src/figures/content/catalog';
import { groupingFrames, type GroupFrame } from '../src/figures/content/grouping';

it.each(['group', 'join', 'sort', 'workflow'])('rejects an omitted %s lesson', id => {
  expect(() => validateCatalog(catalog.filter(lesson => lesson.id !== id))).toThrow('Missing supported lesson');
});

const corruptions: [string, (frame: GroupFrame) => GroupFrame][] = [
  ['assigned IDs', frame => ({ ...frame, assignedRowIds: ['O3'] })],
  ['total', frame => ({ ...frame, knownTotal: 0 })],
  ['source cells', frame => ({ ...frame, table: { ...frame.table, rows: [] } })],
  ['missing group', frame => ({ ...frame, groups: frame.groups.slice(1) })],
  ['typed key', frame => ({ ...frame, groups: frame.groups.map((g, i) => i === 0 ? { ...g, key: null } : g) })],
  ['aggregate', frame => ({ ...frame, groups: frame.groups.map((g, i) => i === 0 ? { ...g, values: { ...g.values, total_amount: 0 } } : g) })],
  ['pending values', frame => ({ ...frame, groups: frame.groups.map((g, i) => i === 1 ? { ...g, values: { total_amount: 0 } } : g) })],
  ['phase', frame => ({ ...frame, phase: 'result' })],
];

it.each(corruptions)('rejects corrupted %s in both variants even with a no-op callback', (_, corrupt) => {
  for (const id of ['baseline', 'null-amounts'] as const) {
    const frames = groupingFrames(id).map(frame => frame.id === 'group-c1' ? corrupt(frame) : frame);
    const altered = catalog.map(lesson => lesson.id === 'group'
      ? { ...lesson, variants: lesson.variants.map(variant => variant.id === id ? { ...variant, steps: frames, validate: () => {} } : variant) }
      : lesson);
    expect(() => validateCatalog(altered)).toThrow('Invalid supplied grouping frame state');
  }
});

it('accepts equivalent copied frames with reordered object properties and lesson order', () => {
  const copied = [...catalog].reverse().map(lesson => lesson.id === 'group'
    ? { ...lesson, variants: lesson.variants.map(variant => ({ ...variant, steps: groupingFrames(variant.id === 'baseline' ? 'baseline' : 'null-amounts').map(frame => ({ ...frame, groups: frame.groups.map(group => ({ ...group, values: group.values && Object.fromEntries(Object.entries(group.values).reverse()) })) })) })) }
    : lesson);
  expect(validateCatalog(copied)).toEqual({ visuals: 4, variants: 8, frames: 76 });
});
