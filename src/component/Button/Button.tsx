import React, { ReactNode, ButtonHTMLAttributes } from 'react';
import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';

interface ButtonProps extends MuiButtonProps {
  children: ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <MuiButton variant="contained" color="primary" {...props}>
      {children}
    </MuiButton>
  );
};

export default Button;
