"use client";

import React from "react";

interface PageContentProps {
  content: string;
}

const PageContent: React.FC<PageContentProps> = ({ content }) => {
  return (
    <div 
      className="dynamic-content max-w-none"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default PageContent;
