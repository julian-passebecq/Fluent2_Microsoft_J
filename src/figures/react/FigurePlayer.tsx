import { Button } from '@fluentui/react-components';
import { useEffect, useState, type ReactNode } from 'react';
import { useReducedMotion } from './use-reduced-motion';

/** Adapted from the audited FigurePlayer: one absolute index, one cancellable timer. */
export function FigurePlayer({ captions, children }: {
  captions: readonly string[];
  children: (frame: number, reducedMotion: boolean) => ReactNode;
}) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const reducedMotion = useReducedMotion();
  const last = captions.length - 1;
  const seek = (next: number) => { setPlaying(false); setIndex(Math.max(0, Math.min(last, next))); };
  useEffect(() => { if (reducedMotion) setPlaying(false); }, [reducedMotion]);
  useEffect(() => {
    if (!playing || reducedMotion) return;
    if (index >= last) { setPlaying(false); return; }
    const timer = setTimeout(() => setIndex(current => Math.min(last, current + 1)), 1200);
    return () => clearTimeout(timer);
  }, [playing, reducedMotion, index, last]);
  return <div className="figure-player" data-frame-index={index} data-reduced-motion={reducedMotion}>
    <div className="controls" aria-label="Visual playback">
      <Button appearance="primary" disabled={reducedMotion} onClick={() => {
        if (index === last) setIndex(0);
        setPlaying(value => !value);
      }}>{playing ? 'Pause' : 'Play'}</Button>
      <Button disabled={index === 0} onClick={() => seek(index - 1)}>Previous</Button>
      <Button disabled={index === last} onClick={() => seek(index + 1)}>Step</Button>
      <Button onClick={() => seek(0)}>Reset</Button>
      <span className="step-count">Step {index + 1} of {captions.length}</span>
    </div>
    <p className="caption" aria-live="polite" aria-atomic="true">{captions[index]}</p>
    {reducedMotion && <p className="motion-note">Reduced motion is on. Use Step to explore each static state.</p>}
    {children(index, reducedMotion)}
  </div>;
}
