import _ from 'lodash'
import useSWR, { mutate } from 'swr';
import { useMemo } from 'react';

import axios, { fetcher, endpoints } from 'src/utils/axios';

export function useGetListActivationCode() {
  const URL = [endpoints.activationCode.list, { params: { limit: 10000 }}];

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      activationCode: data?.result || [],
      activationCodeLoading: isLoading,
      activationCodeError: error,
      activationCodeValidating: isValidating,
      activationCodeEmpty: !isLoading && !data?.result.length,
    }),
    [data?.result, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function useGetActivationCode(activationCodeId) {
  const URL = activationCodeId ? `${endpoints.activationCode.details}/${activationCodeId}` : '';

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      activationCode: data?.result,
      activationCodeLoading: isLoading,
      activationCodeError: error,
      activationCodeValidating: isValidating,
    }),
    [data?.result, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export async function generateActivationCode(eventData) {
  const URL = endpoints.activationCode.create;
  const URLlist = [endpoints.activationCode.list, { params: { limit: 10000 }}];
  if (!eventData.id) {
    await Promise.reject(new Error('Không được để trống khóa học'))
  }
  const dataActivationCode = {
    courseId: eventData.id
  }
  const { data } = await axios.post(URL, dataActivationCode)

  mutate(URLlist, currentData => {
    const newResult = [data.result, ...currentData.result]
    const newMetadata = {...currentData.metadata, total: newResult.length}
    return {
      ...currentData,
      metadata: newMetadata,
      result: newResult,
    };
  }, false);
}

export async function deleteActivationCode(activationCodeId) {
  const URLdelete = activationCodeId ? `${endpoints.activationCode.root}/${activationCodeId}` : '';
  const URLlist = [endpoints.activationCode.list, { params: { limit: 10000 }}];

  await axios.delete(URLdelete);

  mutate(URLlist, (currentData) => {
    if(!currentData) return currentData
    const newResult = currentData.result.filter(item => item.id !== activationCodeId)
    const newMetadata = {...currentData.metadata, total: newResult.length}
    return {
      ...currentData,
      metadata: newMetadata,
      result: newResult,
    };
  })
}
