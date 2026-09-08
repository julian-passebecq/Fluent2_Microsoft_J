import { compileLoopFrame, compileTableJoin, compileWorkflowRunFrame, resolveExplanationStep, validateWorkflowSpec,
  type LoopFrame, type LoopSceneSpec, type TableJoinSpec, type WorkflowSpec } from '../core';

export const workflowCaptions = [
  'Source succeeds. Transform can now run; later tasks are still waiting.',
  'Transform succeeds. Quality can now check the transformed data.',
  'Quality fails. Publish is blocked by the failed prerequisite.',
  'Publish remains blocked. A failed check cannot release data.',
  'Quality retries on attempt 2. Publish keeps waiting for success.',
  'Quality succeeds on attempt 2. Publish becomes runnable.',
  'Publish runs after every prerequisite has succeeded.',
  'Publish succeeds. The retry recovered this run without repeating successful upstream tasks.',
];
export const workflow: WorkflowSpec = { kind: 'workflow', version: '1', id: 'quality-retry', title: 'Retry a failed quality check',
  nodes: ['Source', 'Transform', 'Quality', 'Publish'].map(id => ({ id, label: id })),
  edges: [['Source', 'Transform'], ['Transform', 'Quality'], ['Quality', 'Publish']].map(([from, to]) => ({ from, to, condition: 'success' })),
  runs: [{ id: 'retry', frames: [
    { id: 'source-success', states: { Source: { status: 'success' }, Transform: { status: 'queued' } } },
    { id: 'transform-success', states: { Transform: { status: 'success' }, Quality: { status: 'queued' } } },
    { id: 'quality-failed', states: { Quality: { status: 'failed', attempt: 1 }, Publish: { status: 'upstream_failed' } } },
    { id: 'publish-blocked', states: {} },
    { id: 'quality-retry', states: { Quality: { status: 'retrying', attempt: 2 } } },
    { id: 'quality-success', states: { Quality: { status: 'success', attempt: 2 }, Publish: { status: 'queued' } } },
    { id: 'publish-running', states: { Publish: { status: 'running' } } },
    { id: 'publish-success', states: { Publish: { status: 'success' } } },
  ] }],
};
/** Lesson policy only: generic workflow core remains a local transition validator, not a scheduler. */
export function assertSuccessDependencies(spec:WorkflowSpec){
  for(const run of spec.runs??[]){
    let succeeded=new Set<string>();
    for(let i=0;i<run.frames.length;i++){
      const {states}=compileWorkflowRunFrame(spec,run.id,i);
      for(const edge of spec.edges){
        if(edge.condition!=='success')throw Error('Lesson supports success dependencies only');
        if(['queued','running','success'].includes(states[edge.to].status)&&states[edge.from].status!=='success')throw Error(`Premature execution: ${edge.to}`);
      }
      for(const id of succeeded)if(states[id].status!=='success')throw Error('Successful upstream state must persist');
      succeeded=new Set(Object.keys(states).filter(id=>states[id].status==='success'));
    }
  }
}
export function validateRetry(){
  assertSuccessDependencies(workflow);
  const retry=compileWorkflowRunFrame(workflow,'retry','quality-retry');
  if(retry.states.Publish.status!=='upstream_failed'||retry.states.Quality.attempt!==2)throw Error('Invalid retry consequence');
}
