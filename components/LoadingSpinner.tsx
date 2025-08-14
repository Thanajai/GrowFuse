import React from 'react';
import { LeafIcon } from './IconComponents';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center p-8">
      <LeafIcon className="w-12 h-12 text-brand-green animate-spin" />
    </div>
  );
};

export default LoadingSpinner;