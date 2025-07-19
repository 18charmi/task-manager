import React from 'react';
import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow,
    Box,
} from '@mui/material';
import { ColumnConfig } from '@/types/table';

interface CustomTableProps<T> {
    columns: ColumnConfig<T>[];
    rows: T[];
}

function CustomTable<T extends { id: string | number }>({
    columns,
    rows,
}: CustomTableProps<T>) {
    return (
        <Box>
            <TableContainer>
                <Table sx={{ minWidth: 500 }} aria-label="listing table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell key={column.id.toString()} align={column.align || 'left'}>
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.length ? rows.map((row) => (
                            <TableRow key={row.id}>
                                {columns.map((column) => (
                                    <TableCell key={column.id.toString()} align={column.align || 'left'}>
                                        {column.render ? column.render(row) : (row[column.id as keyof T] as React.ReactNode)}
                                    </TableCell>
                                ))}
                            </TableRow>
                        )) : <TableRow >
                            <TableCell align={'left'} colSpan={4}>
                                No Data Found
                            </TableCell>
                        </TableRow>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default CustomTable;
