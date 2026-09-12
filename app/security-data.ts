export type SystemLayer = {
  id: string;
  name: string;
  summary: string;
  input: string;
  evidence: string;
  concern: string;
  next: string;
};
export const osLayers: SystemLayer[] = [
  {
    id: 'data',
    name: 'Product Data',
    summary: 'Start with the product, not an isolated alert.',
    input: 'Inventory · SBOM · configurations',
    evidence: 'Products linked to versions, components and suppliers.',
    concern: 'Incomplete inventories can hide affected products.',
    next: 'Send component and version context to intelligence matching.',
  },
  {
    id: 'intel',
    name: 'Threat Intelligence',
    summary: 'Connect external signals to what you build.',
    input: 'Structured advisories · indicators · supplier notices',
    evidence: 'Relevant signals mapped to a component or product relationship.',
    concern: 'A matching advisory does not establish real exposure.',
    next: 'Correlate the signal with product-specific evidence.',
  },
  {
    id: 'correlation',
    name: 'AI Correlation',
    summary: 'Bring the evidence into one reviewable context.',
    input: 'Product matches · dependency paths · signal sources',
    evidence: 'Related components and supporting sources organized for review.',
    concern: 'Missing evidence and conflicting sources remain visible.',
    next: 'Pass the evidence summary to product risk assessment.',
  },
  {
    id: 'risk',
    name: 'Risk Engine',
    summary: 'Prioritize the decision in its operating context.',
    input: 'Exposure · configuration · operational constraints',
    evidence: 'An illustrative risk assessment with unresolved assumptions.',
    concern:
      'Scores support triage; they are not a substitute for engineering judgment.',
    next: 'Define a scoped investigation or a controlled response recommendation.',
  },
  {
    id: 'agents',
    name: 'Agentic AI',
    summary: 'Coordinate bounded investigation tasks.',
    input: 'Evidence summary · defined permissions · review policy',
    evidence:
      'Product, vulnerability and supplier checks assigned to example agents.',
    concern: 'Operational changes require the appropriate approval.',
    next: 'Prepare a recommendation for the responsible security team.',
  },
  {
    id: 'operations',
    name: 'Security Operations',
    summary: 'Put an accountable team behind the next action.',
    input: 'Recommendation · evidence · owner · approval',
    evidence: 'A documented review, response decision and follow-up.',
    concern:
      'Remediation must respect safety, availability and recovery constraints.',
    next: 'Feed the outcome back into product knowledge.',
  },
];
export const vehicleLayers: SystemLayer[] = [
  {
    id: 'sensors',
    name: 'Sensors',
    summary: 'Understand the product’s physical inputs.',
    input: 'Sensor interfaces and firmware',
    evidence: 'Input boundaries and device configurations.',
    concern: 'Untrusted input or an exposed device interface.',
    next: 'Review how input reaches an ECU.',
  },
  {
    id: 'ecus',
    name: 'ECUs',
    summary: 'Track embedded software and component exposure.',
    input: 'ECU software inventories and SBOMs',
    evidence: 'Firmware versions linked to software components.',
    concern: 'Shared libraries may affect several vehicle functions.',
    next: 'Trace the dependency into the zonal system.',
  },
  {
    id: 'zonal',
    name: 'Zonal Architecture',
    summary: 'See the boundaries between vehicle zones.',
    input: 'Network relationships and system architecture',
    evidence: 'Mapped communication and isolation boundaries.',
    concern: 'An exposed connection can cross a trust boundary.',
    next: 'Connect zonal context to the vehicle computer.',
  },
  {
    id: 'computer',
    name: 'Vehicle Computer',
    summary: 'Bring consolidated software into context.',
    input: 'Runtime versions and service dependencies',
    evidence: 'Software relationships across central compute.',
    concern: 'A shared runtime can create multiple affected paths.',
    next: 'Evaluate the connected services it depends on.',
  },
  {
    id: 'connectivity',
    name: 'Connectivity',
    summary: 'Understand off-vehicle communication.',
    input: 'Interfaces, protocols and remote services',
    evidence: 'Vehicle-to-service connection inventory.',
    concern: 'Remote exposure depends on configuration and access controls.',
    next: 'Review the associated cloud boundary.',
  },
  {
    id: 'cloud',
    name: 'Cloud',
    summary: 'Connect vehicle and service security.',
    input: 'APIs, identities and backend dependencies',
    evidence: 'Cloud services linked to vehicle functions.',
    concern: 'A backend weakness can matter to a physical product.',
    next: 'Review release and update dependencies.',
  },
  {
    id: 'ota',
    name: 'OTA',
    summary: 'Make software changes traceable.',
    input: 'Release versions and update evidence',
    evidence: 'Update dependencies and review ownership.',
    concern:
      'An update decision must account for rollback and operating state.',
    next: 'Route the release through the responsible review process.',
  },
  {
    id: 'soc',
    name: 'Security Operations',
    summary: 'Keep product context available in service.',
    input: 'Relevant signals and product configuration',
    evidence: 'A scoped investigation with engineering ownership.',
    concern: 'Response must preserve safety and availability.',
    next: 'Document the decision and improve lifecycle evidence.',
  },
];
export const lifecycleLayers: SystemLayer[] = [
  {
    id: 'design',
    name: 'Design',
    summary: 'Establish security boundaries early.',
    input: 'Architecture and intended use',
    evidence: 'System boundaries and security assumptions.',
    concern: 'Requirements differ by product and jurisdiction.',
    next: 'Carry the requirements into development.',
  },
  {
    id: 'develop',
    name: 'Develop',
    summary: 'Keep the software composition visible.',
    input: 'Source, components and supplier inputs',
    evidence: 'SBOM and dependency relationships.',
    concern: 'Inherited dependencies bring inherited questions.',
    next: 'Make the relevant risks testable.',
  },
  {
    id: 'test',
    name: 'Test',
    summary: 'Review exposure with evidence.',
    input: 'Configuration and test findings',
    evidence: 'Validated findings with affected scope.',
    concern: 'A finding needs product and operating context.',
    next: 'Resolve the release review questions.',
  },
  {
    id: 'deploy',
    name: 'Deploy',
    summary: 'Know the configuration entering service.',
    input: 'Release and configuration records',
    evidence: 'A traceable baseline for monitoring.',
    concern: 'Deployed variants can differ from test systems.',
    next: 'Keep the baseline current through updates.',
  },
  {
    id: 'update',
    name: 'Update',
    summary: 'Treat each update as a product change.',
    input: 'OTA package and release dependencies',
    evidence: 'Change impact and rollback review.',
    concern: 'Remediation can affect other product functions.',
    next: 'Monitor relevant signals against the updated inventory.',
  },
  {
    id: 'monitor',
    name: 'Monitor',
    summary: 'Match new intelligence to product context.',
    input: 'Threat intelligence and security signals',
    evidence: 'Product-specific investigation candidates.',
    concern: 'A signal match requires exposure validation.',
    next: 'Assign a controlled response decision.',
  },
  {
    id: 'respond',
    name: 'Respond',
    summary: 'Act within explicit boundaries.',
    input: 'Evidence, risk context and approvals',
    evidence: 'A documented response recommendation.',
    concern: 'Safety and availability constrain operational action.',
    next: 'Review the outcome with the responsible team.',
  },
  {
    id: 'improve',
    name: 'Improve',
    summary: 'Return the learning to engineering.',
    input: 'Review outcomes and unresolved questions',
    evidence: 'Updated context and investigation guidance.',
    concern: 'Assumptions need periodic reassessment.',
    next: 'Inform the next design and development cycle.',
  },
];
export const attackSurfaces = [
  [
    'Sensor',
    'Untrusted physical input',
    'Review the input boundary and downstream decisions.',
  ],
  [
    'ECU',
    'Exposed embedded component',
    'Link firmware, versions and vehicle functions.',
  ],
  [
    'API',
    'An unintended access path',
    'Identify the service boundary and authorization context.',
  ],
  [
    'Mobile App',
    'Shared product credentials or dependencies',
    'Connect application versions to the physical product.',
  ],
  [
    'Cloud',
    'An exposed backend dependency',
    'Trace the service to the products that rely on it.',
  ],
  [
    'OTA',
    'Unreviewed software change',
    'Inspect release scope, update controls and recovery context.',
  ],
  [
    'Third-party dependency',
    'A shared vulnerable component',
    'Find affected versions and dependent products.',
  ],
  [
    'Supplier',
    'Incomplete component evidence',
    'Identify ownership and request missing information.',
  ],
  [
    'Network',
    'A crossed trust boundary',
    'Review connectivity, segmentation and operating assumptions.',
  ],
];
export type ProductNode = {
  id: string;
  name: string;
  type: string;
  x: number;
  y: number;
  detail: string;
};
export const productNodes: ProductNode[] = [
  {
    id: 'vehicle',
    name: 'Vehicle',
    type: 'Physical product',
    x: 110,
    y: 225,
    detail:
      'Reference vehicle VG-042. A fictional product used to explain relationships.',
  },
  {
    id: 'ecu',
    name: 'Gateway ECU',
    type: 'Hardware',
    x: 290,
    y: 90,
    detail: 'Gateway hardware connects vehicle software to external services.',
  },
  {
    id: 'software',
    name: 'Firmware 4.2.1',
    type: 'Software version',
    x: 490,
    y: 90,
    detail:
      'Example firmware version linked to the gateway component inventory.',
  },
  {
    id: 'library',
    name: 'Link library',
    type: 'Dependency',
    x: 690,
    y: 90,
    detail:
      'Fictional connectivity library shared by this firmware and supplier.',
  },
  {
    id: 'vuln',
    name: 'DEMO-VULN-001',
    type: 'Simulated vulnerability',
    x: 690,
    y: 245,
    detail:
      'Fictional vulnerability reference, not a real CVE. Exposure requires validation.',
  },
  {
    id: 'cloud',
    name: 'Cloud API',
    type: 'Connected service',
    x: 320,
    y: 245,
    detail:
      'Example cloud API supports a vehicle service. Review its trust boundary.',
  },
  {
    id: 'mobile',
    name: 'Mobile App',
    type: 'Application',
    x: 310,
    y: 405,
    detail:
      'Example application depends on connected services and a supplier SDK.',
  },
  {
    id: 'supplier',
    name: 'Example Supplier',
    type: 'Supplier relationship',
    x: 560,
    y: 405,
    detail:
      'Fictional supplier owner of the shared component. Evidence is requested during investigation.',
  },
];
export const productEdges = [
  ['vehicle', 'ecu'],
  ['ecu', 'software'],
  ['software', 'library'],
  ['library', 'vuln'],
  ['vehicle', 'cloud'],
  ['vehicle', 'mobile'],
  ['mobile', 'supplier'],
  ['supplier', 'library'],
  ['cloud', 'software'],
];
export type DemoAsset = {
  id: string;
  name: string;
  category: string;
  version: string;
  supplier: string;
  risk: 'High' | 'Medium' | 'Low';
  score: number;
  components: number;
  status: string;
};
export const assets: DemoAsset[] = [
  {
    id: 'VG-042',
    name: 'Vehicle Gateway',
    category: 'Automotive',
    version: '4.2.1',
    supplier: 'Example Embedded Co.',
    risk: 'High',
    score: 74,
    components: 18,
    status: 'Exposure review',
  },
  {
    id: 'RC-018',
    name: 'Robot Controller',
    category: 'Robotics',
    version: '2.8.0',
    supplier: 'Example Motion Systems',
    risk: 'Medium',
    score: 52,
    components: 12,
    status: 'Supplier evidence needed',
  },
  {
    id: 'CS-007',
    name: 'Connected Sensor',
    category: 'Connected Products',
    version: '1.6.3',
    supplier: 'Example Sensor Works',
    risk: 'Low',
    score: 28,
    components: 7,
    status: 'Configuration review',
  },
  {
    id: 'EG-011',
    name: 'Edge Gateway',
    category: 'Industrial',
    version: '3.1.0',
    supplier: 'Example Embedded Co.',
    risk: 'High',
    score: 71,
    components: 15,
    status: 'Dependency triage',
  },
];
export type DemoThreat = {
  id: string;
  name: string;
  product: string;
  component: string;
  severity: 'High' | 'Medium' | 'Low';
  exposure: string;
  analysis: string;
  action: string;
  time: string;
};
export const threats: DemoThreat[] = [
  {
    id: 'DEMO-VULN-001',
    name: 'Shared library exposure',
    product: 'Vehicle Gateway',
    component: 'Link library / 2.4',
    severity: 'High',
    exposure: 'Gateway configuration requires validation.',
    analysis:
      'Inventory and version match found. The dependency path reaches the vehicle gateway; exploitability is not established.',
    action:
      'Validate exposure and request supplier evidence before remediation.',
    time: '09:14',
  },
  {
    id: 'DEMO-VULN-002',
    name: 'Edge runtime dependency',
    product: 'Robot Controller',
    component: 'Example Edge Runtime / 1.8',
    severity: 'Medium',
    exposure: 'Control-system boundary requires review.',
    analysis:
      'The runtime is listed in the controller SBOM. Operational constraints and supplier guidance are still missing.',
    action: 'Route a scoped investigation to engineering and operations.',
    time: '09:16',
  },
  {
    id: 'DEMO-SIGNAL-003',
    name: 'Configuration drift',
    product: 'Connected Sensor',
    component: 'Radio stack / 1.6',
    severity: 'Low',
    exposure: 'Difference from the example baseline.',
    analysis:
      'A configuration difference is recorded. It is not evidence of compromise.',
    action: 'Review the configuration owner and intended operating baseline.',
    time: '09:18',
  },
];
export const agentProfiles = [
  {
    name: 'Threat Analyst Agent',
    input: 'DEMO-VULN-001 and example advisory context',
    context: 'Separate confirmed signals from unverified assumptions.',
    evidence: [
      'Signal source identified',
      'Fictional advisory categorized',
      'Product match handed off',
    ],
    risk: 'The signal warrants investigation; an exploit is not confirmed.',
    recommendation: 'Request product exposure assessment.',
  },
  {
    name: 'Product Security Agent',
    input: 'Vehicle Gateway / firmware 4.2.1',
    context: 'Map the product and its operating boundaries.',
    evidence: [
      'Product identified',
      'Dependency mapped',
      'Configuration attached',
    ],
    risk: 'The shared component may affect a vehicle function.',
    recommendation: 'Confirm the affected variants with the product team.',
  },
  {
    name: 'Vulnerability Agent',
    input: 'Example component version and DEMO-VULN-001',
    context: 'Review a version match without assuming exploitability.',
    evidence: [
      'Component identified',
      'Demo vulnerability matched',
      'Exposure questions recorded',
    ],
    risk: 'Version matching alone does not establish real exposure.',
    recommendation: 'Validate exposure before choosing remediation.',
  },
  {
    name: 'Supplier Risk Agent',
    input: 'Example Embedded Co. and shared library ownership',
    context: 'Identify evidence gaps and accountable owners.',
    evidence: [
      'Supplier relationship mapped',
      'Shared component identified',
      'Evidence request prepared',
    ],
    risk: 'Supplier guidance is missing from the example investigation.',
    recommendation: 'Request affected-version and remediation information.',
  },
  {
    name: 'Incident Response Agent',
    input: 'Product context, evidence and response policy',
    context: 'Prepare an action within defined permission boundaries.',
    evidence: [
      'Evidence summarized',
      'Operational constraints recorded',
      'Approval owner identified',
    ],
    risk: 'A change may affect safety or availability.',
    recommendation: 'Route the proposal to an authorized human reviewer.',
  },
];
export const physicalStages = [
  [
    'Sense',
    'Sensors observe the physical environment.',
    'Review input integrity and device interfaces.',
  ],
  [
    'Understand',
    'Software and models interpret the inputs.',
    'Trace firmware, model and runtime dependencies.',
  ],
  [
    'Reason',
    'The system evaluates available context.',
    'Keep assumptions and trust boundaries explicit.',
  ],
  [
    'Decide',
    'A policy selects the next action.',
    'Review permissions and safety constraints.',
  ],
  [
    'Act',
    'A machine changes the physical world.',
    'Preserve human controls and recovery paths.',
  ],
];
export const supplierStages = [
  [
    'OEM',
    'Product architecture',
    'Connect the complete product and decision owners.',
  ],
  [
    'Tier 1',
    'Integrated system',
    'Track system-level SBOM and evidence requests.',
  ],
  [
    'Tier 2',
    'Embedded component',
    'Link firmware versions and hardware context.',
  ],
  [
    'Software Vendor',
    'Shared library',
    'Review affected versions and remediation guidance.',
  ],
  [
    'Open Source',
    'Transitive dependency',
    'Trace provenance and advisory context.',
  ],
];
export const storyStages = [
  ['THE PRODUCT', 'A physical system starts with a defined purpose.'],
  ['CONNECTED', 'Sensors, networks and cloud services extend its boundaries.'],
  ['INTELLIGENT', 'Software and models turn signals into decisions.'],
  ['AUTONOMOUS', 'Decisions begin to influence physical behavior.'],
  [
    'NEW SECURITY SURFACES',
    'Each dependency introduces a question for security.',
  ],
  ['DESTROSOLUTIONS', 'Connect product context with threat intelligence.'],
  [
    'AI UNDERSTANDS RISK',
    'Organize evidence into a reviewable recommendation.',
  ],
  [
    'SECURITY OPERATIONS RESPONDS',
    'Authorized teams decide the controlled next step.',
  ],
];
