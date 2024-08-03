import { Box, Grid } from "@mui/material";
import React from "react";

export default function Home() {
  return (
    <>
      <Grid container className="mx-10 bg-slate-400">
        <Grid item xs={12} md={2} />
        <Grid item xs={12} md={8} className="bg-orange-700">
          <Box className="bg-slate-500">Homepage123</Box>
          <h1 className="text-3xl font-bold underline">Hello world!</h1>
        </Grid>
        <Grid item xs={12} md={2} />
      </Grid>
    </>
  );
}
