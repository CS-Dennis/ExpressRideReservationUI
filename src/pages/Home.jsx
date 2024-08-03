import { Box, Button, Grid } from "@mui/material";
import React from "react";
import Title from "../components/Title";

export default function Home() {
  return (
    <>
      <Box className="mx-10">
        <Grid container>
          <Grid item xs={12} md={2} />
          <Grid item xs={12} md={8}>
            <Title title={"Express Riding Service"} />
          </Grid>
          <Grid item xs={12} md={2} />
        </Grid>
      </Box>
    </>
  );
}
