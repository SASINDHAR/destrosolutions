import { useEffect, useId, useRef, useState } from 'react';
import {
  ArrowRight,
  Box,
  Cloud,
  Cpu,
  Network,
  ShieldCheck,
  Radio,
  ScanLine,
  ChevronRight,
} from 'lucide-react';
import {
  osLayers,
  vehicleLayers,
  lifecycleLayers,
  attackSurfaces,
  physicalStages,
  supplierStages,
  storyStages,
  type SystemLayer,
} from './security-data';

export function SimulationLabel({
  title = 'SIMULATED ENVIRONMENT',
}: {
  title?: string;
}) {
  return (
    <div className="lab-label">
      <span>
        <span className="lab-dot" />
        {title}
      </span>
      <span>FICTIONAL DATA · NO PRODUCTION CONNECTION</span>
    </div>
  );
}
const heroNodes = [
  {
    name: 'Physical Product',
    x: 20,
    y: 13,
    icon: Box,
    detail: 'Establish the physical system and its operating boundary.',
  },
  {
    name: 'Sensors',
    x: 58,
    y: 15,
    icon: Radio,
    detail: 'Review sensor integrity and how physical inputs reach software.',
  },
  {
    name: 'Software',
    x: 21,
    y: 39,
    icon: Cpu,
    detail: 'Trace components, firmware versions and dependencies.',
  },
  {
    name: 'Connectivity',
    x: 73,
    y: 39,
    icon: Cloud,
    detail: 'Map the remote services and APIs that a product relies on.',
  },
  {
    name: 'Cloud',
    x: 21,
    y: 65,
    icon: Network,
    detail: 'Map product dependencies on remote services and cloud identities.',
  },
  {
    name: 'Threat Intelligence',
    x: 73,
    y: 65,
    icon: Network,
    detail:
      'Match a threat signal to the affected component and product context.',
  },
  {
    name: 'AI Correlation',
    x: 21,
    y: 89,
    icon: ScanLine,
    detail: 'Organize connected evidence into a concise, auditable assessment.',
  },
];
heroNodes.push({
  name: 'Security Operations',
  x: 73,
  y: 89,
  icon: ShieldCheck,
  detail: 'Prepare a controlled response for authorized human review.',
});
const heroEdges = [
  [2, 3],
  [3, 4],
  [0, 1],
  [0, 2],
  [1, 2],
  [1, 3],
  [2, 4],
  [3, 5],
  [4, 5],
  [4, 6],
  [5, 6],
  [6, 7],
];
export function SecurityGridHero() {
  const [selected, setSelected] = useState(5);
  const [paused, setPaused] = useState(false);
  const selectedNode = heroNodes[selected];
  return (
    <div className={'security-grid-hero' + (paused ? ' motion-paused' : '')}>
      <SimulationLabel title="PRODUCT SECURITY OS / DEMO" />
      <div className="system-status">
        <span>
          SYSTEM STATUS: <b>ACTIVE</b>
        </span>
        <span>
          THREAT INTELLIGENCE: <b>CONNECTED</b>
        </span>
        <span>
          AI ANALYSIS: <b>READY</b>
        </span>
      </div>
      <div className="hero-network security-grid">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {heroEdges.map(([a, b], i) => {
            const start = heroNodes[a],
              end = heroNodes[b],
              active = a === selected || b === selected;
            return (
              <g key={i} className={active ? 'path-active' : ''}>
                <path
                  d={`M${start.x},${start.y} L${start.x},${(start.y + end.y) / 2} L${end.x},${(start.y + end.y) / 2} L${end.x},${end.y}`}
                  className="network-line"
                />
                {active && (
                  <path
                    d={`M${start.x},${start.y} L${start.x},${(start.y + end.y) / 2} L${end.x},${(start.y + end.y) / 2} L${end.x},${end.y}`}
                    className="network-packet"
                  />
                )}
              </g>
            );
          })}
        </svg>
        {heroNodes.map((node, i) => {
          const related = heroEdges.some(
            ([a, b]) =>
              (a === selected && b === i) || (b === selected && a === i),
          );
          return (
            <button
              key={node.name}
              className={
                'hero-system-node' +
                (selected === i ? ' is-selected' : related ? ' is-related' : '')
              }
              style={{ left: node.x + '%', top: node.y + '%' }}
              aria-pressed={selected === i}
              onClick={() => setSelected(i)}
              onFocus={() => setSelected(i)}
              onPointerEnter={(e) => {
                if (e.pointerType === 'mouse') setSelected(i);
              }}
            >
              <node.icon size={18} />
              <span>{node.name}</span>
              <small>0{i + 1}</small>
            </button>
          );
        })}
        <span className="demo-signal">SIMULATED SIGNAL / COMPONENT MATCH</span>
      </div>
      <div className="hero-node-context" aria-live="polite">
        <span className="mono">SELECTED CONTEXT / 0{selected + 1}</span>
        <h2>{selectedNode.name}</h2>
        <p>{selectedNode.detail}</p>
      </div>
      <div className="lab-hint">
        <span>Explore a node. Follow its connections.</span>
        <button
          className="motion-control"
          aria-pressed={paused}
          onClick={() => setPaused((value) => !value)}
        >
          {paused ? 'Resume motion' : 'Pause motion'}
        </button>
      </div>
    </div>
  );
}

