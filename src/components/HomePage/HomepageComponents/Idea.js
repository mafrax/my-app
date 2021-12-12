import React, { useState, useEffect } from "react";
import { firestore } from "../../../firebase";
import Autocomplete from '@mui/material/Autocomplete';
import { Box, Typography, Button, Grid, Slider } from "@material-ui/core";

function Idea(props) {

    const [value, setValue] = React.useState(50);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (

        <Grid container direction="row" xs={12} alignItems="center"
        justifyContent="center">
            <Grid item xs={12}>
                {props.titre}
            </Grid>
            
                
                <Grid item xs={10}>
                    <Slider aria-label="Volume" value={value} onChange={handleChange} />
                </Grid>
                <Grid item xs={2}>

                    <div>{value}</div>
                </Grid>
           
        </Grid>

    );
}

export default Idea;