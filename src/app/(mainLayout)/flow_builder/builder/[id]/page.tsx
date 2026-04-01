"use client";

import FlowCanvas from '@/src/components/bot-flow/Flow';
import { ReactFlowProvider } from '@xyflow/react';

const EditBuilderPage = () => {
  return (
    <ReactFlowProvider>
      <FlowCanvas />
    </ReactFlowProvider>
  );
}

export default EditBuilderPage;
