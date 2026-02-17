import React from 'react';
import { MLLoadingSpinner as LoadingSpinner } from './index';

export default {
  title: 'Components/LoadingSpinner',
  component: LoadingSpinner,
  tags: ['autodocs'],
};

export const Default = () => (
  <div className="flex flex-col gap-4">
    <LoadingSpinner size="sm" color="primary" />
    <LoadingSpinner size="md" color="primary" />
    <LoadingSpinner size="lg" color="primary" />
  </div>
);
