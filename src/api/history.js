import useSWR from 'swr';
import { useMemo } from 'react';

import { fetcher, endpoints } from 'src/utils/axios';

export function useGetHistoriesStudent(studentId) {
  const URL = studentId ? `${endpoints.history.student}/${studentId}` : '';


  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      historiesStudent: data?.result || [],
      historiesStudentLoading: isLoading,
      historiesStudentError: error,
      historiesStudentValidating: isValidating,
      historiesStudentEmpty: !isLoading && !data?.result.length,
    }),
    [data?.result, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function useGetStudent(studentId) {
  const URL = studentId ? `${endpoints.student.details}/${studentId}` : '';

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      student: data?.result,
      studentLoading: isLoading,
      studentError: error,
      studentValidating: isValidating,
    }),
    [data?.result, error, isLoading, isValidating]
  );

  return memoizedValue;
}
