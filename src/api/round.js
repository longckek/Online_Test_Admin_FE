import _ from 'lodash';
import useSWR, { mutate } from 'swr';
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

export async function updateRound(roundId, eventData) {
  const URLupdate = roundId ? `${endpoints.round.root}/${roundId}` : '';
  const URLlist = [endpoints.round.list, { params: { limit: 10000 } }];


  const dataRound = {
    name: eventData.name,
    maxMark: eventData.maxMark,
    timeAllow: eventData.timeAllow,
    showCorrectAnswer: eventData.showCorrectAnswer,
    showLabelAnswer: eventData.showLabelAnswer,
    showMark: eventData.showMark,
    timeStart: new Date(eventData.timeStart),
    timeEnd: new Date(eventData.timeEnd)
  }
  await axios.patch(URLupdate, dataRound);

  mutate(URLlist, (currentData) => {
    if(!currentData) return currentData
    const newResult = currentData.result.map((round) =>
      round.id === roundId ? { ...round, ...dataRound } : round
    );
    console.log('winter-newResult', newResult);
    const newMetadata = { ...currentData.metadata, total: newResult.length }
    return {
      ...currentData,
      result: newResult,
      metadata: newMetadata
    }
  })
}

