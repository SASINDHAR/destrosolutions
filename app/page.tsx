import SiteSearch from './site-search';
import IndustryCompare from './industry-compare';
import EnquiryBuilder from './enquiry-builder';
import { sitePath } from './site-path';

import {
  ArrowUpRight,
  ArrowRight,
  ShieldCheck,
  Network,
  Cpu,
  Layers3,
  ScanLine,
  Check,
  Menu,
  Car,
  Plane,
  TrainFront,
  Ship,
  Radio,
  CircleDot,
  ChevronRight,
} from 'lucide-react';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import PlatformExplorer from './platform-explorer';
import SecurityDiagram from './security-diagram';
const live = 'https://www.destrosolutions.com';
const navigation = [
  ['Platform', '/product'],
  ['Capabilities', '/features'],
  ['Solutions', '/solutions'],
  ['Use cases', '/use-cases'],
  ['Resources', live + '/blog'],
];
function Brand() {
  return (
    <a className="brand" href={sitePath('/')} aria-label="DestroSolutions home">
      <span className="brand-icon">
        <ShieldCheck size={23} />
      </span>
      <span>
        destro<span className="brand-light">solutions</span>
        <span className="brand-dot">.</span>
      </span>
    </a>
  );
}
function Header({ path = '/' }: { path?: string }) {
  return (
    <header className="header">
      <div className="container header-inner">
        <Brand />
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map(([n, h]) => (
            <a
              href={sitePath(h)}
              key={n}
              aria-current={
                path === h ||
                (h === '/solutions' && path.startsWith('/solutions/'))
                  ? 'page'
                  : undefined
              }
            >
              {n}
            </a>
          ))}
          <a href={live + '/training'}>
            Training <ArrowUpRight size={12} />
          </a>
        </nav>
        <a className="button small header-cta" href={sitePath('/contact')}>
          Book a demo <ArrowUpRight size={16} />
        </a>
        <SiteSearch entries={Object.entries(routeInfo)} />
        <Sheet>
          <SheetTrigger className="mobile-menu" aria-label="Open navigation">
            <Menu />
          </SheetTrigger>
          <SheetContent className="mobile-sheet">
            <SheetTitle>Explore DestroSolutions</SheetTitle>
            <SheetDescription>
              Product security for a connected world.
            </SheetDescription>
            <nav>
              {navigation.map(([n, h]) => (
                <a key={n} href={sitePath(h)}>
                  {n}
                  <ArrowUpRight size={18} />
                </a>
              ))}
              <a href={live + '/training'}>Training</a>
              <a href={sitePath('/contact')}>Book a demo</a>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
const sectors = [
  {
    name: 'Automotive',
    slug: 'automotive',
    icon: Car,
    desc: 'From connected vehicles to every component in the supply chain.',
    image: 'automotive',
  },
  {
    name: 'Aviation',
    slug: 'aviation',
    icon: Plane,
    desc: 'Security intelligence for aircraft, ground systems and operations.',
    image: 'aviation',
  },
  {
    name: 'Railway',
    slug: 'railway',
    icon: TrainFront,
    desc: 'Protect signalling, rolling stock and critical rail networks.',
    image: 'railway',
  },
  {
    name: 'Maritime',
    slug: 'maritime',
    icon: Ship,
    desc: 'Connect cyber risk across vessels, ports and shore operations.',
    image: 'maritime',
  },
];
const pillars = [
  {
    icon: Layers3,
    num: '01',
    title: 'Know your product.',
    subtitle: 'Product Intelligence Suite',
    desc: 'Connect software components, firmware and supplier dependencies to the vulnerabilities that affect your products.',
    tags: ['SBOM visibility', 'Risk prioritization'],
  },
  {
    icon: Network,
    num: '02',
    title: 'Connect the signals.',
    subtitle: 'Threat Intel Exchange',
    desc: 'Bring internal and external intelligence together. Share relevant indicators across your ecosystem using open standards.',
    tags: ['STIX / TAXII', 'Collective defence'],
  },
  {
    icon: Cpu,
    num: '03',
    title: 'Move from insight to action.',
    subtitle: 'Agentic AI Automation',
    desc: 'Automate investigation, case creation and response workflows, with human review for safety-critical decisions.',
    tags: ['PSIRT workflows', 'Human oversight'],
  },
];
function Hero() {
  return (
    <section className="hero hero-v2">
      <div className="container hero-grid">
        <div className="hero-content">
          <div className="eyebrow">PRODUCT SECURITY. CONNECTED.</div>
          <h1>
            Product security.
            <br />
            Built for the
            <br />
            <span>physical world.</span>
          </h1>
          <p className="hero-copy">
            Connect threat intelligence, product context and AI-assisted
            response. Protect the systems that move your business forward.
          </p>
          <div className="actions">
            <a className="button" href={sitePath('/contact')}>
              Book a platform demo <ArrowUpRight size={18} />
            </a>
            <a className="button secondary" href={sitePath('/product')}>
              Explore the platform <ArrowRight size={18} />
            </a>
          </div>
          <div className="hero-note">
            <ShieldCheck size={17} /> Built for connected products and physical
            AI.
          </div>
        </div>
        <SecurityDiagram />
      </div>
      <div className="container hero-bottom">
        <span>FROM SOFTWARE DEPENDENCIES TO REAL-WORLD CONSEQUENCES</span>
        <a href="#platform">
          Discover the platform <ArrowRight size={16} />
        </a>
      </div>
    </section>
  );
}
function IndustryStrip() {
  return (
    <div className="industry-strip">
      <div className="container">
        <span className="strip-label">
          BUILT FOR A<br />
          CONNECTED WORLD
        </span>
        {sectors.map((s) => (
          <a href={sitePath('/solutions/' + s.slug)} key={s.slug}>
            <s.icon size={21} />
            {s.name}
          </a>
        ))}
        <a href={sitePath('/solutions/physical-ai')}>
          <Cpu size={21} />
          Physical AI
        </a>
      </div>
    </div>
  );
}
function Platform() {
  return (
    <section className="section container" id="platform">
      <div className="section-heading">
        <div>
          <div className="eyebrow blue">ONE PLATFORM. A COMPLETE PICTURE.</div>
          <h2>
            Less noise.
            <br />
            <span>More intelligence.</span>
          </h2>
        </div>
        <div className="section-intro">
          <p>
            Security doesn’t stop at the alert. Connect your product landscape,
            threat intelligence and response in one continuous workflow.
          </p>
          <a className="text-link" href={sitePath('/product')}>
            Meet your security operating system <ArrowUpRight size={17} />
          </a>
        </div>
      </div>
      <div className="pillar-grid">
        {pillars.map((p) => (
          <a
            className="pillar"
            href={sitePath(
              '/features#' +
                [
                  'product-intelligence',
                  'threat-exchange',
                  'response-automation',
                ][Number(p.num) - 1],
            )}
            key={p.num}
          >
            <div className="pillar-top">
              <span className="icon-box">
                <p.icon size={24} />
              </span>
              <span>{p.num}</span>
            </div>
            <p className="overline">{p.subtitle}</p>
            <h3>{p.title}</h3>
            <p>{p.desc}</p>
            <div className="pillar-bottom">
              <div>
                {p.tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
              <ArrowUpRight size={20} />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
function Industries() {
  return (
    <section className="industry-section">
      <div className="container">
        <div className="section-heading">
          <div>
            <div className="eyebrow blue">INDUSTRY CONTEXT BUILT IN</div>
            <h2>
              Different systems.
              <br />
              <span>Security in context.</span>
            </h2>
          </div>
          <div className="section-intro">
            <p>
              When software meets the physical world, context matters. Bring
              security into the realities of your industry.
            </p>
            <a className="text-link" href={sitePath('/solutions')}>
              Explore all industries <ArrowUpRight size={17} />
            </a>
          </div>
        </div>
        <div className="industry-grid">
          {sectors.map((s) => (
            <a
              className="industry-card"
              href={sitePath('/solutions/' + s.slug)}
              key={s.slug}
            >
              <img
                src={sitePath('/images/' + s.image + '.jpg')}
                alt=""
                loading="lazy"
              />
              <div className="industry-overlay" />
              <div className="industry-card-top">
                <s.icon size={23} />
                <ArrowUpRight size={22} />
              </div>
              <div className="industry-card-copy">
                <h3>{s.name}</h3>
                <p>{s.desc}</p>
              </div>
            </a>
          ))}
        </div>
        <a className="industry-more" href={sitePath('/solutions')}>
          Also built for manufacturing, defence, healthcare and energy{' '}
          <ArrowRight size={18} />
        </a>
      </div>
    </section>
  );
}
function Compliance() {
  return (
    <section className="container compliance">
      <div className="compliance-icon">
        <ShieldCheck size={35} />
      </div>
      <div>
        <div className="eyebrow blue">FROM SECURITY WORK TO AUDIT EVIDENCE</div>
        <h3>Make compliance part of the process.</h3>
        <p>
          Connect product security decisions to the evidence your teams need.
        </p>
      </div>
      <a className="text-link" href={sitePath('/use-cases')}>
        Explore use cases <ArrowUpRight size={17} />
      </a>
      <div className="standards">
        {[
          'ISO / SAE 21434',
          'UNECE WP.29',
          'EU CRA',
          'IEC 62443',
          'DO-326A',
        ].map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>
    </section>
  );
}
function CTA() {
  return (
    <section className="cta-section container">
      <div>
        <div className="eyebrow">YOUR NEXT MOVE</div>
        <h2>Put your product security in context.</h2>
        <p>
          See what connected intelligence can do for your product security team.
        </p>
      </div>
      <a className="button light" href={sitePath('/contact')}>
        Let’s talk security <ArrowUpRight size={19} />
      </a>
    </section>
  );
}
function Footer() {
  return (
    <footer className="container footer">
      <div className="footer-top">
        <div>
          <Brand />
          <p>
            Security for the systems
            <br />
            the world depends on.
          </p>
          <a
            className="footer-social"
            href="https://www.linkedin.com/company/destrosolutions"
          >
            LinkedIn <ArrowUpRight size={14} />
          </a>
        </div>
        <div>
          <h4>Platform</h4>
          <a href={sitePath('/product')}>Product overview</a>
          <a href={sitePath('/features')}>Capabilities</a>
          <a href={sitePath('/use-cases')}>Use cases</a>
        </div>
        <div>
          <h4>Explore</h4>
          <a href={sitePath('/solutions')}>Industries</a>
          <a href={live + '/blog'}>Insights</a>
          <a href={live + '/training'}>Training</a>
        </div>
        <div>
          <h4>Company</h4>
          <a href={sitePath('/contact')}>Contact us</a>
          <a href={live + '/contact#team'}>Our team</a>
          <a href={live + '/careers'}>Careers</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} DestroSolutions. All rights reserved.
        </span>
        <div>
          <a href={live + '/privacy'}>Privacy</a>
          <a href={live + '/terms'}>Terms</a>
          <a href={live + '/refund-policy'}>Refund policy</a>
          <span>
            Hyderabad, India <span className="status-dot" />
          </span>
        </div>
      </div>
    </footer>
  );
}
function Home() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <IndustryStrip />
        <Platform />
        <PlatformExplorer />
        <Industries />
        <Compliance />
        <CTA />
      </main>
      <Footer />
    </>
  );
}

const extraSectors = [
  {
    name: 'Physical AI',
    slug: 'physical-ai',
    icon: Cpu,
    desc: 'Protect robotics, autonomous machines and the software that connects intelligence to motion.',
  },
  {
    name: 'Manufacturing',
    slug: 'manufacturing',
    icon: Layers3,
    desc: 'Connect development pipelines, industrial products and the systems deployed on the factory floor.',
  },
  {
    name: 'Defence',
    slug: 'defense',
    icon: ShieldCheck,
    desc: 'Maintain component visibility and security evidence across long-lived mission systems.',
  },
  {
    name: 'Healthcare',
    slug: 'healthcare',
    icon: ScanLine,
    desc: 'Monitor vulnerabilities across medical-device software and fielded firmware versions.',
  },
  {
    name: 'Energy',
    slug: 'energy',
    icon: Radio,
    desc: 'Understand supplier dependencies across generation, transmission and distribution assets.',
  },
];
const sectorDetails: Record<
  string,
  { headline: string; context: string; items: string[]; standards: string[] }
> = {
  automotive: {
    headline: 'Protect every layer of the connected vehicle.',
    context:
      'Vehicle security depends on knowing which software is in the fleet, where it came from and which threats can reach it. Bring that context into every security decision.',
    items: [
      'Map firmware and supplier components to vehicle platforms.',
      'Prioritize vulnerabilities against product configuration and exposure.',
      'Keep a traceable record of investigation, remediation and supplier decisions.',
    ],
    standards: ['ISO / SAE 21434', 'UNECE WP.29', 'EU CRA'],
  },
  aviation: {
    headline: 'Security intelligence for systems built to keep flying.',
    context:
      'Aircraft and ground systems operate within demanding safety and maintenance constraints. Put system context and human oversight at the centre of cyber risk decisions.',
    items: [
      'Connect aircraft, ground-system and supplier inventories.',
      'Assess findings against operational exposure and safety implications.',
      'Record security decisions across the supported system lifecycle.',
    ],
    standards: ['DO-326A / ED-202A', 'DO-356A / ED-203A', 'IEC 62443'],
  },
  railway: {
    headline: 'Keep security on track. Keep the network moving.',
    context:
      'Rail systems have long service lives and tightly controlled maintenance windows. Prioritize work with a clear view of signalling, rolling stock and operational dependencies.',
    items: [
      'Connect trackside, depot and control-centre asset context.',
      'Assess vulnerabilities across IT and operational technology.',
      'Sequence response around safety review and maintenance constraints.',
    ],
    standards: ['TS 50701', 'IEC 62443', 'NIS2'],
  },
  maritime: {
    headline: 'One view of risk. Across your entire fleet.',
    context:
      'Vessel networks, port systems and shore operations are part of the same security picture. Connect intelligence across them without losing the context of each asset.',
    items: [
      'Maintain visibility into vessel systems and supplier components.',
      'Correlate intelligence with navigation, communications and port assets.',
      'Support consistent investigation and evidence across the fleet.',
    ],
    standards: ['IMO cyber risk management', 'IACS E26 / E27', 'IEC 62443'],
  },
  'physical-ai': {
    headline: 'When software moves, security matters more.',
    context:
      'Robots and autonomous machines connect software decisions to physical actions. Bring middleware, model dependencies and motion systems into your security assessment.',
    items: [
      'Include firmware, ROS 2 middleware and model dependencies in product context.',
      'Evaluate findings against the machine’s deployment and operating environment.',
      'Route safety-critical response decisions to the responsible people.',
    ],
    standards: ['EU CRA', 'IEC 62443', 'ISO 10218'],
  },
  manufacturing: {
    headline: 'Connect the build pipeline to the factory floor.',
    context:
      'A product’s security story continues after it ships. Connect component information with deployed versions so your teams can understand exposure and coordinate action.',
    items: [
      'Link supplier SBOMs and build outputs to product releases.',
      'Trace vulnerability exposure across installed versions.',
      'Support supplier communication with VEX and CSAF advisories.',
    ],
    standards: ['IEC 62443', 'EU CRA', 'NIS2'],
  },
  defense: {
    headline: 'Maintain security context for the life of the mission.',
    context:
      'Long-lived systems need a durable record of components, configuration and security decisions. Make that record useful to engineering and assurance teams.',
    items: [
      'Track configuration and supplier-component history.',
      'Maintain visibility into obsolete and inherited dependencies.',
      'Connect investigation records to assurance evidence.',
    ],
    standards: ['CMMC', 'RMF', 'DO-326A'],
  },
  healthcare: {
    headline: 'Security that follows every device version.',
    context:
      'Medical-device security requires visibility into the software that remains in use. Connect build information, monitoring and disclosure workflows across the supported lifecycle.',
    items: [
      'Retain SBOM context for each shipped firmware version.',
      'Monitor product vulnerabilities across the installed base.',
      'Coordinate disclosure and documented remediation decisions.',
    ],
    standards: ['FDA 524B', 'IEC 81001-5-1', 'EU CRA'],
  },
  energy: {
    headline: 'See the dependencies behind critical operations.',
    context:
      'Security teams need to understand supplier components and configuration changes across operational assets. Turn that information into a consistent basis for prioritization.',
    items: [
      'Connect supplier information to deployed operational assets.',
      'Track baseline configurations and changes over time.',
      'Maintain a reviewable record of findings and response actions.',
    ],
    standards: ['NERC CIP', 'IEC 62443', 'NIS2'],
  },
};
function PageIntro({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description: string;
}) {
  const contents: Record<string, string[][]> = {
    Capabilities: [
      ['Product intelligence', 'product-intelligence'],
      ['Threat intelligence exchange', 'threat-exchange'],
      ['AI-assisted response', 'response-automation'],
    ],
    Solutions: [
      ['Transport & mobility', 'mobility'],
      ['Industrial & critical systems', 'critical-systems'],
      ['Compare industries', 'compare-industries'],
    ],
    'Use cases': [
      ['Vulnerability management', 'vulnerability-management'],
      ['Supplier coordination', 'supplier-coordination'],
      ['PSIRT response', 'psirt-response'],
      ['Security evidence', 'security-evidence'],
    ],
    Contact: [
      ['Prepare an enquiry', 'prepare-enquiry'],
      ['Arrange a walkthrough', 'arrange-demo'],
      ['Contact the team', 'contact-team'],
    ],
  };
  return (
    <section className="page-banner">
      <div className="container">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <a href={sitePath('/')}>Home</a>
          <ChevronRight size={13} />
          <span>{label}</span>
        </nav>
        <div className="page-banner-grid">
          <div>
            <div className="eyebrow">
              DESTROSOLUTIONS / {label.toUpperCase()}
            </div>
            <h1>{title}</h1>
            <p>{description}</p>
          </div>
          <nav className="page-directory" aria-label="On this page">
            <span>EXPLORE THIS PAGE</span>
            {(contents[label] || []).map(([name, id], i) => (
              <a href={'#' + id} key={id}>
                <small>0{i + 1}</small>
                {name}
                <ArrowRight size={16} />
              </a>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
}
const workflow = [
  {
    title: 'Ingest',
    icon: Layers3,
    description:
      'Bring SBOMs, supplier information and internal and external threat feeds into one product context.',
    detail: 'A foundation your team can trace back to the source.',
  },
  {
    title: 'Analyze',
    icon: ScanLine,
    description:
      'Correlate indicators and vulnerabilities with the components and configurations in your products.',
    detail: 'Understand which signals belong to your environment.',
  },
  {
    title: 'Prioritize',
    icon: Network,
    description:
      'Evaluate exposure, asset criticality and operational impact to focus attention on the work that matters.',
    detail: 'Make decisions with product and business context.',
  },
  {
    title: 'Respond',
    icon: ShieldCheck,
    description:
      'Coordinate cases, advisories and response playbooks with human review for critical decisions.',
    detail: 'Keep a record of what happened and why.',
  },
];
function ProductPage() {
  return (
    <>
      <section className="product-hero">
        <div className="container product-hero-grid">
          <div>
            <a className="breadcrumb" href={sitePath('/')}>
              Home <ChevronRight size={13} /> Platform
            </a>
            <div className="eyebrow">THE PRODUCT SECURITY OS</div>
            <h1>
              Know your products.
              <br />
              <span>Act on real exposure.</span>
            </h1>
            <p>
              Bring your product landscape, threat intelligence and response
              into one continuous workflow. Give every security decision the
              context it deserves.
            </p>
            <div className="actions">
              <a href={sitePath('/contact')} className="button">
                Request a walkthrough <ArrowUpRight size={18} />
              </a>
              <a href="#intelligence-loop" className="button secondary">
                Explore the workflow <ArrowRight size={18} />
              </a>
            </div>
            <a
              className="product-video"
              href="https://www.youtube.com/watch?v=phJPk1v6NaI"
            >
              Watch the platform introduction <ArrowUpRight size={16} />
            </a>
          </div>
          <SecurityDiagram />
        </div>
      </section>
      <PlatformExplorer />
      <Platform />
      <section className="container assurance-band">
        <ShieldCheck size={33} />
        <div>
          <h2>Automation with clear accountability.</h2>
          <p>
            Keep human review at critical decision points, connect actions to
            evidence and give teams a shared basis for response.
          </p>
        </div>
        <a href={sitePath('/features')} className="text-link">
          Explore capabilities <ArrowRight size={18} />
        </a>
      </section>
      <CTA />
    </>
  );
}
function FeaturesPage() {
  const capabilityDetails = [
    {
      id: 'product-intelligence',
      inputs: ['SBOMs & firmware versions', 'Supplier component records'],
      output: 'A shared view of product exposure',
      summary: 'Understand the software that ships with your products.',
      items: [
        'Connect component information with shipped product versions.',
        'Bring vulnerability findings into the context of your dependencies.',
        'Give engineering and security a shared basis for investigation.',
      ],
    },
    {
      id: 'threat-exchange',
      inputs: ['Internal & external signals', 'Partner intelligence'],
      output: 'Relevant intelligence across your ecosystem',
      summary: 'Connect the right intelligence to the right teams.',
      items: [
        'Correlate internal and external intelligence with product context.',
        'Exchange structured indicators using STIX / TAXII.',
        'Coordinate information across suppliers and security teams.',
      ],
    },
    {
      id: 'response-automation',
      inputs: ['Prioritized findings', 'Playbooks & review decisions'],
      output: 'Coordinated actions with a decision record',
      summary: 'Keep investigation, response and evidence connected.',
      items: [
        'Support investigation and case-creation workflows.',
        'Coordinate advisories and repeatable response playbooks.',
        'Keep human review at safety-critical decision points.',
      ],
    },
  ];
  return (
    <>
      <PageIntro
        label="Capabilities"
        title="The context to understand. The control to act."
        description="Connect product visibility, threat intelligence and AI-assisted response. Give your team a clear path from a security signal to an informed decision."
      />
      <section className="container capability-sections">
        {pillars.map((p, i) => {
          const d = capabilityDetails[i];
          return (
            <article id={d.id} className="capability-section" key={p.num}>
              <div className="capability-heading">
                <span className="chapter-number">{p.num}</span>
                <div>
                  <div className="eyebrow blue">{p.subtitle.toUpperCase()}</div>
                  <h2>{d.summary}</h2>
                  <p>{p.desc}</p>
                  <ul className="check-list">
                    {d.items.map((t) => (
                      <li key={t}>
                        <Check size={18} />
                        {t}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={sitePath(
                      '/contact?priority=' +
                        encodeURIComponent(
                          [
                            'Product visibility',
                            'Threat intelligence',
                            'Response automation',
                          ][i],
                        ) +
                        '#prepare-enquiry',
                    )}
                    className="text-link"
                  >
                    Discuss your workflow <ArrowRight size={17} />
                  </a>
                </div>
              </div>
              <div className="capability-map">
                <div className="map-title">
                  <p.icon size={22} />
                  <span>{p.subtitle}</span>
                </div>
                <div className="map-label">CONNECT</div>
                {d.inputs.map((t) => (
                  <div className="map-input" key={t}>
                    <Layers3 size={17} />
                    {t}
                  </div>
                ))}
                <div className="map-arrow">
                  <ArrowRight size={18} />
                </div>
                <div className="map-output">
                  <ShieldCheck size={24} />
                  <strong>{d.output}</strong>
                </div>
                <div className="map-footer">PRODUCT CONTEXT AT EVERY STEP</div>
              </div>
            </article>
          );
        })}
      </section>
      <Compliance />
      <CTA />
    </>
  );
}
function SolutionsPage() {
  return (
    <>
      <PageIntro
        label="Solutions"
        title="Different environments. The same need for clarity."
        description="From connected vehicles to autonomous machines, security decisions need operational context. Explore how DestroSolutions fits the systems you protect."
      />
      <div id="mobility">
        <Industries />
      </div>
      <section className="container extra-industries" id="critical-systems">
        <div className="section-heading">
          <div>
            <div className="eyebrow blue">INDUSTRIAL & CRITICAL SYSTEMS</div>
            <h2>
              Security where software
              <br />
              <span>has a physical impact.</span>
            </h2>
          </div>
          <p className="section-intro">
            Understand the dependencies, deployment constraints and
            responsibilities behind each product.
          </p>
        </div>
        <div className="extra-grid">
          {extraSectors.map((s, i) => (
            <a key={s.slug} href={sitePath('/solutions/' + s.slug)}>
              <div className="industry-tile-top">
                <s.icon size={27} />
                <span>0{i + 5}</span>
              </div>
              <h3>{s.name}</h3>
              <p>{s.desc}</p>
              <span className="text-link">
                Explore {s.name.toLowerCase()} <ArrowRight size={16} />
              </span>
            </a>
          ))}
        </div>
      </section>
      <section className="container assurance-band">
        <Network size={32} />
        <div>
          <h2>One ecosystem. Multiple responsibilities.</h2>
          <p>
            Connect product security, engineering and supplier teams through
            shared context and coordinated workflows.
          </p>
        </div>
        <a className="text-link" href={sitePath('/use-cases')}>
          Explore use cases <ArrowRight size={17} />
        </a>
      </section>
      <IndustryCompare
        industries={[...sectors, ...extraSectors].map((s) => ({
          slug: s.slug,
          name: s.name,
          description: s.desc,
          priorities: sectorDetails[s.slug].items,
          frameworks: sectorDetails[s.slug].standards,
        }))}
      />
      <CTA />
    </>
  );
}
function SectorPage({ slug }: { slug: string }) {
  const s = [...sectors, ...extraSectors].find((s) => s.slug === slug);
  const d = sectorDetails[slug];
  if (!s || !d) return <NotFound />;
  const context: Record<string, string[]> = {
    automotive: [
      'Vehicle platforms',
      'Firmware releases',
      'Supplier components',
    ],
    aviation: [
      'Aircraft systems',
      'Ground operations',
      'Maintenance constraints',
    ],
    railway: ['Signalling', 'Rolling stock', 'Control centres'],
    maritime: ['Vessel systems', 'Port infrastructure', 'Shore operations'],
    'physical-ai': ['Robot middleware', 'Model dependencies', 'Motion systems'],
    manufacturing: ['Build pipelines', 'Product releases', 'Installed systems'],
    defense: [
      'Mission systems',
      'Configuration history',
      'Supplier dependencies',
    ],
    healthcare: ['Device software', 'Fielded firmware', 'Disclosure workflows'],
    energy: [
      'Operational assets',
      'Supplier components',
      'Configuration baselines',
    ],
  };
  const zones = context[slug];
  return (
    <>
      <section className="sector-hero">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <a href={sitePath('/')}>Home</a>
            <ChevronRight size={13} />
            <a href={sitePath('/solutions')}>Industries</a>
            <ChevronRight size={13} />
            <span>{s.name}</span>
          </nav>
          <div className="sector-hero-grid">
            <div>
              <div className="eyebrow">
                <s.icon size={18} />
                {s.name.toUpperCase()} SECURITY
              </div>
              <h1>{d.headline}</h1>
              <p>{d.context}</p>
              <a
                href={sitePath(
                  '/contact?industry=' +
                    encodeURIComponent(s.name) +
                    '#prepare-enquiry',
                )}
                className="button"
              >
                Discuss {s.name.toLowerCase()} security <ArrowRight size={18} />
              </a>
            </div>
            <div className="sector-visual">
              {'image' in s ? (
                <img
                  src={sitePath('/images/' + s.image + '.jpg')}
                  alt={s.name + ' technology and infrastructure'}
                  width="640"
                  height="440"
                />
              ) : (
                <div className="sector-context-map">
                  <span>PRODUCT & OPERATIONAL CONTEXT</span>
                  <s.icon size={46} />
                  {zones.map((z) => (
                    <div key={z}>
                      <CircleDot size={16} />
                      {z}
                    </div>
                  ))}
                </div>
              )}
              <div className="sector-visual-caption">
                <ShieldCheck size={17} />
                <span>Product intelligence. Operational context.</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="sector-scope">
        <div className="container">
          <span>YOUR SECURITY LANDSCAPE</span>
          {zones.map((z) => (
            <strong key={z}>{z}</strong>
          ))}
        </div>
      </div>
      <section className="container sector-priorities">
        <div className="section-heading">
          <div>
            <div className="eyebrow blue">FROM CONTEXT TO ACTION</div>
            <h2>
              A clearer path through
              <br />
              <span>your security priorities.</span>
            </h2>
          </div>
          <p className="section-intro">
            Bring product knowledge into investigation, make operational
            constraints visible and keep decisions connected to the evidence.
          </p>
        </div>
        <div className="priority-grid">
          {d.items.map((t, i) => (
            <article key={t}>
              <div>
                <span>0{i + 1}</span>
                {i === 0 ? (
                  <Layers3 size={25} />
                ) : i === 1 ? (
                  <ScanLine size={25} />
                ) : (
                  <ShieldCheck size={25} />
                )}
              </div>
              <h3>
                {
                  [
                    'Understand the landscape',
                    'Assess what matters',
                    'Coordinate with confidence',
                  ][i]
                }
              </h3>
              <p>{t}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="evidence-section">
        <div className="container evidence-grid">
          <div>
            <div className="eyebrow blue">SECURITY & ASSURANCE</div>
            <h2>
              Evidence that stays
              <br />
              with the decision.
            </h2>
            <p>
              Maintain a reviewable record of components, findings and response
              actions. Give assurance teams the context to assess applicable
              requirements.
            </p>
            <a
              href={sitePath('/use-cases#security-evidence')}
              className="text-link"
            >
              Explore the evidence workflow <ArrowRight size={17} />
            </a>
          </div>
          <div className="evidence-card">
            <span>RELEVANT FRAMEWORKS</span>
            {d.standards.map((t) => (
              <div key={t}>
                <ShieldCheck size={18} />
                {t}
              </div>
            ))}
            <p>
              Framework applicability and compliance assessments remain with
              your assurance team.
            </p>
          </div>
        </div>
      </section>
      <section className="container sector-navigation">
        <div>
          <span>CONTINUE EXPLORING</span>
          <h3>Security across connected industries.</h3>
        </div>
        <nav aria-label="Other industries">
          {[...sectors, ...extraSectors]
            .filter((x) => x.slug !== slug)
            .map((x) => (
              <a href={sitePath('/solutions/' + x.slug)} key={x.slug}>
                {x.name}
                <ArrowUpRight size={14} />
              </a>
            ))}
        </nav>
      </section>
      <CTA />
    </>
  );
}
const useCases = [
  {
    title: 'Product vulnerability management',
    icon: ScanLine,
    problem:
      'A new vulnerability appears. Which shipped products are affected?',
    solution:
      'Connect vulnerability intelligence to component and firmware information, then prioritize investigation against product exposure.',
    outcome: 'A product-level view of what needs attention.',
  },
  {
    title: 'Supplier security coordination',
    icon: Network,
    problem: 'Security information lives across suppliers, teams and formats.',
    solution:
      'Bring supplier intelligence into a shared workflow and exchange structured information using open standards.',
    outcome: 'A clearer path from supplier signal to coordinated response.',
  },
  {
    title: 'PSIRT response workflows',
    icon: Cpu,
    problem: 'Manual triage slows down investigation and communication.',
    solution:
      'Coordinate case creation, investigation, VEX drafting and response playbooks, with human review at critical steps.',
    outcome: 'Repeatable response with a reviewable decision history.',
  },
  {
    title: 'Compliance evidence',
    icon: ShieldCheck,
    problem:
      'Audit evidence becomes a separate project at the end of the cycle.',
    solution:
      'Preserve component context, assessments and action records as security work happens, ready for assurance teams to review.',
    outcome: 'Security decisions and supporting evidence kept together.',
  },
];
function UseCasesPage() {
  const ids = [
    'vulnerability-management',
    'supplier-coordination',
    'psirt-response',
    'security-evidence',
  ];
  return (
    <>
      <PageIntro
        label="Use cases"
        title="Start with the problem. Move forward with context."
        description="Make everyday security work more connected — from identifying affected products to coordinating suppliers and preserving the evidence behind a response."
      />
      <section className="container case-journeys">
        {useCases.map((u, i) => (
          <article className="case-journey" id={ids[i]} key={u.title}>
            <div className="case-heading">
              <span className="chapter-number">0{i + 1}</span>
              <u.icon size={25} />
              <h2>{u.title}</h2>
            </div>
            <div className="case-content">
              <div className="case-problem">
                <span>THE QUESTION</span>
                <h3>{u.problem}</h3>
              </div>
              <div className="case-approach">
                <span>THE WORKFLOW</span>
                <p>{u.solution}</p>
                <a href={sitePath('/contact')} className="text-link">
                  Discuss this use case <ArrowRight size={17} />
                </a>
              </div>
              <div className="case-result">
                <ShieldCheck size={25} />
                <span>THE RESULT</span>
                <p>{u.outcome}</p>
              </div>
            </div>
          </article>
        ))}
      </section>
      <CTA />
    </>
  );
}
function ContactPage() {
  return (
    <>
      <PageIntro
        label="Contact"
        title="Your products. Your priorities. Let’s talk."
        description="Connect with the DestroSolutions team to explore your security challenges, product landscape and the workflows that matter to your organization."
      />
      <EnquiryBuilder />
      <section
        className="container contact-layout contact-layout-v3"
        id="arrange-demo"
      >
        <div className="contact-card">
          <div className="eyebrow blue">PLATFORM WALKTHROUGH</div>
          <h2>
            Make the conversation
            <br />
            relevant to your team.
          </h2>
          <p>
            Tell us about your industry and what you’re working to protect. We
            can explore the platform in the context of your product security
            priorities.
          </p>
          <div className="meeting-topics">
            {[
              'Product & supplier visibility',
              'Threat intelligence & investigation',
              'Response workflows & security evidence',
            ].map((t, i) => (
              <div key={t}>
                <span>0{i + 1}</span>
                {t}
              </div>
            ))}
          </div>
          <a
            className="button"
            href="mailto:avinashchowdam@destrosolutions.com?subject=DestroSolutions%20platform%20walkthrough"
          >
            Arrange a walkthrough <ArrowUpRight size={18} />
          </a>
          <p className="contact-note">
            Opens your email application. Prefer a form?{' '}
            <a href={live + '/contact'}>
              Send an enquiry <ArrowUpRight size={13} />
            </a>
          </p>
        </div>
        <div className="contact-details" id="contact-team">
          <div className="eyebrow blue">CONTACT THE TEAM</div>
          <h3>Start a direct conversation.</h3>
          <p className="contact-lead">
            Share your company, your product environment and the challenge you
            would like to discuss.
          </p>
          <div className="direct-method">
            <span>EMAIL</span>
            <a href="mailto:avinashchowdam@destrosolutions.com">
              avinashchowdam@destrosolutions.com <ArrowUpRight size={16} />
            </a>
          </div>
          <div className="direct-method">
            <span>PHONE</span>
            <a href="tel:+919398793452">
              +91 93987 93452 <ArrowUpRight size={16} />
            </a>
          </div>
          <div className="direct-method">
            <span>LOCATION</span>
            <p>Hyderabad, India</p>
          </div>
          <a className="text-link" href={live + '/contact#team'}>
            Meet the people behind DestroSolutions <ArrowRight size={17} />
          </a>
        </div>
      </section>
      <section className="container contact-other">
        <div>
          <div className="eyebrow blue">DEVELOP YOUR EXPERTISE</div>
          <h3>Training for product security teams.</h3>
          <p>
            Explore training on product security requirements and the work
            behind compliance.
          </p>
          <a className="text-link" href={live + '/training'}>
            Explore training <ArrowRight size={16} />
          </a>
        </div>
        <div>
          <div className="eyebrow blue">BUILD WITH US</div>
          <h3>Careers at DestroSolutions.</h3>
          <p>Help protect the connected systems the world depends on.</p>
          <a className="text-link" href={live + '/careers'}>
            Explore opportunities <ArrowRight size={16} />
          </a>
        </div>
      </section>
    </>
  );
}
function NotFound() {
  return (
    <section className="container page-intro">
      <div className="eyebrow blue">404 / PAGE NOT FOUND</div>
      <h1>Let’s get you back on track.</h1>
      <p>
        This page isn’t available. Explore the platform or return to the
        homepage.
      </p>
      <div className="actions">
        <a href={sitePath('/')} className="button">
          Return home <ArrowRight size={18} />
        </a>
      </div>
    </section>
  );
}
export const routeInfo: Record<string, [string, string]> = {
  '/': [
    'Product security for a connected world',
    'Connect threat intelligence, product context and AI-assisted response to protect connected products and physical AI.',
  ],
  '/product': [
    'Product Security OS',
    'Explore the DestroSolutions platform: product intelligence, threat intelligence sharing and coordinated security response.',
  ],
  '/features': [
    'Platform capabilities',
    'Connect component visibility, threat intelligence and response automation in a shared product security workflow.',
  ],
  '/solutions': [
    'Industry solutions',
    'Product security for automotive, aviation, railway, maritime, physical AI and critical infrastructure.',
  ],
  '/use-cases': [
    'Product security use cases',
    'Explore vulnerability management, supplier coordination, PSIRT response and security evidence workflows.',
  ],
  '/contact': [
    'Contact and book a demo',
    'Contact the DestroSolutions team to arrange a platform walkthrough for your products and security priorities.',
  ],
  ...Object.fromEntries(
    Object.entries(sectorDetails).map(([slug, d]) => [
      '/solutions/' + slug,
      [d.headline, d.context],
    ]),
  ),
};
export default function App({
  path = typeof window === 'undefined' ? '/' : window.location.pathname,
}: {
  path?: string;
}) {
  path = path.replace(/\/$/, '') || '/';
  if (path === '/') return <Home />;
  const body =
    path === '/product' ? (
      <ProductPage />
    ) : path === '/features' ? (
      <FeaturesPage />
    ) : path === '/solutions' ? (
      <SolutionsPage />
    ) : path === '/use-cases' ? (
      <UseCasesPage />
    ) : path === '/contact' ? (
      <ContactPage />
    ) : path.startsWith('/solutions/') ? (
      <SectorPage slug={path.split('/')[2]} />
    ) : (
      <NotFound />
    );
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header path={path} />
      <main id="main">{body}</main>
      <Footer />
    </>
  );
}
