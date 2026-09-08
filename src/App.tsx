import { Button, Card, FluentProvider, webLightTheme } from '@fluentui/react-components';
import './styles.css';

const sections = [
  ['Tables, SQL & BI', 'Joins, grain, grouping, windows, ranking, modeling and lineage.'],
  ['Algorithms & computation', 'State changes, traversal, search, sorting and transformation mental models.'],
  ['Distributed data & cloud', 'Partitions, shuffle, execution boundaries and modern data-platform principles.'],
  ['Pipelines, DAGs & reliability', 'Retries, idempotency, branching, fan-out/fan-in, quality gates and backfills.'],
] as const;

export function App() {
  return (
    <FluentProvider theme={webLightTheme}>
      <main className="page" id="main-content">
        <header className="hero">
          <p className="eyebrow">DATAPASS · CLEAN RESTART</p>
          <h1>Visual IT Concepts</h1>
          <p className="lede">
            A focused React + Fluent product for clear static and animated explanations of SQL, BI,
            data engineering and cloud/data-platform concepts.
          </p>
          <div className="heroActions">
            <Button appearance="primary" as="a" href="https://github.com/julian-passebecq/react_ms_fluent_2_framework/tree/30e69639bfc3929c348fd8f9c6c38a2cb61984d8/project/conceptmotion_studio" target="_blank">
              Inspect audited upstream
            </Button>
          </div>
        </header>

        <section aria-labelledby="scope-title">
          <div className="sectionHeading">
            <p className="eyebrow">PRODUCT BOUNDARY</p>
            <h2 id="scope-title">One visual learning product</h2>
          </div>
          <div className="grid">
            {sections.map(([title, description]) => (
              <Card key={title} className="scopeCard">
                <h3>{title}</h3>
                <p>{description}</p>
              </Card>
            ))}
          </div>
        </section>

        <section className="bootstrap" aria-labelledby="bootstrap-title">
          <p className="eyebrow">BOOTSTRAP STATUS</p>
          <h2 id="bootstrap-title">Shell ready; semantic import intentionally pending</h2>
          <p>
            Codex should first map the upstream dependency closure and then import only the proven
            semantic core, SVG renderers, thin React/Figure layer, required Fluent pieces and focused
            teaching content. This repository must not become another copy of the historical monorepo.
          </p>
        </section>
      </main>
    </FluentProvider>
  );
}
