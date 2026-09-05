import { useEffect, useMemo, useState } from 'react'
import {
  loadManifest,
  planGoal,
  buildInscribeLink,
  PlannerInput,
  type PlannerResult,
  type Manifest,
  type Workflow,
  type PlanCandidate,
} from '@universe/inscribe-learning'

const manifest: Manifest = loadManifest()

const GOALS = [
  { value: 'inscribe_text', label: 'Inscribe text', hint: 'A message, a name, a note' },
  { value: 'inscribe_file', label: 'Inscribe a file', hint: 'Image, audio, video, model, or data' },
  { value: 'batch', label: 'Create a batch', hint: 'Many items in one run' },
  { value: 'collection', label: 'Create or manage a collection', hint: 'Parent, delegate, gallery' },
  { value: 'deploy_token', label: 'Deploy a token', hint: 'BRC-20, SRC-20, ARC-20, TAP, and more' },
  { value: 'mint_token', label: 'Mint an existing token', hint: 'Fixed or open mints' },
  { value: 'etch_rune', label: 'Etch a Rune', hint: 'Declare a new rune' },
  { value: 'transfer_asset', label: 'Transfer an asset', hint: 'Move something you hold' },
  { value: 'recover_order', label: 'Recover or repair an order', hint: 'Something stopped moving' },
  { value: 'learn_free', label: 'Learn without spending', hint: 'Practice in the simulation studio' },
] as const

const PROTOCOLS = [
  { value: 'help_me_choose', label: 'Help me choose' },
  ...manifest.protocols.filter((p) => p.operations.length > 0).map((p) => ({ value: p.id, label: p.label })),
]

const PRIORITIES = [
  { value: 'simplest', label: 'Simplest workflow' },
  { value: 'cheapest', label: 'Lowest estimated cost' },
  { value: 'control', label: 'Most control' },
  { value: 'batch_efficiency', label: 'Batch efficiency' },
  { value: 'urgency', label: 'Confirmation urgency' },
] as const

const WALLETS = [
  { value: 'unknown', label: 'Not sure yet' },
  { value: 'universe', label: 'Universe Wallet' },
  { value: 'unisat', label: 'UniSat' },
  { value: 'okx', label: 'OKX Wallet' },
  { value: 'xverse', label: 'Xverse' },
  { value: 'wizz', label: 'Wizz' },
  { value: 'manual', label: 'I prefer to pay manually' },
] as const

const CATEGORIES = [
  { value: 'text', label: 'Text' },
  { value: 'image', label: 'Image' },
  { value: 'audio', label: 'Audio' },
  { value: 'video', label: 'Video' },
  { value: 'model', label: '3D model' },
  { value: 'json', label: 'JSON data' },
  { value: 'other', label: 'Other binary' },
] as const

interface Answers {
  goal?: string
  protocol?: string
  contentCategory?: string
  byteSize?: number
  itemCount?: number
  needsParent?: boolean
  needsDelegate?: boolean
  needsGallery?: boolean
  wallet?: string
  receivingReady?: boolean
  experience?: string
  priority?: string
  practiceFirst?: boolean
}

const STORAGE_KEY = 'inscribe-planner-v1'

function readInitialAnswers(): Answers {
  if (typeof window === 'undefined') return {}
  const params = new URLSearchParams(window.location.search)
  const fromUrl: Answers = {}
  const goal = params.get('goal')
  if (goal && GOALS.some((g) => g.value === goal)) fromUrl.goal = goal
  const protocol = params.get('protocol')
  if (protocol && PROTOCOLS.some((p) => p.value === protocol)) fromUrl.protocol = protocol
  const priority = params.get('priority')
  if (priority && PRIORITIES.some((p) => p.value === priority)) fromUrl.priority = priority
  const stored = sessionStorage.getItem(STORAGE_KEY)
  if (stored) {
    try {
      return { ...JSON.parse(stored), ...fromUrl }
    } catch {
      /* stored state is an optimization, never a source of truth */
    }
  }
  return fromUrl
}

/** Step order with progressive skipping: a step renders only when relevant. */
function relevantSteps(a: Answers): string[] {
  const steps: string[] = ['goal']
  if (a.goal && a.goal !== 'learn_free') steps.push('protocol')
  if (a.goal === 'inscribe_text') steps.push('category')
  if (a.goal === 'inscribe_file') steps.push('category', 'size')
  if (a.goal === 'batch') steps.push('count')
  if (a.goal === 'mint_token') steps.push('count')
  if (a.goal === 'collection') steps.push('collection')
  if (a.goal === 'inscribe_text' || a.goal === 'inscribe_file' || a.goal === 'deploy_token' || a.goal === 'etch_rune') steps.push('collection-lite')
  if (a.goal && a.goal !== 'learn_free') steps.push('wallet', 'receiving', 'practice')
  else if (a.goal === 'learn_free') steps.push('practice')
  if (a.goal) steps.push('experience', 'priority')
  return steps
}

