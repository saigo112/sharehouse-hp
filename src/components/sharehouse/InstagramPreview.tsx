'use client';

import { InstagramEmbed } from 'react-social-media-embed';

interface InstagramPreviewProps {
  url: string;
}

export const InstagramPreview: React.FC<InstagramPreviewProps> = ({ url }) => {
  return (
    <div className="flex justify-center my-8">
      <InstagramEmbed url={url} width="100%" />
    </div>
  );
};
