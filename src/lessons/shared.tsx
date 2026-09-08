import type { TableData } from '../figures/core';
import type { ReactNode } from 'react';
export function DataTable({ data, active = [] }: { data: TableData; active?: readonly string[] }) {
  return <table><caption>{data.id} <span>· {data.rows.length} rows</span></caption>
    <thead><tr>{data.columns.map(c => <th scope="col" key={c.id}>{String(c.label ?? c.id)}</th>)}</tr></thead>
    <tbody>{data.rows.map(row => <tr key={row.id} data-active={active.includes(row.id)}>{data.columns.map(c => <td key={c.id}>{row.values[c.id] === null ? <strong>NULL</strong> : String(row.values[c.id])}</td>)}</tr>)}</tbody>
  </table>;
}

export function Canvas({children}:{children:ReactNode}) { return <><p className="pan-hint">Scroll the diagram sideways on smaller screens. Keyboard: focus it and use the arrow keys.</p><div className="canvas-scroll" role="region" aria-label="Scrollable concept diagram" tabIndex={0}><div className="canvas">{children}</div></div></>; }
