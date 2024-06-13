import { InfoSvg } from "./InfoSvg";

export const Info = () => {
  return (
    <ul className="info-list">
      <li className="info-item">
        <div className="info-symbol">
          <div className="info-symbol-xycords" />
        </div>
        <span className="info-content">
          XY co-ordinates as provided in the form. Default - 0,0. Click on
          Locate X,Y checkbox to view.
        </span>
      </li>
      <li className="info-item">
        <div className="info-symbol">
          <div className="info-symbol-transformorigin" />
        </div>
        <span className="info-content">
          Transform origin of the box and the point about which rotation occurs.
          Default - 50%, 50% of the width of the box.
        </span>
      </li>
      <li className="info-item">
        <div className="info-symbol">
          <span style={{ fontWeight: "bold" }}>&gt;</span>
        </div>
        <span className="info-content">
          Reference for the box rotatation. Default alignment at 0deg rotation.
        </span>
      </li>
      <li className="info-item">
        <div className="info-symbol">
          <InfoSvg />
        </div>
        <span className="info-content">
          Press <strong>Esc</strong> to reset form.
        </span>
      </li>
    </ul>
  );
};
