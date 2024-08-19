import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

export default function StickyTable({
  rows,
  setpopUp,
  popUp,
  label,
  shrink,
  setShrink, // Props for controlling the shrink/expand state
}) {
  console.log(rows);
  const columns = [{ id: "url", label: label, minWidth: 100 }];
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRowClick = () => {
    setpopUp(!popUp);
    console.log("Row clicked");
  };

  const handleHeaderClick = () => {
    setShrink(!shrink); // Toggle the shrink state when the header is clicked
  };

  return (
    <Paper
      sx={{
        width: "100%",
        overflow: "hidden",
        backgroundColor: "#581c87",
        color: "#ffffff",
      }}
    >
      {/* Table header remains visible */}
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow onClick={handleHeaderClick} style={{ cursor: "pointer" }}>
              {" "}
              {/* Header click handler */}
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  sx={{ color: "#ffffff", backgroundColor: "#581c87" }} // Header cell style
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          {/* Toggle visibility of the table body based on shrink state */}
          {!shrink && (
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.id}
                    onClick={handleRowClick}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={`${row.id}-${column.id}`}
                          align={column.align}
                          sx={{
                            wordWrap: "break-word",
                            whiteSpace: "normal",
                            maxWidth: 300,
                            color: "#ffffff",
                            backgroundColor: "#3b0764",
                            fontFamily: "'Courier New', Courier, monospace",
                            fontSize: "14px",
                          }}
                        >
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
      {/* Only render pagination if the table body is not shrunk */}
      {!shrink && (
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{ color: "#ffffff" }}
        />
      )}
    </Paper>
  );
}
