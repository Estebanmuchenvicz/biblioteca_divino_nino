
import { Alert, Snackbar } from "@mui/material";

const AlertCustom = ({ open, handleClose, severity = "info", message }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={4000} // se cierra solo después de 4s
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert onClose={handleClose} severity={severity} variant="filled" sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AlertCustom;
