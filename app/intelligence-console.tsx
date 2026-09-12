import { useEffect, useRef, useState, type RefObject } from 'react';
import {
  Search,
  ArrowRight,
  ArrowUpRight,
  Check,
  Pause,
  Play,
  RotateCcw,
  ShieldCheck,
  BrainCircuit,
  LockKeyhole,
  Activity,
} from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import {
  assets,
  threats,
  agentProfiles,
  type DemoThreat,
} from './security-data';
import { SimulationLabel } from './system-explorer';

function useDemoPlayback(
  running: boolean,
  ref: RefObject<HTMLDivElement | null>,
  advance: () => void,
) {
  const callback = useRef(advance);
  useEffect(() => {
    callback.current = advance;
  }, [advance]);
  useEffect(() => {
    if (!running || !ref.current) return;
    let visible = false;
    let timer: ReturnType<typeof setInterval> | undefined;
    const sync = () => {
      clearInterval(timer);
      if (visible && document.visibilityState === 'visible')
        timer = setInterval(() => callback.current(), 3500);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    observer.observe(ref.current);
    document.addEventListener('visibilitychange', sync);
    return () => {
      clearInterval(timer);
      observer.disconnect();
      document.removeEventListener('visibilitychange', sync);
    };
  }, [running, ref]);
}

export function DashboardPreview() {
  const [query, setQuery] = useState('');
  const [risk, setRisk] = useState('All');
  const [selected, setSelected] = useState(assets[0].id);
  const filtered = assets.filter(
    (a) =>
      (risk === 'All' || risk === a.risk) &&
      (a.name + ' ' + a.id + ' ' + a.supplier + ' ' + a.version)
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  const asset = assets.find((a) => a.id === selected)!;
  const inResults = filtered.some((a) => a.id === selected);
  return (
    <div className="inventory-console">
      <SimulationLabel title="SIMULATED PRODUCT ENVIRONMENT" />
      <div className="inventory-toolbar">
        <div>
          <span className="mono">PRODUCT INTELLIGENCE / INVENTORY</span>
          <h3>Know the product behind the signal.</h3>
        </div>
        <span className="lab-count">{assets.length} demo products</span>
      </div>
      <div className="inventory-search">
        <label>
          <span>Search inventory</span>
          <div>
            <Search size={17} />
            <input
              type="search"
              placeholder="Product, supplier, version…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </label>
        <label>
          <span>Filter by risk</span>
          <select value={risk} onChange={(e) => setRisk(e.target.value)}>
            {['All', 'High', 'Medium', 'Low'].map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
        </label>
        <output>
          {filtered.length} matching{' '}
          {filtered.length === 1 ? 'product' : 'products'}
        </output>
      </div>
      <div className="inventory-workspace">
        <fieldset
          className="asset-results"

          aria-label="Product inventory results"
        >
          {filtered.length ? (
            filtered.map((a) => (
              <button
                key={a.id}
                aria-pressed={selected === a.id}
                onClick={() => setSelected(a.id)}
                className={selected === a.id ? 'is-selected' : ''}
              >
                <span className="mono">
                  {a.id}
                  <span className={'risk-badge ' + a.risk.toLowerCase()}>
                    {a.risk}
                  </span>
                </span>
                <strong>{a.name}</strong>
                <span>
                  {a.category} · v{a.version}
                </span>
                <small>{a.supplier}</small>
              </button>
            ))
          ) : (
            <div className="lab-empty">
              <h4>No matching products.</h4>
              <p>Try another name, version or risk level.</p>
              <button
                className="text-link"
                onClick={() => {
                  setQuery('');
                  setRisk('All');
                }}
              >
                Clear filters <RotateCcw size={15} />
              </button>
            </div>
          )}
        </fieldset>
        <div className="inventory-selection" aria-live="polite">
          <div className="inventory-title">
            <div>
              <span className="mono">SELECTED PRODUCT / {asset.id}</span>
              <h3>{asset.name}</h3>
              <p>{asset.supplier}</p>
            </div>
            <div className="inventory-score">
              <strong>
                {asset.score}
                <small>/100</small>
              </strong>
              <span>Illustrative risk</span>
            </div>
          </div>
          {!inResults && (
            <p className="filter-note">
              Selected product is outside the current filter. Choose a result to
              inspect it.
            </p>
          )}
          <div className="inventory-stats">
            <div>
              <span>Components</span>
              <strong>{asset.components}</strong>
            </div>
            <div>
              <span>Version</span>
              <strong>{asset.version}</strong>
            </div>
            <div>
              <span>Risk level</span>
              <strong>{asset.risk}</strong>
            </div>
          </div>
          <Tabs defaultValue="sbom" className="inventory-tabs">
            <TabsList className="lab-tabs">
              <TabsTrigger value="sbom">SBOM & dependencies</TabsTrigger>
              <TabsTrigger value="timeline">Vulnerability timeline</TabsTrigger>
            </TabsList>
            <TabsContent value="sbom">
              <div className="sbom-tree">
                <div>
                  <span>PRODUCT</span>
                  <strong>{asset.name}</strong>
                </div>
                <div>
                  <span>COMPONENT</span>
                  <strong>
                    {asset.category === 'Robotics'
                      ? 'Control firmware'
                      : 'Device firmware'}{' '}
                    / {asset.version}
                  </strong>
                </div>
                <div>
                  <span>DEPENDENCY</span>
                  <strong>
                    {asset.category === 'Robotics'
                      ? 'Example Edge Runtime'
                      : 'Example Link Library'}
                  </strong>
                </div>
                <div>
                  <span>SUPPLIER</span>
                  <strong>{asset.supplier}</strong>
                </div>
              </div>
              <p className="fineprint">
                Hardware configuration: reference environment. Software and
                supplier records are fictional.
              </p>
            </TabsContent>
            <TabsContent value="timeline">
              <ol className="vulnerability-timeline">
                {[
                  [
                    '09:10',
                    'SBOM recorded',
                    'Components and versions attached.',
                  ],
                  [
                    '09:14',
                    'Demo signal matched',
                    'Example component flagged for investigation.',
                  ],
                  [
                    '09:18',
                    asset.status,
                    'An authorized team reviews the next step.',
                  ],
                ].map(([time, title, body]) => (
                  <li key={time}>
                    <span className="mono">{time}</span>
                    <div>
                      <h4>{title}</h4>
                      <p>{body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

function ThreatDetail({ threat }: { threat: DemoThreat }) {
  return (
    <>
      <SheetTitle>{threat.name}</SheetTitle>
      <SheetDescription>
        Simulated threat record. Fictional data; not a real CVE or security
        incident.
      </SheetDescription>
      <div className="threat-sheet-record">
        <span className="mono">{threat.id}</span>
        <dl>
          {[
            ['Threat', threat.name],
            ['Affected product', threat.product],
            ['Component', threat.component],
            ['Severity', threat.severity + ' · illustrative'],
            ['Exposure', threat.exposure],
            ['AI analysis summary', threat.analysis],
            ['Recommended action', threat.action],
          ].map(([name, value]) => (
            <div key={name}>
              <dt>{name}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
        <p>
          <LockKeyhole size={16} /> Human approval precedes operational action.
        </p>
      </div>
    </>
  );
}
export function ThreatFlow() {
  const [count, setCount] = useState(1);
  const [playing, setPlaying] = useState(false);
  const [selected, setSelected] = useState(threats[0]);
  const ref = useRef<HTMLDivElement>(null);
  useDemoPlayback(playing && count < 3, ref, () =>
    setCount((c) => Math.min(3, c + 1)),
  );
  return (
    <div className="threat-console" ref={ref}>
      <SimulationLabel title="SIMULATED THREAT INTELLIGENCE FEED" />
      <div className="threat-console-top">
        <div>
          <span className="mono">INTELLIGENCE EXCHANGE</span>
          <h3>A signal. A product. A decision.</h3>
          <p>Replay a fictional feed. Open a signal to inspect its evidence.</p>
        </div>
        <div className="playback-controls">
          <button
            className="button secondary"
            onClick={() => {
              if (count === 3) {
                setCount(1);
                setPlaying(true);
              } else setPlaying((p) => !p);
            }}
          >
            {playing && count < 3 ? <Pause size={15} /> : <Play size={15} />}{' '}
            {playing && count < 3 ? 'Pause simulation' : 'Play simulation'}
          </button>
          <button
            className="text-link"
            onClick={() => {
              setPlaying(false);
              setCount((c) => (c === 3 ? 1 : c + 1));
            }}
          >
            {count === 3 ? 'Reset feed' : 'Advance signal'}
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
      <ol className="signal-pipeline">
        {[
          'New signal / demo CVE',
          'Product match',
          'Dependency match',
          'Risk analysis',
          'AI priority',
          'Security action',
        ].map((name, i) => (
          <li key={name}>
            <span>0{i + 1}</span>
            <strong>{name}</strong>
          </li>
        ))}
      </ol>
      <Sheet>
        <fieldset
          className="threat-feed"

          aria-label="Simulated threat signals"
        >
          {threats.slice(0, count).map((t) => (
            <SheetTrigger
              className="threat-feed-row"
              key={t.id}
              onClick={() => setSelected(t)}
            >
              <span className="signal-time">
                {t.time}
                <small>SIMULATED</small>
              </span>
              <span>
                <strong>{t.name}</strong>
                <small>
                  {t.product} · {t.id}
                </small>
              </span>
              <span className={'risk-badge ' + t.severity.toLowerCase()}>
                {t.severity}
              </span>
              <ArrowUpRight size={18} />
            </SheetTrigger>
          ))}
        </fieldset>
        <SheetContent className="threat-sheet">
          <ThreatDetail threat={selected} />
        </SheetContent>
      </Sheet>
      <output className="lab-hint">
        {count} of 3 fictional signals shown.{' '}
        {count === 3
          ? 'Replay complete.'
          : playing
            ? 'Simulation advances while visible.'
            : 'Playback paused.'}{' '}
        No live feed is connected.
      </output>
    </div>
  );
}

export function AgentInvestigation() {
  const [selected, setSelected] = useState(0);
  const agent = agentProfiles[selected];
  return (
    <div className="agent-investigation">
      <fieldset
        className="agent-selectors"

        aria-label="Investigation agents"
      >
        {agentProfiles.map((a, i) => (
          <button
            key={a.name}
            className={selected === i ? 'is-selected' : ''}
            aria-pressed={selected === i}
            onClick={() => setSelected(i)}
          >
            <BrainCircuit size={20} />
            <strong>{a.name}</strong>
            <span>0{i + 1}</span>
          </button>
        ))}
      </fieldset>
      <div className="agent-evidence" aria-live="polite">
        <div className="agent-evidence-heading">
          <h3 className="agent-name">{agent.name}</h3>
          <span>ILLUSTRATIVE EVIDENCE SUMMARY</span>
        </div>
        <div className="analysis-columns">
          <div>
            <span className="mono">INPUT</span>
            <h4>{agent.input}</h4>
            <span className="mono">REASONING CONTEXT</span>
            <p>{agent.context}</p>
          </div>
          <div>
            <span className="mono">CORRELATED EVIDENCE</span>
            <ul>
              {agent.evidence.map((e) => (
                <li key={e}>
                  <Check size={16} />
                  {e}
                </li>
              ))}
            </ul>
            <span className="mono">RISK ASSESSMENT</span>
            <p>{agent.risk}</p>
          </div>
        </div>
        <div className="agent-recommendation">
          <ShieldCheck size={24} />
          <div>
            <span className="mono">RECOMMENDATION READY</span>
            <h4>{agent.recommendation}</h4>
            <p>
              Concise demonstration summaries, not internal AI reasoning.
              Validate evidence and obtain appropriate approval before action.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export function AgentWorkflow() {
  const [step, setStep] = useState(0);
  const steps = [
    'Signal detected',
    'AI investigates',
    'AI correlates evidence',
    'AI evaluates product impact',
    'AI recommends action',
    'Human approval required',
    'Security improvement review',
  ];
  return (
    <div className="investigation-console">
      <SimulationLabel title="AGENTIC INVESTIGATION / DEMONSTRATION" />
      <AgentInvestigation />
      <div className="investigation-sequence">
        <div className="workflow-heading">
          <div>
            <span className="mono">CONTROLLED RESPONSE PATH</span>
            <h3>Make the handoff explicit.</h3>
          </div>
          <button
            className="button secondary"
            onClick={() => setStep((s) => (s === 6 ? 0 : s + 1))}
          >
            {step === 6 ? <RotateCcw size={16} /> : <Play size={16} />}{' '}
            {step === 6 ? 'Restart workflow' : 'Next step'}
          </button>
        </div>
        <ol className="agent-steps">
          {steps.map((s, i) => (
            <li
              key={s}
              className={i === step ? 'active' : i < step ? 'complete' : ''}
            >
              <span>
                {i < step ? (
                  <Check size={15} />
                ) : (
                  String(i + 1).padStart(2, '0')
                )}
              </span>
              <strong>{s}</strong>
              {i === 5 && <LockKeyhole size={16} />}
            </li>
          ))}
        </ol>
        <output className="workflow-status">
          Step {step + 1} of 7: {steps[step]}.
          {step === 5
            ? ' An authorized reviewer must approve any operational action.'
            : ''}
        </output>
      </div>
    </div>
  );
}

const socPanels = [
  {
    id: 'feed',
    name: 'Threat Feed',
    title: 'Signals with product context.',
    rows: threats.map((t) => [t.id, t.product, t.severity + ' · ' + t.name]),
  },
  {
    id: 'risk',
    name: 'Product Risk',
    title: 'Risk is specific to the product.',
    rows: assets.map((a) => [a.id, a.name, a.score + '/100 · ' + a.risk]),
  },
  {
    id: 'events',
    name: 'Security Events',
    title: 'A reviewable incident timeline.',
    rows: [
      ['09:14', 'Signal received', 'Fictional advisory matched'],
      ['09:16', 'Evidence correlated', 'Gateway dependency attached'],
      ['09:18', 'Review pending', 'Human decision required'],
    ],
  },
  {
    id: 'vulns',
    name: 'Vulnerabilities',
    title: 'A match starts the investigation.',
    rows: threats.slice(0, 2).map((t) => [t.id, t.component, t.exposure]),
  },
  {
    id: 'ai',
    name: 'AI Investigations',
    title: 'Five agents. Explicit responsibilities.',
    rows: agentProfiles.map((a, i) => [
      'AGENT-0' + (i + 1),
      a.name,
      a.recommendation,
    ]),
  },
  {
    id: 'suppliers',
    name: 'Supplier Risk',
    title: 'Know where evidence is missing.',
    rows: [
      ['SUP-01', 'Example Embedded Co.', 'Affected-version guidance requested'],
      ['SUP-02', 'Example Motion Systems', 'Runtime evidence pending'],
      ['SUP-03', 'Example Sensor Works', 'Configuration owner identified'],
    ],
  },
  {
    id: 'health',
    name: 'Asset Health',
    title: 'Inventory health, not production telemetry.',
    rows: assets.map((a) => [a.id, a.name, a.status]),
  },
];
export function SecurityOperations() {
  const [panel, setPanel] = useState('feed');
  const [risk, setRisk] = useState('All');
  const [reviewed, setReviewed] = useState(false);
  const [cycle, setCycle] = useState(0);
  const [playing, setPlaying] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useDemoPlayback(playing, ref, () => setCycle((c) => (c + 1) % 3));
  const phases = [
    'Evidence collection',
    'Product context review',
    'Recommendation prepared',
  ];
  const panelRows = (current: (typeof socPanels)[number]) =>
    current.id === 'feed'
      ? current.rows.filter(
          (_, i) => risk === 'All' || threats[i].severity === risk,
        )
      : current.id === 'risk'
        ? current.rows.filter(
            (_, i) => risk === 'All' || assets[i].risk === risk,
          )
        : current.rows;
  return (
    <div className="soc-command" ref={ref}>
      <SimulationLabel title="AI SECURITY COMMAND / DEMO ENVIRONMENT" />
      <div className="command-center-top">
        <div>
          <span className="mono">PRODUCT SECURITY OPERATIONS</span>
          <h3>Context in. Decisions out.</h3>
          <p>All counts and activity below are fictional demonstration data.</p>
        </div>
        <button
          className="button secondary"
          onClick={() => setPlaying((p) => !p)}
        >
          {playing ? <Pause size={15} /> : <Play size={15} />}{' '}
          {playing ? 'Pause demo updates' : 'Animate demo updates'}
        </button>
      </div>
      <div className="command-metrics">
        {[
          ['Active agents', '5'],
          ['Investigations', '12'],
          ['High-risk events', '3'],
          ['Products monitored', '128'],
        ].map(([label, count]) => (
          <div key={label}>
            <span>{label}</span>
            <strong>{count}</strong>
            <small>DEMO COUNT</small>
          </div>
        ))}
      </div>
      <div className="command-status">
        <Activity size={16} />
        <span>{phases[cycle]}</span>
        <span>{playing ? 'SIMULATION PLAYING' : 'SIMULATION PAUSED'}</span>
        <button
          onClick={() => setCycle((c) => (c + 1) % 3)}
          aria-label="Advance demo status"
        >
          <ArrowRight size={17} />
        </button>
      </div>
      <div className="soc-workspace">
        <Tabs
          value={panel}
          onValueChange={(value) => setPanel(String(value))}
          className="soc-panel-tabs"
        >
          <TabsList className="soc-tablist">
            {socPanels.map((p) => (
              <TabsTrigger key={p.id} value={p.id}>
                {p.name}
              </TabsTrigger>
            ))}
          </TabsList>
          {socPanels.map((p) => (
            <TabsContent key={p.id} value={p.id} className="soc-panel">
              <div className="soc-panel-heading">
                <h4>{p.title}</h4>
                {['feed', 'risk'].includes(p.id) && (
                  <label>
                    Risk level
                    <select
                      aria-label="Risk level"
                      value={risk}
                      onChange={(e) => setRisk(e.target.value)}
                    >
                      {['All', 'High', 'Medium', 'Low'].map((r) => (
                        <option key={r}>{r}</option>
                      ))}
                    </select>
                  </label>
                )}
              </div>
              <div className="soc-data-rows">
                {panelRows(p).map(([id, name, detail]) => (
                  <article key={id}>
                    <span className="mono">{id}</span>
                    <h4>{name}</h4>
                    <p>{detail}</p>
                  </article>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
        <aside className="soc-review" aria-label="Example security decision">
          <span className="mono">AI DECISION / EXAMPLE</span>
          <h4>Review the affected component.</h4>
          <p>
            A demonstration signal matches the gateway inventory. Validate
            exposure before choosing a response.
          </p>
          <ul>
            <li>
              <Check size={16} /> Product context attached
            </li>
            <li>
              <Check size={16} /> Component relationship mapped
            </li>
            <li>
              <LockKeyhole size={16} /> Human approval required
            </li>
          </ul>
          <button
            className="button secondary"
            disabled={reviewed}
            onClick={() => setReviewed(true)}
          >
            {reviewed ? 'Marked for demo review' : 'Mark for demo review'}
            <ArrowRight size={15} />
          </button>
          <output className="fineprint">
            {reviewed
              ? 'Demo state updated locally. No case was created or sent.'
              : 'This control changes the demonstration only.'}
          </output>
        </aside>
      </div>
    </div>
  );
}
