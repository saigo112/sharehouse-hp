import React from 'react';
import Link from 'next/link';

export interface InstagramPost {
  id: string;
  instagramUrl: string;
  title: string;
}

interface InstagramFeedProps {
  posts: InstagramPost[];
  limit?: number;
}

/**
 * Instagramフィード（リスト形式）表示用コンポーネント
 * 
 * 複数の投稿URLを受け取り、横スクロールのカードとして表示します。
 */
export const InstagramFeed: React.FC<InstagramFeedProps> = ({ posts, limit }) => {
  const displayedPosts = limit ? posts?.slice(0, limit) || [] : posts || [];

  const getEmbedUrl = (url: string) => {
    let embedUrl = url.trim();
    if (embedUrl.includes('instagram.com/p/') || embedUrl.includes('instagram.com/reel/')) {
      embedUrl = embedUrl.split('?')[0];
      if (!embedUrl.endsWith('/')) {
        embedUrl += '/';
      }
      if (!embedUrl.endsWith('embed/')) {
        embedUrl += 'embed/';
      }
      return embedUrl;
    }
    return null;
  };

  return (
    <section id="diaries" className="py-10 md:py-24 overflow-hidden relative bg-[#f9f8f6]">
      {/* Background visual elements */}
      <div className="absolute top-1/4 left-0 w-full h-px bg-outline-variant/30 -z-10" />
      <div className="absolute bottom-1/3 left-0 w-full h-px bg-outline-variant/30 -z-10" />

      <div className="max-w-7xl mx-auto px-6 mb-8 md:mb-16 relative">
        {/* Header content */}
        <div className="flex flex-col items-center justify-center relative">
          <h2 
            className="font-headline font-black text-on-surface text-center mb-2 relative z-10"
            style={{ fontSize: 'var(--section-title-size)' }}
          >
            Instagram
          </h2>
          <div className="relative inline-block">
            <p 
              className="text-center font-hand text-primary relative z-10"
              style={{ fontSize: 'var(--caption-text-size)' }}
            >
              Daily Life & Updates
            </p>
            <div className="w-full h-2 bg-primary/20 rounded-full absolute bottom-1.5 left-0 z-0" />
          </div>
        </div>
      </div>

      {/* Scroll indicator for mobile focus */}
      <div className="md:hidden flex justify-end px-10 -mt-12 mb-4 animate-pulse items-center gap-2 text-on-surface-variant font-hand text-base">
        <span>Swipe</span>
        <span className="material-symbols-outlined text-base">arrow_forward</span>
      </div>

      {/* Scrollable Container */}
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="flex overflow-x-auto pb-16 pt-8 gap-8 lg:gap-12 no-scrollbar scroll-smooth snap-x snap-mandatory">
          {displayedPosts.length > 0 ? (
            displayedPosts.map((post, index) => {
              const embedUrl = getEmbedUrl(post.instagramUrl);
              const rotations = ['', '', '', '', ''];
              const rotation = rotations[index % rotations.length];
              
              return (
                <div 
                  key={post.id || index} 
                  className={`snap-center lg:snap-align-none shrink-0 w-[320px] md:w-[350px] transition-transform duration-500 hover:scale-105 hover:z-10 ${rotation}`}
                >
                  {embedUrl ? (
                    <div className="bg-white p-3 rounded-xl shadow-md border border-outline-variant/20 h-[500px] overflow-hidden flex justify-center items-center">
                      <iframe
                        src={embedUrl}
                        width="100%"
                        height="580"
                        frameBorder="0"
                        scrolling="no"
                        className="w-full -mt-10"
                        title={post.title || "Instagram Embed"}
                      ></iframe>
                    </div>
                  ) : (
                    <div className="bg-white p-6 rounded-xl shadow-md border border-outline-variant/20 h-[500px] flex flex-col justify-center items-center text-center gap-4">
                      <span className="material-symbols-outlined text-4xl text-primary">link</span>
                      <h3 className="font-bold text-lg">{post.title || 'Instagram Post'}</h3>
                      <a 
                        href={post.instagramUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-primary text-white rounded-full text-sm font-bold mt-2"
                      >
                        Instagramで見る
                      </a>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="w-full flex justify-center items-center h-[300px] text-on-surface-variant/50 font-body">
              <div className="text-center">
                <span className="material-symbols-outlined text-4xl mb-2">photo_library</span>
                <p>No Instagram posts yet.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
