import React from 'react';

interface ContactFormProps {
  formUrl: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({ formUrl }) => {
  return (
    <div className="relative w-full max-w-4xl mx-auto py-12 px-4 md:px-8 bg-surface-container-low rounded-xl shadow-inner">
      {/* Decorative Scrapbook Element */}
      <div className="absolute -top-4 -left-4 bg-secondary font-handwriting text-on-secondary-container px-6 py-2 rounded-sm shadow-md z-10">
        Apply Now!
      </div>
      
      <div className="w-full aspect-[4/5] md:aspect-[16/10] bg-white rounded-lg shadow-lg overflow-hidden border border-outline-variant/20">
        {formUrl ? (
          <iframe
            src={formUrl}
            width="100%"
            height="100%"
            frameBorder="0"
            marginHeight={0}
            marginWidth={0}
            title="House Application Form"
            className="w-full h-full"
          >
            Loading...
          </iframe>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-on-surface-variant/40 space-y-4">
            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="font-display font-bold">Google Form URL Not Set</p>
          </div>
        )}
      </div>
      
      {/* Decorative Tape Element */}
      <div className="absolute -bottom-2 -right-4 w-32 h-10 bg-primary/10 backdrop-blur-sm border-l-4 border-r-4 border-dashed border-primary/20"></div>
    </div>
  );
};