const STEP_TITLES: Record<string, string> = {
  goal: 'What do you want to do?',
  protocol: 'Which protocol?',
  category: 'What kind of content?',
  size: 'Roughly how big is the file?',
  count: 'How many items?',
  collection: 'What does the collection need?',
  'collection-lite': 'Collection features needed?',
  wallet: 'Which wallet will pay?',
  receiving: 'Is a receiving address set up and verified?',
  practice: 'Try a safe practice run first?',
  experience: 'How much experience do you have?',
  priority: 'What matters most?',
}

export default function Planner() {
  const [answers, setAnswers] = useState<Answers>(readInitialAnswers)
  const [step, setStep] = useState(0)

  const steps = relevantSteps(answers)
  const done = step >= steps.length

  const result: PlannerResult | null = useMemo(() => {
    if (!done || !answers.goal) return null
    const input: PlannerInput = {
      goal: answers.goal as PlannerInput['goal'],
      protocol: (answers.protocol ?? 'help_me_choose') as PlannerInput['protocol'],
      chain: 'bitcoin',
      network: 'mainnet',
      ...(answers.contentCategory ? { contentCategory: answers.contentCategory as PlannerInput['contentCategory'] } : {}),
      ...(answers.byteSize != null ? { byteSize: answers.byteSize } : {}),
      ...(answers.itemCount != null ? { itemCount: answers.itemCount } : {}),
      ...(answers.needsParent != null ? { needsParent: answers.needsParent } : {}),
      ...(answers.needsDelegate != null ? { needsDelegate: answers.needsDelegate } : {}),
      ...(answers.needsGallery != null ? { needsGallery: answers.needsGallery } : {}),
      wallet: (answers.wallet ?? 'unknown') as PlannerInput['wallet'],
      receivingAddressReady: answers.receivingReady ?? false,
      experience: (answers.experience ?? 'beginner') as PlannerInput['experience'],
      priority: (answers.priority ?? 'simplest') as PlannerInput['priority'],
      practiceFirst: answers.practiceFirst ?? false,
    }
    return planGoal(manifest, input)
  }, [answers, done])

  useEffect(() => {
    const params = new URLSearchParams()
    if (answers.goal) params.set('goal', answers.goal)
    if (answers.protocol) params.set('protocol', answers.protocol)
    if (answers.priority) params.set('priority', answers.priority)
    const query = params.toString()
    window.history.replaceState({ answers, step }, '', query ? `${window.location.pathname}?${query}` : window.location.pathname)
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(answers))
  }, [answers, step])

  useEffect(() => {
    const onPop = (event: PopStateEvent) => {
      const state = (event.state ?? {}) as { answers?: Answers; step?: number }
      if (state.answers) setAnswers(state.answers)
      setStep(typeof state.step === 'number' ? state.step : steps.length)
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [steps.length])

  const set = (patch: Partial<Answers>) => setAnswers((prev) => ({ ...prev, ...patch }))

  return (
    <div className="ins-lab" role="region" aria-label="Guided action planner" data-testid="planner">
      <ol className="ins-wizard__progress" aria-label={`Step ${Math.min(step + 1, steps.length)} of ${steps.length}`}>
        {steps.map((s, i) => (
          <li key={s} data-state={i === step ? 'current' : i < step ? 'done' : 'todo'} aria-hidden="true" />
        ))}
      </ol>

      {!done && answers.goal !== undefined ? (
        <fieldset className="ins-wizard__fieldset">
          <legend className="ins-wizard__legend">{STEP_TITLES[steps[step]] ?? ''}</legend>
          <StepBody id={steps[step]} answers={answers} set={set} />
          <div style={{ display: 'flex', gap: '0.6rem', marginTop: '0.9rem' }}>
            <button type="button" className="ins-btn" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}>
              Previous
            </button>
            <button type="button" className="ins-btn ins-btn--primary" onClick={() => setStep((s) => s + 1)}>
              Next
            </button>
          </div>
        </fieldset>
      ) : !done ? (
        <fieldset className="ins-wizard__fieldset">
          <legend className="ins-wizard__legend">{STEP_TITLES.goal}</legend>
          <StepBody id="goal" answers={answers} set={set} />
        </fieldset>
      ) : (
        <PlanResult result={result!} onRestart={() => { setAnswers({}); setStep(0) }} />
      )}
    </div>
  )
}

