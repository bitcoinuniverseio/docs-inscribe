import { useMemo, useState } from 'react'
import { loadManifest } from '@universe/inscribe-learning'
import { estimateWorkflow, satsToBtc, type EstimateBreakdown } from '@universe/inscribe-learning/estimate'

const manifest = loadManifest()

const WORKFLOW_OPTIONS = manifest.workflows
  .filter((w) => w.state.actionable)
  .map((w) => ({ value: w.id, label: w.title, feeModel: w.feeModel }))

/** Deterministic, sanitized fixtures. No real transaction data, ever. */
const FIXTURES = {
  'commit-reveal': {
    title: 'Commit and reveal (ordinals-style inscription)',
    inputs: [
      { outpoint: 'fixture-1:a', valueSats: 12000, asset: 'none' },
    ],
    outputs: [
      { kind: 'commit', label: 'Commit address (service)', valueSats: 6906, classification: 'fee' },
      { kind: 'change', label: 'Change back to your payment address', valueSats: 5094, classification: 'owned' },
    ],
    reveal: [
      { outpoint: 'fixture-2:a', valueSats: 6906, asset: 'none' },
    ],
    revealOutputs: [
      { kind: 'inscription', label: 'Inscription output (postage stays yours)', valueSats: 546, classification: 'owned' },
      { kind: 'fee', label: 'Miner fee', valueSats: 6360, classification: 'fee' },
    ],
  },
  'underpaid': {
    title: 'Underpaid payment (what the order sees)',
    inputs: [{ outpoint: 'fixture-3:a', valueSats: 5000, asset: 'none' }],
    outputs: [{ kind: 'payment', label: 'Order commit address (below quote)', valueSats: 5000, classification: 'risk' }],
  },
  'asset-bearing': {
    title: 'Asset-bearing input warning',
    inputs: [
      { outpoint: 'fixture-4:a', valueSats: 2000, asset: 'ordinals inscription' },
      { outpoint: 'fixture-4:b', valueSats: 9000, asset: 'none' },
    ],
    outputs: [{ kind: 'payment', label: 'Order payment (would drag your inscription along)', valueSats: 11000, classification: 'risk' }],
  },
} as const

const EXERCISES = [
  {
    id: 'wrong-network',
    prompt: 'Your wallet shows a signature request for a testnet address while you are creating on mainnet. What do you do?',
    options: [
      { text: 'Sign it; testnet coins have no value', correct: false, why: 'A transaction signed for the wrong network can still burn real value or fail confusingly. Stop and check the network switcher.' },
      { text: 'Reject, check the network in both the app and the wallet, and restart the payment', correct: true, why: 'Correct. Network must match in the app, the wallet, and the order page before anything is signed.' },
    ],
  },
  {
    id: 'wrong-receiver',
    prompt: 'The wallet review shows a receiving address that differs by two characters from the one you copied. What do you do?',
    options: [
      { text: 'Sign; wallets check addresses anyway', correct: false, why: 'A wallet checks validity, not intent. A valid address you did not mean is still a loss you signed for.' },
      { text: 'Reject and re-copy the address from the order page, then compare end to end', correct: true, why: 'Correct. Compare the full address, first and last characters included, every time.' },
    ],
  },
  {
    id: 'service-fee',
    prompt: 'The transaction has an extra output you do not recognize, paying a fixed small amount. What is it?',
    options: [
      { text: 'An unexpected output is always an attack; reject', correct: false, why: 'Overly broad, but never sign blind either. The recognized flat service fee is documented; verify the amount matches the quote.' },
      { text: 'Check it against the quote: a flat 1,500 sat service fee is expected; anything else means stop', correct: true, why: 'Correct. The quote itemizes the service fee. A matching amount is expected; a different one is a stop condition.' },
    ],
  },
  {
    id: 'missing-change',
    prompt: 'Your funding input is 12,000 sats but the outputs only pay the 6,906 sat commit with no change output. What does that mean?',
    options: [
      { text: 'The remainder is the miner fee, so this is normal', correct: true, why: 'Correct. Unallocated input value goes to the miner as fee. Here the implicit fee would be about 5,094 sats, which is high; consider a smaller input.' },
      { text: 'The app stole the difference', correct: false, why: 'Fee arithmetic, not theft: outputs below inputs means the difference is the miner fee. Verify the numbers against the quote.' },
    ],
  },
  {
    id: 'stuck-nonrbf',
    prompt: 'Your payment to the commit address is stuck unconfirmed and the wallet cannot fee-bump it. What do you do?',
    options: [
      { text: 'Send the payment again to speed it up', correct: false, why: 'Never. A second payment is a second order amount. Payment detection catches up when the first confirms.' },
      { text: 'Wait and watch the order page; detection runs until it confirms', correct: true, why: 'Correct. A stuck payment still pays the order once it confirms. The recovery navigator walks through the details.' },
    ],
  },
  {
    id: 'irreversible-correct',
    prompt: 'You signed a transfer to an address you mis-copied, it confirmed, and the assets are gone. What can be done?',
    options: [
      { text: 'Ask support to reverse the transaction', correct: false, why: 'No one can reverse a confirmed Bitcoin transaction. Anyone promising to is a scam.' },
      { text: 'Nothing reverses it; if it was your own address elsewhere, recover it there, then re-check the checklist', correct: true, why: 'Correct and final. The transaction did exactly what it was signed to do; irreversibility is the rule the whole system rests on.' },
    ],
  },
]

