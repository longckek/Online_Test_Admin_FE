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

export function useGetCourse(courseId) {
  const URL = courseId ? `${endpoints.course.details}/${courseId}` : '';

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      course: data?.result,
      courseLoading: isLoading,
      courseError: error,
      courseValidating: isValidating,
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
