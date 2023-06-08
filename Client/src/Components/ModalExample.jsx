import React, { useState } from "react";
import { Modal, Button, Typography, makeStyles } from "@material-ui/core";
import { BellIcon } from "@heroicons/react/24/outline";

const useStyles = makeStyles((theme) => ({
  card: {
    background: "#ffffff",
    padding: "2rem",
    borderRadius: "0.5rem",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
    maxWidth: "400px",
    margin: "0 auto",
    animation: `$fadeIn 500ms ${theme.transitions.easing.easeInOut}`,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  "@keyframes fadeIn": {
    "0%": {
      opacity: 0,
      transform: "translateY(-10px)",
    },
    "100%": {
      opacity: 1,
      transform: "translateY(0)",
    },
  },
}));

const ModalExample = () => {
  const [open, setOpen] = useState(true);
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };

  const modalStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999, // Set a high zIndex value
  };

  return (
    <Modal open={open} onClose={handleClose} style={modalStyle}>
      <div className={classes.card}>
        <Typography variant="h5" color="textPrimary" className="mb-4">
          Your Attention is Required!
        </Typography>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <BellIcon className="h-16 w-16 text-red-500" />
        </div>
        <Typography color="error" variant="h4">
          You should read this!
        </Typography>
        <Typography className="mt-2">Please Complete Your Profile to Enjoy All Features. Thank You.</Typography>
        <Button variant="contained" color="primary" onClick={handleClose} className="mt-4" style={{ backgroundColor: "#4caf50", color: "#fff" }}>
          Ok, Got it
        </Button>
      </div>
    </Modal>
  );
};

export default ModalExample;
