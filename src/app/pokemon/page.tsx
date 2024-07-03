'use client';
import React, { useState } from 'react';
import usePokemonList from '../query/pokemon/use-fetch-pokemon-list';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Link from '@mui/material/Link';
import LoadingSkeletonListPokemon from '../loading-skeleton/loading-skeleton-list-pokemon';

type Column = {
  id: 'id' | 'name' | 'details';
  label: string;
  minWidth: number;
};

const columns: Column[] = [
  { id: 'id', label: 'No', minWidth: 50 },
  { id: 'name', label: 'Name', minWidth: 100 },
  { id: 'details', label: 'Details', minWidth: 200 },
];

type Row = {
  id: number;
  name: string;
  details: string;
};

export default function Pokemon() {
  const { data, isPending: loading } = usePokemonList();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  if (loading) {
    return <LoadingSkeletonListPokemon />;
  }

  const rows: Row[] = data.map((item: { name: string }, index: number) => ({
    id: index + 1,
    name: item.name,
    details: item.name,
  }));

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className="max-w-xs md:max-w-lg mx-auto ">
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id}>
                        {column.id === 'details' ? (
                          <Link href={`/${value}`}>View Detail Pokemon</Link>
                        ) : (
                          value
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
