import { useSWRConfig } from 'swr';

export default function useMatchCache(matcher: RegExp) {
  const { cache } = useSWRConfig();
  if (!(cache instanceof Map)) {
    throw new Error('matchMutate requires the cache provider to be a Map instance');
  }

  const keys: string[] = [];
  cache.forEach((_, key: string) => {
    if (matcher.test(key)) {
      keys.push(key);
    }
  });

  return cache;
}
