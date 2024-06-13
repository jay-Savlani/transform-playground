import { forwardRef } from "react";

export const Input = forwardRef(({ id, label, unit, ...rest }, ref) => {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input className="input-controls" id={id} ref={ref} {...rest} />
      {unit && <span>{unit}</span>}
    </>
  );
});
