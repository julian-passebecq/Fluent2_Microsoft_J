// Diagnostic probes, not release assertions or an application entry point.
// Run from repo root: pnpm exec tsx projectmanagement/audits/baseline-probes.ts
import { evaluateTablePredicate } from '../../src/figures/core/table';
import { workflow } from '../../src/figures/content/proofs';
import { validateWorkflowSpec, compileWorkflowRunFrame, type WorkflowSpec } from '../../src/figures/core/workflow';

console.log('NULL IN (NULL):', evaluateTablePredicate(
  { id: 'r', values: { x: null } }, { columnId: 'x', operator: 'in', value: [null] },
));
console.log('1 NOT IN (2, NULL):', evaluateTablePredicate(
  { id: 'r', values: { x: 1 } }, { columnId: 'x', operator: 'not-in', value: [2, null] },
));
const premature: WorkflowSpec = {
  ...workflow,
  runs: [{ id: 'bad', frames: [{ id: 'premature', states: { Publish: { status: 'running' } } }] }],
};
console.log('Premature Publish validation:', validateWorkflowSpec(premature));
console.log('Premature Publish compiled state:', compileWorkflowRunFrame(premature, 'bad', 0).states);
