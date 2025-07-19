"use client";

import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertColor } from "@mui/material/Alert";
import { useResponseMessage } from "@/store/slice";

export const AlertMessage = () => {
  const message = useResponseMessage((s) => s.message);
  const removeMessage = useResponseMessage((s) => s.removeMessage);

  return (
    <>
      {message.map((m) => (
        <Snackbar
          key={m.id}
          data-testid="alert-container"
          open={true}
          autoHideDuration={3000}
          onClose={() => removeMessage(m.id)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <MuiAlert
            onClose={() => removeMessage(m.id)}
            severity={(m.severity ?? "success") as AlertColor}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {m.title}
          </MuiAlert>
        </Snackbar>
      ))}
    </>
  );
};
