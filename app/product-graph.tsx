import { useId, useRef, useState, type KeyboardEvent } from 'react';
/* eslint-disable jsx-a11y/prefer-tag-over-role -- SVG groups cannot contain native HTML buttons; keyboard-operable nodes use button semantics, with a native select alternative on mobile. */
import {
  Minus,
  Plus,
  RotateCcw,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';
import { productNodes, productEdges } from './security-data';
import { SimulationLabel } from './system-explorer';

export default function ProductGraph() {
  const [selected, setSelected] = useState('library');
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const drag = useRef<{
    x: number;
    y: number;
    originX: number;
    originY: number;
  } | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const id = useId();
  const node = productNodes.find((n) => n.id === selected)!;
  const related = new Set([
    selected,
    ...productEdges.flatMap(([a, b]) =>
      a === selected ? [b] : b === selected ? [a] : [],
    ),
  ]);
  const move = (x: number, y: number) =>
    setPan((p) => ({
      x: Math.max(-350, Math.min(350, p.x + x)),
      y: Math.max(-250, Math.min(250, p.y + y)),
    }));
  const selectKey = (event: KeyboardEvent<SVGGElement>, id: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setSelected(id);
    }
  };
  return (
    <div className="product-graph">
      <SimulationLabel title="DIGITAL PRODUCT GRAPH / SIMULATED" />
      <div className="graph-toolbar">
        <div>
          <span className="mono">VG-042 / DEPENDENCY MAP</span>
          <p>Select a node to trace its direct relationships.</p>
        </div>
        <div className="graph-controls" aria-label="Graph viewport controls">
          <button
            aria-label="Zoom out"
            onClick={() =>
              setZoom((z) => Math.max(0.7, +(z - 0.15).toFixed(2)))
            }
            disabled={zoom <= 0.7}
          >
            <Minus size={17} />
          </button>
          <output aria-label="Graph zoom">{Math.round(zoom * 100)}%</output>
          <button
            aria-label="Zoom in"
            onClick={() =>
              setZoom((z) => Math.min(1.9, +(z + 0.15).toFixed(2)))
            }
            disabled={zoom >= 1.9}
          >
            <Plus size={17} />
          </button>
          <button
            aria-label="Reset graph view"
            onClick={() => {
              setZoom(1);
              setPan({ x: 0, y: 0 });
            }}
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </div>
      <div className="graph-desktop security-grid">
        <svg
          ref={svgRef}
          viewBox="0 0 840 490"
          role="group"
          aria-label="Interactive product dependency graph"
          onPointerDown={(event) => {
            if ((event.target as SVGElement).closest('[data-node]')) return;
            drag.current = {
              x: event.clientX,
              y: event.clientY,
              originX: pan.x,
              originY: pan.y,
            };
            event.currentTarget.setPointerCapture(event.pointerId);
          }}
          onPointerMove={(event) => {
            if (!drag.current || !svgRef.current) return;
            const factor = 840 / svgRef.current.getBoundingClientRect().width;
            setPan({
              x: Math.max(
                -350,
                Math.min(
                  350,
                  drag.current.originX +
                    (event.clientX - drag.current.x) * factor,
                ),
              ),
              y: Math.max(
                -250,
                Math.min(
                  250,
                  drag.current.originY +
                    (event.clientY - drag.current.y) * factor,
                ),
              ),
            });
          }}
          onPointerUp={() => {
            drag.current = null;
          }}
          onPointerCancel={() => {
            drag.current = null;
          }}
        >
          <g
            transform={`translate(${pan.x} ${pan.y}) translate(420 245) scale(${zoom}) translate(-420 -245)`}
          >
            {productEdges.map(([a, b]) => {
              const start = productNodes.find((n) => n.id === a)!,
                end = productNodes.find((n) => n.id === b)!;
              return (
                <path
                  key={a + b}
                  d={`M${start.x} ${start.y} C${(start.x + end.x) / 2} ${start.y},${(start.x + end.x) / 2} ${end.y},${end.x} ${end.y}`}
                  className={
                    'graph-edge' +
                    (a === selected || b === selected ? ' is-related' : '')
                  }
                />
              );
            })}
            {productNodes.map((n) => (
              <g
                key={n.id}
                data-node={n.id}
                className={
                  'graph-node' +
                  (n.id === selected
                    ? ' is-selected'
                    : related.has(n.id)
                      ? ' is-related'
                      : '')
                }
                transform={`translate(${n.x - 75} ${n.y - 32})`}
                role="button"
                tabIndex={0}
                aria-label={'Select ' + n.name}
                aria-pressed={n.id === selected}
                onClick={() => setSelected(n.id)}
                onKeyDown={(e) => selectKey(e, n.id)}
              >
                <rect width="150" height="64" rx="3" />
                <text x="13" y="24">
                  {n.name}
                </text>
                <text x="13" y="45" className="graph-type">
                  {n.type}
                </text>
                <circle cx="136" cy="14" r="3" />
              </g>
            ))}
          </g>
        </svg>
        <div className="graph-pan">
          <span>Drag the canvas or use the controls</span>
          {[
            [ArrowLeft, -70, 0, 'Pan left'],
            [ArrowUp, 0, -50, 'Pan up'],
            [ArrowDown, 0, 50, 'Pan down'],
            [ArrowRight, 70, 0, 'Pan right'],
          ].map(([Icon, x, y, label]) => {
            const Control = Icon as typeof ArrowLeft;
            return (
              <button
                key={label as string}
                aria-label={label as string}
                onClick={() => move(x as number, y as number)}
              >
                <Control size={16} />
              </button>
            );
          })}
        </div>
      </div>
      <div className="graph-mobile">
        <label htmlFor={id}>Product relationship</label>
        <select
          id={id}
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
        >
          {productNodes.map((n) => (
            <option value={n.id} key={n.id}>
              {n.name} — {n.type}
            </option>
          ))}
        </select>
        <div className="mobile-relationships">
          {productNodes
            .filter((n) => related.has(n.id))
            .map((n) => (
              <button
                key={n.id}
                aria-pressed={n.id === selected}
                onClick={() => setSelected(n.id)}
              >
                <span>{n.type}</span>
                <strong>{n.name}</strong>
                <ArrowRight size={16} />
              </button>
            ))}
        </div>
      </div>
      <div className="graph-detail" aria-live="polite">
        <div>
          <span className="mono">
            SELECTED NODE / {node.type.toUpperCase()}
          </span>
          <h3>{node.name}</h3>
          <p>{node.detail}</p>
        </div>
        <div>
          <span className="mono">DIRECT RELATIONSHIPS</span>
          <p>
            {productNodes
              .filter((n) => n.id !== selected && related.has(n.id))
              .map((n) => n.name)
              .join(' · ')}
          </p>
        </div>
      </div>
    </div>
  );
}
