import { DevtoolsProvider } from '@providers/devtools';
import { Refine } from '@refinedev/core';
import { RefineKbar, RefineKbarProvider } from '@refinedev/kbar';
import routerProvider from '@refinedev/nextjs-router';
import { Metadata } from 'next';
import React, { Suspense } from 'react';

import { authProvider } from '@providers/auth-provider';
import { dataProvider } from '@providers/data-provider';
import '@styles/global.css';
import 'tailwindcss/tailwind.css';

export const metadata: Metadata = {
  title: 'Hive Electro',
  description: 'Generated by create refine app',
  icons: {
    icon: '/favicon.ico'
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Suspense>
          <RefineKbarProvider>
            <DevtoolsProvider>
              <Refine
                routerProvider={routerProvider}
                dataProvider={dataProvider}
                authProvider={authProvider}
                resources={[
                  {
                    name: 'products',
                    list: '/products',
                    create: '/products/create',
                    edit: '/products/edit/:id',
                    show: '/products/show/:id'
                  },
                  {
                    name: 'orders',
                    list: '/orders',
                    show: '/orders/show/:id'
                  },
                  {
                    name: 'customers',
                    list: '/customers',
                    show: '/customers/show/:id'
                  },
                  {
                    name: 'vouchers',
                    list: '/vouchers',
                    create: '/vouchers/create',
                    edit: '/vouchers/edit/:id',
                    show: '/vouchers/show/:id'
                  },
                  {
                    name: 'inbox',
                    list: '/inbox',
                    show: '/inbox/show/:id'
                  },
                  {
                    name: 'importations',
                    list: '/importations'
                  },
                  {
                    name: 'supplier',
                    list: '/supplier'
                  },
                  {
                    name: 'staff',
                    list: '/staff',
                    create: '/staff/create',
                    edit: '/staff/edit/:id',
                    show: '/staff/show/:id'
                  },
                  {
                    name: 'roles',
                    list: '/roles',
                    create: '/roles/create',
                    edit: '/roles/edit/:id',
                    show: '/roles/show/:id'
                  },
                  {
                    name: 'profile',
                    list: `/profile`
                  }
                ]}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                  projectId: '6jWiTj-5IAvHN-bzVnmf',
                  liveMode: 'auto'
                }}
              >
                {children}
                <RefineKbar />
              </Refine>
            </DevtoolsProvider>
          </RefineKbarProvider>
        </Suspense>
      </body>
    </html>
  );
}
