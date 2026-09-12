import { useEffect, useState, type ReactNode } from 'react';
import {
  ArrowUpRight,
  ArrowRight,
  ShieldCheck,
  Menu,
  Cpu,
  Network,
  Box,
  Radio,
  Cloud,
  BrainCircuit,
  ScanLine,
  Activity,
  Layers3,
  LockKeyhole,
  Check,
  ChevronRight,
  Play,
  RotateCcw,
} from 'lucide-react';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import SiteSearch from './site-search';
import { sitePath } from './site-path';
import { navigation, routeInfo, contact, pillars, agents } from './content';

export function LinkButton({
  href,
  children,
  secondary = false,
}: {
  href: string;
  children: ReactNode;
  secondary?: boolean;
}) {
  return (
    <a
      className={'button' + (secondary ? ' secondary' : '')}
      href={sitePath(href)}
      onPointerMove={(event) => {
        if (
          event.pointerType !== 'mouse' ||
          matchMedia('(prefers-reduced-motion: reduce)').matches
        )
          return;
        const rect = event.currentTarget.getBoundingClientRect();
        const x = (event.clientX - rect.left - rect.width / 2) * 0.035;
        const y = (event.clientY - rect.top - rect.height / 2) * 0.06;
        event.currentTarget.style.transform = `translate(${x}px, ${y}px)`;
      }}
      onPointerLeave={(event) => {
        event.currentTarget.style.transform = '';
      }}
      onBlur={(event) => {
        event.currentTarget.style.transform = '';
      }}
    >
      {children}
      <ArrowUpRight size={17} />
    </a>
  );
}
export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}
export function Section({
  id,
  kicker,
  title,
  description,
  children,
  className = '',
}: {
  id?: string;
  kicker?: string;
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={'section ' + className}>
      <div className="container">
        <div className="section-heading">
          <div>
            {kicker && <Eyebrow>{kicker}</Eyebrow>}
            <h2>{title}</h2>
          </div>
          {description && <p className="section-intro">{description}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}
function Brand() {
  return (
    <a className="brand" href={sitePath('/')} aria-label="DestroSolutions home">
      <ShieldCheck size={28} strokeWidth={1.5} />
      <span>
        destro<span>solutions</span>
        <b>.</b>
      </span>
    </a>
  );
}
export function Header({ path }: { path: string }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 30);
        const height =
          document.documentElement.scrollHeight - window.innerHeight;
        document.documentElement.style.setProperty(
          '--progress',
          String(height > 0 ? window.scrollY / height : 0),
        );
      });
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => {
      window.removeEventListener('scroll', update);
      cancelAnimationFrame(frame);
    };
  }, []);
  return (
    <header className={'header' + (scrolled ? ' scrolled' : '')}>
      <div className="scroll-progress" />
      <div className="container header-inner">
        <Brand />
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map(([name, url]) => (
            <a
              key={url}
              href={sitePath(url)}
              aria-current={path === url ? 'page' : undefined}
            >
              {name}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <SiteSearch entries={Object.entries(routeInfo)} />
          <a className="header-contact" href={sitePath('/contact')}>
            Contact Us <ArrowUpRight size={15} />
          </a>
          <Sheet>
            <SheetTrigger className="mobile-menu" aria-label="Open navigation">
              <Menu />
            </SheetTrigger>
            <SheetContent className="mobile-sheet">
              <SheetTitle>Explore DestroSolutions</SheetTitle>
              <SheetDescription>
                Product security for the physical world.
              </SheetDescription>
              <nav aria-label="Mobile navigation">
                {[...navigation, ['Contact Us', '/contact']].map(
                  ([name, url]) => (
                    <a
                      key={url}
                      href={sitePath(url)}
                      aria-current={path === url ? 'page' : undefined}
                    >
                      {name}
                      <ArrowUpRight size={18} />
                    </a>
                  ),
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
export function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-top">
          <Brand />
          <p>
            Intelligence for connected products.
            <br />
            Security for the physical world.
          </p>
          <a href="https://www.linkedin.com/company/destrosolutions">
            LinkedIn <ArrowUpRight size={14} />
          </a>
          <a href="https://github.com/SASINDHAR/destrosolutions">
            GitHub <ArrowUpRight size={14} />
          </a>
        </div>
        <div className="footer-grid">
          {[
            [
              'Products',
              ['Platform', '/product'],
              ['Capabilities', '/features'],
            ],
            [
              'Solutions',
              ['Security solutions', '/solutions'],
              ['Example workflows', '/use-cases'],
            ],
            [
              'Industries',
              ['Industry overview', '/industries'],
              ['Automotive', '/solutions/automotive'],
            ],
            [
              'Technology',
              ['Architecture', '/technology'],
              ['Physical AI', '/solutions/physical-ai'],
            ],
            ['Training', ['Learning areas', '/training']],
            ['Company', ['About us', '/company'], ['Careers', '/careers']],
            ['Resources', ['Insights', '/insights'], ['Contact', '/contact']],
          ].map(([label, ...links]) => (
            <div key={label as string}>
              <h3>{label as string}</h3>
              {(links as string[][]).map(([n, h]) => (
                <a key={h} href={sitePath(h)}>
                  {n}
                </a>
              ))}
            </div>
          ))}
        </div>
        <div className="footer-contact">
          <span>{contact.location}</span>
          <a href={'mailto:' + contact.email}>{contact.email}</a>
          <a href="tel:+919398793452">{contact.phone}</a>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} DestroSolutions</span>
          <div>
            <a href={sitePath('/privacy')}>Privacy</a>
            <a href={sitePath('/terms')}>Terms</a>
            <a href={sitePath('/imprint')}>Imprint</a>
          </div>
          <a href="#main">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
export function CTA() {
  return (
    <section className="cta-section">
      <div className="container cta-inner">
        <div>
          <Eyebrow>START WITH YOUR PRODUCT</Eyebrow>
          <h2>
            Make security part of
            <br />
            what you build.
          </h2>
          <p>
            Bring your architecture. Let’s discuss the intelligence it needs.
          </p>
        </div>
        <LinkButton href="/contact">Talk to DestroSolutions</LinkButton>
      </div>
    </section>
  );
}
export function PageHero({
  kicker,
  title,
  description,
  children,
}: {
  kicker: string;
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <section className="page-hero">
      <div className="container">
        <a className="breadcrumb" href={sitePath('/')}>
          DESTROSOLUTIONS <ChevronRight size={13} /> {kicker}
        </a>
        <h1>{title}</h1>
        <p>{description}</p>
        {children && <div className="hero-actions">{children}</div>}
      </div>
    </section>
  );
}
const nodes = [
  {
    name: 'Physical Product',
    icon: Box,
    detail: 'Establish the product, operating environment and system boundary.',
  },
  {
    name: 'Sensors',
    icon: Radio,
    detail:
      'Understand the interfaces that connect the product to its environment.',
  },
  {
    name: 'Software',
    icon: Layers3,
    detail: 'Connect components, firmware versions and supplier dependencies.',
  },
  {
    name: 'Cloud',
    icon: Cloud,
    detail: 'Trace APIs, connected services and telemetry relationships.',
  },
  {
    name: 'AI',
    icon: BrainCircuit,
    detail: 'Bring evidence together to support contextual investigation.',
  },
  {
    name: 'Cybersecurity Intelligence',
    icon: ShieldCheck,
    detail: 'Correlate relevant threat signals with affected product context.',
  },
  {
    name: 'Autonomous Response',
    icon: Activity,
    detail: 'Explore bounded response workflows with explicit human approval.',
  },
];
export function CommandDiagram() {
  const [selected, setSelected] = useState(2);
  return (
    <div className="command-interface">
      <div className="interface-bar">
        <span>
          <span className="status-dot" /> SECURITY PLATFORM ONLINE
        </span>
        <span>INTERACTIVE DEMO</span>
      </div>
      <div className="command-title">
        <span>PRODUCT SECURITY OS</span>
        <span>CONTEXT / 01</span>
      </div>
      <div className="command-nodes">
        {nodes.map((n, i) => (
          <button
            key={n.name}
            className={'command-node ' + (selected === i ? 'selected' : '')}
            onClick={() => setSelected(i)}
            aria-pressed={selected === i}
          >
            <span className="node-number">0{i + 1}</span>
            <n.icon size={21} strokeWidth={1.4} />
            <span>{n.name}</span>
            <span className="node-signal" />
          </button>
        ))}
      </div>
      <div className="node-detail" aria-live="polite">
        <span className="mono">SELECTED LAYER / 0{selected + 1}</span>
        <h2>{nodes[selected].name}</h2>
        <p>{nodes[selected].detail}</p>
      </div>
      <div className="interface-bottom">
        <span>Illustrative architecture · No production connection</span>
        <ScanLine size={16} />
      </div>
    </div>
  );
}
export function Flow({ items }: { items: string[] }) {
  return (
    <ol className="flow">
      {items.map((item, i) => (
        <li key={item}>
          <span>{String(i + 1).padStart(2, '0')}</span>
          <strong>{item}</strong>
          {i < items.length - 1 && <ArrowRight size={16} aria-hidden="true" />}
        </li>
      ))}
    </ol>
  );
}
export function Pillars() {
  return (
    <div className="pillar-grid">
      {pillars.map((p, i) => {
        const Icon = [Layers3, Network, BrainCircuit][i];
        return (
          <article className="pillar" key={p.id}>
            <div className="card-top">
              <Icon size={25} strokeWidth={1.4} />
              <span>0{i + 1}</span>
            </div>
            <Eyebrow>{p.label.split(' / ')[1]}</Eyebrow>
            <h3>{p.title}</h3>
            <p>{p.description}</p>
            <div className="tags">
              {p.tags.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
            <a className="text-link" href={sitePath(p.href)}>
              Explore capability <ArrowUpRight size={16} />
            </a>
          </article>
        );
      })}
    </div>
  );
}
const layers = [
  {
    id: 'sources',
    label: '01 / DATA SOURCES',
    title: 'A connected view of your product.',
    desc: 'Product inventories, supplier information, threat intelligence, telemetry and security signals provide context for investigation.',
    tags: [
      'Product intelligence',
      'Threat intelligence',
      'Supplier intelligence',
      'Telemetry',
      'Security signals',
    ],
  },
  {
    id: 'engine',
    label: '02 / AI ENGINE',
    title: 'Context turns signals into priorities.',
    desc: 'Explore how risk analysis, correlation and contextual reasoning can support a reviewable security recommendation.',
    tags: [
      'Risk analysis',
      'Threat correlation',
      'Contextual reasoning',
      'Prioritization',
    ],
  },
  {
    id: 'automation',
    label: '03 / AGENTIC AUTOMATION',
    title: 'A workflow with clear boundaries.',
    desc: 'Connect detection, investigation and response planning. Human approval and defined permissions govern operational action.',
    tags: ['Detect', 'Investigate', 'Decide', 'Respond', 'Learn'],
  },
];
export function PlatformArchitecture() {
  return (
    <Tabs defaultValue="sources" className="architecture-tabs">
      <TabsList className="architecture-tablist">
        {layers.map((l) => (
          <TabsTrigger key={l.id} value={l.id}>
            {l.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {layers.map((l) => (
        <TabsContent key={l.id} value={l.id} className="architecture-panel">
          <div className="engine-mark">
            <Cpu size={48} strokeWidth={1} />
            <span>
              DESTRO
              <br />
              INTELLIGENCE
            </span>
          </div>
          <div>
            <Eyebrow>PLATFORM ARCHITECTURE</Eyebrow>
            <h3>{l.title}</h3>
            <p>{l.desc}</p>
            <div className="tags">
              {l.tags.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </div>
          <div className="architecture-output">
            <ShieldCheck size={28} />
            <strong>
              Product-specific
              <br />
              security decisions
            </strong>
            <span>Evidence → Review → Action</span>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
const demoProducts = [
  {
    name: 'Vehicle Gateway',
    id: 'VG-042',
    version: '4.2.1',
    score: 74,
    supplier: 'Example Embedded Co.',
    components: ['Gateway firmware', 'Connectivity library', 'TLS dependency'],
    assets: '12',
    risk: 'High',
  },
  {
    name: 'Robot Controller',
    id: 'RC-018',
    version: '2.8.0',
    score: 52,
    supplier: 'Example Motion Systems',
    components: ['Control firmware', 'Edge runtime', 'Telemetry client'],
    assets: '8',
    risk: 'Medium',
  },
  {
    name: 'Connected Sensor',
    id: 'CS-007',
    version: '1.6.3',
    score: 28,
    supplier: 'Example Sensor Works',
    components: ['Sensor firmware', 'Radio stack', 'Device SDK'],
    assets: '24',
    risk: 'Low',
  },
];
export function DashboardPreview() {
  const [index, setIndex] = useState(0);
  const product = demoProducts[index];
  return (
    <div className="dashboard">
      <div className="interface-bar">
        <span>
          <Layers3 size={15} /> PRODUCT INTELLIGENCE
        </span>
        <span>FICTIONAL DEMONSTRATION DATA</span>
      </div>
      <div className="dashboard-body">
        <div className="product-selector">
          <label htmlFor="demo-product">Product inventory</label>
          <select
            id="demo-product"
            value={index}
            onChange={(e) => setIndex(Number(e.target.value))}
          >
            {demoProducts.map((p, i) => (
              <option value={i} key={p.id}>
                {p.name}
              </option>
            ))}
          </select>
          <div className="inventory-meta">
            <span>
              PRODUCT ID<strong>{product.id}</strong>
            </span>
            <span>
              VERSION<strong>{product.version}</strong>
            </span>
            <span>
              ASSET INVENTORY<strong>{product.assets} demo assets</strong>
            </span>
            <span>
              CONFIGURATION<strong>Reference environment</strong>
            </span>
          </div>
        </div>
        <div className="product-context" aria-live="polite">
          <div className="risk-row">
            <div>
              <Eyebrow>PRODUCT RISK / ILLUSTRATIVE</Eyebrow>
              <h3>{product.name}</h3>
            </div>
            <div className="risk-score">
              <strong>
                {product.score}
                <small>/100</small>
              </strong>
              <span>{product.risk} · Example score</span>
            </div>
          </div>
          <div className="component-graph">
            <div className="graph-root">
              <Box size={20} />
              {product.name}
            </div>
            <div className="graph-children">
              {product.components.map((c, i) => (
                <div key={c}>
                  <Layers3 size={16} />
                  <span>{c}</span>
                  <small>{i === 2 ? 'Dependency' : 'Component'}</small>
                </div>
              ))}
            </div>
            <div className="supplier-line">
              <Network size={16} />
              <span>Supplier relationship</span>
              <strong>{product.supplier}</strong>
            </div>
          </div>
          <div className="demo-timeline">
            <span>
              <b>09:10</b> Inventory reviewed
            </span>
            <span>
              <b>09:14</b> Demo vulnerability matched
            </span>
            <span>
              <b>09:18</b> Triage queued
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
export function ThreatFlow() {
  return (
    <div className="threat-panel">
      <Flow
        items={[
          'Threat feed',
          'AI correlation',
          'Product context',
          'Risk prioritization',
          'Security action',
        ]}
      />
      <div className="threat-record">
        <div>
          <Eyebrow>ILLUSTRATIVE THREAT RECORD</Eyebrow>
          <h3>
            From a global signal
            <br />
            to a scoped investigation.
          </h3>
          <p>
            Fictional example. No real vulnerability, threat actor or exploit is
            represented.
          </p>
        </div>
        <dl>
          {[
            ['CVE reference', 'DEMO-VULN-001 · not a real CVE'],
            ['Threat actor', 'Example actor profile'],
            ['Attack pattern', 'Exposed service dependency'],
            ['Exploit evidence', 'Unverified in this scenario'],
            ['Affected product', 'Vehicle Gateway / 4.2.1'],
            ['Risk score', '74 / 100 · illustrative'],
          ].map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
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
    <div className="agent-workflow">
      <div className="workflow-heading">
        <div>
          <Eyebrow>EXAMPLE WORKFLOW</Eyebrow>
          <h3>Intelligence, with accountability.</h3>
          <p>
            Explore the sequence. This demonstration does not execute security
            actions.
          </p>
        </div>
        <button
          className="button secondary"
          onClick={() => setStep(step === steps.length - 1 ? 0 : step + 1)}
        >
          {step === steps.length - 1 ? (
            <RotateCcw size={16} />
          ) : (
            <Play size={16} />
          )}{' '}
          {step === steps.length - 1 ? 'Restart workflow' : 'Next step'}
        </button>
      </div>
      <ol className="agent-steps">
        {steps.map((s, i) => (
          <li
            key={s}
            className={i === step ? 'active' : i < step ? 'complete' : ''}
          >
            <span>
              {i < step ? <Check size={15} /> : String(i + 1).padStart(2, '0')}
            </span>
            <strong>{s}</strong>
            {i === 5 && <LockKeyhole size={16} />}
          </li>
        ))}
      </ol>
      <output className="workflow-status">
        Step {step + 1} of {steps.length}: {steps[step]}.
        {step === 5
          ? ' An authorized reviewer must evaluate the recommendation before any operational action.'
          : ''}
      </output>
      <div className="agent-grid">
        {agents.map(([name, description]) => (
          <article key={name}>
            <BrainCircuit size={21} />
            <h4>{name}</h4>
            <p>{description}</p>
          </article>
        ))}
      </div>
      <p className="fineprint">
        Illustrative agent responsibilities; deployment scope and available
        integrations are confirmed during a platform discussion.
      </p>
    </div>
  );
}
export function SecurityOperations() {
  const [filter, setFilter] = useState('All');
  const [reviewed, setReviewed] = useState(false);
  const events = [
    [
      'EVT-021',
      'Vehicle Gateway',
      'Component exposure',
      'High',
      'Threat intelligence',
    ],
    [
      'EVT-020',
      'Robot Controller',
      'Supplier evidence needed',
      'Medium',
      'Supplier risk',
    ],
    [
      'EVT-019',
      'Connected Sensor',
      'Configuration review',
      'Low',
      'Asset inventory',
    ],
  ];
  const shown = events.filter((e) => filter === 'All' || e[3] === filter);
  return (
    <div className="soc">
      <div className="interface-bar">
        <span>
          <Activity size={15} /> LIVE DEMO ENVIRONMENT
        </span>
        <span>FICTIONAL DATA · NO PRODUCTION CONNECTION</span>
      </div>
      <div className="soc-heading">
        <div>
          <Eyebrow>PRODUCT SECURITY OPERATIONS</Eyebrow>
          <h3>See the context. Review the action.</h3>
        </div>
        <label>
          Risk level
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            {['All', 'High', 'Medium', 'Low'].map((f) => (
              <option key={f}>{f}</option>
            ))}
          </select>
        </label>
      </div>
      <div className="soc-grid">
        <div className="event-list">
          <div className="list-heading">
            THREAT EVENTS <span>{shown.length} in this view</span>
          </div>
          {shown.map(([id, product, issue, risk, source]) => (
            <article key={id}>
              <div>
                <span className={'risk-badge ' + risk.toLowerCase()}>
                  {risk}
                </span>
                <span className="mono">{id}</span>
              </div>
              <h4>{product}</h4>
              <p>{issue}</p>
              <span className="fineprint">{source}</span>
            </article>
          ))}
        </div>
        <div className="soc-decision">
          <Eyebrow>AI DECISION / EXAMPLE</Eyebrow>
          <h4>Review the affected component.</h4>
          <p>
            A demonstration signal matches the gateway inventory. Validate
            exposure and request supplier evidence before remediation.
          </p>
          <div className="decision-evidence">
            <span>
              <Check size={14} /> Product context attached
            </span>
            <span>
              <Check size={14} /> Component relationship mapped
            </span>
            <span>
              <LockKeyhole size={14} /> Operational action requires approval
            </span>
          </div>
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
              : 'Changes affect this demonstration only.'}
          </output>
        </div>
      </div>
      <div className="demo-timeline">
        <span>
          <b>09:14</b> Signal received
        </span>
        <span>
          <b>09:16</b> Context correlated
        </span>
        <span>
          <b>09:18</b> {reviewed ? 'Review marked' : 'Awaiting review'}
        </span>
      </div>
    </div>
  );
}
export function Motion() {
  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    if (media.matches) return;
    const sections = document.querySelectorAll(
      '.section-heading,.pillar,.industry-card',
    );
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('revealed');
            observer.unobserve(e.target);
          }
        }),
      { threshold: 0.08 },
    );
    sections.forEach((e) => {
      e.classList.add('reveal-ready');
      observer.observe(e);
    });
    return () => observer.disconnect();
  }, []);
  return null;
}
