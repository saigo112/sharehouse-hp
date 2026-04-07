import React from 'react';

interface RecruitmentRow {
  label: string;
  value: string;
}

interface RecruitmentTableProps {
  data: RecruitmentRow[];
}

export const RecruitmentTable: React.FC<RecruitmentTableProps> = ({ data }) => {
  return (
    <div className="w-full overflow-hidden rounded-lg">
      <div className="flex flex-col">
        {/* Table Header - DESIGN.md: title-sm in primary with secondary-fixed underline */}
        <div className="px-6 py-4 border-b-2 border-[#ffdead]">
          <h3 className="font-display text-primary text-sm font-bold tracking-wider uppercase">
            Recruitment Details
          </h3>
        </div>
        
        {/* Table Body - DESIGN.md: alternating background shifts */}
        <div className="divide-y divide-outline-variant/10">
          {data.map((row, index) => (
            <div 
              key={index} 
              className={`flex flex-col md:flex-row md:items-center px-6 py-5 transition-colors ${
                index % 2 === 0 ? 'bg-surface-container' : 'bg-surface-container-low'
              } hover:bg-surface-container-highest/50`}
            >
              <div className="md:w-1/3 mb-1 md:mb-0">
                <span className="font-display text-primary/80 text-sm font-bold">
                  {row.label}
                </span>
              </div>
              <div className="md:w-2/3">
                <p className="font-sans text-on-surface-variant text-base leading-relaxed">
                  {row.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