export default function TransactionLab() {
  const [workflowId, setWorkflowId] = useState(WORKFLOW_OPTIONS[0]?.value ?? '')
  const [bytes, setBytes] = useState(100)
  const [count, setCount] = useState(1)
  const [rate, setRate] = useState(40)
  const [rateKind, setRateKind] = useState<'user_entered' | 'offline_snapshot'>('user_entered')
  const [fixture, setFixture] = useState<keyof typeof FIXTURES>('commit-reveal')
  const [answers, setAnswers] = useState<Record<string, string>>({})

  const workflow = manifest.workflows.find((w) => w.id === workflowId)
  const estimate: EstimateBreakdown | null = useMemo(() => {
    if (!workflow) return null
    try {
      return estimateWorkflow({
        feeModel: workflow.feeModel,
        contentSizeBytes: bytes,
        itemCount: count,
        feeRateSatVb: Math.max(0.01, rate),
        rateKind,
        ...(workflow.feeModel === 'keyless_p2a' ? { receiverAddress: 'bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kygt080' } : {}),
      })
    } catch {
      return null
    }
  }, [workflow, bytes, count, rate, rateKind])

  const fx = FIXTURES[fixture]

  return (
    <div data-testid="transaction-lab">
      {/* Estimator */}
      <section className="ins-lab" aria-labelledby="lab-estimate">
        <h3 id="lab-estimate">Cost preview</h3>
        <div className="ins-lab__filters">
          <label style={{ gridColumn: '1 / -1' }}>
            <span>Workflow</span>
            <select value={workflowId} onChange={(e) => setWorkflowId(e.target.value)} data-testid="estimate-workflow">
              {WORKFLOW_OPTIONS.map((w) => <option key={w.value} value={w.value}>{w.label}</option>)}
            </select>
          </label>
          <label>
            <span>Content size (bytes)</span>
            <input type="number" min={1} max={4000000} value={bytes} onChange={(e) => setBytes(Math.max(1, Number(e.target.value) || 1))}
              aria-describedby="lab-bytes-hint" />
            <span id="lab-bytes-hint" className="ins-lab__hint">size only; no file leaves this page</span>
          </label>
          <label>
            <span>Items</span>
            <input type="number" min={1} max={1000} value={count} onChange={(e) => setCount(Math.max(1, Number(e.target.value) || 1))}
              aria-describedby="lab-items-hint" />
            <span id="lab-items-hint" className="ins-lab__hint">batch or token mint count</span>
          </label>
          <label>
            <span>Fee rate (sat/vB)</span>
            <input type="number" min={0.01} step={0.01} value={rate} onChange={(e) => setRate(Number(e.target.value) || 1)}
              aria-describedby="lab-rate-hint" />
            <span id="lab-rate-hint" className="ins-lab__hint">enter the rate you see in the app</span>
          </label>
          <label>
            <span>Rate kind</span>
            <select value={rateKind} onChange={(e) => setRateKind(e.target.value as 'user_entered' | 'offline_snapshot')}
              aria-describedby="lab-ratekind-hint">
              <option value="user_entered">Entered by me</option>
              <option value="offline_snapshot">Offline snapshot</option>
            </select>
            <span id="lab-ratekind-hint" className="ins-lab__hint">source for estimation preview</span>
          </label>
        </div>

        {estimate && (
          <div data-testid="estimate-result">
            <table className="ins-tx">
              <caption>Preview only. The final in-app quote is authoritative.</caption>
              <tbody>
                {estimate.revealVbytes != null && (
                  <tr><th scope="row">Reveal size</th><td>{estimate.revealVbytes} vB</td></tr>
                )}
                <tr><th scope="row">Network fee</th><td className="ins-tx__value--fee">{estimate.networkFeeSats.toLocaleString()} sats ({satsToBtc(estimate.networkFeeSats)})</td></tr>
                {estimate.serviceFeeSats > 0 && (
                  <tr><th scope="row">Service fee</th><td className="ins-tx__value--fee">{estimate.serviceFeeSats.toLocaleString()} sats</td></tr>
                )}
                {estimate.outputValueSats > 0 && (
                  <tr><th scope="row">Value that stays yours</th><td className="ins-tx__value--owned">{estimate.outputValueSats.toLocaleString()} sats (postage that moves with the asset)</td></tr>
                )}
                <tr><th scope="row">Total funding</th><td>{estimate.totalFundingSats.toLocaleString()} sats ({satsToBtc(estimate.totalFundingSats)})</td></tr>
                <tr><th scope="row">Rate</th><td>{rate} sat/vB ({rateKind.replace('_', ' ')})</td></tr>
              </tbody>
            </table>
            <ul>
              {estimate.assumptions.map((a, i) => <li key={i}>{a}</li>)}
            </ul>
            <p className="ins-provenance">
              <span><strong>Estimator source:</strong> the pure Inscribe estimator, shared with the app (inscribe@{manifest.sourceCommits.inscribe.slice(0, 12)})</span>
            </p>
          </div>
        )}
      </section>

      {/* Transaction anatomy */}
      <section className="ins-lab" aria-labelledby="lab-anatomy">
        <h3 id="lab-anatomy">Transaction anatomy explorer</h3>
        <label style={{ display: 'block', marginBottom: '0.5rem' }}>
          Fixture
          <select value={fixture} onChange={(e) => setFixture(e.target.value as keyof typeof FIXTURES)}>
            {Object.entries(FIXTURES).map(([key, f]) => <option key={key} value={key}>{f.title}</option>)}
          </select>
        </label>
        <table className="ins-tx" data-testid="tx-anatomy">
          <caption>{fx.title} (synthetic fixture)</caption>
          <thead>
            <tr><th scope="col">Part</th><th scope="col">Value</th><th scope="col">What it is</th></tr>
          </thead>
          <tbody>
            {fx.inputs.map((input, i) => (
              <tr key={i}>
                <td>Input {input.outpoint}</td>
                <td>{input.valueSats.toLocaleString()} sats</td>
                <td className={input.asset !== 'none' ? 'ins-tx__value--risk' : ''}>
                  {input.asset !== 'none' ? `Holds: ${input.asset} (unverified by fee logic)` : 'No known asset'}
                </td>
              </tr>
            ))}
            {'outputs' in fx && fx.outputs.map((output, i) => (
              <tr key={`o${i}`}>
                <td>Output</td>
                <td>{output.valueSats.toLocaleString()} sats</td>
                <td className={output.classification === 'owned' ? 'ins-tx__value--owned' : output.classification === 'risk' ? 'ins-tx__value--risk' : 'ins-tx__value--fee'}>
                  {output.label}
                </td>
              </tr>
            ))}
            {'reveal' in fx && (
              <tr><th scope="col" colSpan={3}>After the commit confirms, the reveal transaction spends it:</th></tr>
            )}
            {'revealOutputs' in fx && fx.revealOutputs.map((output, i) => (
              <tr key={`r${i}`}>
                <td>Reveal output</td>
                <td>{output.valueSats.toLocaleString()} sats</td>
                <td className={output.classification === 'owned' ? 'ins-tx__value--owned' : 'ins-tx__value--fee'}>{output.label}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>
          <strong>Read the classifications carefully:</strong> "No known asset" means this fixture does not model an
          asset. It is not a guarantee. "Value stays yours" marks outputs you still own: postage and change. Spent fee
          value belongs to the miner the moment the transaction confirms.
        </p>
      </section>

      {/* Wallet review simulator */}
      <section className="ins-lab" aria-labelledby="lab-wallet-review">
        <h3 id="lab-wallet-review">Wallet review: what to verify before every signature</h3>
        <p>Use this checklist against whatever wallet you use. The simulator is wallet-neutral on purpose: it teaches the checks, not one app's buttons.</p>
        <ol>
          <li><strong>Network:</strong> the wallet header and the order page agree on mainnet.</li>
          <li><strong>Operation:</strong> the request matches what you clicked (a payment, not a transfer of a held asset).</li>
          <li><strong>Recipient:</strong> the exact address from the order page, compared end to end.</li>
          <li><strong>Total:</strong> matches the quoted total to the sat.</li>
          <li><strong>Fee:</strong> sensible for the current fee rate; no surprise multiples.</li>
          <li><strong>Service fee:</strong> the flat documented amount, shown separately.</li>
          <li><strong>Inputs:</strong> none of them hold assets you are not deliberately spending; the app warns before funding from asset-bearing outputs.</li>
          <li><strong>Change:</strong> goes back to your address.</li>
          <li><strong>Unexpected outputs:</strong> anything not on this list is a stop condition.</li>
        </ol>
      </section>

      {/* Safety exercises */}
      <section className="ins-lab" aria-labelledby="lab-exercises">
        <h3 id="lab-exercises">Safety exercises</h3>
        {EXERCISES.map((exercise) => (
          <fieldset key={exercise.id} className="ins-wizard__fieldset" style={{ marginBottom: '1rem' }}>
            <legend style={{ fontWeight: 600 }}>{exercise.prompt}</legend>
            {exercise.options.map((option, oi) => {
              const chosen = answers[exercise.id]
              const isChosen = chosen === `${oi}`
              return (
                <div key={oi}>
                  <label className="ins-choice" style={isChosen ? { borderColor: 'var(--ins-accent)' } : undefined}>
                    <input
                      type="radio"
                      name={exercise.id}
                      checked={isChosen}
                      onChange={() => setAnswers((prev) => ({ ...prev, [exercise.id]: `${oi}` }))}
                      data-testid={`exercise-${exercise.id}-${oi}`}
                    />
                    <span>{option.text}</span>
                  </label>
                  {isChosen && (
                    <p style={{
                      margin: '0.2rem 0 0.6rem',
                      padding: '0.5rem 0.8rem',
                      borderRadius: 4,
                      background: option.correct ? 'var(--ins-success-soft)' : 'var(--ins-danger-soft)',
                      color: option.correct ? 'var(--ins-success)' : 'var(--ins-danger)',
                    }}>
                      {option.correct ? 'Correct. ' : 'Not this. '}{option.why}
                    </p>
                  )}
                </div>
              )
            })}
          </fieldset>
        ))}
      </section>
    </div>
  )
}