function Choice({ name, value, label, hint, checked, onChange, type = 'radio' }: {
  name: string
  value: string
  label: string
  hint?: string
  checked: boolean
  onChange: () => void
  type?: 'radio' | 'checkbox'
}) {
  return (
    <label className="ins-choice">
      <input type={type} name={name} value={value} checked={checked} onChange={onChange} />
      <span>
        <strong>{label}</strong>
        {hint ? <span style={{ color: 'var(--ins-ink-3)', fontSize: '0.9rem', display: 'block', marginTop: '0.15rem' }}>{hint}</span> : null}
      </span>
    </label>
  )
}

function StepBody({ id, answers, set }: { id: string; answers: Answers; set: (p: Partial<Answers>) => void }) {
  switch (id) {
    case 'goal':
      return (
        <div role="radiogroup" aria-label="Goal">
          {GOALS.map((g) => (
            <Choice key={g.value} name="goal" value={g.value} label={g.label} hint={g.hint}
              checked={answers.goal === g.value} onChange={() => set({ goal: g.value })} />
          ))}
        </div>
      )
    case 'protocol':
      return (
        <div role="radiogroup" aria-label="Protocol">
          {PROTOCOLS.map((p) => (
            <Choice key={p.value} name="protocol" value={p.value} label={p.label}
              checked={(answers.protocol ?? 'help_me_choose') === p.value} onChange={() => set({ protocol: p.value })} />
          ))}
        </div>
      )
    case 'category':
      return (
        <div role="radiogroup" aria-label="Content category">
          {CATEGORIES.filter((c) => (answers.goal === 'inscribe_text' ? c.value === 'text' : c.value !== 'text')).map((c) => (
            <Choice key={c.value} name="category" value={c.value} label={c.label}
              checked={answers.contentCategory === c.value} onChange={() => set({ contentCategory: c.value })} />
          ))}
        </div>
      )
    case 'size':
      return (
        <div>
          <label htmlFor="planner-size" style={{ display: 'block', marginBottom: '0.4rem' }}>
            Approximate size in kilobytes (text is measured in bytes; pick the closest bracket)
          </label>
          <select id="planner-size" className="ins-lab" style={{ maxWidth: '16rem' }} value={answers.byteSize ?? 10240}
            onChange={(e) => set({ byteSize: Number(e.target.value) })}>
            <option value={512}>Under 1 KB</option>
            <option value={10240}>About 10 KB</option>
            <option value={102400}>About 100 KB</option>
            <option value={512000}>Half a megabyte</option>
            <option value={2097152}>A few megabytes</option>
          </select>
        </div>
      )
    case 'count':
      return (
        <div>
          <label htmlFor="planner-count" style={{ display: 'block', marginBottom: '0.4rem' }}>Number of items or mints</label>
          <input id="planner-count" type="number" min={1} max={1000} inputMode="numeric"
            style={{ maxWidth: '8rem', minHeight: 44, font: 'inherit', padding: '0.35rem 0.5rem', border: '2px solid var(--ins-ink)', borderRadius: 4 }}
            value={answers.itemCount ?? 2} onChange={(e) => set({ itemCount: Math.max(1, Number(e.target.value) || 1) })} />
        </div>
      )
    case 'collection':
      return (
        <div>
          <Choice name="parent" type="checkbox" value="parent" label="A parent inscription" hint="Children reference a parent"
            checked={!!answers.needsParent} onChange={() => set({ needsParent: !answers.needsParent })} />
          <Choice name="delegate" type="checkbox" value="delegate" label="Delegates" hint="Secondary items acting for the collection"
            checked={!!answers.needsDelegate} onChange={() => set({ needsDelegate: !answers.needsDelegate })} />
          <Choice name="gallery" type="checkbox" value="gallery" label="A gallery" hint="A curated presentation page"
            checked={!!answers.needsGallery} onChange={() => set({ needsGallery: !answers.needsGallery })} />
        </div>
      )
    case 'collection-lite':
      return (
        <div>
          <Choice name="parent" type="checkbox" value="parent" label="This belongs to a collection with a parent"
            checked={!!answers.needsParent} onChange={() => set({ needsParent: !answers.needsParent })} />
          <Choice name="none" type="checkbox" value="none" label="No collection features"
            checked={!answers.needsParent} onChange={() => set({ needsParent: false })} />
        </div>
      )
    case 'wallet':
      return (
        <div role="radiogroup" aria-label="Wallet">
          {WALLETS.map((w) => (
            <Choice key={w.value} name="wallet" value={w.value} label={w.label}
              checked={(answers.wallet ?? 'unknown') === w.value} onChange={() => set({ wallet: w.value })} />
          ))}
        </div>
      )
    case 'receiving':
      return (
        <div role="radiogroup" aria-label="Receiving address">
          <Choice name="receiving" value="yes" label="Yes, verified and ready"
            checked={answers.receivingReady === true} onChange={() => set({ receivingReady: true })} />
          <Choice name="receiving" value="no" label="Not yet"
            hint="The plan still works; address setup becomes the first prerequisite"
            checked={answers.receivingReady === false} onChange={() => set({ receivingReady: false })} />
        </div>
      )
    case 'practice':
      return (
        <div role="radiogroup" aria-label="Practice first">
          <Choice name="practice" value="yes" label="Yes, practice in the simulation first"
            checked={answers.practiceFirst === true} onChange={() => set({ practiceFirst: true })} />
          <Choice name="practice" value="no" label="No, go straight to the real thing"
            checked={answers.practiceFirst === false} onChange={() => set({ practiceFirst: false })} />
        </div>
      )
    case 'experience':
      return (
        <div role="radiogroup" aria-label="Experience">
          {[
            { value: 'beginner', label: 'New to inscriptions' },
            { value: 'intermediate', label: 'Some experience' },
            { value: 'expert', label: 'I do this regularly' },
          ].map((e) => (
            <Choice key={e.value} name="experience" value={e.value} label={e.label}
              checked={(answers.experience ?? 'beginner') === e.value} onChange={() => set({ experience: e.value })} />
          ))}
        </div>
      )
    case 'priority':
      return (
        <div role="radiogroup" aria-label="Priority">
          {PRIORITIES.map((p) => (
            <Choice key={p.value} name="priority" value={p.value} label={p.label}
              checked={(answers.priority ?? 'simplest') === p.value} onChange={() => set({ priority: p.value })} />
          ))}
        </div>
      )
    default:
      return null
  }
}

