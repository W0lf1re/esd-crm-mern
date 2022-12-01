import { Box, Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ActionsRow = ({ params, fetchInvoices, fetchCustomers }) => {
  const [isInvoice] = useState(params.row.email ? false : true);
  const navigate = useNavigate();

  const handleEdit = e => {
    e.stopPropagation();
    console.log("Edit", params.row._id);
    navigate("/invoices/update/" + params.row._id);
  };

  const handleDelete = e => {
    e.stopPropagation();
    {
      isInvoice
        ? fetch("http://localhost:8000/api/invoices/" + params.row._id, {
            method: "DELETE"
          })
            .then(response => response.json())
            .then(() => fetchInvoices())
        : fetch("http://localhost:8000/api/customers/" + params.row._id, {
            method: "DELETE"
          })
            .then(response => response.json())
            .then(() => fetchCustomers());
    }
  };

  return (
    <Box display="flex" justifyContent="space-around" alignItems="center">
      {isInvoice ? (
        <Button variant="contained" color="primary" size="small" onClick={handleEdit}>
          Editer
        </Button>
      ) : (
        <Box></Box>
      )}
      <Button
        variant="contained"
        color="secondary"
        size="small"
        onClick={handleDelete}
        sx={{ ml: 2 }}>
        Supprimer
      </Button>
    </Box>
  );
};

export default ActionsRow;
