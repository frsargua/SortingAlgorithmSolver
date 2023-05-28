import React, { useRef, useEffect } from "react";

interface SpeedTogglerProps {
  inputValue: string;
  handleSubmit: (event: string) => void;
}

const NumberInputter: React.FC<SpeedTogglerProps> = ({
  inputValue,
  handleSubmit,
}) => {
  return (
    <>
      <label htmlFor="numberInput" className="form-label">
        Enter numbers (comma-separated)
      </label>
      <input
        type="text"
        id="numberInput"
        className="form-control"
        value={inputValue}
        onChange={(e) => handleSubmit(e.target.value)}
      />
    </>
  );
};

export default NumberInputter;
