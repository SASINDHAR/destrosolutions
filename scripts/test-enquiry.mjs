import assert from 'node:assert/strict';
import { composeEnquiry, enquiryMailto } from '../app/enquiry-message.ts';
const message = composeEnquiry(
  ' Léa ',
  ' Research & Mobility ',
  'Physical AI',
  'Threat intelligence',
  ' ROS 2 & embedded systems ',
);
assert.ok(message.includes('Name: Léa\nCompany: Research & Mobility'));
assert.ok(message.includes('\n\nContext:\nROS 2 & embedded systems'));
assert.ok(!message.includes('\\n'));
const email = new URL(enquiryMailto('Research & Mobility', message));
assert.equal(email.protocol, 'mailto:');
assert.equal(email.searchParams.get('body'), message);
assert.equal(
  email.searchParams.get('subject'),
  'Platform enquiry — Research & Mobility',
);
assert.equal([...email.searchParams].length, 2);
const empty = composeEnquiry('', '', 'Automotive', 'Product visibility', ' ');
assert.ok(empty.includes('our organization'));
assert.ok(!empty.includes('Context:'));
console.log(
  'Verified enquiry formatting, Unicode, URL encoding and empty optional context.',
);
