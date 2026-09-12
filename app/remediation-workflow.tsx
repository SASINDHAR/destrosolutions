import { useId, useState } from 'react';
import { ArrowLeft, ArrowRight, ShieldCheck, LockKeyhole } from 'lucide-react';
import { SimulationLabel } from './system-explorer';

export const remediationSteps = [
  [
    'New threat',
    'An advisory enters the example environment.',
    'An external signal needs an accountable investigation.',
    'DEMO-VULN-001 · fictional advisory · 09:14',
    'Normalize the signal and preserve its source.',
  ],
  [
    'Threat intelligence',
    'The signal is normalized and duplicate context is grouped.',
    'A traceable source separates evidence from assumptions.',
    'Advisory reference · affected Link library 2.4 · source record',
    'Match the affected component against product inventories.',
  ],
  [
    'Product match',
    'Vehicle Gateway VG-042 contains a matching component.',
    'A product match establishes scope, not exploitability.',
    'VG-042 · firmware 4.2.1 · component inventory',
    'Inspect the software bill of materials.',
  ],
  [
    'SBOM',
    'The recorded software composition links firmware to its dependencies.',
    'Version-specific evidence narrows the investigation.',
    'Demo SBOM VG-042/4.2.1 · Link library 2.4',
    'Locate the affected component and its owner.',
  ],
  [
    'Component',
    'The Link library is identified in the gateway firmware.',
    'Component identity must be confirmed before acting.',
    'Library name · version 2.4 · firmware manifest',
    'Trace the dependency to product functions.',
  ],
  [
    'Dependency',
    'The path reaches firmware, the gateway ECU and the vehicle.',
    'A shared component can affect a physical system.',
    'Library → Firmware 4.2.1 → Gateway ECU → Vehicle',
    'Request supplier guidance for the affected version.',
  ],
  [
    'Supplier',
    'Example Embedded Co. is the fictional component owner.',
    'Supplier evidence helps confirm scope and response options.',
    'Example supplier record · affected-version notice · remediation guidance',
    'Combine supplier evidence with operating context.',
  ],
  [
    'Product impact',
    'The example gateway configuration is assessed for exposure.',
    'The same library can create different risks in different products.',
    'Interface access · configuration · vehicle function · test evidence',
    'Prepare a bounded, reviewable AI assessment.',
  ],
  [
    'AI assessment',
    'A concise evidence summary is prepared for engineering review.',
    'Reviewers need sources and unresolved questions, not hidden reasoning.',
    'Component match confirmed · dependency mapped · exposure assumptions recorded',
    'Prioritize the case using product impact and uncertainty.',
  ],
  [
    'Risk prioritization',
    'The example is assigned to a product security owner.',
    'Priority accounts for physical impact and available evidence.',
    'Illustrative high priority · engineering owner · residual questions',
    'Review a proposed change and its rollback plan.',
  ],
  [
    'Remediation',
    'A scoped staging update is proposed for approval.',
    'An operational change needs an authorized decision and recovery plan.',
    'Proposed library 2.4.1 · test scope · rollback plan · human approval',
    'After approval, verify both exposure and product behavior.',
  ],
  [
    'Verification',
    'The example retest checks the changed component and product behavior.',
    'A deployed change alone is not proof of resolution.',
    'Staging retest · regression checks · release identity · residual-risk review',
    'Retain the test results and decision in a closure record.',
  ],
  [
    'Evidence',
    'The illustrative investigation has a traceable closure package.',
    'Evidence connects the original signal to the reviewed outcome.',
    'Advisory · SBOM · supplier guidance · approval · retest · closure record',
    'Feed verified findings into the next discovery cycle.',
  ],
] as const;

export default function RemediationWorkflow() {
  const [step, setStep] = useState(0);
  const [approved, setApproved] = useState(false);
  const id = useId();
  const current = remediationSteps[step];
  return (
    <section
      className="remediation-workflow"
      id="security-workflow"
      aria-labelledby={id + '-title'}
    >
      <SimulationLabel title="SIMULATED SECURITY WORKFLOW" />
      <div className="workflow-heading">
        <div>
          <span className="mono">ONE SIGNAL / A COMPLETE EVIDENCE PATH</span>
          <h3 id={id + '-title'}>
            From vulnerability to verified remediation.
          </h3>
          <p>
            Follow one fictional gateway investigation. Select any stage to
            inspect the evidence and handoff.
          </p>
        </div>
        <span className="workflow-case mono">
          DEMO-VULN-001
          <br />
          VG-042 / VEHICLE GATEWAY
        </span>
      </div>
      <div className="remediation-layout">
        <fieldset
          className="remediation-steps"
          aria-label="Security workflow stages"
        >
          {remediationSteps.map(([name], i) => (
            <button
              key={name}
              aria-pressed={step === i}
              aria-controls={id}
              className={step === i ? 'is-selected' : ''}
              onClick={() => setStep(i)}
            >
              <span className="mono">{String(i + 1).padStart(2, '0')}</span>
              <strong>{name}</strong>
              {i === 10 ? <LockKeyhole size={16} /> : <ArrowRight size={16} />}
            </button>
          ))}
        </fieldset>
        <div className="remediation-detail security-grid" id={id}>
          <div aria-live="polite" aria-atomic="true">
            <span className="mono">
              STAGE {String(step + 1).padStart(2, '0')} / 13 · DEMONSTRATION
            </span>
            <h4>{current[0]}</h4>
            <dl>
              {[
                'WHAT HAPPENED',
                'WHY IT MATTERS',
                'DATA USED',
                'WHAT HAPPENS NEXT',
              ].map((label, i) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{current[i + 1]}</dd>
                </div>
              ))}
            </dl>
          </div>
          {step >= 10 && (
            <div className="workflow-approval">
              <LockKeyhole size={19} />
              <p>
                {approved
                  ? 'Demo approval recorded locally. No production action was authorized or executed.'
                  : 'Human approval required before operational action. Later stages can be explored as illustrative outcomes.'}
              </p>
            </div>
          )}
          {step === 10 && (
            <button
              className="button secondary"
              disabled={approved}
              onClick={() => setApproved(true)}
            >
              <ShieldCheck size={17} />
              {approved
                ? 'Demo review recorded'
                : 'Record illustrative approval'}
            </button>
          )}
          <div className="workflow-navigation">
            <button
              className="button secondary"
              disabled={step === 0}
              onClick={() => setStep((s) => s - 1)}
            >
              <ArrowLeft size={16} />
              Previous stage
            </button>
            <button
              className="button secondary"
              onClick={() => {
                if (step === 12) {
                  setStep(0);
                  setApproved(false);
                } else setStep((s) => s + 1);
              }}
            >
              {step === 12 ? 'Restart workflow' : 'Next stage'}
              <ArrowRight size={16} />
            </button>
          </div>
          <p className="fineprint">
            Exploration only. Selecting a stage does not complete a task, create
            a case or change a real system.
          </p>
        </div>
      </div>
    </section>
  );
}
