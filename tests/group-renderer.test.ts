import {expect,it} from 'vitest';
import { GroupRenderer } from '../src/figures/renderers/renderers/group';
import { groupingFrames } from '../src/figures/content/grouping';
it('R01: preserves source/group nodes across all frames and variants; deterministic freeze/destroy',()=>{
  const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');const renderer=new GroupRenderer();const base=groupingFrames('baseline');
  renderer.mount(svg,base[1],{width:960,height:440,reducedMotion:true});
  const sources=[...svg.querySelectorAll('[data-role="group-source"]')],groups=[...svg.querySelectorAll('[data-role="aggregate-group"]')];
  for(const variant of ['baseline','null-amounts'] as const)for(const frame of groupingFrames(variant).slice(1)){
    renderer.update(frame);[...svg.querySelectorAll('[data-role="group-source"]')].forEach((node,i)=>expect(node).toBe(sources[i]));[...svg.querySelectorAll('[data-role="aggregate-group"]')].forEach((node,i)=>expect(node).toBe(groups[i]));
    expect(svg.querySelectorAll('[data-role="member-link"]')).toHaveLength(frame.assignedRowIds.length);
    const frozen=renderer.freeze();renderer.update(frame);expect(renderer.freeze()).toBe(frozen);
  }
  renderer.destroy();expect(svg.children).toHaveLength(0);
});