function PlanResult({ result, onRestart }: { result: PlannerResult; onRestart: () => void }) {
  const recommended: PlanCandidate | null = result.recommended
  const workflow: Workflow | undefined = recommended?.workflow
  const link = workflow
    ? buildInscribeLink({
        appOrigin: manifest.appOrigin,
        intent: { workspace: workflow.workspace, sub: workflow.subview, ...workflow.intent, network: 'mainnet' },
        docsReturnOrigins: manifest.docsReturnOrigins,
      })
    : null

  return (
    <div data-testid="planner-result">
      <h2 className="ins-card__title">Your plan</h2>
      {workflow && recommended ? (
        <article className="ins-card" aria-labelledby="plan-title">
          <h3 id="plan-title">{workflow.title}</h3>
          <p>
            <strong>Protocol:</strong> {manifest.protocols.find((p) => p.id === workflow.protocolId)?.label ?? workflow.protocolId}
            {' · '}
            <strong>Workspace:</strong> /{workflow.workspace}
            {' · '}
            <strong>Chain:</strong> {workflow.chain} {workflow.network}
          </p>
          <p>
            <span className={`ins-badge ${workflow.state.enabled ? 'ins-badge--released' : 'ins-badge--gated'}`}>
              {workflow.state.enabled ? 'Released' : 'Deployment controlled'}
            </span>
            {' '}
            <span className="ins-badge ins-badge--unknown">Live health: check the central status page</span>
          </p>

          <h4>Why this workflow was selected</h4>
          <ul>
            {recommended.scoreBreakdown.map((b, i) => (
              <li key={i}>{b.rule}: {b.value > 0 ? `+${b.value}` : b.value} point{Math.abs(b.value) === 1 ? '' : 's'}</li>
            ))}
          </ul>

          {workflow.stages.length > 0 && (
            <>
              <h4>Expected stages ({workflow.stages.length - 1} transactions plus your signature)</h4>
              <ol className="ins-stages">
                {workflow.stages.map((stage, i) => (
                  <li key={i}>
                    <span>{stage.label}</span>
                    <span className="ins-stages__owner">
                      {stage.valueOwner === 'user' ? 'value stays yours'
                        : stage.valueOwner === 'network_fee' ? 'network fee'
                        : stage.valueOwner === 'service_fee' ? 'service fee' : ''}
                    </span>
                  </li>
                ))}
              </ol>
            </>
          )}

          <h4>Prerequisites</h4>
          <ul>
            {workflow.prerequisites.map((p, i) => <li key={i}>{p}</li>)}
            <li>A receiving address that you have verified in the app.</li>
          </ul>

          <h4>Safety checks before signing</h4>
          <ul>
            {workflow.safetyChecks.map((c, i) => <li key={i}>{c}</li>)}
          </ul>

          <h4>Cost components</h4>
          <p>
            {COST_DESCRIPTION[workflow.feeModel] ?? 'The in-app quote shows every component.'}
            {' '}The final in-app quote is authoritative. The <a href="/docs-inscribe/labs/transaction-review/">Transaction Review Lab</a> shows how each component works.
          </p>

          <h4>Learn it, then do it</h4>
          <ul>
            {workflow.walkthroughId && <li><a href={`/docs-inscribe/visual-guides/${workflow.walkthroughId}/`}>Visual walkthrough</a></li>}
            {workflow.practiceScenarioId && <li><a href={`/docs-inscribe/practice/?scenario=${workflow.practiceScenarioId}`}>Practice this safely first</a></li>}
            {workflow.guides.map((g) => {
              const guide = manifest.guides.find((x) => x.id === g)
              if (!guide) return null
              if (guide.surface === 'public') {
                const target = guide.publicPath.startsWith('/docs-inscribe') ? guide.publicPath : `/docs-inscribe${guide.publicPath.startsWith('/') ? guide.publicPath : '/' + guide.publicPath}`
                return <li key={g}><a href={target}>{guide.title}</a></li>
              }
              const section = guide.category === 'start' ? 'first-inscription' : 'workspaces'
              return <li key={g}><a href={`/docs-inscribe/${section}/#${g}`}>{guide.title} (in-app guide)</a></li>
            })}
            <li><a href="/docs-inscribe/recovery/navigator/">Recovery route if the workflow is interrupted</a></li>
          </ul>

          <p>
            <a className="ins-btn ins-btn--primary" href={link ?? '#'} target="_blank" rel="noopener noreferrer">
              Open this workflow in Inscribe
            </a>
            {' '}
            <button type="button" className="ins-btn" onClick={() => window.print()}>Print this plan</button>
            {' '}
            <button type="button" className="ins-btn" onClick={onRestart}>Start over</button>
          </p>
          <p className="ins-provenance">
            <span><strong>Selected by:</strong> deterministic rules in the learning manifest</span>
            <span><strong>Opening a link can never:</strong> create an order, connect a wallet, sign, pay, or broadcast</span>
            <span><strong>Sources:</strong> {Object.entries(manifest.sourceCommits).map(([repo, commit]) => `${repo}@${commit.slice(0, 12)}`).join(', ')}</span>
          </p>
        </article>
      ) : (
        <p>No workflow matches these answers yet. Start over or pick a different goal.</p>
      )}

      {result.alternatives.length > 0 && (
        <>
          <h3>Valid alternatives</h3>
          {result.alternatives.map((alt) => (
            <article key={alt.workflow.id} className="ins-card ins-card--muted">
              <h4>{alt.workflow.title}</h4>
              <p>
                Selected by: {alt.scoreBreakdown.filter((b) => b.value > 0).map((b) => b.rule).join(', ')}.
                {' '}<a href={`/docs-inscribe/guided/?goal=${alt.workflow.goal}&protocol=${alt.workflow.protocolId}`}>Plan this instead</a>
              </p>
            </article>
          ))}
        </>
      )}

      {result.excluded.length > 0 && (
        <>
          <h3>Excluded candidates and why</h3>
          <ul>
            {result.excluded.map(({ workflow: w, reason }) => (
              <li key={w.id}><strong>{w.title}</strong> ({reason.code.replace(/_/g, ' ')}): {reason.detail}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}

const COST_DESCRIPTION: Record<string, string> = {
  commit_reveal: 'A commit funding payment, a reveal fee, and 546 sats of postage per inscription that stays owned by you and moves with the asset.',
  direct: 'A single transaction fee. Output value follows the protocol model.',
  keyless_p2a: 'A funding payment, pay-to-anchor chain fees, and the flat 1,500 sat service fee per mint, shown separately.',
  stamp_olga: 'Stamp chain fees driven by the image size and the fee rate.',
  src20: 'The mint fee with per-output dust, plus the flat service fee.',
  service_quote: 'This workflow quotes in the app before any payment.',
}
