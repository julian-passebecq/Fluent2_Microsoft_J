import { execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';
const repo = 'D:/PROJ/react_ms_fluent_2_framework';
const sha = '30e69639bfc3929c348fd8f9c6c38a2cb61984d8';
const prefix = 'project/conceptmotion_studio/';
const git = (...args) => execFileSync('git', ['-C', repo, ...args], { encoding: 'utf8', maxBuffer: 8e6 });
const core = ['algorithm','diagram','diagram-layout','entities','explanation','flow','icons','localization','serialization','table','transitions','validation','workflow'];
const svg = ['base-renderer','dom','freeze','theme','types','layout','registry','flow-style','explanation','renderers/shared','renderers/graph','renderers/loop','renderers/join','renderers/workflow'];
const entries = [
  ...core.map(n => [`packages/core/src/${n}.ts`, `src/figures/core/${n}.ts`, 'Retained semantic/compiler dependency', 'unchanged']),
  ...svg.map(n => [`packages/svg/src/${n}.ts`, `src/figures/renderers/${n}.ts`, 'Retained SVG family/lifecycle dependency', n === 'explanation' ? 'narrow scene resolution; remove unrelated viewport dispatch' : 'local core import only']),
  ['packages/react/src/renderer-host.tsx','src/figures/react/renderer-host.tsx','SVG mount/update/destroy ownership','local minimal registry import'],
  ['packages/react/src/use-reduced-motion.ts','src/figures/react/use-reduced-motion.ts','OS motion preference subscription','unchanged'],
  ['packages/figure/src/player.tsx','src/figures/react/FigurePlayer.tsx','Shared bounded index and timeout playback model','adapt: Fluent controls and render callback; omit inspector/export/DOM observers'],
  ['packages/core/tests/table-transitions.test.ts','tests/table-transitions.test.ts','Protect imported join/identity/transition semantics','local core import only'],
];
const write = (p, s) => { mkdirSync(dirname(p), { recursive: true }); writeFileSync(p,s); };
const rows = entries.map(([up,local,why,adapt]) => {
  const source = git('show', `${sha}:${prefix}${up}`);
  const dependencies = [...source.matchAll(/from\s+['"]([^'"]+)['"]/g)].map(m=>m[1]);
  return { up: prefix+up, local, why, adapt, source, dependencies, blob: git('rev-parse', `${sha}:${prefix}${up}`).trim() };
});
if (!process.argv.includes('--import')) {
 write('docs/BOOTSTRAP_IMPORT_PLAN.md', `# Milestone 1 import plan\n\nSource: julian-passebecq/react_ms_fluent_2_framework @ ${sha}. Inspected from immutable Git objects, never the upstream working tree.\n\nRetain three SVG families and their actual helper closure. The upstream SVG explanation helper imports collection, lineage and generic scene dispatch; narrow that helper before importing those unrelated families. Keep coherent core modules intact rather than extracting individual compiler functions. No upstream UI/content package is required: adapt player composition to installed Fluent controls and author three small deterministic fixtures against retained contracts. SQL fixture follows the join fixture structure in content/visuals/sql.ts; algorithm fixture follows LoopSceneSpec in content/visuals/algorithms.ts; no catalog copied.\n\n| Upstream path | Direct dependencies | Reason | Mode | Local destination | Source commit |\n| --- | --- | --- | --- | --- | --- |\n${rows.map(r=>`| ${r.up} | ${r.dependencies.join(', ')} | ${r.why} | ${r.adapt} | ${r.local} | ${sha} |`).join('\n')}\n\n## Verification\nFrozen pnpm install, strict typecheck, compile every content frame, retained table tests, negative semantic references, final results, keyed DOM identity, deterministic seeking, player lifecycle, production build, Chromium desktop and 390px keyboard/reduced-motion/axe/overflow smoke. No release until all pass.\n`);
} else {
 for (const r of rows) {
  if(r.local.endsWith('FigurePlayer.tsx')) continue;
  let source = r.source;
  if(r.local.includes('/renderers/')) source = source.replaceAll("'@conceptmotion/core'", r.local.includes('/renderers/renderers/') ? "'../../core'" : "'../core'");
  if(r.local.endsWith('renderer-host.tsx')) source = source.replace("'@conceptmotion/svg'", "'../renderers'");
  if(r.local.startsWith('tests/')) source = source.replace("'../src/index'", "'../src/figures/core'");
  if(r.local.endsWith('/renderers/explanation.ts')) {
   source = `import { resolveExplanationStep, resolveLocalizedText, type ResolvedExplanation, type WorkflowSpec } from '../core';\nimport { ensureChild, keyedChildren, setAttributes, setSvgTransform, setText, type SvgSurface } from './dom.js';\nexport function resolveSceneExplanation(spec: WorkflowSpec, frameIndex = 0): ResolvedExplanation | undefined {\n  return spec.explanation ? resolveExplanationStep(spec.explanation, frameIndex, { entityIds: spec.nodes.map(node => node.id), frameCount: spec.runs?.[0]?.frames.length ?? 1 }) : undefined;\n}\n\n` + source.slice(source.indexOf('export function explanationPanelHeight'), source.indexOf('/** Content-derived'));
  }
  write(r.local,source);
 }
 write('src/figures/core/index.ts',core.map(n=>`export * from './${n}';`).join('\n')+'\n');
 write('UPSTREAM_IMPORT_MANIFEST.md', `# Upstream import manifest\n\nRepository: julian-passebecq/react_ms_fluent_2_framework\nCommit: ${sha}\n\n| Local path | Upstream path | Source blob | Reason | Adaptations |\n| --- | --- | --- | --- | --- |\n${rows.map(r=>`| ${r.local} | ${r.up} | ${r.blob} | ${r.why} | ${r.adapt} |`).join('\n')}\n\nLocal files are product-owned extracted code, not a vendored checkout. The import script is audit tooling only; builds never execute it. No runtime or install dependency references upstream. New fixtures, registry/barrels, CSS and app composition are local. Content reference paths inspected, not copied: content/visuals/sql.ts, content/visuals/algorithms.ts (under project/conceptmotion_studio).\n\n## Adaptation protection\n- explanation.ts: panel rendering unchanged; workflow resolution only. Tests compile every workflow frame and render all three families.\n- FigurePlayer.tsx: preserves deterministic bounded seek, 1200ms playback, pause on reduced motion and cleanup on unmount; removes metadata/export/selection and broad Figure registry dependencies. Player and browser tests protect steps, reset, end, navigation and reduced motion.\n- renderer-host and SVG family imports: resolve local minimal registry/core; identity and lifecycle tests protect behavior.\n`);
}
