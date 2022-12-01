import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import InvoiceListPage from "./pages/InvoiceListPage";
import CustomerListPage from "./pages/CustomerListPage";
import MainLayout from "./layouts/MainLayout";
import InvoiceForm from "./pages/InvoiceForm";
import CustomerForm from "./pages/CustomerForm";

function App() {

  const [invoices, setInvoices] = useState([]);
  const [customers, setCustomers] = useState([]);

  const fetchInvoices = async () => {
    fetch("http://localhost:8000/api/invoices")
      .then(response => response.json())
      .then(data => setInvoices(data));
  };

  const fetchCustomers = async () => {
    fetch("http://localhost:8000/api/customers")
      .then(response => response.json())
      .then(data => setCustomers(data));
  };

  useEffect(() => {
    fetchInvoices();
    fetchCustomers();
  }, []);

  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<InvoiceListPage invoices={invoices} setInvoices={setInvoices} fetchInvoices={fetchInvoices} />} />
          <Route path="/invoices/create" element={<InvoiceForm fetchInvoices={fetchInvoices} />} />
          <Route path="/invoices/update/:id" element={<InvoiceForm fetchInvoices={fetchInvoices} />} />
          <Route path="/customers" element={<CustomerListPage customers={customers} setCustomers={setCustomers} fetchCustomers={fetchCustomers} />} />
          <Route path="/customers/create" element={<CustomerForm fetchCustomers={fetchCustomers} />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
