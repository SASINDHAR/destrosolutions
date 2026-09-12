import {
  useEffect,
  useCallback,
  useRef,
  useState,
  type ComponentType,
} from 'react';
export default function ProductGraphLoader() {
  const [Graph, setGraph] = useState<ComponentType | null>(null);
  const [failed, setFailed] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const pending = useRef(false);
  const load = useCallback(() => {
    if (pending.current) return;
    pending.current = true;
    setFailed(false);
    import('./product-graph')
      .then((module) => setGraph(() => module.default))
      .catch(() => {
        pending.current = false;
        setFailed(true);
      });
  }, []);
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect();
          load();
        }
      },
      { rootMargin: '400px' },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [load]);
  return (
    <div className="graph-load-region" ref={root}>
      {Graph ? (
        <Graph />
      ) : (
        <div className="graph-load-fallback security-grid">
          <span className="mono">SIMULATED DIGITAL PRODUCT GRAPH</span>
          <h4>A product is a connected system.</h4>
          <p>
            Vehicle → Gateway ECU → Firmware → Library → Simulated vulnerability
          </p>
          <p>Related context: cloud API, mobile application and supplier.</p>
          <button className="button secondary" onClick={load}>
            {failed ? 'Retry interactive graph' : 'Load interactive graph'}
          </button>
          {failed && (
            <output>
              Graph loading was interrupted. The relationship summary remains
              available.
            </output>
          )}
        </div>
      )}
    </div>
  );
}
