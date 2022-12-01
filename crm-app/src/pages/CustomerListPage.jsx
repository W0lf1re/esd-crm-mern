import { Box, Button, TextField, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import ActionsRow from "../components/table/ActionsRow";
import InvoicesRow from "../components/table/InvoicesRow";

const CustomerListPage = ({ customers, fetchCustomers }) => {
  const navigate = useNavigate();

  const columns = [
    { field: "_id", headerName: "ID", width: 200 },
    {
      field: "customer",
      headerName: "Client",
      width: 130,
      valueGetter: params => `${params.row.firstName} ${params.row.lastName}`
    },
    {
      field: "email",
      headerName: "Email",
      width: 130,
      valueGetter: params => `${params.row.email}`
    },
    {
      field: "enterprise",
      headerName: "Entreprise",
      width: 130,
      valueGetter: params => `${params.row.enterprise}`
    },
    {
      field: "invoices",
      headerName: "Factures",
      width: 90,
      renderCell: params => <InvoicesRow params={params} />
    },
    {
      field: "totalAmount",
      headerName: "Montant total",
      width: 160,
      valueGetter: params => `${params.row.totalAmount} €`
    },
    {
      headerName: "Actions",
      width: 300,
      renderCell: params => <ActionsRow params={params} fetchCustomers={fetchCustomers} />
    }
  ];

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
        <Typography variant="h2">Liste des clients</Typography>
        <Button variant="contained" onClick={() => navigate("/customers/create")}>
          Nouveau client
        </Button>
      </Box>
      <Box component="form">
        <TextField variant="outlined" label="Recherche" sx={{ width: "100%" }} />
      </Box>
      <Box
        sx={{
          height: 400,
          width: "100%",
          mt: 4
        }}>
        <DataGrid
          rows={customers}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          getRowId={row => row._id}
        />
      </Box>
    </Box>
  );
};

export default CustomerListPage;
