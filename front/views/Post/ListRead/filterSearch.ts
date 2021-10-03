import { NextRouter } from 'next/router';

export type ViewMode = 'infinite' | 'page';

export interface Query {
  page: number;
  pageSize: number;
  hashtag: string;
  mode: string;
}

export default function filterSearch(router: NextRouter, { page, pageSize, hashtag, mode }: Partial<Query>) {
  const { pathname, query } = router;
  if (page) query.page = page.toString();
  if (pageSize) query.pageSize = pageSize.toString();
  if (hashtag) query.hashtag = hashtag;
  if (mode) query.mode = mode;

  router.push({
    pathname,
    query,
  });
}
