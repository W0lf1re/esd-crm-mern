import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CustomerForm = ({ fetchCustomers }) => {
  const [credentials, setCredentials] = useState({});
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    fetch("http://localhost:8000/api/customers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(credentials)
    })
      .then(response => response.json())
      .then(() => fetchCustomers());
    navigate("/customers");
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
      <Typography variant="h2">Créer un client</Typography>
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
            value={credentials.firstName || ""}
            onChange={handleChange}
            name="firstName"
            label="Prénom"
            sx={{ width: "100%" }}
          />
        </Box>
        <Box sx={{ width: "25%", mb: 2 }}>
          <TextField
            variant="outlined"
            value={credentials.lastName || ""}
            onChange={handleChange}
            name="lastName"
            label="Nom"
            sx={{ width: "100%" }}
          />
        </Box>
        <Box sx={{ width: "25%", mb: 3 }}>
          <TextField
            variant="outlined"
            value={credentials.email || ""}
            onChange={handleChange}
            name="email"
            type="mail"
            label="Email"
            sx={{ width: "100%" }}
          />
        </Box>
        <Box sx={{ width: "25%", mb: 3 }}>
          <TextField
            variant="outlined"
            value={credentials.enterprise || ""}
            onChange={handleChange}
            name="enterprise"
            label="Entreprise"
            sx={{ width: "100%" }}
          />
        </Box>
        <Box sx={{ width: "25%", mb: 3 }}>
          <TextField
            variant="outlined"
            value={credentials.totalAmount || ""}
            onChange={handleChange}
            name="totalAmount"
            type="number"
            label="Montant total"
            sx={{ width: "100%" }}
          />
        </Box>
        <Button variant="contained" color="primary" size="large" type="submit">
          Créer
        </Button>
      </Box>
    </Box>
  );
};
export default CustomerForm;
