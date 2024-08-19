import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

export default function StickyTable({ rows, setpopUp, popUp, label }) {
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
    console.log("click");
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
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id} // Directly pass the key here
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  sx={{ color: "#ffffff", backgroundColor: "#581c87" }} // Header cell style
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
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={row.id} // Directly pass the key here
                  onClick={handleRowClick}
                >
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell
                        key={`${row.id}-${column.id}`} // Ensure a unique key for each cell
                        align={column.align}
                        onClick={handleRowClick}
                        sx={{
                          wordWrap: "break-word", // Enable word wrapping
                          whiteSpace: "normal", // Allow the text to wrap to the next line
                          maxWidth: 300, // Set a max width for the cell
                          color: "#ffffff", // Text color
                          backgroundColor: "#3b0764", // Cell background color
                          fontFamily: "'Courier New', Courier, monospace", // Change the font of the row
                          fontSize: "14px", // Adjust font size as needed
                        }}
                      >
                        {value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ color: "#ffffff" }} // Pagination text color
      />
    </Paper>
  );
}
