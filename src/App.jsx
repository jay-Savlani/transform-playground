import "./styles.css";
import { useState } from "react";
import { TransformFormControls } from "./components/TransformFormControls";
import { TranslateView } from "./components/TranslateView";
import { useMediaQuery } from "./components/hooks/useMediaQuery";

export default function App() {
  const [xyLocationCords, setXYLocationCords] = useState({ x: 0, y: 0, unit: 'px' });
  const [showSpinner, setShowSpinner] = useState(false);
  const [controlBoxStyle, setControlBoxStyle] = useState({});
  const [controlBoxAngleReferenceStyle, setControlBoxAngleReferenceStyle] =
    useState({});
  const [showXYCords, setShowXYCords] = useState(false);

  const { windowSize } = useMediaQuery();


  let xyLocationCordsStyle = {};

  if(xyLocationCords.unit === '%') {
    let topPosition = ((150*xyLocationCords.y)/100).toFixed(0); 
    let leftPosition = ((150*xyLocationCords.x)/100).toFixed(0);

    xyLocationCordsStyle = {
      left: `calc(${leftPosition}px - 6px)`,
      top: `calc(${topPosition}px - 6px)`
    }
  }
  else {
    xyLocationCordsStyle = {
       left: `calc(${xyLocationCords.x}${xyLocationCords.unit} - 6px)`,
       top: `calc(${xyLocationCords.y}${xyLocationCords.unit} - 6px)`
    }
  }


  const handleApply = (transformValues, transformUnits) => {
    const { x, y, skeyX, skeyY, rotate, originX, originY } = transformValues;

    const { transform: transformUnit, transformOrigin: transformOriginUnit } =
      transformUnits;

    setShowSpinner(true);

    console.log("skew values", skeyX, skeyY);

    setControlBoxStyle({
      transform: `translate(${x}${transformUnit}, ${y}${transformUnit}) rotate(${rotate}deg) skew(${skeyX}deg, ${skeyY}deg)`,
      transformOrigin: `${
        (originX && `${originX}${transformOriginUnit}`) || "50%"
      } ${(originY && `${originY}${transformOriginUnit}`) || "50%"}`,
    });

    const recalculatedAngleReferenceX = `calc(${x}${transformUnit} - 50% + ${
      (originX && `${originX}${transformOriginUnit}`) || "50%"
    })`;
    const recalculatedAngleReferenceY = `calc(${y}${transformUnit} - 50% + ${
      (originX && `${originY}${transformOriginUnit}`) || "50%"
    })`;

    setControlBoxAngleReferenceStyle({
      transform: `translate(${recalculatedAngleReferenceX}, ${recalculatedAngleReferenceY})`,
    });

    setTimeout(() => {
      setShowSpinner(false);
    }, 700);
  };

  if (windowSize < 1000) {
    return (
      <div className="responsive-container">
        <h1 className="responsive-title">Transform Playground</h1>
        <div className="responsive-background">
          <span className="info-text">
            Open in desktop for best learning experience.
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <h1 className="app-title">Transform Playground</h1>
      <div className="container">
        <TranslateView
          controlBoxStyle={controlBoxStyle}
          xyLocationCordsStyle={xyLocationCordsStyle}
          controlBoxAngleReferenceStyle={controlBoxAngleReferenceStyle}
          showSpinner={showSpinner}
          showXYCords={showXYCords}
        />

        <TransformFormControls
          showXYCords={showXYCords}
          setShowXYCords={setShowXYCords}
          setXYLocationCords={setXYLocationCords}
          handleApply={handleApply}
        />
      </div>
    </div>
  );
}
