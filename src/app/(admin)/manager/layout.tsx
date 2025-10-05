'use client';

import React from 'react';
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar';
import { ManagerSidebar } from '@/components/manager-sidebar';

export default function ManagerLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <SidebarProvider>
      <ManagerSidebar />
      <SidebarInset>
        <header>
          <SidebarTrigger />
          {children}
        </header>
      </SidebarInset>
    </SidebarProvider>
  );
}
