import React from "react";
import type { Metadata } from "next";
import { CssBaseline } from "@mui/material";import { makeStyles } from '@material-ui/core/styles';

export const metadata: Metadata = {
  title: "AI Navigator",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <CssBaseline />
      <body>
        {children}
      </body>
    </html>
  );
}
