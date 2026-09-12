import { useId, useState } from 'react';
import { ArrowRight } from 'lucide-react';
const areas = [
  [
    'Automotive',
    'Start with the vehicle architecture.',
    'Map ECUs, supplier components and connected services before discussing requirements.',
    'Product scope · interfaces · supplier responsibilities',
  ],
  [
    'Cybersecurity',
    'Connect an attack surface to an engineering response.',
    'Use threat modelling, SBOMs and vulnerability-handling evidence to frame a product discussion.',
    'Threat analysis · dependency evidence · incident handling',
  ],
  [
    'Functional safety',
    'Understand where cyber risk meets physical consequences.',
    'Identify the handoff between security findings and the safety team; avoid treating one discipline as a substitute for the other.',
    'Operating assumptions · physical impact · engineering ownership',
  ],
  [
    'Software engineering',
    'Keep changes and evidence traceable.',
    'Connect a software baseline, component provenance, tests and release decisions.',
    'Architecture · version identity · regression evidence',
  ],
  [
    'SDV',
    'Bring the lifecycle together.',
    'Follow vehicle software through cloud services, updates and in-service security review.',
    'Zonal systems · OTA · monitoring · response',
  ],
];
export default function LearningMap() {
  const [active, setActive] = useState(0);
  const id = useId();
  return (
    <div className="learning-map">
      <div className="learning-map-heading">
        <span className="mono">ENGINEERING LEARNING MAP</span>
        <h3>Find your team’s starting point.</h3>
        <p>
          A conceptual map of related disciplines, not a catalogue of confirmed
          courses or qualifications.
        </p>
      </div>
      <fieldset
        className="learning-tabs"
        aria-label="Engineering learning areas"
      >
        {areas.map(([name], i) => (
          <button
            key={name}
            aria-pressed={active === i}
            aria-controls={id}
            onClick={() => setActive(i)}
          >
            <span className="mono">0{i + 1}</span>
            {name}
            <ArrowRight size={16} />
          </button>
        ))}
      </fieldset>
      <div className="learning-context" id={id} aria-live="polite">
        <h4>{areas[active][1]}</h4>
        <p>{areas[active][2]}</p>
        <span>{areas[active][3]}</span>
      </div>
    </div>
  );
}
