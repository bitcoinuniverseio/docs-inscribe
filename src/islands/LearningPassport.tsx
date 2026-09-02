import { useEffect, useState } from 'react'
import {
  parseProgressV2,
  exportPassport,
  importPassport,
  mergeProgress,
  type ProgressV2,
  type Passport,
} from '@universe/inscribe-learning'

const KEY = 'inscribe-docs-progress-v2'

function readProgress(): ProgressV2 {
  try {
    return parseProgressV2(JSON.parse(localStorage.getItem(KEY) ?? '{"version":2,"guides":{}}'))
  } catch {
    return { version: 2, guides: {} }
  }
}

export default function LearningPassport() {
  const [progress, setProgress] = useState<ProgressV2 | null>(null)
  const [passportText, setPassportText] = useState('')
  const [preview, setPreview] = useState<Passport | null>(null)
  const [message, setMessage] = useState('')

  useEffect(() => {
    setProgress(readProgress())
  }, [])

  const doExport = () => {
    const current = readProgress()
    setPassportText(exportPassport(current))
    setMessage('Copy the text below and keep it anywhere you like. It contains only guide ids, step ids, and timestamps.')
  }

  const doPreview = () => {
    try {
      setPreview(importPassport(passportText))
      setMessage('Preview below. Import merges: nothing is overwritten blindly.')
    } catch (error) {
      setPreview(null)
      setMessage(error instanceof Error ? error.message : 'Import failed.')
    }
  }

  const doImport = () => {
    if (!preview) return
    const merged = mergeProgress(readProgress(), preview.progress)
    localStorage.setItem(KEY, JSON.stringify(merged))
    setProgress(merged)
    setPreview(null)
    setPassportText('')
    setMessage('Imported and merged.')
  }

  const doDelete = () => {
    localStorage.removeItem(KEY)
    localStorage.removeItem('inscribe-docs-progress-v1')
    setProgress({ version: 2, guides: {} })
    setMessage('All local learning progress deleted.')
  }

  const stepCount = progress ? Object.values(progress.guides).reduce((sum, g) => sum + g.steps.length, 0) : 0
  const doneCount = progress ? Object.values(progress.guides).filter((g) => g.done).length : 0

  return (
    <div className="ins-lab" data-testid="learning-passport">
      <p>
        <strong>This device holds:</strong> {stepCount} completed step{stepCount === 1 ? '' : 's'} across{' '}
        {progress ? Object.keys(progress.guides).length : 0} guide{doneCount === 1 ? '' : 's'} ({doneCount} finished).
        No wallet data, addresses, orders, or identifiers are ever included.
      </p>

      <p>
        <button type="button" className="ins-btn ins-btn--primary" onClick={doExport} data-testid="passport-export">
          Export my Learning Passport
        </button>
        {' '}
        <button type="button" className="ins-btn" onClick={doDelete} data-testid="passport-delete">
          Delete all progress on this device
        </button>
      </p>

      {message && <p role="status">{message}</p>}

      {passportText && (
        <>
          <label htmlFor="passport-text" style={{ display: 'block', fontWeight: 600, marginTop: '0.6rem' }}>
            Your passport (copy it somewhere safe)
          </label>
          <textarea id="passport-text" readOnly rows={3} value={passportText}
            style={{ width: '100%', fontFamily: 'var(--ins-font-mono)', fontSize: '0.8rem' }} />
        </>
      )}

      <label htmlFor="passport-import" style={{ display: 'block', fontWeight: 600, marginTop: '0.9rem' }}>
        Import a passport (from another device, or from the in-app Docs)
      </label>
      <textarea
        id="passport-import"
        rows={3}
        value={passportText}
        onChange={(e) => { setPassportText(e.target.value); setPreview(null) }}
        placeholder="Paste a UBP2 passport here"
        style={{ width: '100%', fontFamily: 'var(--ins-font-mono)', fontSize: '0.8rem' }}
      />
      <p style={{ marginTop: '0.5rem' }}>
        <button type="button" className="ins-btn" onClick={doPreview} data-testid="passport-preview">Preview import</button>
      </p>

      {preview && (
        <div className="ins-card ins-card--muted" data-testid="passport-preview-panel">
          <h3>Preview before import</h3>
          <p>Exported {preview.exportedAt.slice(0, 10)}: {Object.keys(preview.progress.guides).length} guides,{' '}
            {Object.values(preview.progress.guides).reduce((sum, g) => sum + g.steps.length, 0)} steps.</p>
          <button type="button" className="ins-btn ins-btn--primary" onClick={doImport} data-testid="passport-import">Merge this passport</button>
        </div>
      )}
    </div>
  )
}
