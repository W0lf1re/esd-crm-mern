import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const InvoiceForm = ({ fetchInvoices }) => {
  const { id } = useParams();
  const [credentials, setCredentials] = useState({});
  const [editMode] = useState(id ? true : false);
  const navigate = useNavigate();
  console.log(id);
  useEffect(() => {
    if (id) {
      fetch("http://localhost:8000/api/invoices/" + id)
        .then(response => response.json())
        .then(data => {
          setCredentials(data);
        });
    }
  }, [id]);

  const handleSubmit = e => {
    e.preventDefault();
    if (editMode) {
      fetch("http://localhost:8000/api/invoices/" + id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
      })
        .then(response => response.json())
        .then(() => fetchInvoices());
    } else {
      fetch("http://localhost:8000/api/invoices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
      })
        .then(response => response.json())
        .then(() => fetchInvoices());
    }
    navigate("/");
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value
    });
    console.log(credentials);
  };

  return (
    <Box>
      <Typography variant="h2">{editMode ? "Modifier" : "Créer"} une facture</Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}>
        <Box sx={{ width: "25%", mb: 2 }}>
          <TextField
            variant="outlined"
            value={credentials.status || ""}
            onChange={handleChange}
            name="status"
            label="Status"
            sx={{ width: "100%" }}
          />
        </Box>
        <Box sx={{ width: "25%", mb: 3 }}>
          <TextField
            variant="outlined"
            value={credentials.amount || ""}
            onChange={handleChange}
            name="amount"
            type="number"
            label="Montant"
            sx={{ width: "100%" }}
          />
        </Box>
        <Button variant="contained" color="primary" size="large" type="submit">
          {editMode ? "Modifier" : "Créer"}
        </Button>
      </Box>
    </Box>
  );
};
export default InvoiceForm;
