export * from './types';
export * from './registry';
import { createRendererRegistry } from './registry';
import { registerJoinRenderers } from './renderers/join';
import { registerLoopRenderers } from './renderers/loop';
import { registerWorkflowRenderers } from './renderers/workflow';
import { groupRendererRegistration } from './renderers/group';
export function createDefaultRendererRegistry() {
  const registry = createRendererRegistry();
  registerJoinRenderers(registry);
  registerLoopRenderers(registry);
  registerWorkflowRenderers(registry);
  registry.register(groupRendererRegistration);
  return registry;
}
