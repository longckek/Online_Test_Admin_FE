import _ from 'lodash';
import useSWR from 'swr';
import { useMemo } from 'react';

import axios, { fetcher, endpoints } from 'src/utils/axios';

export function useGetRounds() {
  const URL = [endpoints.round.list, { params: { limit: 10000 } }];

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      rounds: data?.result || [],
      roundsLoading: isLoading,
      roundsError: error,
      roundsValidating: isValidating,
      roundsEmpty: !isLoading && !data?.result.length,
    }),
    [data?.result, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function useGetRound(roundId) {
  const URL = roundId ? `${endpoints.round.details}/${roundId}` : '';

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      round: data?.result,
      roundLoading: isLoading,
      roundError: error,
      roundValidating: isValidating,
    }),
    [data?.result, error, isLoading, isValidating]
  );

  return memoizedValue;
}
