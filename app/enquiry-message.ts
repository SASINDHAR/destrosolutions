export function composeEnquiry(
  name: string,
  company: string,
  industry: string,
  priority: string,
  notes: string,
) {
  const context = notes.trim()
    ? `

Context:
${notes.trim()}`
    : '';
  return `Hello DestroSolutions,

I would like to discuss ${priority.toLowerCase()} for ${company.trim() || 'our organization'}.

Name: ${name.trim() || 'Not provided'}
Company: ${company.trim() || 'Not provided'}
Industry: ${industry}
Priority: ${priority}${context}

Please get in touch to arrange a conversation.

Thank you.`;
}
export function enquiryMailto(company: string, message: string) {
  return `mailto:avinashchowdam@destrosolutions.com?subject=${encodeURIComponent('Platform enquiry — ' + company.trim())}&body=${encodeURIComponent(message)}`;
}
