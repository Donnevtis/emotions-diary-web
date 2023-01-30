import React, { ComponentType, lazy, Suspense } from 'react';
import Fallback from '../components/Fallback/Fallback';

type LoadComponent = () => Promise<{ default: ComponentType<unknown> }>;

const componentLoader = (Component: LoadComponent) => {
  const LazyComponent = lazy(() => Component());

  return (
    <Suspense fallback={<Fallback />}>
      <LazyComponent />
    </Suspense>
  );
};

export default componentLoader;
