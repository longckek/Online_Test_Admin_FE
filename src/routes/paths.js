const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
};

// ----------------------------------------------------------------------

export const paths = {
  page403: '/403',
  page404: '/404',
  page500: '/500',
  components: '/components',
  // AUTH
  auth: {
    google: {
      signIn: `${ROOTS.AUTH}/google/login`,
      callback: `${ROOTS.AUTH}/google/callback`
    },
  },
  // DASHBOARD
  dashboard: {
    root: `${ROOTS.DASHBOARD}/course`,
    course: {
      root: `${ROOTS.DASHBOARD}/course`,
      new: `${ROOTS.DASHBOARD}/course/new`,
      details: (id) => `${ROOTS.DASHBOARD}/course/${id}`,
      edit: (id) => `${ROOTS.DASHBOARD}/course/${id}/edit`,
    },
    activationCode: {
      root: `${ROOTS.DASHBOARD}/activation-code`,
      new: `${ROOTS.DASHBOARD}/activation-code/new`,
      details: (id) => `${ROOTS.DASHBOARD}/activation-code/${id}`,
    },
    contest: {
      root: `${ROOTS.DASHBOARD}/contest`,
      new: `${ROOTS.DASHBOARD}/contest/new`,
      details: (id) => `${ROOTS.DASHBOARD}/contest/${id}`,
      edit: (id) => `${ROOTS.DASHBOARD}/contest/${id}/edit`,
    },
    round: {
      root: `${ROOTS.DASHBOARD}/round`,
      new: `${ROOTS.DASHBOARD}/round/new`,
      details: (id) => `${ROOTS.DASHBOARD}/round/${id}`,
    },
    academicTranscript: {
      root: `${ROOTS.DASHBOARD}/academic-transcript`,
      details: (id) => `${ROOTS.DASHBOARD}/academic-transcript/${id}`,
    },
    syncData: {
      testOutline: `${ROOTS.DASHBOARD}/sync-data/test-outline`,
      round: `${ROOTS.DASHBOARD}/sync-data/round`,
      testFormGroup: `${ROOTS.DASHBOARD}/sync-data/test-form-group`,
    },
  },
};
