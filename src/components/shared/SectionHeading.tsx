import React, { ReactNode } from 'react';

interface SectionHeadingProps {
  title: string;
  icon?: ReactNode;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({ title, icon }) => {
  return (
    <div className="flex flex-col items-center text-center">
      {icon && (
        <div className="inline-flex items-center justify-center bg-primary/10 rounded-full p-3 mb-4">
          {icon}
        </div>
      )}
      <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
      <div className="divider"></div>
    </div>
  );
};

export default SectionHeading;