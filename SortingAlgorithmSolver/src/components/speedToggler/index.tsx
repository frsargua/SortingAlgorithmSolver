import React, { useRef, useEffect } from "react";

interface SpeedTogglerProps {
  delayTime: number;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SpeedToggler: React.FC<SpeedTogglerProps> = ({
  delayTime,
  handleChange,
}) => {
  return (
    <>
      <input
        type="range"
        className="form-range"
        style={{ width: "80%", borderRadius: "25px" }}
        min={100}
        max={2000}
        step={100}
        value={delayTime}
        onChange={handleChange}
      />
      <div className="text-center mt-2">
        <h4 className="font-weight-light text-primary">Value: {delayTime}</h4>
      </div>
    </>
  );
};

export default SpeedToggler;
