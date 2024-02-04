// components/TextInput.tsx
import { TextField, TextFieldProps, InputAdornment } from "@mui/material";
import { ReactNode } from "react";

interface TextInputProps extends Omit<TextFieldProps, "label"> {
  label: string;
  endAdornment?: ReactNode;
}

const TextInput: React.FC<TextInputProps> = ({ label, endAdornment, ...props }) => {
  return (
    <TextField
      label={label}
      variant="outlined"
      fullWidth
      margin="normal"
      InputProps={{
        endAdornment: endAdornment,
      }}
      {...props}
    />
  );
};

export default TextInput;
