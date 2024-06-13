export const UnitControls = ({ radioGroupName, value, onChange }) => {
  const handleChange = (e) => {
    onChange(e, radioGroupName);
  };

  return (
    <fieldset>
      <legend>Units</legend>
      <div>
        <div className="unit-input-group">
          <label htmlFor={`${radioGroupName}-units-px`} className="radio-label">
            <span>px</span>
            <input
              id={`${radioGroupName}-units-px`}
              type="radio"
              checked={value === "px"}
              name={radioGroupName}
              value="px"
              onChange={handleChange}
            />
            <span className="radio-checkmark">&nbsp;</span>
          </label>
        </div>

        <div className="unit-input-group">
          <label
            htmlFor={`${radioGroupName}-units-rem`}
            className="radio-label"
          >
            <span>rem</span>
            <input
              id={`${radioGroupName}-units-rem`}
              type="radio"
              checked={value === "rem"}
              name={radioGroupName}
              value="rem"
              onChange={handleChange}
            />
            <span className="radio-checkmark">&nbsp;</span>
          </label>
        </div>

        <div className="unit-input-group">
          <label
            htmlFor={`${radioGroupName}-units-percent`}
            className="radio-label"
          >
            <span>%</span>
            <input
              id={`${radioGroupName}-units-percent`}
              type="radio"
              checked={value === "%"}
              name={radioGroupName}
              value="%"
              onChange={handleChange}
            />
            <span className="radio-checkmark">&nbsp;</span>
          </label>
        </div>
      </div>
    </fieldset>
  );
};
