import { useEffect, useState, type ReactNode } from 'react';
import {
  ArrowUpRight,
  ArrowRight,
  ShieldCheck,
  Menu,
  Layers3,
  Network,
  BrainCircuit,
  ChevronRight,
} from 'lucide-react';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import SiteSearch from './site-search';
import { sitePath } from './site-path';
import { navigation, routeInfo, contact, pillars } from './content';

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
  const activePath = path.startsWith('/solutions/capabilities/')
    ? '/solutions'
    : path.startsWith('/solutions/')
      ? '/industries'
      : path.startsWith('/insights/')
        ? '/insights'
        : path === '/features'
          ? '/product'
          : path === '/careers'
            ? '/company'
            : path;
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
              aria-current={activePath === url ? 'page' : undefined}
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
                      aria-current={activePath === url ? 'page' : undefined}
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
          <h2>Ready to secure your next generation of products?</h2>
          <p>
            Bring your architecture. Let’s discuss the intelligence it needs.
          </p>
        </div>
        <div className="cta-actions">
          <LinkButton href="/contact">Talk to DestroSolutions</LinkButton>
          <LinkButton href="/product" secondary>
            Explore Product Security OS
          </LinkButton>
        </div>
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

export {
  SecurityGridHero as CommandDiagram,
  SystemArchitecture as PlatformArchitecture,
} from './system-explorer';
export {
  DashboardPreview,
  ThreatFlow,
  AgentWorkflow,
  SecurityOperations,
} from './intelligence-console';
