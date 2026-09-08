import { resolveExplanationStep, resolveLocalizedText, type ResolvedExplanation, type WorkflowSpec } from '../core';
import { ensureChild, keyedChildren, setAttributes, setSvgTransform, setText, type SvgSurface } from './dom.js';
export function resolveSceneExplanation(spec: WorkflowSpec, frameIndex = 0): ResolvedExplanation | undefined {
  return spec.explanation ? resolveExplanationStep(spec.explanation, frameIndex, { entityIds: spec.nodes.map(node => node.id), frameCount: spec.runs?.[0]?.frames.length ?? 1 }) : undefined;
}

export function explanationPanelHeight(explanation: ResolvedExplanation | undefined): number {
  return explanation ? 48 + Math.max(explanation.codeLines.length * 24, Math.ceil((explanation.step.state?.length ?? 0) / 2) * 48) : 0;
}

/** One cue grammar reused by existing renderers; this is not a renderer family. */
export function renderExplanationPanel(surface: SvgSurface, explanation: ResolvedExplanation | undefined, top: number, locale: 'en' | 'no' = 'en'): void {
  const old = surface.root.querySelector('g[data-role="explanation"]');
  if (!explanation) { old?.remove(); return; }
  const { codeLines, step } = explanation;
  const layer = ensureChild(surface.root, 'g[data-role="explanation"]', 'g', { 'data-role': 'explanation', 'data-explanation-step': step.id });
  setSvgTransform(layer, 20, top, true, 0);
  const width = surface.viewport.width - 40;
  const codeWidth = width * .56;
  const stateLeft = codeWidth + 24;
  const stateWidth = (width - stateLeft - 12) / 2;
  const focusedCode = new Set(step.focus.codeRefs ?? []);
  const focusedState = new Set(step.focus.stateKeys ?? []);
  const heading = ensureChild(layer, 'text[data-role="cue-title"]', 'text', { 'data-role': 'cue-title', x: 0, y: 14, fill: surface.theme.ink, 'font-size': 12, 'font-weight': 700 });
  setText(heading, resolveLocalizedText(step.title, locale));
  keyedChildren(layer, 'g[data-role="explanation-code"]', 'g', codeLines, line => line.id, (group, line, index) => {
    const focused = focusedCode.has(line.id);
    setAttributes(group, { 'data-role': 'explanation-code', 'data-code-ref': line.id, 'data-focused': String(focused), role: 'group', 'aria-label': `${focused ? 'Current operation: ' : ''}${line.text}` });
    setSvgTransform(group, 0, 28 + index * 24, true, 0);
    ensureChild(group, 'rect', 'rect', { width: codeWidth, height: 22, rx: 3, fill: focused ? surface.theme.accentSubtle : surface.theme.surfaceRaised, stroke: focused ? surface.theme.accent : 'none' });
    const label = ensureChild(group, 'text', 'text', { x: 8, y: 15, fill: surface.theme.ink, 'font-family': surface.theme.monoFontFamily, 'font-size': 11, 'font-weight': focused ? 700 : 400 });
    setText(label, `${focused ? '›' : ' '} ${line.text}`);
  });
  keyedChildren(layer, 'g[data-role="explanation-state"]', 'g', step.state ?? [], state => state.key, (group, state, index) => {
    const focused = focusedState.has(state.key);
    const label = resolveLocalizedText(state.label, locale);
    setAttributes(group, { 'data-role': 'explanation-state', 'data-state-key': state.key, 'data-focused': String(focused), role: 'group', 'aria-label': `${label}: ${String(state.value)}` });
    setSvgTransform(group, stateLeft + (index % 2) * (stateWidth + 12), 28 + Math.floor(index / 2) * 48, true, 0);
    ensureChild(group, 'rect', 'rect', { width: stateWidth, height: 41, rx: 4, fill: focused ? surface.theme.accentSubtle : surface.theme.surfaceRaised, stroke: focused ? surface.theme.accent : surface.theme.border });
    const name = ensureChild(group, 'text[data-role="name"]', 'text', { 'data-role': 'name', x: 9, y: 13, fill: surface.theme.mutedInk, 'font-size': 9 });
    setText(name, label);
    const value = ensureChild(group, 'text[data-role="value"]', 'text', { 'data-role': 'value', x: 9, y: 31, fill: surface.theme.ink, 'font-size': 12, 'font-family': surface.theme.monoFontFamily, 'font-weight': 650 });
    setText(value, String(state.value));
  });
}

