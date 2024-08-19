import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function ComboBox({
  label,
  options,
  selectedValue,
  onChange,
  width,
}) {
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={options}
      value={selectedValue}
      onChange={(event, newValue) => onChange(newValue)}
      sx={{
        width: width,
        backgroundColor: "#1F2937", // Dark background to match the parent
        color: "#FFFFFF", // White text color
        borderRadius: "0.5rem", // Rounded corners
        ".MuiOutlinedInput-root": {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#64748B", // Slate border color
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#64748B", // Slate border color on hover
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#64748B", // Slate border color on focus
          },
        },
        ".MuiInputLabel-root": {
          color: "#9CA3AF", // Muted label color
        },
        ".MuiInputLabel-root.Mui-focused": {
          color: "#3B82F6", // Blue label on focus
        },
        ".MuiSvgIcon-root": {
          color: "#64748B", // Slate color for dropdown arrow in dark mode
        },
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          variant="outlined"
          InputLabelProps={{
            style: { color: "#9CA3AF" }, // Label color
          }}
          InputProps={{
            ...params.InputProps,
            style: { color: "#FFFFFF", caretColor: "#FFFFFF" }, // Input text color and caret color
          }}
        />
      )}
      renderOption={(props, option) => (
        <li {...props}>
          <div style={{ whiteSpace: "normal", wordBreak: "break-word" }}>
            {option}
          </div>
        </li>
      )}
    />
  );
}
