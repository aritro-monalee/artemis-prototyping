import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { MLCounter, type MLCounterProps } from '.';
import { MLToolTip } from '../MLToolTip';

const meta: Meta<typeof MLCounter> = {
  title: 'Components/Counter',
  component: MLCounter,
  tags: ['autodocs'],
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#FEFBF7' },
        { name: 'dark', value: '#000' },
      ],
    },
  },
  argTypes: {
    value: {
      control: 'text',
    },
    min: {
      control: 'number',
    },
    max: {
      control: 'number',
    },
    editableNumberInput: {
      control: 'boolean',
      description: 'Allow the number to be directly edited as an input field',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the counter is disabled',
    },
    onBlur: { action: 'blurred' },
    onChange: { action: 'changed' },
  },
};

export default meta;
type Story = StoryObj<MLCounterProps>;

export const Default: Story = {
  args: {
    min: 1,
    max: 10,
    value: 5,
  },
};

export const WithoutMinMax = () => {
  const [value, setValue] = useState(5);
  return (
    <div className="p-4">
      <MLCounter value={value} onChange={(value) => setValue(value)} />
      <div className="mt-4 p-2">
        <strong>Value:</strong> {value}
      </div>
    </div>
  );
};

export const EditableInput: Story = {
  args: {
    min: 1,
    max: 10,
    value: 5,
    editableNumberInput: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Counter with editable number input - you can click on the number to edit it directly.',
      },
    },
  },
};

export const EditableWithoutLimits: Story = {
  args: {
    value: 42,
    editableNumberInput: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Editable counter without min/max limits.',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    min: 1,
    max: 10,
    value: 5,
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Counter in disabled state - buttons and interactions are disabled.',
      },
    },
  },
};

export const EditableDemo = () => {
  const [value, setValue] = useState(15);
  const [blurCount, setBlurCount] = useState(0);

  const handleBlur = () => {
    setBlurCount((prev) => prev + 1);
  };

  return (
    <div className="p-4 flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-medium">Editable Counter Demo</h3>
        <MLCounter
          min={1}
          max={100}
          value={value}
          onChange={setValue}
          editableNumberInput={true}
          onBlur={handleBlur}
        />
        <div className="text-xs text-gray-600">
          <div>Current Value: {value}</div>
          <div>Input Blur Count: {blurCount}</div>
          <div className="mt-2 text-gray-500">
            Try: clicking buttons, typing a number, or typing out of range values
          </div>
        </div>
      </div>
    </div>
  );
};

export const EditableWithTooltip = () => {
  const [value, setValue] = useState(5);

  return (
    <div className="p-4 flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-medium">Editable Counter with Tooltip</h3>
        <MLToolTip tooltipContent="This counter can be edited by typing directly on the number">
          <MLCounter
            min={1}
            max={10}
            value={value}
            onChange={setValue}
            editableNumberInput={true}
          />
        </MLToolTip>
        <div className="text-xs text-gray-600">Current Value: {value}</div>
        <div className="text-xs text-gray-500">
          This tests the input sizing when wrapped with a tooltip
        </div>
      </div>
    </div>
  );
};

export const AccessibleCounter = () => {
  const [value, setValue] = useState(12);
  const counterLabel = 'Number of solar panels';

  const readCounterValue = () => {
    const counter = document.querySelector(`[aria-label="${counterLabel}"]`);
    if (counter) {
      const currentValue = counter.getAttribute('aria-valuenow');
      alert(`The current number of solar panels is: ${currentValue}`);
    }
  };

  return (
    <div className="p-4 flex flex-col gap-4 items-start">
      <MLCounter min={0} max={50} value={value} onChange={setValue} aria-label={counterLabel} />
      <button
        onClick={readCounterValue}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Read Counter Value
      </button>
      <div className="p-2">
        <strong>Current Value:</strong> {value}
      </div>
    </div>
  );
};
