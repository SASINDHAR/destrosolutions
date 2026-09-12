import { composeEnquiry, enquiryMailto } from './enquiry-message';
import { useEffect, useState } from 'react';
import { ArrowUpRight, Copy, FileText, Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  NativeSelect,
  NativeSelectOption,
} from '@/components/ui/native-select';
const recipient = 'avinashchowdam@destrosolutions.com';
export default function EnquiryBuilder() {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [industry, setIndustry] = useState('Automotive');
  const [priority, setPriority] = useState('Product visibility');
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState('');
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const chosenIndustry = params.get('industry');
    const chosenPriority = params.get('priority');
    if (
      chosenIndustry &&
      [
        'Automotive',
        'Industrial',
        'Robotics',
        'Connected Products',
        'Mobility',
        'Aviation',
        'Railway',
        'Maritime',
        'Physical AI',
        'Manufacturing',
        'Defence',
        'Healthcare',
        'Energy',
        'Other',
      ].includes(chosenIndustry)
    )
      // eslint-disable-next-line react/react-compiler -- Apply URL context after hydration so the first client render matches the static HTML.
      setIndustry(chosenIndustry);
    if (
      chosenPriority &&
      [
        'Product visibility',
        'Threat intelligence',
        'Vulnerability management',
        'Supplier coordination',
        'Response automation',
        'Security evidence',
      ].includes(chosenPriority)
    )
      setPriority(chosenPriority);
  }, []);
  const message = composeEnquiry(name, company, industry, priority, notes);
  return (
    <section className="container enquiry-builder" id="prepare-enquiry">
      <div className="section-heading">
        <div>
          <div className="eyebrow blue">MAKE IT RELEVANT TO YOUR TEAM</div>
          <h2>
            A better brief.
            <br />
            <span>A more useful conversation.</span>
          </h2>
        </div>
        <p className="section-intro">
          Prepare an enquiry around your products and priorities. Review the
          message, then open it in your email application.
        </p>
      </div>
      <div className="enquiry-grid">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            window.location.href = enquiryMailto(company, message);
            setStatus(
              'Your email application has been requested. Review and send the message there. If it does not open, copy the message and email the address shown.',
            );
          }}
        >
          <div className="enquiry-fields">
            <div>
              <label htmlFor="enquiry-name">Your name</label>
              <Input
                id="enquiry-name"
                required
                autoComplete="name"
                maxLength={80}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full name"
                pattern=".*\S.*"
              />
            </div>
            <div>
              <label htmlFor="enquiry-company">Company</label>
              <Input
                id="enquiry-company"
                required
                autoComplete="organization"
                maxLength={100}
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Organization name"
                pattern=".*\S.*"
              />
            </div>
            <div>
              <label htmlFor="enquiry-industry">Industry</label>
              <NativeSelect
                id="enquiry-industry"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
              >
                {[
                  'Automotive',
                  'Industrial',
                  'Robotics',
                  'Connected Products',
                  'Mobility',
                  'Aviation',
                  'Railway',
                  'Maritime',
                  'Physical AI',
                  'Manufacturing',
                  'Defence',
                  'Healthcare',
                  'Energy',
                  'Other',
                ].map((i) => (
                  <NativeSelectOption key={i}>{i}</NativeSelectOption>
                ))}
              </NativeSelect>
            </div>
            <div>
              <label htmlFor="enquiry-priority">Main priority</label>
              <NativeSelect
                id="enquiry-priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                {[
                  'Product visibility',
                  'Threat intelligence',
                  'Vulnerability management',
                  'Supplier coordination',
                  'Response automation',
                  'Security evidence',
                ].map((p) => (
                  <NativeSelectOption key={p}>{p}</NativeSelectOption>
                ))}
              </NativeSelect>
            </div>
          </div>
          <label htmlFor="enquiry-notes">
            What would you like to discuss? <span>Optional</span>
          </label>
          <Textarea
            id="enquiry-notes"
            maxLength={600}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Tell us about the products, environment or workflow you want to explore."
          />
          <p className="enquiry-privacy">
            Your brief stays in this page until you choose to open an email or
            copy it. Avoid including confidential information.
          </p>
          <button type="submit" className="button">
            Open email draft <ArrowUpRight size={18} />
          </button>
          <output className="enquiry-status">{status}</output>
        </form>
        <div className="enquiry-preview">
          <div className="enquiry-preview-top">
            <span>
              <FileText size={18} /> YOUR MESSAGE
            </span>
            <button
              type="button"
              className="copy-message"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(message);
                  setStatus(
                    'Message copied. Paste it into an email to ' + recipient,
                  );
                } catch {
                  setStatus(
                    'Copy was unavailable. Select and copy the message preview manually.',
                  );
                }
              }}
            >
              <Copy size={15} />
              Copy
            </button>
          </div>
          <p className="enquiry-recipient">
            To: <a href={'mailto:' + recipient}>{recipient}</a>
          </p>
          <pre>{message}</pre>
          <div className="enquiry-preview-footer">
            <Check size={16} />
            Review before sending from your email application.
          </div>
        </div>
      </div>
    </section>
  );
}
