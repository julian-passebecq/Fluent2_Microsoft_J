export * from './types';
export * from './registry';
import { createRendererRegistry } from './registry';
import { registerJoinRenderers } from './renderers/join';
import { registerLoopRenderers } from './renderers/loop';
import { registerWorkflowRenderers } from './renderers/workflow';
export function createDefaultRendererRegistry() {
  const registry = createRendererRegistry();
  registerJoinRenderers(registry);
  registerLoopRenderers(registry);
  registerWorkflowRenderers(registry);
  return registry;
}
