// src/pages/api/preview.ts
import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * microCMS のプレビューリクエストを受け取り、Next.js のプレビューモードを有効化する API
 * - `secret` が環境変数 `MICROCMS_PREVIEW_SECRET` と一致しない場合は 401 を返す
 * - `slug` が無い場合はトップページへリダイレクト
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { secret, slug } = req.query;

  if (secret !== process.env.MICROCMS_PREVIEW_SECRET) {
    return res.status(401).json({ message: 'Invalid preview secret' });
  }

  // Next.js のプレビューモードを有効化（空オブジェクトで OK）
  res.setPreviewData({});

  // slug が無い場合はトップへリダイレクト
  const destination = typeof slug === 'string' && slug.length > 0 ? `/${slug}` : '/';
  return res.redirect(destination);
}
