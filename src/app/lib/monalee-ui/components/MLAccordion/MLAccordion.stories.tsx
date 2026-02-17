import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  MLAccordion,
  MLAccordionItem,
  MLAccordionTrigger,
  MLAccordionContent,
  type MLAccordionProps,
} from './MLAccordion';

const meta: Meta<typeof MLAccordion> = {
  title: 'Components/Accordion',
  component: MLAccordion,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#FEFBF7' },
        { name: 'dark', value: '#000' },
      ],
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<MLAccordionProps>;

export const Default: Story = {
  render: () => (
    <div className="w-[576px]">
      <MLAccordion type="single" collapsible defaultValue="item-1">
        <MLAccordionItem value="item-1">
          <MLAccordionTrigger>Is it accessible?</MLAccordionTrigger>
          <MLAccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</MLAccordionContent>
        </MLAccordionItem>
        <MLAccordionItem value="item-2">
          <MLAccordionTrigger>Is it styled?</MLAccordionTrigger>
          <MLAccordionContent>
            Yes. It comes with default styles that match the Artemis Design System.
          </MLAccordionContent>
        </MLAccordionItem>
        <MLAccordionItem value="item-3">
          <MLAccordionTrigger>Is it animated?</MLAccordionTrigger>
          <MLAccordionContent>
            Yes. It&apos;s animated by default with smooth expand/collapse transitions.
          </MLAccordionContent>
        </MLAccordionItem>
      </MLAccordion>
    </div>
  ),
  args: {
    type: 'single',
  },
};

export const Multiple: Story = {
  render: () => (
    <div className="w-[576px]">
      <MLAccordion type="multiple" defaultValue={['item-1', 'item-2']}>
        <MLAccordionItem value="item-1">
          <MLAccordionTrigger>First Section</MLAccordionTrigger>
          <MLAccordionContent>
            This is the first section content. Multiple sections can be open at the same time.
          </MLAccordionContent>
        </MLAccordionItem>
        <MLAccordionItem value="item-2">
          <MLAccordionTrigger>Second Section</MLAccordionTrigger>
          <MLAccordionContent>
            This is the second section content. It&apos;s also open by default.
          </MLAccordionContent>
        </MLAccordionItem>
        <MLAccordionItem value="item-3">
          <MLAccordionTrigger>Third Section</MLAccordionTrigger>
          <MLAccordionContent>
            This is the third section content. Click to expand.
          </MLAccordionContent>
        </MLAccordionItem>
      </MLAccordion>
    </div>
  ),
  args: {
    type: 'multiple',
  },
};

export const WithLongContent: Story = {
  render: () => (
    <div className="w-[576px]">
      <MLAccordion type="single" collapsible>
        <MLAccordionItem value="item-1">
          <MLAccordionTrigger>
            What are the key considerations when implementing a comprehensive enterprise-level
            authentication system?
          </MLAccordionTrigger>
          <MLAccordionContent>
            <p className="mb-4">
              When implementing enterprise authentication, consider these key factors:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Multi-factor authentication (MFA) for enhanced security</li>
              <li>Single Sign-On (SSO) integration with identity providers</li>
              <li>Role-based access control (RBAC) for granular permissions</li>
              <li>Session management and token refresh strategies</li>
              <li>Audit logging for compliance and security monitoring</li>
            </ul>
          </MLAccordionContent>
        </MLAccordionItem>
        <MLAccordionItem value="item-2">
          <MLAccordionTrigger>How do I handle password policies?</MLAccordionTrigger>
          <MLAccordionContent>
            Password policies should enforce minimum length, complexity requirements, and regular
            rotation schedules while balancing security with user experience.
          </MLAccordionContent>
        </MLAccordionItem>
      </MLAccordion>
    </div>
  ),
  args: {
    type: 'single',
  },
};

export const NoChevron: Story = {
  render: () => (
    <div className="w-[576px]">
      <MLAccordion type="single" collapsible>
        <MLAccordionItem value="item-1">
          <MLAccordionTrigger hideChevron>Click to expand (no chevron)</MLAccordionTrigger>
          <MLAccordionContent>This accordion item has no chevron indicator.</MLAccordionContent>
        </MLAccordionItem>
        <MLAccordionItem value="item-2">
          <MLAccordionTrigger>With chevron (default)</MLAccordionTrigger>
          <MLAccordionContent>
            This accordion item shows the default chevron indicator.
          </MLAccordionContent>
        </MLAccordionItem>
      </MLAccordion>
    </div>
  ),
  args: {
    type: 'single',
  },
};

export const FAQ: Story = {
  render: () => (
    <div className="w-[576px]">
      <h2 className="text-xl font-semibold text-base-foreground mb-4">
        Frequently Asked Questions
      </h2>
      <MLAccordion type="single" collapsible className="border-t border-base-border">
        <MLAccordionItem value="item-1">
          <MLAccordionTrigger>What payment methods do you accept?</MLAccordionTrigger>
          <MLAccordionContent>
            We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank
            transfers for enterprise accounts.
          </MLAccordionContent>
        </MLAccordionItem>
        <MLAccordionItem value="item-2">
          <MLAccordionTrigger>How do I cancel my subscription?</MLAccordionTrigger>
          <MLAccordionContent>
            You can cancel your subscription at any time from your account settings. Your access
            will continue until the end of your current billing period.
          </MLAccordionContent>
        </MLAccordionItem>
        <MLAccordionItem value="item-3">
          <MLAccordionTrigger>Do you offer refunds?</MLAccordionTrigger>
          <MLAccordionContent>
            Yes, we offer a 30-day money-back guarantee for all new subscriptions. Contact our
            support team to request a refund.
          </MLAccordionContent>
        </MLAccordionItem>
        <MLAccordionItem value="item-4">
          <MLAccordionTrigger>Is my data secure?</MLAccordionTrigger>
          <MLAccordionContent>
            Absolutely. We use industry-standard encryption and follow best practices for data
            security. Your data is stored in SOC 2 compliant data centers.
          </MLAccordionContent>
        </MLAccordionItem>
      </MLAccordion>
    </div>
  ),
  args: {
    type: 'single',
  },
};
