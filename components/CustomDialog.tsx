"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import CustomButton from "./CustomButton";

type CustomDialogProps = {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
};

export default function CustomDialog({
  open,
  title,
  onClose,
  children
}: CustomDialogProps) {

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle >{title}
        <CustomButton variant="outlined" onClick={onClose}
          sx={{
            position: 'absolute',
            right: '1rem'
          }}>X</CustomButton>
      </DialogTitle>
      <DialogContent>
        {children}
      </DialogContent>
    </Dialog>
  );
}
