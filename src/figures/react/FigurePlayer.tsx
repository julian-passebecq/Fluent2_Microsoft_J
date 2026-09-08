import { Button } from '@fluentui/react-components';
import { useEffect, useState, type ReactNode } from 'react';
import { useReducedMotion } from './use-reduced-motion';

/** Adapted from the audited FigurePlayer: one absolute index, one cancellable timer. */
export function FigurePlayer({ captions, children, playbackKey, stepIds, alignmentKey }: {
  captions: readonly string[];
  playbackKey?: string;
  stepIds?: readonly string[];
  alignmentKey?: string;
  children: (frame: number, reducedMotion: boolean) => ReactNode;
}) {
  const ids = stepIds ?? captions.map((_, i) => String(i));
  const signature = JSON.stringify([playbackKey, alignmentKey, ids, captions]);
  const [state, setState] = useState({ signature, ids, alignmentKey, index: 0, playing: false });
  const last = Math.min(ids.length, captions.length) - 1;
  let current = state;
  if (state.signature !== signature) {
    const aligned = state.alignmentKey === alignmentKey;
    const found = aligned ? ids.indexOf(state.ids[state.index]) : 0;
    current = { signature, ids, alignmentKey, index: Math.max(0, Math.min(last, found < 0 ? 0 : found)), playing: false };
    setState(current);
  }
  const index = Math.max(0, Math.min(Math.max(0,last), current.index));
  const playing = current.playing;
  const reducedMotion = useReducedMotion();
  const setPlaying = (value: boolean | ((old:boolean)=>boolean)) => setState(s => ({...s, playing: typeof value === 'function' ? value(s.playing) : value}));
  const setIndex = (value:number) => setState(s => ({...s, index:value}));
  const seek = (next:number) => setState(s => ({...s, playing:false, index:Math.max(0,Math.min(Math.max(0,last),next))}));
  useEffect(() => { if (reducedMotion) setPlaying(false); }, [reducedMotion]);
  useEffect(() => {
    if (!playing || reducedMotion || last < 0) return;
    if (index >= last) { setPlaying(false); return; }
    const timer = setTimeout(() => setIndex(index + 1), 1200);
    return () => clearTimeout(timer);
  }, [playing, reducedMotion, index, last, signature]);
  return <div className="figure-player" data-frame-index={index} data-reduced-motion={reducedMotion}>
    <div className="controls" aria-label="Visual playback">
      <Button appearance="primary" disabled={reducedMotion || last < 0} onClick={() => {
        if (index === last) setIndex(0);
        setPlaying(value => !value);
      }}>{playing ? 'Pause' : 'Play'}</Button>
      <Button disabled={last < 0 || index === 0} onClick={() => seek(index - 1)}>Previous</Button>
      <Button disabled={last < 0 || index === last} onClick={() => seek(index + 1)}>Step</Button>
      <Button disabled={last < 0} onClick={() => seek(0)}>Reset</Button>
      <span className="step-count">Step {last < 0 ? 0 : index + 1} of {captions.length}</span>
    </div>
    <p className="caption" aria-live="polite" aria-atomic="true">{last < 0 ? 'No steps available. Choose another lesson or variant.' : captions[index]}</p>
    {reducedMotion && <p className="motion-note">Reduced motion is on. Use Step to explore each static state.</p>}
    {last >= 0 && children(index, reducedMotion)}
  </div>;
}
