// import _ from 'lodash';
import { useMemo } from 'react';
import useSWR, { mutate } from 'swr';

import axios, { fetcher, endpoints } from 'src/utils/axios';

export function useGetContests() {
  const URL = [endpoints.contest.list, { params: { limit: 10000 } }];

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      contests: data?.result || [],
      contestsLoading: isLoading,
      contestsError: error,
      contestsValidating: isValidating,
      contestsEmpty: !isLoading && !data?.result.length,
    }),
    [data?.result, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function useGetContest(contestId) {
  const URL = contestId ? `${endpoints.contest.details}/${contestId}` : '';

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      contest: data?.result,
      contestLoading: isLoading,
      contestError: error,
      contestValidating: isValidating,
    }),
    [data?.result, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export async function createContest(eventData) {
  const URLcreate = endpoints.contest.root;

  const dataContest = {
    name: eventData.name,
    slug: eventData.slug,
    maxNumAttempt: eventData.maxNumAttempt
  }

  await axios.post(URLcreate, dataContest)
}

export async function updateContest(contestId, eventData) {
  const URLupdate = contestId ? `${endpoints.contest.root}/${contestId}` : '';

  const dataContest = {
    name: eventData.name,
    slug: eventData.slug,
    maxNumAttempt: eventData.maxNumAttempt
  }

  await axios.patch(URLupdate, dataContest)
}

export async function deleteContest(contestId) {
  const URLdelete = contestId ? `${endpoints.contest.root}/${contestId}` : '';
  const URLlist = [endpoints.contest.list, { params: { limit: 10000 }}];

  await axios.delete(URLdelete);

  mutate(URLlist, (currentData) => {
    if(!currentData) return currentData
    const newResult = currentData.result.filter(item => item.id !== contestId)
    const newMetadata = {...currentData.metadata, total: newResult.length}
    return {
      ...currentData,
      metadata: newMetadata,
      result: newResult,
    };
  })
}
