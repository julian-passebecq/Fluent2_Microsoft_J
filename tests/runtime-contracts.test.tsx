import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';
import { FigurePlayer } from '../src/figures/react/FigurePlayer';
import { RendererHost } from '../src/figures/react/renderer-host';
import { createRendererRegistry } from '../src/figures/renderers/registry';
afterEach(()=>vi.useRealTimers());
it('never invokes an empty or shrinking trace out of bounds; aligned IDs survive reordering',()=>{
  vi.useFakeTimers();const child=vi.fn((i:number)=><output>{i}</output>);
  const view=(ids:string[],alignment='a')=><FigurePlayer captions={ids} stepIds={ids} alignmentKey={alignment} playbackKey={ids.join()}>{child}</FigurePlayer>;
  const {rerender}=render(view(['first','second','third']));
  fireEvent.click(screen.getByRole('button',{name:'Step'}));fireEvent.click(screen.getByRole('button',{name:'Play'}));
  rerender(view(['second','first','third']));expect(screen.getByRole('status')).toHaveTextContent('0');
  act(()=>vi.advanceTimersByTime(2600));expect(screen.getByRole('status')).toHaveTextContent('0');
  rerender(view(['only']));expect(screen.getByRole('status')).toHaveTextContent('0');
  child.mockClear();rerender(view([]));expect(child).not.toHaveBeenCalled();expect(screen.getByRole('button',{name:'Play'})).toBeDisabled();
  rerender(view(['first','second']));fireEvent.click(screen.getByRole('button',{name:'Step'}));rerender(view(['first','second'],'unaligned'));expect(screen.getByRole('status')).toHaveTextContent('0');
});
it('makes renderer failures explicit, recovers updates and remounts, and destroys owners',()=>{
  const registry=createRendererRegistry();let failMount=true;const destroy=vi.fn();
  registry.register<{bad?:boolean}>({id:'test',family:'test',create:()=>({mount(){if(failMount)throw Error('mount failed');},update(input){if(input.bad)throw Error('update failed');},destroy,freeze:()=>''})});
  const view=(key:string,bad=false)=><RendererHost key={key} rendererId="test" registry={registry} input={{bad}} fallback="Six orders remain available."/>;
  const {rerender,unmount}=render(view('a'));expect(screen.getByRole('alert')).toHaveTextContent('Visualization unavailable.');expect(screen.getByRole('alert')).toHaveTextContent('Six orders');
  failMount=false;rerender(view('b'));expect(screen.queryByRole('alert')).toBeNull();
  rerender(view('b',true));expect(screen.getByRole('alert')).toHaveTextContent('update failed');
  rerender(view('b'));expect(screen.queryByRole('alert')).toBeNull();unmount();expect(destroy).toHaveBeenCalledTimes(2);
});
