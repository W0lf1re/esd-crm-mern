import { Box } from "@mui/material";

const InvoicesRow = ({ params }) => {
  return <Box>{params.row.invoices.length}</Box>;
};

export default InvoicesRow;
