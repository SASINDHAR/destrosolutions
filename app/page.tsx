import {
  ArrowUpRight,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Network,
  Layers3,
  Radio,
  Car,
  Factory,
  Bot,
  Box,
  Zap,
  Globe,
  GraduationCap,
} from 'lucide-react';
import { sitePath } from './site-path';
import {
  routeInfo,
  industries,
  solutions,
  courses,
  technologies,
  scenarios,
  articles,
  contact,
} from './content';
import {
  Header,
  Footer,
  CTA,
  Section,
  Eyebrow,
  LinkButton,
  PageHero,
  CommandDiagram,
  Pillars,
  Flow,
  PlatformArchitecture,
  DashboardPreview,
  ThreatFlow,
  AgentWorkflow,
  SecurityOperations,
  Motion,
} from './experience';
import EnquiryBuilder from './enquiry-builder';
import IndustryCompare from './industry-compare';
export { routeInfo } from './content';
function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <Eyebrow>PRODUCT INTELLIGENCE × THREAT INTELLIGENCE × AI</Eyebrow>
            <h1>
              Product Security.
              <br />
              <span>
                Built for the
                <br />
                Physical World.
              </span>
            </h1>
            <p>
              DestroSolutions unifies product intelligence, threat intelligence,
              and agentic AI to secure connected products, software-defined
              vehicles, and intelligent physical systems.
            </p>
            <div className="hero-actions">
              <LinkButton href="/product">Explore the Platform</LinkButton>
              <LinkButton href="/contact" secondary>
                Talk to DestroSolutions
              </LinkButton>
            </div>
            <a className="text-link" href={sitePath('/solutions')}>
              View Solutions <ArrowRight size={16} />
            </a>
            <div className="hero-caption">
              <span>CONNECTED SYSTEMS. CONTEXTUAL SECURITY.</span>
              <span>01 — 03</span>
            </div>
          </div>
          <CommandDiagram />
        </div>
      </section>
      <div className="credibility">
        <div className="container">
          <span>
            ENGINEERED AROUND
            <br />
            YOUR PRODUCT CONTEXT
          </span>
          {[
            'Automotive',
            'Industrial',
            'Connected Products',
            'Software-Defined Vehicles',
            'AI & Cybersecurity',
          ].map((c) => (
            <strong key={c}>{c}</strong>
          ))}
        </div>
      </div>
      <Section
        kicker="01 / THE CHANGING ATTACK SURFACE"
        title="Modern Products Are Becoming Software Platforms."
        description="Embedded software, cloud APIs, mobile applications and AI now shape physical behavior. Every connection and supplier dependency expands the context a security team needs."
      >
        <Flow
          items={[
            'Physical product',
            'Connectivity',
            'Software',
            'Cloud',
            'AI',
            'Supply chain',
            'Attack surface',
          ]}
        />
        <div className="context-note">
          <span>
            <Radio size={22} /> Sensors & interfaces
          </span>
          <span>
            <Layers3 size={22} /> Components & dependencies
          </span>
          <span>
            <Network size={22} /> APIs, mobile & OTA
          </span>
          <p>
            Security needs to follow the complete product, from its smallest
            component to the ecosystem around it.
          </p>
        </div>
      </Section>
      <Section
        id="platform"
        kicker="02 / THE DESTROSOLUTIONS PLATFORM"
        title="One Intelligence Layer for Product Security."
        description="Connect what a product contains, what threatens it and what your team should investigate next."
        className="surface-section"
      >
        <Pillars />
        <PlatformArchitecture />
        <a className="text-link section-link" href={sitePath('/product')}>
          Inside the platform <ArrowRight size={17} />
        </a>
      </Section>
      <Section
        kicker="03 / PRODUCT INTELLIGENCE"
        title="Understand Every Product Before Attackers Do."
        description="Bring SBOMs, hardware, software, versions, assets and configurations into a connected product view."
      >
        <DashboardPreview />
      </Section>
      <Section
        kicker="04 / THREAT INTELLIGENCE"
        title="Turn Global Threat Signals into Product-Specific Risk."
        description="A signal matters when you understand the product it could affect. Explore the path from external intelligence to contextual investigation."
        className="surface-section"
      >
        <ThreatFlow />
      </Section>
      <Section
        kicker="05 / AGENTIC AI"
        title="Security Operations That Think and Act."
        description="AI-assisted analysis can help teams move through evidence faster. Keep decisions reviewable, permissions explicit and people in control."
      >
        <AgentWorkflow />
      </Section>
      <AutomotiveSection />
      <Section
        kicker="07 / PHYSICAL AI"
        title="Securing Machines That Can Sense, Decide, and Act."
        description="Robotics, autonomous systems, industrial AI and edge devices bring software decisions into the physical world."
      >
        <div className="physical-layout">
          <div className="physical-core">
            <Cpu size={40} strokeWidth={1} />
            <h3>
              Intelligence meets
              <br />
              physical consequence.
            </h3>
            <p>
              Understand the software, models and interfaces behind every
              action.
            </p>
            <a className="text-link" href={sitePath('/solutions/physical-ai')}>
              Explore Physical AI <ArrowUpRight size={16} />
            </a>
          </div>
          <Flow items={['Sense', 'Understand', 'Decide', 'Act', 'Learn']} />
        </div>
      </Section>
      <Section
        kicker="08 / INDUSTRIES"
        title="Built around your operating reality."
        description="A shared intelligence approach. Different products, dependencies and engineering constraints."
      >
        <IndustryCards compact />
      </Section>
      <Section
        kicker="09 / PRODUCT SECURITY OPERATIONS"
        title="Every signal needs a decision."
        description="Explore a fictional security operations environment. Filter signals and follow an evidence-led recommendation."
        className="surface-section"
      >
        <SecurityOperations />
      </Section>
      <Section
        kicker="10 / ENGINEERING PERSPECTIVES"
        title="Clarity for the next decision."
      >
        <ArticleCards />
      </Section>
      <CTA />
    </>
  );
}
function AutomotiveSection() {
  return (
    <Section
      kicker="06 / AUTOMOTIVE & SDV"
      title="Security for the Software-Defined Vehicle."
      description="Connect vehicle software, supplier dependencies and cloud services across engineering, release and in-service operations."
      className="automotive-section"
    >
      <div className="vehicle-architecture">
        <div className="vehicle-label">
          <Car size={32} strokeWidth={1.3} />
          <strong>
            SOFTWARE-DEFINED
            <br />
            VEHICLE ARCHITECTURE
          </strong>
          <span>Conceptual system view</span>
        </div>
        <Flow
          items={[
            'Sensors',
            'ECUs',
            'Zonal architecture',
            'Vehicle computer',
            'Connectivity',
            'Cloud',
            'OTA',
            'AI',
          ]}
        />
      </div>
      <div className="framework-row">
        {[
          'ISO/SAE 21434',
          'ISO 26262',
          'UNECE R155 / R156',
          'ASPICE',
          'OTA',
          'SBOM',
          'Vehicle security operations',
        ].map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>
      <div className="section-bottom">
        <p>
          Engineering context; applicability requires assessment. No
          certification claim.
        </p>
        <a className="text-link" href={sitePath('/solutions/automotive')}>
          Explore automotive security <ArrowUpRight size={16} />
        </a>
      </div>
    </Section>
  );
}
function IndustryCards({ compact = false }: { compact?: boolean }) {
  return (
    <div className="industry-grid">
      {(compact ? industries.slice(0, 7) : industries).map((i, n) => {
        const Icon = [Car, Factory, Bot, Box, Factory, Globe, Zap][n % 7];
        return (
          <article className="industry-card" key={i.slug}>
            <div className="card-top">
              <Icon size={25} strokeWidth={1.4} />
              <span>{String(n + 1).padStart(2, '0')}</span>
            </div>
            <h3>{i.name}</h3>
            <p>{i.description}</p>
            <dl>
              <dt>SECURITY REQUIREMENT</dt>
              <dd>{i.requirement}</dd>
              <dt>INTELLIGENCE APPLICATION</dt>
              <dd>{i.capability}</dd>
            </dl>
            <a className="text-link" href={sitePath('/solutions/' + i.slug)}>
              Explore {i.name} <ArrowUpRight size={16} />
            </a>
          </article>
        );
      })}
    </div>
  );
}
function Product() {
  return (
    <>
      <PageHero
        kicker="PRODUCTS / PRODUCT SECURITY OS"
        title="One Intelligence Layer for Product Security."
        description="Product Intelligence Suite. Threat Intel Exchange. Agentic AI Automation. A connected approach to understanding and responding to product risk."
      >
        <LinkButton href="/contact">Discuss the platform</LinkButton>
        <LinkButton href="#product-intelligence" secondary>
          Explore capabilities
        </LinkButton>
      </PageHero>
      <Section
        kicker="THE ARCHITECTURE"
        title="From scattered signals to a product decision."
      >
        <PlatformArchitecture />
        <Pillars />
      </Section>
      <Section
        id="product-intelligence"
        kicker="PRODUCT INTELLIGENCE SUITE"
        title="Understand Every Product Before Attackers Do."
        description="Connect SBOMs, software components, hardware, vulnerabilities, dependencies, suppliers, versions, assets and configurations."
        className="surface-section"
      >
        <DashboardPreview />
      </Section>
      <Section
        id="threat-intelligence"
        kicker="THREAT INTEL EXCHANGE"
        title="Turn Global Threat Signals into Product-Specific Risk."
        description="Bring structured intelligence into a product investigation. Explore STIX and TAXII exchange, correlation and contextual prioritization."
      >
        <ThreatFlow />
      </Section>
      <Section
        id="agentic-ai"
        kicker="AGENTIC AI AUTOMATION"
        title="Security Operations That Think and Act."
        description="Explore AI-assisted investigation, cases, advisories and playbooks with human review and clearly bounded permissions."
        className="surface-section"
      >
        <AgentWorkflow />
      </Section>
      <Section
        kicker="THE OPERATING VIEW"
        title="Keep the evidence close to the decision."
      >
        <SecurityOperations />
      </Section>
      <CTA />
    </>
  );
}
function Solutions() {
  return (
    <>
      <PageHero
        kicker="SOLUTIONS"
        title="Security follows the product."
        description="Explore the security challenges that connect engineering, suppliers and operations. Start with the decision your team needs to make."
      >
        <LinkButton href="/contact">Discuss your priorities</LinkButton>
      </PageHero>
      <Section
        kicker="SOLUTION EXPLORER"
        title="Find the right starting point."
        description="These are application areas for a discussion. Scope, integrations and delivery are confirmed against your requirements."
      >
        <div className="solution-grid">
          {solutions.map(([slug, name, description, tags], i) => {
            const Icon = [ShieldCheck, Car, Network, Cpu, Radio, Layers3][
              i % 6
            ];
            return (
              <article className="solution-card" key={slug}>
                <Icon size={24} strokeWidth={1.4} />
                <h3>{name}</h3>
                <p>{description}</p>
                <div className="tags">
                  {tags.split(' · ').map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
                <a
                  className="text-link"
                  href={sitePath('/solutions/capabilities/' + slug)}
                >
                  Explore solution <ArrowUpRight size={16} />
                </a>
              </article>
            );
          })}
        </div>
      </Section>
      <CTA />
    </>
  );
}
function SolutionDetail({ slug }: { slug: string }) {
  const s = solutions.find((s) => s[0] === slug)!;
  return (
    <>
      <PageHero
        kicker="SOLUTION / APPLICATION AREA"
        title={s[1]}
        description={s[2]}
      >
        <LinkButton href="/contact">Discuss this solution</LinkButton>
        <LinkButton href="/solutions" secondary>
          All solutions
        </LinkButton>
      </PageHero>
      <Section
        kicker="ENGINEERING CONTEXT"
        title="Start with scope. Connect the evidence."
        description="A useful security workflow begins with your architecture, data sources and decision owners."
      >
        <div className="editorial-grid">
          {s[3].split(' · ').map((t, i) => (
            <article key={t}>
              <Eyebrow>0{i + 1} / PRIORITY</Eyebrow>
              <h3>{t}</h3>
              <p>
                {
                  [
                    'Identify the products, versions and dependencies relevant to this priority.',
                    'Connect the available evidence and make unresolved questions visible.',
                    'Define the review, ownership and controlled next step for your environment.',
                  ][i]
                }
              </p>
            </article>
          ))}
        </div>
        <div className="callout">
          <ShieldCheck size={25} />
          <div>
            <h3>Confirm the right scope for your environment.</h3>
            <p>
              These application areas describe discussion topics, not a promise
              of specific integrations, certification or compliance. Discuss
              their fit with DestroSolutions product intelligence and security
              workflows.
            </p>
          </div>
        </div>
      </Section>
      <Section
        kicker="CONNECTED CAPABILITIES"
        title="One product view. Complementary intelligence."
      >
        <Pillars />
      </Section>
      <CTA />
    </>
  );
}
function Industries() {
  return (
    <>
      <PageHero
        kicker="INDUSTRIES"
        title="Physical systems. Distinct security realities."
        description="From connected vehicles to intelligent machines, product context changes what a security decision needs to consider."
      />
      <Section kicker="YOUR OPERATING ENVIRONMENT" title="Find your industry.">
        <IndustryCards />
      </Section>
      <IndustryCompare industries={industries} />
      <CTA />
    </>
  );
}
function Industry({ slug }: { slug: string }) {
  const i = industries.find((i) => i.slug === slug)!;
  return (
    <>
      <PageHero
        kicker={'INDUSTRIES / ' + i.name.toUpperCase()}
        title={
          slug === 'automotive'
            ? 'Security for the Software-Defined Vehicle.'
            : slug === 'physical-ai'
              ? 'Securing Machines That Can Sense, Decide, and Act.'
              : i.name + ' security, in product context.'
        }
        description={i.description}
      >
        <LinkButton
          href={
            '/contact?industry=' +
            encodeURIComponent(
              i.name === 'Energy & Infrastructure' ? 'Energy' : i.name,
            )
          }
        >
          Discuss your environment
        </LinkButton>
        <LinkButton href="/industries" secondary>
          All industries
        </LinkButton>
      </PageHero>
      <Section
        kicker="THE ENGINEERING CHALLENGE"
        title={i.requirement}
        description={i.capability}
      >
        <div className="editorial-grid">
          {i.priorities.map((p, n) => (
            <article key={p}>
              <Eyebrow>0{n + 1} / SECURITY PRIORITY</Eyebrow>
              <h3>{p}</h3>
              <p>
                {
                  [
                    'Establish the relevant product boundaries and the evidence available to your team.',
                    'Bring product, supplier and operating context into the investigation.',
                    'Assign the next decision to the right engineering or operations owner.',
                  ][n]
                }
              </p>
            </article>
          ))}
        </div>
      </Section>
      {slug === 'automotive' ? (
        <AutomotiveSection />
      ) : (
        <Section
          kicker="LIFECYCLE VIEW"
          title="Connect engineering to operations."
        >
          <Flow
            items={
              slug === 'physical-ai' || slug === 'robotics'
                ? ['Sense', 'Understand', 'Decide', 'Act', 'Learn']
                : [
                    'Define the product',
                    'Map dependencies',
                    'Assess exposure',
                    'Review response',
                    'Maintain evidence',
                  ]
            }
          />
        </Section>
      )}
      <Section
        kicker="ASSURANCE CONTEXT"
        title="Make requirements part of the conversation."
        description="Frameworks and requirements depend on the product, jurisdiction and engagement. These references do not imply certification or guaranteed compliance."
      >
        <div className="framework-row">
          {i.frameworks.map((f) => (
            <span key={f}>{f}</span>
          ))}
        </div>
      </Section>
      <Section
        kicker="PLATFORM APPLICATION"
        title="Know the product. Connect the signals."
      >
        <Pillars />
      </Section>
      <CTA />
    </>
  );
}
function Technology() {
  return (
    <>
      <PageHero
        kicker="TECHNOLOGY"
        title="Intelligence across every layer."
        description="Connect data, engineering context and controlled automation. A conceptual map of the technology domains behind product security."
      />
      <Section
        kicker="TECHNOLOGY MAP"
        title="The connections create the context."
      >
        <div className="technology-map">
          <div className="technology-center">
            <Cpu size={42} />
            <h3>
              PRODUCT
              <br />
              SECURITY
              <br />
              INTELLIGENCE
            </h3>
            <span>Conceptual architecture</span>
          </div>
          <div className="technology-grid">
            {technologies.map(([n, d], i) => (
              <article key={n}>
                <span className="mono">0{i + 1}</span>
                <h3>{n}</h3>
                <p>{d}</p>
              </article>
            ))}
          </div>
        </div>
      </Section>
      <Section
        kicker="ARCHITECTURE PRINCIPLES"
        title="Open context. Clear control."
        description="Exchange structured intelligence, retain product relationships and keep operational decisions within defined permissions."
      >
        <PlatformArchitecture />
      </Section>
      <Section
        kicker="CONTROLLED AUTOMATION"
        title="Build review into the workflow."
      >
        <AgentWorkflow />
      </Section>
      <CTA />
    </>
  );
}
function Training() {
  return (
    <>
      <PageHero
        kicker="TRAINING"
        title="Build the understanding behind better engineering."
        description="Discuss focused professional learning for automotive, industrial and product security teams. Match the topic to your team’s responsibilities and engineering context."
      >
        <LinkButton href="mailto:training@destrosolutions.com">
          Discuss team training
        </LinkButton>
      </PageHero>
      <Section
        kicker="PROFESSIONAL LEARNING AREAS"
        title="From standards to engineering conversations."
        description="Enquire about topic availability and a suitable format. Course scope, delivery mode and practical activities are confirmed with your team; no accreditation or certification is implied."
      >
        <div className="training-grid">
          {courses.map(([name, audience, learn, outcome]) => (
            <article key={name}>
              <GraduationCap size={25} strokeWidth={1.3} />
              <h3>{name}</h3>
              <dl>
                <dt>WHO IT IS FOR</dt>
                <dd>{audience}</dd>
                <dt>LEARNING FOCUS</dt>
                <dd>{learn}</dd>
                <dt>PROPOSED PRACTICAL OUTCOME</dt>
                <dd>{outcome}</dd>
                <dt>FORMAT</dt>
                <dd>
                  Discuss team needs, delivery mode and availability on enquiry.
                </dd>
              </dl>
              <a
                className="text-link"
                href={
                  'mailto:training@destrosolutions.com?subject=' +
                  encodeURIComponent('Training enquiry: ' + name)
                }
              >
                Enquire about this topic <ArrowUpRight size={16} />
              </a>
            </article>
          ))}
        </div>
      </Section>
      <Section
        kicker="PLAN YOUR LEARNING"
        title="A focused brief makes training relevant."
      >
        <Flow
          items={[
            'Share your team context',
            'Choose a learning area',
            'Confirm scope & format',
            'Agree practical outcomes',
          ]}
        />
      </Section>
      <CTA />
    </>
  );
}
function ArticleCards() {
  return (
    <div className="article-grid">
      {articles.map((a, i) => (
        <article key={a.slug}>
          <div className="article-art" aria-hidden="true">
            <span>0{i + 1}</span>
            {i === 0 ? (
              <Layers3 size={54} strokeWidth={0.8} />
            ) : i === 1 ? (
              <Network size={54} strokeWidth={0.8} />
            ) : (
              <Cpu size={54} strokeWidth={0.8} />
            )}
          </div>
          <Eyebrow>{a.category}</Eyebrow>
          <h3>
            <a href={sitePath('/insights/' + a.slug)}>{a.title}</a>
          </h3>
          <p>{a.intro}</p>
          <a className="text-link" href={sitePath('/insights/' + a.slug)}>
            Read perspective <ArrowUpRight size={16} />
          </a>
        </article>
      ))}
    </div>
  );
}
function Insights() {
  return (
    <>
      <PageHero
        kicker="INSIGHTS"
        title="A clearer view of product security."
        description="Engineering perspectives on product context, responsible automation and intelligent physical systems."
      />
      <Section
        kicker="PERSPECTIVES"
        title="Ideas for your next technical discussion."
      >
        <ArticleCards />
      </Section>
      <Section
        kicker="EXPLORE THE WORKFLOW"
        title="Put the concepts in context."
        description="Follow four demonstration scenarios from a security challenge to a reviewable next step."
      >
        <LinkButton href="/use-cases">
          Explore demonstration scenarios
        </LinkButton>
      </Section>
      <CTA />
    </>
  );
}
function Article({ slug }: { slug: string }) {
  const a = articles.find((a) => a.slug === slug)!;
  return (
    <>
      <PageHero kicker={a.category} title={a.title} description={a.intro} />
      <article className="container reading-content">
        <p className="fineprint">
          Engineering perspective · General educational content
        </p>
        {a.sections.map(([title, body]) => (
          <section key={title}>
            <h2>{title}</h2>
            <p>{body}</p>
          </section>
        ))}
        <a className="text-link" href={sitePath('/insights')}>
          All insights <ArrowRight size={16} />
        </a>
      </article>
      <CTA />
    </>
  );
}
function UseCases() {
  return (
    <>
      <PageHero
        kicker="DEMONSTRATION SCENARIOS"
        title="Follow the evidence to the next decision."
        description="Four fictional scenarios show how product context can guide investigation and controlled response. These are not customer case studies or measured results."
      />
      <div className="container scenario-nav">
        {scenarios.map((s) => (
          <a href={'#' + s.id} key={s.id}>
            {s.name}
            <ArrowRight size={14} />
          </a>
        ))}
      </div>
      {scenarios.map((s, i) => (
        <Section
          key={s.id}
          id={s.id}
          kicker={'0' + (i + 1) + ' / DEMONSTRATION SCENARIO'}
          title={s.name}
          description={s.challenge}
          className={i % 2 ? 'surface-section' : ''}
        >
          <div className="scenario-steps">
            {[
              ['Challenge', s.challenge],
              ['Detection', s.detection],
              ['AI analysis', s.analysis],
              ['Response', s.response],
              ['Illustrative outcome', s.outcome],
            ].map(([t, d], n) => (
              <article key={t}>
                <span className="mono">0{n + 1}</span>
                <h3>{t}</h3>
                <p>{d}</p>
              </article>
            ))}
          </div>
        </Section>
      ))}
      <CTA />
    </>
  );
}
function Company() {
  return (
    <>
      <PageHero
        kicker="COMPANY"
        title="Engineering Security for the Next Generation of Intelligent Products."
        description="DestroSolutions brings together product intelligence, threat intelligence and AI-assisted security workflows for connected products and physical systems."
      >
        <LinkButton href="/contact">Start a conversation</LinkButton>
      </PageHero>
      <Section
        kicker="OUR DIRECTION"
        title="Understand the product. Improve the decision."
      >
        <div className="company-story">
          <div>
            <Eyebrow>MISSION</Eyebrow>
            <h3>Connect intelligence to the products it protects.</h3>
            <p>
              Our focus is the relationship between a product, its software and
              suppliers, and the threats that matter in its operating
              environment.
            </p>
          </div>
          <div>
            <Eyebrow>VISION</Eyebrow>
            <h3>Security that keeps pace with intelligent systems.</h3>
            <p>
              As physical products become software platforms, security teams
              need context that spans engineering and operations.
            </p>
          </div>
        </div>
      </Section>
      <Section
        kicker="TECHNOLOGY & INDUSTRY"
        title="Where software meets the physical world."
        description="Automotive systems, connected devices and intelligent machines bring multidisciplinary security challenges. DestroSolutions approaches them through product context and connected intelligence."
      >
        <Pillars />
      </Section>
      <Section
        kicker="A CONNECTED PERSPECTIVE"
        title="Local contact. Global engineering context."
      >
        <div className="contact-panel">
          <Globe size={36} />
          <div>
            <h3>{contact.location}</h3>
            <p>
              Connected products and supplier ecosystems cross borders. Discuss
              your operating environment, engineering requirements and
              collaboration needs with the team.
            </p>
          </div>
          <LinkButton href="/contact" secondary>
            Contact us
          </LinkButton>
        </div>
      </Section>
      <Section
        kicker="CAREERS"
        title="Build the Security Layer for the Physical World."
      >
        <p className="section-intro">
          Interested in cybersecurity, AI or connected-product engineering?
          Introduce your experience and interests.
        </p>
        <LinkButton href="/careers">Explore talent opportunities</LinkButton>
      </Section>
      <CTA />
    </>
  );
}
function Careers() {
  return (
    <>
      <PageHero
        kicker="CAREERS / TALENT CONNECTIONS"
        title="Build the Security Layer for the Physical World."
        description="Bring curiosity about software, intelligence and physical systems. Introduce yourself to DestroSolutions and share the kind of engineering work you want to pursue."
      >
        <LinkButton href="mailto:careers@destrosolutions.com">
          Introduce yourself
        </LinkButton>
      </PageHero>
      <Section
        kicker="ENGINEERING DISCIPLINES"
        title="Where your experience could contribute."
        description="This is a talent invitation, not a list of confirmed vacancies. Contact the team to discuss current opportunities."
      >
        <div className="career-list">
          {[
            'Cybersecurity Engineer',
            'AI Engineer',
            'Automotive Security Engineer',
            'Embedded Engineer',
            'Cloud Engineer',
            'DevSecOps Engineer',
            'Security Researcher',
          ].map((r, i) => (
            <div key={r}>
              <span className="mono">0{i + 1}</span>
              <h3>{r}</h3>
              <span>Talent enquiry</span>
              <a
                href={
                  'mailto:careers@destrosolutions.com?subject=' +
                  encodeURIComponent('Talent enquiry: ' + r)
                }
                aria-label={'Enquire about ' + r}
              >
                <ArrowUpRight size={22} />
              </a>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
function Contact() {
  return (
    <>
      <PageHero
        kicker="CONTACT"
        title="Bring your product. Let’s explore its security."
        description="Tell us what you build, how it operates and where you need better visibility. We’ll use that context to shape the conversation."
      />
      <div className="container contact-methods">
        <a href={'mailto:' + contact.email}>
          <Eyebrow>EMAIL</Eyebrow>
          <h2>{contact.email}</h2>
          <ArrowUpRight size={20} />
        </a>
        <a href="tel:+919398793452">
          <Eyebrow>PHONE</Eyebrow>
          <h2>{contact.phone}</h2>
          <ArrowUpRight size={20} />
        </a>
        <div>
          <Eyebrow>LOCATION</Eyebrow>
          <h2>{contact.location}</h2>
        </div>
      </div>
      <EnquiryBuilder />
    </>
  );
}
function Legal({ path }: { path: string }) {
  const privacy = path === '/privacy',
    terms = path === '/terms';
  return (
    <>
      <PageHero
        kicker="WEBSITE INFORMATION"
        title={
          privacy
            ? 'Privacy'
            : terms
              ? 'Website terms'
              : 'Imprint & company contact'
        }
        description={
          privacy
            ? 'Information about enquiries and technical data on this website.'
            : terms
              ? 'The scope of website information and demonstration content.'
              : 'Verified contact details and a route for legal information requests.'
        }
      />
      <div className="container reading-content">
        {privacy ? (
          <>
            <h2>Enquiries stay under your control.</h2>
            <p>
              The enquiry builder prepares a message in your browser. It does
              not submit a form to DestroSolutions or save your draft on a
              server. Opening an email draft transfers the message to your
              chosen email application; sending it is your decision.
            </p>
            <h2>Hosting and external services</h2>
            <p>
              This website is hosted on GitHub Pages. The hosting provider may
              process technical request information to operate the service.
              External links, including LinkedIn and email applications, are
              governed by their providers’ policies. This website does not add
              analytics trackers or advertising cookies.
            </p>
            <h2>Questions about personal information</h2>
            <p>
              Contact DestroSolutions about information you have sent by email,
              including access, correction or deletion requests. This page
              describes this website’s behavior; consult the{' '}
              <a href="https://www.destrosolutions.com/privacy">
                official privacy information
              </a>{' '}
              for the company’s wider services.
            </p>
          </>
        ) : terms ? (
          <>
            <h2>Information and demonstrations</h2>
            <p>
              Website material explains product security concepts and areas for
              discussion. Dashboards, risk scores, agent responsibilities and
              scenarios labeled as demonstrations are fictional examples. They
              are not production monitoring, customer results or commitments to
              specific functionality.
            </p>
            <h2>Engagement scope</h2>
            <p>
              Availability, integrations, training, delivery and commercial
              terms must be agreed directly with DestroSolutions. References to
              standards or engineering practices do not establish certification
              or compliance.
            </p>
            <h2>Further terms</h2>
            <p>
              Refer to the{' '}
              <a href="https://www.destrosolutions.com/terms">
                official company terms
              </a>{' '}
              and, where relevant, the{' '}
              <a href="https://www.destrosolutions.com/refund-policy">
                refund policy
              </a>
              . A specific signed agreement governs a commercial engagement.
            </p>
          </>
        ) : (
          <>
            <h2>DestroSolutions</h2>
            <p>
              {contact.location}
              <br />
              Phone: <a href="tel:+919398793452">{contact.phone}</a>
              <br />
              Email: <a href={'mailto:' + contact.email}>{contact.email}</a>
            </p>
            <h2>Legal information requests</h2>
            <p>
              For the registered legal entity, full registered address,
              registration or tax identifiers, and the responsible legal
              contact, request the current details directly from
              DestroSolutions. These particulars are not published here because
              they have not been verified.
            </p>
            <p>
              This contact page is not a representation that all
              jurisdiction-specific statutory disclosure requirements have been
              fulfilled.
            </p>
          </>
        )}
        <p>
          <a className="text-link" href={'mailto:' + contact.email}>
            Contact DestroSolutions <ArrowUpRight size={15} />
          </a>
        </p>
      </div>
    </>
  );
}
export default function App({ path = '/' }: { path?: string }) {
  let content;
  if (path === '/') content = <Home />;
  else if (path === '/product' || path === '/features') content = <Product />;
  else if (path === '/solutions') content = <Solutions />;
  else if (path === '/industries') content = <Industries />;
  else if (path.startsWith('/solutions/capabilities/') && routeInfo[path])
    content = <SolutionDetail slug={path.split('/').pop()!} />;
  else if (path.startsWith('/solutions/') && routeInfo[path])
    content = <Industry slug={path.split('/').pop()!} />;
  else if (path === '/technology') content = <Technology />;
  else if (path === '/training') content = <Training />;
  else if (path === '/insights') content = <Insights />;
  else if (path.startsWith('/insights/') && routeInfo[path])
    content = <Article slug={path.split('/').pop()!} />;
  else if (path === '/company') content = <Company />;
  else if (path === '/careers') content = <Careers />;
  else if (path === '/contact') content = <Contact />;
  else if (path === '/use-cases') content = <UseCases />;
  else if (['/privacy', '/terms', '/imprint'].includes(path))
    content = <Legal path={path} />;
  else
    content = (
      <PageHero
        kicker="PAGE NOT FOUND"
        title="Let’s get you back on track."
        description="This page is unavailable. Explore the platform or return to the homepage."
      >
        <LinkButton href="/">Back to home</LinkButton>
      </PageHero>
    );
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header path={path} />
      <main id="main">{content}</main>
      <Footer />
      <Motion />
    </>
  );
}
