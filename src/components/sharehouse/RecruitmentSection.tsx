import React from 'react';
import { RecruitmentInfo } from '@/types/microcms';

interface RecruitmentSectionProps {
  items: RecruitmentInfo[];
}

/**
 * 募集情報セクションコンポーネント
 * テーブル形式で募集条件・詳細を表示する
 */
export const RecruitmentSection: React.FC<RecruitmentSectionProps> = ({ items }) => {
  return (
    <section id="access" className="py-24 px-6 bg-surface-container-low">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="font-hand text-primary text-xl block mb-2 -rotate-1">Ready to join us?</span>
          <h2 className="text-3xl md:text-4xl font-headline font-black text-on-surface">
            Recruitment Info
          </h2>
          <div className="w-20 h-1.5 bg-primary/20 mx-auto mt-4 rounded-full" />
        </div>

        {/* Info table */}
        <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm border border-outline-variant/20">
          <div className="grid grid-cols-1 divide-y divide-outline-variant/15">
            {items.map((item, index) => (
              <div
                key={item.id}
                className={`flex flex-col md:flex-row ${index % 2 !== 0 ? 'bg-surface-container-low' : ''}`}
              >
                <div className="md:w-1/3 bg-surface-container px-8 py-6 font-headline font-bold text-primary flex items-center">
                  {item.label}
                </div>
                <div className="md:w-2/3 px-8 py-6 text-on-surface-variant leading-relaxed">
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="font-hand text-primary text-lg italic">
            &quot;We are waiting for you, fellow villager.&quot;
          </p>
        </div>
      </div>
    </section>
  );
};
