import { useState } from 'react';
import { ArrowRight, Layers3 } from 'lucide-react';
import {
  NativeSelect,
  NativeSelectOption,
} from '@/components/ui/native-select';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@/components/ui/table';
import { sitePath } from './site-path';
export type IndustryProfile = {
  slug: string;
  name: string;
  description: string;
  priorities: string[];
  frameworks: string[];
};
export default function IndustryCompare({
  industries,
}: {
  industries: IndustryProfile[];
}) {
  const [left, setLeft] = useState('automotive');
  const [right, setRight] = useState('physical-ai');
  const chosen = [
    industries.find((i) => i.slug === left)!,
    industries.find((i) => i.slug === right)!,
  ];
  return (
    <section className="container industry-compare" id="compare-industries">
      <div className="section-heading">
        <div>
          <div className="eyebrow blue">EXPLORE YOUR ENVIRONMENT</div>
          <h2>
            Same platform.
            <br />
            <span>Different operating realities.</span>
          </h2>
        </div>
        <p className="section-intro">
          Compare two industries to see how product context, security priorities
          and assurance requirements differ.
        </p>
      </div>
      <div className="compare-controls">
        {[left, right].map((value, index) => (
          <div key={index}>
            <label htmlFor={'compare-' + index}>
              {index === 0 ? 'First industry' : 'Compare with'}
            </label>
            <NativeSelect
              id={'compare-' + index}
              value={value}
              onChange={(e) =>
                index === 0 ? setLeft(e.target.value) : setRight(e.target.value)
              }
            >
              {industries.map((i) => (
                <NativeSelectOption key={i.slug} value={i.slug}>
                  {i.name}
                </NativeSelectOption>
              ))}
            </NativeSelect>
          </div>
        ))}
      </div>
      <section
        className="compare-table-region"
        aria-label="Industry comparison"
      >
        <Table className="compare-table">
          <TableHeader>
            <TableRow>
              <TableHead>Security context</TableHead>
              {chosen.map((i, n) => (
                <TableHead key={n}>{i.name}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Product landscape</TableCell>
              {chosen.map((i, n) => (
                <TableCell key={n} data-label={i.name}>
                  {i.description}
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell>Security priorities</TableCell>
              {chosen.map((i, n) => (
                <TableCell key={n} data-label={i.name}>
                  <ul>
                    {i.priorities.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell>Relevant frameworks</TableCell>
              {chosen.map((i, n) => (
                <TableCell key={n} data-label={i.name}>
                  <div className="compare-tags">
                    {i.frameworks.map((f) => (
                      <span key={f}>{f}</span>
                    ))}
                  </div>
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell>Explore the solution</TableCell>
              {chosen.map((i, n) => (
                <TableCell key={n} data-label={i.name}>
                  <a
                    className="text-link"
                    href={sitePath('/solutions/' + i.slug)}
                  >
                    View {i.name.toLowerCase()} <ArrowRight size={16} />
                  </a>
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </section>
      <p className="compare-note">
        <Layers3 size={16} />
        Framework applicability depends on your product and operating context;
        this comparison is an overview.
      </p>
    </section>
  );
}
