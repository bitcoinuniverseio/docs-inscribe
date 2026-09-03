import { useMemo, useState } from 'react'
import { loadManifest, walkRecoveryTable, type RecoveryOutcome } from '@universe/inscribe-learning'

const manifest = loadManifest()
const table = manifest.recovery.table

function firstUnanswered(answers: Record<string, string>): string | null {
  let nodeId = table.entry
  for (let hop = 0; hop < 64; hop += 1) {
    const question = table.questions.find((q) => q.id === nodeId)
    if (!question) return null
    const given = answers[question.id]
    if (given == null) return question.id
    const option = question.options.find((o) => o.value === given)
    if (!option) return question.id
    nodeId = option.next
  }
  return null
}

export default function RecoveryNavigator() {
  const [answers, setAnswers] = useState<Record<string, string>>({})

  const currentQuestionId = useMemo(() => firstUnanswered(answers), [answers])
  const current = table.questions.find((q) => q.id === currentQuestionId) ?? null
  const outcomeId = currentQuestionId == null ? walkRecoveryTable(table, answers).outcomeId : null
  const outcome: RecoveryOutcome | null = outcomeId
    ? manifest.recovery.outcomes.find((o) => o.id === outcomeId) ?? null
    : null

  const set = (questionId: string, value: string) =>
    setAnswers((prev) => {
      // Changing an earlier answer clears everything after it.
      const next: Record<string, string> = {}
      let nodeId = table.entry
      for (let hop = 0; hop < 64; hop += 1) {
        const question = table.questions.find((q) => q.id === nodeId)
        if (!question) break
        const use = question.id === questionId ? value : prev[question.id]
        if (use == null) break
        next[question.id] = use
        const option = question.options.find((o) => o.value === use)
        if (!option) break
        nodeId = option.next
        if (question.id === questionId) break
      }
      return next
    })

  const breadcrumb = Object.keys(answers)
    .map((questionId) => table.questions.find((q) => q.id === questionId))
    .filter(Boolean)

  return (
    <div className="ins-lab" data-testid="recovery-navigator" aria-live="polite">
      {breadcrumb.length > 0 && (
        <ol aria-label="Answers so far" style={{ listStyle: 'none', display: 'flex', flexWrap: 'wrap', gap: '0.4rem', padding: 0, marginBottom: '1rem' }}>
          {breadcrumb.map((q) => (
            <li key={q!.id}>
              <button type="button" className="ins-btn" style={{ fontSize: '0.8rem', minHeight: '2.2rem' }}
                onClick={() => setAnswers((prev) => {
                  const next = { ...prev }
                  delete next[q!.id]
                  return next
                })}>
                {q!.question} change answer
              </button>
            </li>
          ))}
          <li>
            <button type="button" className="ins-btn" style={{ fontSize: '0.8rem', minHeight: '2.2rem' }}
              onClick={() => setAnswers({})}>Start over</button>
          </li>
        </ol>
      )}

      {current ? (
        <fieldset className="ins-wizard__fieldset">
          <legend className="ins-wizard__legend">{current.question}</legend>
          <div role="radiogroup" aria-label={current.question}>
            {current.options.map((option) => (
              <label key={option.value} className="ins-choice">
                <input
                  type="radio"
                  name={current.id}
                  value={option.value}
                  checked={answers[current.id] === option.value}
                  onChange={() => set(current.id, option.value)}
                  data-testid={`recovery-${current.id}-${option.value}`}
                />
                <span><strong>{option.label}</strong></span>
              </label>
            ))}
          </div>
        </fieldset>
      ) : outcome ? (
        <article className={`ins-card ${outcome.reversibility === 'irreversible' ? 'ins-card--danger' : ''}`} data-testid="recovery-outcome">
          <h2 className="ins-card__title">{outcome.title}</h2>
          <p>
            <span className={`ins-badge ${outcome.reversibility === 'irreversible' ? 'ins-badge--irreversible' : outcome.reversibility === 'recoverable' ? 'ins-badge--recoverable' : outcome.reversibility === 'wait' ? 'ins-badge--wait' : 'ins-badge--action'}`}>
              {outcome.reversibility === 'irreversible' ? 'Irreversible'
                : outcome.reversibility === 'recoverable' ? 'Recoverable'
                : outcome.reversibility === 'wait' ? 'Waiting is part of the fix'
                : outcome.reversibility === 'action_required' ? 'Action required' : 'State unknown'}
            </span>
            {outcome.doNotPayAgain && (
              <span className="ins-badge ins-badge--irreversible" style={{ marginLeft: '0.5rem' }}>Do not pay again</span>
            )}
          </p>
          <p><strong>Diagnosis:</strong> {outcome.diagnosis}</p>
          <p><strong>Next action:</strong> {outcome.nextAction}</p>

          {outcome.stopConditions.length > 0 && (
            <>
              <h3>Stop conditions</h3>
              <ul>{outcome.stopConditions.map((s, i) => <li key={i}>{s}</li>)}</ul>
            </>
          )}
          <h3>Evidence to gather</h3>
          <ul>{outcome.evidence.map((s, i) => <li key={i}>{s}</li>)}</ul>
          <h3>What not to do</h3>
          <ul>{outcome.whatNotToDo.map((s, i) => <li key={i}>{s}</li>)}</ul>
          <p>
            What live status can establish is source health and order state, never a promise about confirmations.
            {outcome.guideId && <> Full detail: <a href="/docs-inscribe/safety/order-recovery/">the recovery guide</a>.</>}
            {' '}
            <a href="/docs-inscribe/practice/?scenario=ps-closed-tab-recovery">Practice recovery safely</a>.
          </p>
          <p className="ins-provenance">
            <span><strong>Source:</strong> the recovery decision table owned by this documentation</span>
            <span><strong>Sources:</strong> {outcome.sources.map((s) => `${s.repository}@${s.commit.slice(0, 12)}`).join(', ')}</span>
          </p>
        </article>
      ) : (
        <p>Answer the first question to begin.</p>
      )}
    </div>
  )
}
