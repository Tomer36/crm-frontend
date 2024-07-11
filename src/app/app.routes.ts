import { LayoutComponent } from './layouts/layout/layout.component';
import { VexRoutes } from '@vex/interfaces/vex-route.interface';

export const appRoutes: VexRoutes = [
  {
    path: '',
    component: LayoutComponent,
    children: []
  },
  {
    path: 'apps',
    children: [
      {
        path: 'contacts',
        loadChildren: () => import('./pages/apps/contacts/contacts.routes')
      },
    ]
  }
];
