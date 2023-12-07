import _ from 'lodash'
import useSWR, { mutate } from 'swr';
import { useMemo } from 'react';

import axios, { fetcher, endpoints } from 'src/utils/axios';

export function useGetCourses() {
  const URL = [endpoints.course.list, { params: { limit: 10000 }}];

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      courses: data?.result || [],
      coursesLoading: isLoading,
      coursesError: error,
      coursesValidating: isValidating,
      coursesEmpty: !isLoading && !data?.result.length,
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

export async function createCourse(eventData) {
  const URLcreate = endpoints.course.root;
  const URLmodify = endpoints.course.modify;

  const dataCourse = {
    name: eventData.name,
    slug: eventData.slug,
    description: eventData.description,
    price: eventData.price
  }
  if (eventData.contests) {
    const hasInvalidId = _.some(
      eventData.contests,
      (item) => _.isUndefined(item.id) || item.id === 0
    );
    if (hasInvalidId) {
      await Promise.reject(new Error('Không được để trống cuộc thi'))
    }
    const contestIds = _.map(eventData.contests, 'id')
    const { data } = await axios.post(URLcreate, dataCourse);
    const courseId = data.result.id;
    const dataModify = {
      courseId,
      listMockContest: JSON.stringify(contestIds)
    }
    await axios.post(URLmodify, dataModify)
  } else {
    await axios.post(URLcreate, dataCourse)
  }
}

export async function updateCourse(courseId, eventData) {
  const URLupdate = courseId ? `${endpoints.course.root}/${courseId}` : '';
  const URLmodify = endpoints.course.modify;

  const dataCourse = {
    name: eventData.name,
    slug: eventData.slug,
    description: eventData.description,
    price: eventData.price
  }
  if (eventData.contests) {
    const hasInvalidId = _.some(
      eventData.contests,
      (item) => _.isUndefined(item.id) || item.id === 0
    );
    if (hasInvalidId) {
      await Promise.reject(new Error('Không được để trống cuộc thi'))
    }
    const contestIds = _.map(eventData.contests, 'id')
    await axios.patch(URLupdate, dataCourse);
    const dataModify = {
      courseId,
      listMockContest: JSON.stringify(contestIds)
    }
    await axios.post(URLmodify, dataModify)
  } else {
    await axios.patch(URLupdate, dataCourse)
  }
}

export async function deleteCourse(courseId) {
  const URLdelete = courseId ? `${endpoints.course.root}/${courseId}` : '';
  const URLlist = [endpoints.course.list, { params: { limit: 10000 }}];

  await axios.delete(URLdelete);

  mutate(URLlist, (currentData) => {
    if(!currentData) return currentData
    const newResult = currentData.result.filter(item => item.id !== courseId)
    const newMetadata = {...currentData.metadata, total: newResult.length}
    return {
      ...currentData,
      metadata: newMetadata,
      result: newResult,
    };
  })
}
