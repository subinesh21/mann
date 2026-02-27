// Admin Products Page
'use client';

import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminProductManager from '@/components/admin/AdminProductManager';

export default function AdminProductsPage() {
  return (
    <AdminLayout>
      <AdminProductManager />
    </AdminLayout>
  );
}