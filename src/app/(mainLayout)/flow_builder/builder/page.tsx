"use client";

import FlowCanvas from '@/src/components/bot-flow/Flow';
import { ReactFlowProvider } from '@xyflow/react';

const BuilderPage = () => {
  return (
    <ReactFlowProvider>
      <FlowCanvas />
    </ReactFlowProvider>
  );
}

export default BuilderPage;
