import { useState } from 'react';
import { Button, FluentProvider, webLightTheme } from '@fluentui/react-components';
import { lessonMetadata } from './figures/content/metadata';
import { lessonComponents } from './lessons';
import './styles.css';
export function App() {
  const [selected,setSelected]=useState<typeof lessonMetadata[number]['id']>('join');
  const concept=lessonMetadata.find(lesson=>lesson.id===selected)!;
  const Lesson=lessonComponents[selected];
  return <FluentProvider theme={webLightTheme}><a className="skip-link" href="#lesson">Skip to concept</a><main className="page">
    <header className="hero"><p className="eyebrow">DATAPASS / VISUAL IT CONCEPTS</p><h1>See the logic.</h1><p className="lede">Small examples. Visible state. Understand what changes—and why.</p></header>
    <nav className="concept-nav" aria-label="Choose a concept">{lessonMetadata.map(item=><Button key={item.id} appearance={selected===item.id?'primary':'secondary'} aria-pressed={selected===item.id} onClick={()=>setSelected(item.id)}>{item.title}</Button>)}</nav>
    <article id="lesson" tabIndex={-1} aria-labelledby="lesson-title"><div className="lesson-heading"><p className="eyebrow">{concept.domain}</p><h2 id="lesson-title">{concept.title}</h2><p className="question">{concept.question}</p><p>{concept.description}</p></div><Lesson key={selected}/><aside className="takeaway"><h3>What to remember</h3><p>{concept.takeaway}</p></aside></article>
    <footer>Explore at your pace. Every step works as a still picture.</footer>
  </main></FluentProvider>;
}
