import { useMemo, useState } from 'react'
import {
  loadManifest,
  selectProtocols,
  comparisonRows,
  COMPARISON_DIMENSIONS,
  readinessOf,
  type ProtocolFilters,
} from '@universe/inscribe-learning'

const manifest = loadManifest()

const OPERATIONS = ['', 'inscribe', 'deploy', 'mint', 'etch', 'transfer']
const READINESS = ['', 'ready', 'gated', 'read_only', 'incomplete']
const CATEGORIES = ['', 'text', 'image', 'audio', 'video', 'json']

const READINESS_LABEL: Record<string, string> = {
  ready: 'Released',
  gated: 'Deployment controlled',
  read_only: 'Read only',
  incomplete: 'Not complete',
  unknown: 'State unknown',
}

export default function ProtocolLab() {
  const [operation, setOperation] = useState('')
  const [readiness, setReadiness] = useState('')
  const [category, setCategory] = useState('')
  const [batchOnly, setBatchOnly] = useState(false)
  const [collectionOnly, setCollectionOnly] = useState(false)
  const [selected, setSelected] = useState<string[]>([])

  const filters: ProtocolFilters = useMemo(
    () => ({
      ...(operation ? { operations: [operation] } : {}),
      ...(readiness ? { readiness: [readiness as never] } : {}),
      ...(batchOnly ? { batch: true } : {}),
      ...(collectionOnly ? { collection: true } : {}),
    }),
    [operation, readiness, batchOnly, collectionOnly],
  )

  const result = useMemo(() => selectProtocols(manifest, filters), [filters])
  const rows = useMemo(
    () => (selected.length >= 2 ? comparisonRows(manifest, selected) : []),
    [selected],
  )

  const shareUrl = useMemo(() => {
    if (typeof window === 'undefined') return '/labs/protocols/'
    const params = new URLSearchParams()
    if (operation) params.set('operation', operation)
    if (readiness) params.set('state', readiness)
    if (selected.length >= 2) params.set('compare', selected.join(','))
    const query = params.toString()
    return query ? `${window.location.pathname}?${query}` : window.location.pathname
  }, [operation, readiness, selected])

  const toggle = (id: string) => {
    setSelected((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id)
      if (prev.length >= 4) return [...prev.slice(1), id]
      return [...prev, id]
    })
  }

  return (
    <div className="ins-lab" data-testid="protocol-lab">
      <div className="ins-lab__filters">
        <label>
          Operation
          <select value={operation} onChange={(e) => setOperation(e.target.value)} data-testid="filter-operation">
            {OPERATIONS.map((op) => <option key={op} value={op}>{op === '' ? 'Any' : op}</option>)}
          </select>
        </label>
        <label>
          Release state
          <select value={readiness} onChange={(e) => setReadiness(e.target.value)} data-testid="filter-state">
            {READINESS.map((r) => <option key={r} value={r}>{r === '' ? 'Any' : READINESS_LABEL[r]}</option>)}
          </select>
        </label>
        <label>
          Content
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c === '' ? 'Any' : c}</option>)}
          </select>
        </label>
        <label style={{ flexDirection: 'row', alignItems: 'center', gap: '0.4rem', fontWeight: 600 }}>
          <input type="checkbox" checked={batchOnly} onChange={(e) => setBatchOnly(e.target.checked)} />
          Batch support
        </label>
        <label style={{ flexDirection: 'row', alignItems: 'center', gap: '0.4rem', fontWeight: 600 }}>
          <input type="checkbox" checked={collectionOnly} onChange={(e) => setCollectionOnly(e.target.checked)} />
          Collections
        </label>
        <a className="ins-btn" href={shareUrl}>Share this view</a>
        <a className="ins-btn" href={`/docs-inscribe/guided/?protocol=${selected[0] ?? 'help_me_choose'}`}>Open the planner</a>
      </div>

      <h3>Matching protocols ({result.matches.length})</h3>
      <ul data-testid="protocol-matches" className="ins-choice-list">
        {result.matches.map(({ protocol, matched }) => (
          <li key={protocol.id} style={{ marginBottom: '0.5rem' }}>
            <label className="ins-choice">
              <input type="checkbox" checked={selected.includes(protocol.id)} onChange={() => toggle(protocol.id)}
                aria-label={`Compare ${protocol.label}`} />
              <span>
                <strong>{protocol.label}</strong> ({protocol.id}) · /{protocol.workspace} · {protocol.operations.join(', ') || 'view only'}
                <br />
                <span className={`ins-badge ${readinessOf(protocol.state) === 'ready' ? 'ins-badge--released' : readinessOf(protocol.state) === 'gated' ? 'ins-badge--gated' : 'ins-badge--readonly'}`}>
                  {READINESS_LABEL[readinessOf(protocol.state)]}
                </span>
                <span style={{ color: 'var(--ins-ink-3)', fontSize: '0.9rem' }}> {matched.join(' ')}</span>
              </span>
            </label>
          </li>
        ))}
        {result.matches.length === 0 && <li>No protocol matches every filter. Loosen a filter to see partial matches.</li>}
      </ul>

      {result.partial.length > 0 && (
        <>
          <h3>Partial matches</h3>
          <ul>
            {result.partial.map(({ protocol, unmet }) => (
              <li key={protocol.id}>
                <strong>{protocol.label}</strong> ({protocol.id}): {unmet.join(' ')}
              </li>
            ))}
          </ul>
        </>
      )}

      {result.excluded.length > 0 && (
        <details>
          <summary>Excluded ({result.excluded.length}) with reasons</summary>
          <ul>
            {result.excluded.map(({ protocol, reason }) => (
              <li key={protocol.id}><strong>{protocol.label}</strong>: {reason}</li>
            ))}
          </ul>
        </details>
      )}

      <h3>Comparison ({selected.length}/4 selected)</h3>
      {rows.length >= 2 ? (
        <div className="table-scroll" data-testid="protocol-comparison">
          <table className="ins-tx">
            <caption>Source-backed comparison. A cell the sources do not establish reads "Not established"; nothing is invented.</caption>
            <thead>
              <tr>
                <th scope="col">Dimension</th>
                {rows.map(({ protocol }) => <th scope="col" key={protocol.id}>{protocol.label}</th>)}
              </tr>
            </thead>
            <tbody>
              {COMPARISON_DIMENSIONS.map((dimension, di) => (
                <tr key={dimension}>
                  <th scope="row">{dimension}</th>
                  {rows.map(({ cells }) => (
                    <td key={protocol_key(cells, di)}>{cells[di].value ?? 'Not established by an authoritative source'}</td>
                  ))}
                </tr>
              ))}
              <tr>
                <th scope="row">Sources</th>
                {rows.map(({ protocol }) => (
                  <td key={protocol.id}>
                    {protocol.sources.map((s) => `${s.repository}@${s.commit.slice(0, 12)}`).join(', ')}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <p>Select two to four protocols above to compare them here. Every dimension comes from the learning manifest; nothing is estimated to fill a cell.</p>
      )}
    </div>
  )
}

function protocol_key(cells: Array<{ dimension: string; value: string | null }>, di: number): string {
  return cells[di]?.dimension ?? String(di)
}
