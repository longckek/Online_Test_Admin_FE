import { useMemo } from 'react';

import { paths } from 'src/routes/paths';

import { useTranslate } from 'src/locales';

import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
  // OR
  // <Iconify icon="fluent:mail-24-filled" />
  // https://icon-sets.iconify.design/solar/
  // https://www.streamlinehq.com/icons
);

const ICONS = {
  job: icon('ic_job'),
  blog: icon('ic_blog'),
  chat: icon('ic_chat'),
  mail: icon('ic_mail'),
  user: icon('ic_user'),
  lock: icon('ic_lock'),
  label: icon('ic_label'),
  folder: icon('ic_folder'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  dashboard: icon('ic_dashboard'),
};

// ----------------------------------------------------------------------

export function useNavData() {
  const { t } = useTranslate();

  const data = useMemo(
    () => [
      // MANAGEMENT
      // ----------------------------------------------------------------------
      {
        subheader: t('management'),
        items: [
          // COURSE
          {
            title: t('khóa học'),
            path: paths.dashboard.course.root,
            icon: ICONS.user,
          },
          // ACTIVATION CODE
          {
            title: t('mã kích hoạt'),
            path: paths.dashboard.activationCode.root,
            icon: ICONS.user,
          },
          // CONTEST
          {
            title: t('cuộc thi'),
            path: paths.dashboard.contest.root,
            icon: ICONS.user,
          },
          // ROUND
          {
            title: t('vòng thi'),
            path: paths.dashboard.round.root,
            icon: ICONS.user,
          },
          // ACADEMIC TRANSCRIPT
          {
            title: t('bảng điểm'),
            path: paths.dashboard.academicTranscript.root,
            icon: ICONS.user,
          },
          // SYNC DATA
          {
            title: t('đồng bộ dữ liệu'),
            path: paths.dashboard.course.root,
            icon: ICONS.user,
            children: [
              { title: t('đồng bộ khung đề'), path: paths.dashboard.syncData.testOutline },
              { title: t('đồng bộ vòng thi'), path: paths.dashboard.syncData.round },
              { title: t('đồng bộ gói đề'), path: paths.dashboard.syncData.testFormGroup },
            ],
          },
        ],
      },
    ],
    [t]
  );

  return data;
}
