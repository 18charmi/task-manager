'use client';

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useUserStore } from "@/store/user"

export default function Header() {

  const logoutUser = useUserStore(s => s.logout);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Task Manager
          </Typography>
          <Button color="inherit" onClick={logoutUser}>Log Out</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
