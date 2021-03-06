import React, { useEffect } from "react";
import { urlPageView } from "./GoogleAnalytics/index";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

import DashSignup from "./DashSignup";

import { ModalButtons } from "./styledComponents/Index";

const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

export default function DashSignupModal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  //GA
  useEffect(() => {
    if (open === true) {
      return urlPageView("/signup");
    }
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <ModalButtons className="nav-signup" type="button" onClick={handleOpen}>
        SIGN UP
      </ModalButtons>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <DashSignup handleClose={handleClose} />
        </Fade>
      </Modal>
    </div>
  );
}
