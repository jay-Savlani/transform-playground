import { Info } from "./Info";

export const TranslateView = ({
  controlBoxStyle,
  xyLocationCordsStyle,
  controlBoxAngleReferenceStyle,
  showSpinner,
  showXYCords,
}) => {
  return (
    <div className="translate-view">
      <div className="translate-view-cords">0, 0</div>
      {showXYCords && (
        <div
          className="show-xycords"
          key={controlBoxStyle}
          style={xyLocationCordsStyle}
        >
          &nbsp;
        </div>
      )}
      <div
        className="control-box-angle-reference"
        style={controlBoxAngleReferenceStyle}
      >
        {!showSpinner && (
          <>
            <div className="angle-stick angle-0"> 0</div>
            <div className="angle-stick angle-90"> 90</div>
            <div className="angle-stick angle-180"> 180</div>
            <div className="angle-stick angle-270"> 270</div>
            <div className="control-box-center">&nbsp;</div>
          </>
        )}
        {showSpinner && <div className="spinner" />}
      </div>
      <div className="control-box" style={controlBoxStyle}>
        <div className="alignment-arrow">&gt;</div>
      </div>

      <Info />
    </div>
  );
};
