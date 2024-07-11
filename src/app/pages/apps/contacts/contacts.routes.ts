import { VexRoutes } from '@vex/interfaces/vex-route.interface';

const routes: VexRoutes = [
  {
    path: 'table',
    loadComponent: () =>
      import('./contacts-table/contacts-table.component').then(
        (m) => m.ContactsTableComponent
      ),
    data: {
      scrollDisabled: true,
      toolbarShadowEnabled: true
    }
  }
];

export default routes;
