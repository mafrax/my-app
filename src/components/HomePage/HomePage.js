import React, { Component } from "react";

import PropTypes from "prop-types";

import { withRouter } from "react-router-dom";

import { auth } from "../../firebase";

import authentication from "../../services/authentication";

import EmptyState from "../EmptyState";

import InputAdornments from "./HomepageComponents/SearchBar"
import FreeSolo from "./HomepageComponents/FreeSolo"
import IdeaList from "./HomepageComponents/IdeaList"
import { Container, Grid, Stack, Box } from '@mui/material';


import { ReactComponent as CabinIllustration } from "../../illustrations/cabin.svg";
import { ReactComponent as InsertBlockIllustration } from "../../illustrations/insert-block.svg";

class HomePage extends Component {
  signInWithEmailLink = () => {
    const { user } = this.props;

    if (user) {
      return;
    }

    const emailLink = window.location.href;

    if (!emailLink) {
      return;
    }

    if (auth.isSignInWithEmailLink(emailLink)) {
      let emailAddress = localStorage.getItem("emailAddress");

      if (!emailAddress) {
        this.props.history.push("/");

        return;
      }

      authentication
        .signInWithEmailLink(emailAddress, emailLink)
        .then((value) => {
          const user = value.user;
          const displayName = user.displayName;
          const emailAddress = user.email;

          this.props.openSnackbar(
            `Signed in as ${displayName || emailAddress}`
          );
        })
        .catch((reason) => {
          const code = reason.code;
          const message = reason.message;

          switch (code) {
            case "auth/expired-action-code":
            case "auth/invalid-email":
            case "auth/user-disabled":
              this.props.openSnackbar(message);
              break;

            default:
              this.props.openSnackbar(message);
              return;
          }
        })
        .finally(() => {
          this.props.history.push("/");
        });
    }
  };

  render() {
    const { user } = this.props;

    if (user) {
      return (

        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
          xs={12}>
          <Box sx={{ width: '65vw'}}>

            <Grid item xs={12}>
              <FreeSolo user={user} />
            </Grid>
            <Grid item xs={12}>
              <IdeaList />

            </Grid>


          </Box>
        </Grid>

      );
    }

    return (
      <EmptyState
        image={<InsertBlockIllustration />}
        title="RMUIF"
        description="Supercharged version of Create React App with all the bells and whistles."
      />
    );
  }

  componentDidMount() {
    this.signInWithEmailLink();
  }
}

HomePage.propTypes = {
  user: PropTypes.object,
};

export default withRouter(HomePage);
