import React, { useState, useEffect } from "react";
import { firestore } from "../../../firebase";
import Autocomplete from '@mui/material/Autocomplete';
import { Box, Typography, Button, Grid, Slider } from "@material-ui/core";
import { Stack } from '@mui/material';
import Idea from "./Idea"

function IdeaList(props) {
   

    const [info, setInfo] = useState([]);
    
    // Start the fetch operation as soon as
    // // the page loads
    // window.addEventListener('load', () => {
        //     console.log("fetchdata");
        //     Fetchdata();
        //   });
        
        useEffect(() => {
            Fetchdata();
        }, [])
        


    const Fetchdata = async () => {
        const data = await firestore.collection("ideas").get()
        data.forEach((querySnapshot) => {

            // console.log("querysnaptshot:" + JSON.stringify(querySnapshot));
            // Loop through the data and store
            // it in array to display
            var truc = querySnapshot.data();
            console.log("qs data:" + JSON.stringify(truc));
            setInfo(arr => [...arr, truc]);

        })
    }


    return (
        <div>
            <center>
                <h2>Student Details</h2>
            </center>

                {
                    info.map((data) => {
                        console.log("show data:" + JSON.stringify(data));
                        return (
                                <Idea titre={data.titre} />                        
                        );
                    }
                    )

                }
        </div>
    );
}

export default IdeaList;