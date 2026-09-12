import { useEffect, useState } from 'react';
const sections = [
  ['context', 'Evolution'],
  ['attack-surfaces', 'Attack surface'],
  ['platform', 'Security OS'],
  ['product-intelligence', 'Products'],
  ['threat-intelligence', 'Threats'],
  ['agentic-ai', 'Agents'],
  ['security-workflow', 'Workflow'],
  ['operations', 'Operations'],
];
export default function ExperienceNav() {
  const [active, setActive] = useState('context');
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-20% 0px -55% 0px', threshold: [0, 0.2, 0.5] },
    );
    sections.forEach(([id]) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);
  return (
    <nav className="experience-nav" aria-label="Explore the product experience">
      <div className="container">
        <span className="mono">EXPLORE THE SYSTEM</span>
        <div>
          {sections.map(([id, label]) => (
            <a
              key={id}
              href={'#' + id}
              aria-current={id === active ? 'location' : undefined}
            >
              {label}
            </a>
          ))}
        </div>
        <label className="experience-nav-mobile">
          Explore section
          <select
            value={active}
            onChange={(e) => {
              setActive(e.target.value);
              document.getElementById(e.target.value)?.scrollIntoView({
                behavior: matchMedia('(prefers-reduced-motion: reduce)').matches
                  ? 'instant'
                  : 'smooth',
              });
            }}
          >
            {sections.map(([id, label]) => (
              <option value={id} key={id}>
                {label}
              </option>
            ))}
          </select>
        </label>
      </div>
    </nav>
  );
}
