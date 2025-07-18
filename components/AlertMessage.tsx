"use client";

import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert, { AlertColor } from '@mui/material/Alert';
import { createResponseMessage } from '@/store/slice';

export const AlertMessage = () => {
    const { message, removeMessage } = createResponseMessage((s) => s);

    return (
        <>
            {
                message.map((m) => (
                    <Snackbar
                        data-testid="alert-container"
                        open={true}
                        autoHideDuration={3000}
                        onClose={() => removeMessage(m.id)}

                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    >
                        <Alert
                            onClose={() => removeMessage(m.id)}
                            severity={(m.severity ?? 'success') as AlertColor}
                            variant="filled"
                            sx={{ width: '100%' }}
                        >
                            {m.title}
                        </Alert>
                    </Snackbar>
                ))
            }
        </>
    );
};
