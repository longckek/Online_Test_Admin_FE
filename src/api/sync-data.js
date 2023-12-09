import axios, { endpoints } from 'src/utils/axios';

export async function syncTestOutline(eventData) {
  const URL = endpoints.syncData.testOutline;

  await axios.post(URL, { code: eventData });
}
export async function syncTestTakerGroup() {
  const URL = endpoints.syncData.testTakerGroup;

  await axios.post(URL);
}
export async function syncTestFormGroup(eventData) {
  const URL = endpoints.syncData.testFormGroup;

  await axios.post(URL, { code: eventData });
}
