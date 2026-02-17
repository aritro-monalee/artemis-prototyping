export const examples = {
  Default: `<MLAccordion type="single" collapsible defaultValue="item-1">
  <MLAccordionItem value="item-1">
    <MLAccordionTrigger>Is it accessible?</MLAccordionTrigger>
    <MLAccordionContent>
      Yes. It adheres to the WAI-ARIA design pattern.
    </MLAccordionContent>
  </MLAccordionItem>
  <MLAccordionItem value="item-2">
    <MLAccordionTrigger>Is it styled?</MLAccordionTrigger>
    <MLAccordionContent>
      Yes. It comes with default styles that match the design system.
    </MLAccordionContent>
  </MLAccordionItem>
</MLAccordion>`,

  Multiple: `<MLAccordion type="multiple" defaultValue={['item-1', 'item-2']}>
  <MLAccordionItem value="item-1">
    <MLAccordionTrigger>First Section</MLAccordionTrigger>
    <MLAccordionContent>
      Multiple sections can be open at the same time.
    </MLAccordionContent>
  </MLAccordionItem>
  <MLAccordionItem value="item-2">
    <MLAccordionTrigger>Second Section</MLAccordionTrigger>
    <MLAccordionContent>
      This is also open by default.
    </MLAccordionContent>
  </MLAccordionItem>
</MLAccordion>`,

  WithLongContent: `<MLAccordion type="single" collapsible>
  <MLAccordionItem value="item-1">
    <MLAccordionTrigger>
      What are the key considerations?
    </MLAccordionTrigger>
    <MLAccordionContent>
      <p className="mb-4">Consider these key factors:</p>
      <ul className="list-disc list-inside space-y-2">
        <li>Multi-factor authentication</li>
        <li>Single Sign-On integration</li>
        <li>Role-based access control</li>
      </ul>
    </MLAccordionContent>
  </MLAccordionItem>
</MLAccordion>`,

  NoChevron: `<MLAccordion type="single" collapsible>
  <MLAccordionItem value="item-1">
    <MLAccordionTrigger hideChevron>
      Click to expand (no chevron)
    </MLAccordionTrigger>
    <MLAccordionContent>
      This accordion item has no chevron indicator.
    </MLAccordionContent>
  </MLAccordionItem>
</MLAccordion>`,

  FAQ: `<MLAccordion type="single" collapsible>
  <MLAccordionItem value="item-1">
    <MLAccordionTrigger>What payment methods do you accept?</MLAccordionTrigger>
    <MLAccordionContent>
      We accept all major credit cards, PayPal, and bank transfers.
    </MLAccordionContent>
  </MLAccordionItem>
  <MLAccordionItem value="item-2">
    <MLAccordionTrigger>How do I cancel my subscription?</MLAccordionTrigger>
    <MLAccordionContent>
      You can cancel your subscription from your account settings.
    </MLAccordionContent>
  </MLAccordionItem>
</MLAccordion>`,
};
