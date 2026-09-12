export const contact = {
  email: 'avinashchowdam@destrosolutions.com',
  phone: '+91 9398793452',
  location: 'Hyderabad, India',
};
export const navigation = [
  ['Products', '/product'],
  ['Solutions', '/solutions'],
  ['Industries', '/industries'],
  ['Technology', '/technology'],
  ['Training', '/training'],
  ['Insights', '/insights'],
  ['Company', '/company'],
];
export const pillars = [
  {
    id: 'product-intelligence',
    label: '01 / PRODUCT INTELLIGENCE',
    title: 'Know what you protect.',
    description:
      'Connect components, firmware, suppliers and vulnerabilities to the products that depend on them.',
    tags: ['SBOM context', 'Supplier visibility', 'Product risk'],
    href: '/product#product-intelligence',
  },
  {
    id: 'threat-intelligence',
    label: '02 / THREAT INTELLIGENCE',
    title: 'Find the signal that matters.',
    description:
      'Bring threat signals into product context. Exchange structured intelligence through STIX and TAXII.',
    tags: ['Threat correlation', 'Intelligence sharing', 'Relevant signals'],
    href: '/product#threat-intelligence',
  },
  {
    id: 'agentic-ai',
    label: '03 / AGENTIC AI',
    title: 'Move from insight to action.',
    description:
      'Support investigation and response with evidence-led workflows, reviewable recommendations and human control.',
    tags: ['AI-assisted analysis', 'Response playbooks', 'Human approval'],
    href: '/product#agentic-ai',
  },
];
export const industries = [
  {
    slug: 'automotive',
    name: 'Automotive',
    description:
      'Connected vehicles bring software, suppliers and cloud services into a single product lifecycle.',
    priorities: [
      'Map ECU and software dependencies',
      'Assess fleet-relevant vulnerabilities',
      'Coordinate response across suppliers',
    ],
    frameworks: ['ISO/SAE 21434', 'ISO 26262', 'UNECE R155 / R156', 'ASPICE'],
    requirement: 'Security evidence from engineering to in-service operations.',
    capability:
      'Connect vehicle software context with product-specific threat intelligence.',
  },
  {
    slug: 'industrial',
    name: 'Industrial',
    description:
      'Long-lived control systems now share networks and dependencies with connected enterprise services.',
    priorities: [
      'Understand operational dependencies',
      'Evaluate change constraints',
      'Prioritize critical assets',
    ],
    frameworks: ['IEC 62443'],
    requirement: 'Risk decisions that account for operational continuity.',
    capability:
      'Bring component visibility and threat context into an operational risk discussion.',
  },
  {
    slug: 'robotics',
    name: 'Robotics',
    description:
      'Intelligent robots connect perception, decision models and physical actuators.',
    priorities: [
      'Trace sensor-to-action dependencies',
      'Review edge software exposure',
      'Gate response actions',
    ],
    frameworks: ['Context-specific safety assessment'],
    requirement: 'Security decisions that consider physical consequences.',
    capability:
      'Explore product intelligence across the perception and control stack.',
  },
  {
    slug: 'connected-products',
    name: 'Connected Products',
    description:
      'Devices depend on mobile applications, cloud APIs, firmware and third-party services.',
    priorities: [
      'Identify exposed components',
      'Track firmware versions',
      'Connect advisories to products',
    ],
    frameworks: ['EU Cyber Resilience Act'],
    requirement: 'A product view that continues beyond deployment.',
    capability:
      'Link component intelligence, vulnerabilities and response ownership.',
  },
  {
    slug: 'manufacturing',
    name: 'Manufacturing',
    description:
      'Production environments connect machines, edge gateways, suppliers and business systems.',
    priorities: [
      'Map machine software',
      'Understand supplier dependencies',
      'Plan controlled remediation',
    ],
    frameworks: ['IEC 62443'],
    requirement: 'Prioritized security work within production constraints.',
    capability:
      'Explore contextual risk across connected manufacturing assets.',
  },
  {
    slug: 'mobility',
    name: 'Mobility',
    description:
      'Connected fleets and mobility services link vehicles, applications and infrastructure.',
    priorities: [
      'Trace service dependencies',
      'Evaluate fleet impact',
      'Coordinate response ownership',
    ],
    frameworks: ['Product-specific transport requirements'],
    requirement: 'A consistent view across distributed systems.',
    capability: 'Connect threat signals to affected software and services.',
  },
  {
    slug: 'energy',
    name: 'Energy & Infrastructure',
    description:
      'Distributed energy assets rely on connected controllers, gateways and remote services.',
    priorities: [
      'Map asset exposure',
      'Review remote access dependencies',
      'Evaluate supplier risk',
    ],
    frameworks: ['IEC 62443'],
    requirement: 'Security prioritization across long-lived infrastructure.',
    capability: 'Explore asset context and intelligence-led investigation.',
  },
  {
    slug: 'physical-ai',
    name: 'Physical AI',
    description:
      'Machines that sense, decide and act need security across software, models and physical interfaces.',
    priorities: [
      'Trace perception-to-action dependencies',
      'Investigate edge exposure',
      'Preserve human control',
    ],
    frameworks: ['Context-specific safety assessment'],
    requirement: 'Connect cyber risk to real-world operating consequences.',
    capability:
      'Explore product context for intelligent machines and autonomous systems.',
  },
  {
    slug: 'aviation',
    name: 'Aviation',
    description:
      'Aircraft, ground systems and connected maintenance services operate across complex supply chains.',
    priorities: [
      'Track embedded dependencies',
      'Review maintenance software exposure',
      'Coordinate supplier evidence',
    ],
    frameworks: ['Sector-specific airworthiness requirements'],
    requirement:
      'Traceable security decisions throughout long operating lives.',
    capability:
      'Explore component intelligence and coordinated vulnerability review.',
  },
  {
    slug: 'railway',
    name: 'Railway',
    description:
      'Rolling stock, signalling and maintenance platforms link embedded software to critical operations.',
    priorities: [
      'Map rolling-stock components',
      'Understand system boundaries',
      'Coordinate lifecycle response',
    ],
    frameworks: ['Sector-specific railway requirements'],
    requirement:
      'Security context that respects operational and safety boundaries.',
    capability:
      'Connect product inventories with relevant vulnerability intelligence.',
  },
  {
    slug: 'maritime',
    name: 'Maritime',
    description:
      'Vessels, ports and shore services combine connected equipment with remote operating environments.',
    priorities: [
      'Identify onboard dependencies',
      'Evaluate connectivity exposure',
      'Coordinate shore and vessel teams',
    ],
    frameworks: ['Sector-specific maritime requirements'],
    requirement: 'Actionable risk context across distributed operations.',
    capability:
      'Explore product visibility and evidence-led security workflows.',
  },
  {
    slug: 'defense',
    name: 'Defence',
    description:
      'Mission systems require careful control of software provenance and supplier dependencies.',
    priorities: [
      'Trace software provenance',
      'Assess supplier dependencies',
      'Review exposure within system boundaries',
    ],
    frameworks: ['Program-specific assurance requirements'],
    requirement:
      'Reviewable evidence with clearly defined information boundaries.',
    capability: 'Discuss product intelligence for your program requirements.',
  },
  {
    slug: 'healthcare',
    name: 'Healthcare',
    description:
      'Connected medical devices combine embedded software, clinical networks and supporting services.',
    priorities: [
      'Map device software',
      'Evaluate product-specific exposure',
      'Coordinate controlled remediation',
    ],
    frameworks: ['Device-specific regulatory requirements'],
    requirement:
      'Security decisions sensitive to patient and operational context.',
    capability:
      'Explore component visibility and product-specific vulnerability triage.',
  },
];
export const solutions = [
  [
    'product-cybersecurity',
    'Product Cybersecurity',
    'Connect product inventories, software dependencies and vulnerability context.',
    'Component visibility · Risk triage · Evidence',
  ],
  [
    'automotive-cybersecurity',
    'Automotive Cybersecurity',
    'Explore security context across vehicle software, ECUs and connected services.',
    'Vehicle context · Lifecycle review · Supplier coordination',
  ],
  [
    'threat-intelligence',
    'Threat Intelligence',
    'Turn external signals into relevant investigations for your product portfolio.',
    'STIX / TAXII · Correlation · Intelligence exchange',
  ],
  [
    'security-operations',
    'Security Operations',
    'Connect investigation, cases and response decisions around affected products.',
    'Case context · Playbooks · Approval gates',
  ],
  [
    'ota-security',
    'OTA Security',
    'Explore how update dependencies and release evidence inform product security.',
    'Version context · Update dependencies · Review workflow',
  ],
  [
    'sbom-management',
    'SBOM Management',
    'Make software composition useful for product-specific vulnerability decisions.',
    'Components · Dependencies · Affected versions',
  ],
  [
    'supplier-security',
    'Supplier Security',
    'Understand shared dependencies and coordinate product risk across suppliers.',
    'Supplier context · Shared components · Evidence exchange',
  ],
  [
    'ai-security-automation',
    'AI Security Automation',
    'Explore AI-assisted investigation with reviewable reasoning and controlled response.',
    'Correlation · Recommendations · Human approval',
  ],
  [
    'functional-safety',
    'Functional Safety',
    'Discuss the interface between cybersecurity decisions and safety engineering.',
    'Impact context · Engineering handoffs · Evidence review',
  ],
  [
    'sdv-security',
    'SDV Security',
    'Connect software-defined vehicle architecture to lifecycle security priorities.',
    'Zonal systems · Cloud dependencies · Vehicle operations',
  ],
];
export const agents = [
  [
    'Threat Analyst Agent',
    'Connect threat signals, patterns and supporting evidence.',
  ],
  [
    'Product Security Agent',
    'Establish which products and configurations are in scope.',
  ],
  ['Vulnerability Agent', 'Review component exposure and remediation context.'],
  [
    'Supplier Risk Agent',
    'Trace shared dependencies and information requests.',
  ],
  [
    'Incident Response Agent',
    'Prepare a response recommendation for authorized review.',
  ],
];
export const courses = [
  [
    'ISO/SAE 21434',
    'Automotive security engineers and product teams',
    'Cybersecurity engineering lifecycle, threat analysis and evidence.',
    'Outline a product security work product and review its assumptions.',
  ],
  [
    'ISO 26262',
    'Safety engineers and automotive development teams',
    'Functional safety concepts and the security–safety interface.',
    'Recognize the handoffs between safety and cybersecurity activities.',
  ],
  [
    'ASPICE',
    'Engineering managers and quality teams',
    'Process assessment concepts, traceability and engineering evidence.',
    'Map an engineering activity to its supporting evidence.',
  ],
  [
    'AUTOSAR',
    'Embedded engineers and software architects',
    'Automotive software architecture, interfaces and integration context.',
    'Discuss software boundaries and integration considerations.',
  ],
  [
    'IEC 62443',
    'Industrial security and automation teams',
    'Industrial security concepts, system boundaries and risk context.',
    'Frame a discussion around industrial system security requirements.',
  ],
  [
    'ISO 24089',
    'Vehicle software and release teams',
    'Software update engineering and lifecycle responsibilities.',
    'Identify update-related dependencies and review points.',
  ],
  [
    'Automotive Cybersecurity',
    'OEM, supplier and connected-product teams',
    'Vehicle attack surfaces, component exposure and incident context.',
    'Walk through a vehicle-focused vulnerability investigation.',
  ],
  [
    'Software-Defined Vehicles',
    'Vehicle architects and platform engineers',
    'Zonal architectures, cloud dependencies, OTA and security operations.',
    'Map security considerations across an SDV architecture.',
  ],
];
export const technologies = [
  ['AI / ML', 'Contextual reasoning and evidence-assisted analysis.'],
  ['Cybersecurity', 'Threat intelligence, vulnerability context and response.'],
  ['Cloud', 'Connected services, APIs and telemetry context.'],
  ['Data Intelligence', 'Component relationships and product risk context.'],
  ['Automotive', 'Embedded software and vehicle lifecycle intelligence.'],
  ['DevSecOps', 'Security context throughout software delivery.'],
  ['Agentic AI', 'Bounded workflows with human review.'],
  ['Physical AI', 'Security at the boundary of software and action.'],
];
export const scenarios = [
  {
    id: 'connected-vehicle',
    name: 'Connected Vehicle',
    challenge:
      'A shared communication library appears in several vehicle software variants.',
    detection:
      'A fictional vulnerability signal matches an inventory component.',
    analysis:
      'Correlate affected versions, vehicle configurations and supplier ownership.',
    response:
      'Prepare a supplier enquiry and a remediation review for the product team.',
    outcome:
      'The team has a scoped investigation and a documented decision path.',
  },
  {
    id: 'industrial-robot',
    name: 'Industrial Robot',
    challenge:
      'An edge gateway links robot control software to a remote service.',
    detection:
      'A demonstration signal highlights an exposed gateway dependency.',
    analysis:
      'Trace the gateway to robot software and identify operational constraints.',
    response:
      'Recommend a controlled review with engineering and operations approval.',
    outcome:
      'The proposed response accounts for the machine’s operating context.',
  },
  {
    id: 'software-defined-vehicle',
    name: 'Software-Defined Vehicle',
    challenge:
      'An OTA release changes software shared by several vehicle functions.',
    detection: 'A fictional component change introduces a review requirement.',
    analysis:
      'Connect release versions, dependencies and existing security evidence.',
    response: 'Route the recommendation through the release approval process.',
    outcome:
      'The release team can review the affected scope before a decision.',
  },
  {
    id: 'connected-device',
    name: 'Connected Device',
    challenge:
      'Device firmware and a mobile application share a supplier dependency.',
    detection: 'A demonstration advisory matches that dependency.',
    analysis:
      'Identify affected firmware and application versions across the product.',
    response:
      'Create a coordinated investigation brief for both engineering teams.',
    outcome:
      'One product-level view informs two connected remediation discussions.',
  },
];
export const articles = [
  {
    slug: 'product-context',
    title: 'Why product context changes vulnerability prioritization',
    category: 'PRODUCT INTELLIGENCE',
    intro: 'An inventory match starts an investigation. It does not finish it.',
    sections: [
      [
        'Start with the product',
        'A component may appear in several products, versions and configurations. Understanding those relationships helps a security team scope its investigation before deciding what to do.',
      ],
      [
        'Connect the evidence',
        'Component versions, exposure, supplier information and operating conditions provide different pieces of the picture. Keep the source of each piece visible and distinguish confirmed evidence from an assumption.',
      ],
      [
        'Make the next decision clear',
        'The useful output is a reviewable decision: investigate further, request supplier evidence or prepare a remediation discussion. Record why the decision was made and what would cause it to change.',
      ],
    ],
  },
  {
    slug: 'controlled-ai',
    title: 'Human control belongs inside the AI workflow',
    category: 'AGENTIC AI',
    intro:
      'A recommendation becomes useful when an accountable team can inspect it.',
    sections: [
      [
        'Define the boundary',
        'An agent can help organize evidence and suggest next steps. The permitted actions, required approvals and escalation conditions should be explicit before a workflow is connected to operational systems.',
      ],
      [
        'Preserve the reasoning',
        'Show the signals, affected product context and unresolved questions behind a recommendation. A confident-looking answer without evidence is difficult to review and unsafe to treat as a decision.',
      ],
      [
        'Review before response',
        'Product security changes can affect availability and physical behavior. Keep engineering and operational approval in the loop, and validate the response against the particular product environment.',
      ],
    ],
  },
  {
    slug: 'physical-ai',
    title: 'When a cyber decision has a physical consequence',
    category: 'PHYSICAL AI',
    intro: 'Security context needs to follow the path from sensing to action.',
    sections: [
      [
        'Follow the dependency chain',
        'A machine may combine sensors, embedded software, models, cloud services and actuators. A weakness in one dependency can matter differently depending on where it sits in that chain.',
      ],
      [
        'Bring disciplines together',
        'Product security, safety engineering and operations contribute different knowledge. Use a shared architecture and clear system boundaries to discuss the possible consequence of an event.',
      ],
      [
        'Keep response contextual',
        'A generic response can be inappropriate for a physical system. Review timing, operating state and recovery constraints with the responsible team before changing the system.',
      ],
    ],
  },
];
export const routeInfo: Record<string, [string, string]> = {
  '/': [
    'DestroSolutions | Product Security for the Physical World',
    'AI-powered product security, threat intelligence, and autonomous security operations for connected products, automotive systems, and intelligent machines.',
  ],
  '/product': [
    'Product Security Platform',
    'One intelligence layer connecting products, threats and AI-assisted security operations.',
  ],
  '/features': [
    'Platform Capabilities',
    'Explore product intelligence, threat intelligence and controlled AI workflows.',
  ],
  '/solutions': [
    'Security Solutions',
    'Explore security priorities across product lifecycles and connected systems.',
  ],
  '/industries': [
    'Industries',
    'Product security context for automotive, industrial systems and intelligent machines.',
  ],
  '/technology': [
    'Technology',
    'The intelligence architecture behind contextual product security.',
  ],
  '/training': [
    'Professional Training',
    'Discuss focused learning for automotive, industrial and product engineering teams.',
  ],
  '/insights': [
    'Insights',
    'Perspectives on product intelligence, AI-assisted response and physical systems.',
  ],
  '/company': [
    'Company',
    'Engineering security for the next generation of intelligent products.',
  ],
  '/careers': [
    'Careers',
    'Connect with DestroSolutions about engineering the security layer for the physical world.',
  ],
  '/use-cases': [
    'Demonstration Scenarios',
    'Explore evidence-led product security workflows through clearly labeled scenarios.',
  ],
  '/contact': [
    'Contact DestroSolutions',
    'Discuss your products, operating environment and security priorities.',
  ],
  '/privacy': [
    'Privacy',
    'How this website handles enquiries and technical information.',
  ],
  '/terms': [
    'Website Terms',
    'Information about the use of this website and its demonstration content.',
  ],
  '/imprint': [
    'Imprint & Company Contact',
    'DestroSolutions contact and legal information requests.',
  ],
  ...Object.fromEntries(
    industries.map((i) => [
      '/solutions/' + i.slug,
      [i.name + ' Security', i.description],
    ]),
  ),
  ...Object.fromEntries(
    solutions.map((s) => ['/solutions/capabilities/' + s[0], [s[1], s[2]]]),
  ),
  ...Object.fromEntries(
    articles.map((a) => ['/insights/' + a.slug, [a.title, a.intro]]),
  ),
};
export function pageTitle(path: string) {
  const title = routeInfo[path]?.[0] || 'Page not found';
  return path === '/' ? title : title + ' | DestroSolutions';
}
