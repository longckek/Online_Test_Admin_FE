import { useMemo } from 'react';

import { paths } from 'src/routes/paths';

import { useTranslate } from 'src/locales';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
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
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  tour: icon('ic_tour'),
  order: icon('ic_order'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  kanban: icon('ic_kanban'),
  folder: icon('ic_folder'),
  banking: icon('ic_banking'),
  booking: icon('ic_booking'),
  invoice: icon('ic_invoice'),
  product: icon('ic_product'),
  calendar: icon('ic_calendar'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
};

// ----------------------------------------------------------------------

export function useNavData() {
  const { t } = useTranslate();

  const data = useMemo(
    () => [
      // OVERVIEW
      // ----------------------------------------------------------------------
      {
        subheader: t('overview'),
        items: [
          {
            title: t('app'),
            path: paths.dashboard.root,
            icon: ICONS.dashboard,
          }
        ],
      },

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
          // // SYNC DATA
          // {
          //   title: t('sync data'),
          //   path: paths.dashboard.user.root,
          //   icon: ICONS.user,
          //   children: [
          //     { title: t('profile'), path: paths.dashboard.user.root },
          //     { title: t('cards'), path: paths.dashboard.user.cards },
          //     { title: t('list'), path: paths.dashboard.user.list },
          //     { title: t('create'), path: paths.dashboard.user.new },
          //     { title: t('edit'), path: paths.dashboard.user.demo.edit },
          //     { title: t('account'), path: paths.dashboard.user.account },
          //   ],
          // },
          // PRODUCT
          // {
          //   title: t('product'),
          //   path: paths.dashboard.product.root,
          //   icon: ICONS.product,
          //   children: [
          //     { title: t('list'), path: paths.dashboard.product.root },
          //     {
          //       title: t('details'),
          //       path: paths.dashboard.product.demo.details,
          //     },
          //     { title: t('create'), path: paths.dashboard.product.new },
          //     { title: t('edit'), path: paths.dashboard.product.demo.edit },
          //   ],
          // },

          // ORDER
          // {
          //   title: t('order'),
          //   path: paths.dashboard.order.root,
          //   icon: ICONS.order,
          //   children: [
          //     { title: t('list'), path: paths.dashboard.order.root },
          //     { title: t('details'), path: paths.dashboard.order.demo.details },
          //   ],
          // },

          // INVOICE
          // {
          //   title: t('invoice'),
          //   path: paths.dashboard.invoice.root,
          //   icon: ICONS.invoice,
          //   children: [
          //     { title: t('list'), path: paths.dashboard.invoice.root },
          //     {
          //       title: t('details'),
          //       path: paths.dashboard.invoice.demo.details,
          //     },
          //     { title: t('create'), path: paths.dashboard.invoice.new },
          //     { title: t('edit'), path: paths.dashboard.invoice.demo.edit },
          //   ],
          // },

          // BLOG
          // {
          //   title: t('blog'),
          //   path: paths.dashboard.post.root,
          //   icon: ICONS.blog,
          //   children: [
          //     { title: t('list'), path: paths.dashboard.post.root },
          //     { title: t('details'), path: paths.dashboard.post.demo.details },
          //     { title: t('create'), path: paths.dashboard.post.new },
          //     { title: t('edit'), path: paths.dashboard.post.demo.edit },
          //   ],
          // },

          // JOB
          // {
          //   title: t('job'),
          //   path: paths.dashboard.job.root,
          //   icon: ICONS.job,
          //   children: [
          //     { title: t('list'), path: paths.dashboard.job.root },
          //     { title: t('details'), path: paths.dashboard.job.demo.details },
          //     { title: t('create'), path: paths.dashboard.job.new },
          //     { title: t('edit'), path: paths.dashboard.job.demo.edit },
          //   ],
          // },

          // TOUR
          // {
          //   title: t('tour'),
          //   path: paths.dashboard.tour.root,
          //   icon: ICONS.tour,
          //   children: [
          //     { title: t('list'), path: paths.dashboard.tour.root },
          //     { title: t('details'), path: paths.dashboard.tour.demo.details },
          //     { title: t('create'), path: paths.dashboard.tour.new },
          //     { title: t('edit'), path: paths.dashboard.tour.demo.edit },
          //   ],
          // },

          // FILE MANAGER
          // {
          //   title: t('file_manager'),
          //   path: paths.dashboard.fileManager,
          //   icon: ICONS.folder,
          // },

          // MAIL
          // {
          //   title: t('mail'),
          //   path: paths.dashboard.mail,
          //   icon: ICONS.mail,
          //   info: <Label color="error">+32</Label>,
          // },

          // CHAT
          // {
          //   title: t('chat'),
          //   path: paths.dashboard.chat,
          //   icon: ICONS.chat,
          // },

          // CALENDAR
          // {
          //   title: t('calendar'),
          //   path: paths.dashboard.calendar,
          //   icon: ICONS.calendar,
          // },

          // KANBAN
          // {
          //   title: t('kanban'),
          //   path: paths.dashboard.kanban,
          //   icon: ICONS.kanban,
          // },
        ],
      },
    ],
    [t]
  );

  return data;
}
