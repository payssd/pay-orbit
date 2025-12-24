import { useState } from 'react';
import { InvoiceList } from '@/components/invoices/InvoiceList';
import { InvoiceForm } from '@/components/invoices/InvoiceForm';
import { useInvoices, type Invoice } from '@/hooks/useInvoices';
import { useCustomers } from '@/hooks/useCustomers';

export default function Invoices() {
  const { invoices, isLoading, createInvoice, updateInvoice, deleteInvoice } = useInvoices();
  const { customers } = useCustomers();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddNew = () => {
    setIsFormOpen(true);
  };

  const handleView = (invoice: Invoice) => {
    // For now, just log - could open a detail view modal
    console.log('View invoice:', invoice);
  };

  const handleSubmit = async (invoiceData: any, items: any[]) => {
    setIsSubmitting(true);
    try {
      return await createInvoice(invoiceData, items);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateStatus = async (id: string, status: string) => {
    return await updateInvoice(id, { status: status as any });
  };

  return (
    <div className="space-y-6 page-transition">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Invoices</h1>
        <p className="text-muted-foreground">Create and manage invoices for your customers.</p>
      </div>

      <InvoiceList
        invoices={invoices}
        isLoading={isLoading}
        onAddNew={handleAddNew}
        onView={handleView}
        onDelete={deleteInvoice}
        onUpdateStatus={handleUpdateStatus}
      />

      <InvoiceForm
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        customers={customers}
        onSubmit={handleSubmit}
        isLoading={isSubmitting}
      />
    </div>
  );
}
