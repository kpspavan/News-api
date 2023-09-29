import React from "react";

interface inputprops extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: "text";
  placeholder?: string;
  required?: boolean;
  classname?: string;
  value?: string;
  name?: string;
  style?: React.CSSProperties;
  className?: string;
}

const defaultstyles: React.CSSProperties = {
  border: "2px solid black",
  borderRadius: "10px",
  padding: "3px",
};

const InputComponent = (props: inputprops) => {
  const { type, placeholder, style,className, name, ...rest } = props;
  return (
    <>
      <div className="form-group">
        <input
          style={{ ...defaultstyles, ...style }}
          type={type}
          placeholder={placeholder}
          name={name}
          className={`${[className]}`}
          {...rest}
        />
      </div>
    </>
  );
};

export default InputComponent;