export function SystemArchitecture({
  variant = 'os',
}: {
  variant?: 'os' | 'vehicle' | 'lifecycle';
}) {
  const layers =
    variant === 'vehicle'
      ? vehicleLayers
      : variant === 'lifecycle'
        ? lifecycleLayers
        : osLayers;
  const [active, setActive] = useState(0);
  const id = useId();
  const selected = layers[active];
  return (
    <div className={'system-architecture variant-' + variant}>
      <SimulationLabel
        title={
          variant === 'os'
            ? 'PRODUCT SECURITY OS / CONCEPT ARCHITECTURE'
            : variant === 'vehicle'
              ? 'SDV / CONCEPT ARCHITECTURE'
              : 'PRODUCT LIFECYCLE / CONCEPT'
        }
      />
      <div className="architecture-workspace">
        <fieldset
          className="layer-rail"

          aria-label={
            variant === 'os'
              ? 'Product Security OS layers'
              : variant === 'vehicle'
                ? 'Vehicle architecture layers'
                : 'Product lifecycle stages'
          }
        >
          {layers.map((layer, i) => (
            <button
              key={layer.id}
              className={active === i ? 'is-selected' : ''}
              onClick={() => setActive(i)}
              aria-pressed={active === i}
              aria-controls={id}
            >
              <span>{String(i + 1).padStart(2, '0')}</span>
              <strong>{layer.name}</strong>
              <ChevronRight size={17} />
            </button>
          ))}
        </fieldset>
        <LayerDetail layer={selected} index={active} id={id} />
      </div>
    </div>
  );
}
function LayerDetail({
  layer,
  index,
  id,
}: {
  layer: SystemLayer;
  index: number;
  id: string;
}) {
  return (
    <div className="layer-detail security-grid" id={id} aria-live="polite">
      <div className="layer-detail-top">
        <span className="mono">
          LAYER / {String(index + 1).padStart(2, '0')}
        </span>
        <Cpu size={30} strokeWidth={1.2} />
      </div>
      <h3>{layer.summary}</h3>
      <dl>
        <div>
          <dt>INPUT</dt>
          <dd>{layer.input}</dd>
        </div>
        <div>
          <dt>CONNECTED EVIDENCE</dt>
          <dd>{layer.evidence}</dd>
        </div>
        <div>
          <dt>SECURITY CONTEXT</dt>
          <dd>{layer.concern}</dd>
        </div>
      </dl>
      <div className="layer-handoff">
        <ArrowRight size={18} />
        <div>
          <span>NEXT RELATIONSHIP</span>
          <p>{layer.next}</p>
        </div>
      </div>
    </div>
  );
}

export function AttackSurface() {
  const [active, setActive] = useState(0);
  const surface = attackSurfaces[active];
  return (
    <div className="attack-explorer">
      <SimulationLabel title="ATTACK SURFACE / CONCEPT" />
      <div className="attack-layout">
        <div className="attack-map security-grid">
          <div className="attack-core">
            <Box size={32} />
            <strong>
              CONNECTED
              <br />
              PRODUCT
            </strong>
            <span>System boundary</span>
          </div>
          <fieldset
            className="surface-nodes"

            aria-label="Attack surfaces"
          >
            {attackSurfaces.map(([name], i) => (
              <button
                key={name}
                aria-pressed={i === active}
                className={i === active ? 'is-selected' : ''}
                onClick={() => setActive(i)}
                onPointerEnter={(e) => {
                  if (e.pointerType === 'mouse') setActive(i);
                }}
                onFocus={() => setActive(i)}
              >
                <span>0{i + 1}</span>
                {name}
                <span className="surface-indicator" />
              </button>
            ))}
          </fieldset>
        </div>
        <div className="surface-context" aria-live="polite">
          <span className="mono">SELECTED ATTACK SURFACE</span>
          <h3>{surface[0]}</h3>
          <dl>
            <div>
              <dt>POTENTIAL RISK</dt>
              <dd>{surface[1]}</dd>
            </div>
            <div>
              <dt>PRODUCT CONTEXT</dt>
              <dd>{surface[2]}</dd>
            </div>
            <div>
              <dt>SECURITY RESPONSE</dt>
              <dd>
                {
                  [
                    'Validate inputs and retain safe fallback behavior.',
                    'Confirm firmware exposure and test a scoped update.',
                    'Review authorization and validate access restrictions.',
                    'Review app identity controls and shared dependencies.',
                    'Verify service permissions and affected product connections.',
                    'Approve release integrity, rollback and recovery checks.',
                    'Trace affected versions and obtain remediation evidence.',
                    'Assign an evidence owner and confirm affected scope.',
                    'Test segmentation and permitted communication paths.',
                  ][active]
                }
              </dd>
            </div>
          </dl>
          <p className="fineprint">
            Conceptual risks, not findings in a real product. Product
            architecture determines actual exposure.
          </p>
        </div>
      </div>
    </div>
  );
}

