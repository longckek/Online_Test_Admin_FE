import _ from 'lodash';
import useSWR, { mutate } from 'swr';
import { useMemo } from 'react';

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
  const URLmodify = endpoints.contest.modify;

  const dataContest = {
    name: eventData.name,
    slug: eventData.slug,
    maxNumAttempt: eventData.maxNumAttempt
  }
  if (eventData.rounds) {
    const hasInvalidId = _.some(
      eventData.rounds,
      (item) => _.isUndefined(item.id) || item.id === 0 || _.isUndefined(item.aliasRound.name) || _.trim(item.aliasRound.name) === ''
    );
    if (hasInvalidId) {
      await Promise.reject(new Error('Không được để trống vòng thi'))
    }
    const listRound = {};
    _.forEach(eventData.rounds, (round) => {
      _.set(listRound, round.id, round.aliasRound.name);
    })
    const { data } = await axios.post(URLcreate, dataContest);
    const contestId = data.result.id;
    const dataModify = {
      mockContestId: contestId,
      listRound
    }
    await axios.post(URLmodify, dataModify)
  } else {
    await axios.post(URLcreate, dataContest)
  }
}

export async function updateContest(contestId, eventData) {
  const URLupdate = contestId ? `${endpoints.contest.root}/${contestId}` : '';
  const URLmodify = endpoints.contest.modify;

  const dataContest = {
    name: eventData.name,
    slug: eventData.slug,
    maxNumAttempt: eventData.maxNumAttempt
  }
  if (eventData.rounds) {
    const hasInvalidId = _.some(
      eventData.rounds,
      (item) => _.isUndefined(item.id) || item.id === 0 || _.isUndefined(item.aliasRound.name) || _.trim(item.aliasRound.name) === ''
    );
    if (hasInvalidId) {
      await Promise.reject(new Error('Không được để trống vòng thi'))
    }
    const listRound = {};
    _.forEach(eventData.rounds, (round) => {
      _.set(listRound, round.id, round.aliasRound.name);
    })
    await axios.patch(URLupdate, dataContest);
    const dataModify = {
      mockContestId: contestId,
      listRound
    }
    await axios.post(URLmodify, dataModify)
  } else {
    await axios.patch(URLupdate, dataContest)
  }
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