export function PhysicalAI() {
  const [active, setActive] = useState(0);
  const [system, setSystem] = useState('Robots');
  return (
    <div className="physical-experience">
      <div className="physical-heading">
        <h3>
          AI can sense.
          <br />
          AI can decide.
          <br />
          <span>AI can act.</span>
        </h3>
        <div>
          <label htmlFor="physical-system">Explore a physical system</label>
          <select
            id="physical-system"
            value={system}
            onChange={(e) => setSystem(e.target.value)}
          >
            {[
              'Robots',
              'Vehicles',
              'Factories',
              'Industrial Machines',
              'Connected Products',
              'Autonomous Systems',
            ].map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          <p>
            Conceptual security context. Software decisions can have physical
            consequences.
          </p>
        </div>
      </div>
      <fieldset
        className="physical-stage-list"

        aria-label="Physical AI stages"
      >
        {physicalStages.map(([name], i) => (
          <button
            key={name}
            aria-pressed={active === i}
            className={active === i ? 'is-selected' : ''}
            onClick={() => setActive(i)}
          >
            <span>0{i + 1}</span>
            <strong>{name}</strong>
            <ArrowRight size={17} />
          </button>
        ))}
      </fieldset>
      <div className="physical-evidence" aria-live="polite">
        <span className="mono">
          {system.toUpperCase()} / {physicalStages[active][0].toUpperCase()}
        </span>
        <h4>{physicalStages[active][1]}</h4>
        <p>
          <ShieldCheck size={18} />
          {physicalStages[active][2]}
        </p>
        <p className="fineprint">
          {system === 'Vehicles'
            ? 'Consider vehicle functions and in-service operating conditions.'
            : system === 'Robots'
              ? 'Consider control loops, movement and nearby people.'
              : system === 'Factories'
                ? 'Consider process continuity and connected production systems.'
                : system === 'Industrial Machines'
                  ? 'Consider machine state, access boundaries and recovery constraints.'
                  : 'Consider firmware, applications and remote-service dependencies.'}
        </p>
      </div>
    </div>
  );
}

export function SupplierGraph() {
  const [active, setActive] = useState(0);
  return (
    <div className="supplier-experience">
      <SimulationLabel title="SUPPLIER ECOSYSTEM / CONCEPT" />
      <fieldset
        className="supplier-chain"

        aria-label="Supplier security tiers"
      >
        {supplierStages.map(([name, component], i) => (
          <button
            key={name}
            aria-pressed={active === i}
            className={active === i ? 'is-selected' : ''}
            onClick={() => setActive(i)}
          >
            <span>0{i + 1}</span>
            <Network size={24} />
            <strong>{name}</strong>
            <small>{component}</small>
            {i < 4 && <ArrowRight size={16} />}
          </button>
        ))}
      </fieldset>
      <div className="supplier-evidence" aria-live="polite">
        <div>
          <span className="mono">
            {supplierStages[active][0].toUpperCase()} / EVIDENCE PATH
          </span>
          <h3>{supplierStages[active][2]}</h3>
        </div>
        <div className="tags">
          <span>SBOM</span>
          <span>Dependencies</span>
          <span>Vulnerabilities</span>
          <span>Supplier risk</span>
        </div>
      </div>
      <p className="fineprint supplier-note">
        Conceptual ecosystem. No supplier partnership or relationship is
        claimed.
      </p>
    </div>
  );
}

export function ScrollStory() {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (entry)
          setActive(Number((entry.target as HTMLElement).dataset.stage));
      },
      { rootMargin: '-20% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] },
    );
    root.querySelectorAll('[data-stage]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return (
    <div className="scroll-story" ref={ref}>
      <div className="story-track security-grid">
        <span className="mono">THE EVOLUTION OF A PRODUCT</span>
        <div className="story-number" aria-hidden="true">
          {String(active + 1).padStart(2, '0')}
          <span>/08</span>
        </div>
        <h3>{storyStages[active][0]}</h3>
        <div className="story-progress" aria-hidden="true">
          {storyStages.map(([name], i) => (
            <span className={i <= active ? 'filled' : ''} key={name} />
          ))}
        </div>
        <p>{storyStages[active][1]}</p>
        <span className="fineprint">Scroll to follow the system.</span>
      </div>
      <ol className="story-stages">
        {storyStages.map(([title, body], i) => (
          <li
            key={title}
            data-stage={i}
            className={active === i ? 'is-current' : ''}
          >
            <span className="mono">{String(i + 1).padStart(2, '0')}</span>
            <h3>{title}</h3>
            <p>{body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
