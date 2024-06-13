import { useState, useRef, useEffect } from "react";
import { Input } from "./Input";
import { UnitControls } from "./UnitControls";
import { useAudio } from "./hooks/useAudio";

const defaultTransformUnits = {
  transform: "px",
  transformOrigin: "%",
};

export const TransformFormControls = ({
  handleApply,
  showXYCords,
  setXYLocationCords,
  setShowXYCords,
}) => {
  const formRef = useRef(null);
  const xRef = useRef(null);
  const yRef = useRef(null);
  const rotateRef = useRef(null);
  const xTransformOriginRef = useRef(null);
  const yTransformOriginRef = useRef(null);
  const [transformUnits, setTransformUnits] = useState(defaultTransformUnits);

  const { audioRef, audioSetting, setAudioSetting } = useAudio();

  useEffect(() => {
    window.addEventListener("keyup", handleKeyUpForReset);

    return () => {
      window.removeEventListener("keyup", handleKeyUpForReset);
    };
  }, []);

  const handleKeyUpForReset = (e) => {
    let code;

    if (e.key !== undefined) {
      code = e.key;
    } else if (e.keyIdentifier !== undefined) {
      code = e.keyIdentifier;
    } else if (e.keyCode !== undefined) {
      code = e.keyCode;
    }

    if (typeof code === "string" && code.toLowerCase() === "escape") {
      formRef?.current?.reset();
    }

    if (typeof code === "number" && code === 27) {
      formRef?.current?.reset();
    }
  };

  const handleFormSubmit = (e) => {
    e && e.preventDefault();

    showXYCords &&
      setXYLocationCords({
        x: xRef.current.value,
        y: yRef.current.value,
      });

    handleApply(
      {
        x: xRef.current.value || 0,
        y: yRef.current.value || 0,
        rotate: rotateRef.current.value || 0,
        originX: xTransformOriginRef.current.value,
        originY: yTransformOriginRef.current.value,
      },
      transformUnits
    );

    if (audioSetting) {
      audioRef.current.pause();
      audioRef.current.play();
    }
  };

  const handleFormReset = () => {
    // wait for form to be reset and submit the form with empty values for full reset

    setShowXYCords(false);

    handleApply(
      {
        x: 0,
        y: 0,
        rotate: 0,
        originX: "",
        originY: "",
      },
      transformUnits
    );

    setTransformUnits(defaultTransformUnits);

    if (audioSetting) {
      audioRef.current.pause();
      audioRef.current.play();
    }
  };

  const handleLocateXYClick = () => {
    setShowXYCords((prev) => !prev);
    setXYLocationCords({
      x: xRef.current.value,
      y: yRef.current.value,
    });
  };

  const handleUnitChange = (e, identifer) => {
    const { value } = e.target;
    setTransformUnits((prev) => {
      return {
        ...prev,
        [identifer]: value,
      };
    });

    handleApply(
      {
        x: xRef.current.value || 0,
        y: yRef.current.value || 0,
        rotate: rotateRef.current.value || 0,
        originX: xTransformOriginRef.current.value,
        originY: yTransformOriginRef.current.value,
      },
      {
        ...transformUnits,
        [identifer]: value,
      }
    );

    if (audioSetting) {
      audioRef.current.pause();
      audioRef.current.play();
    }
  };

  return (
    <form
      className="transform-controls-form"
      ref={formRef}
      onSubmit={handleFormSubmit}
      onReset={handleFormReset}
    >
      <fieldset className="translate-controls-form-fieldset">
        <legend>Transform controls</legend>

        <div className="audio-control">
          <label
            htmlFor="switch-audio"
            className="custom-checkmark-label audio-label"
          >
            <span>Audio</span>
            <input
              type="checkbox"
              id="switch-audio"
              checked={audioSetting}
              onClick={() => setAudioSetting((prev) => !prev)}
            />
            <span className="custom-checkmark">&nbsp;</span>
          </label>
        </div>

        <div className="translate-controls">
          <div className="transform-units-container">
            <UnitControls
              radioGroupName="transform"
              onChange={handleUnitChange}
              value={transformUnits.transform}
            />
          </div>

          <div className="locate-xy-container">
            <label htmlFor="locate-xy" className="custom-checkmark-label">
              <span>Locate X,Y</span>
              <input
                id="locate-xy"
                type="checkbox"
                checked={showXYCords}
                onClick={handleLocateXYClick}
              />
              <span className="custom-checkmark">&nbsp;</span>
            </label>
          </div>

          <div className="input-control-group">
            <Input
              ref={xRef}
              label="X"
              unit={transformUnits.transform}
              id="x-control"
              type="text"
              name="x"
              placeholder="0"
            />
          </div>

          <div className="input-control-group">
            <Input
              ref={yRef}
              label="Y"
              unit={transformUnits.transform}
              id="y-control"
              type="text"
              name="y"
              placeholder="0"
            />
          </div>

          <div className="input-control-group">
            <Input
              ref={rotateRef}
              label="R"
              unit="deg"
              id="rotate"
              type="number"
              name="rotate"
              placeholder="0"
            />
          </div>
        </div>
      </fieldset>

      <fieldset className="translate-controls-form-fieldset">
        <legend>Transform Origin controls</legend>

        <div className="translate-controls">
          <div className="transform-units-container">
            <UnitControls
              radioGroupName="transformOrigin"
              value={transformUnits.transformOrigin}
              onChange={handleUnitChange}
            />
          </div>

          <div className="input-control-group">
            <Input
              ref={xTransformOriginRef}
              unit={transformUnits.transformOrigin}
              label="X"
              id="transform-origin-x-control"
              type="text"
              name="origin-x"
              placeholder="50"
            />
          </div>

          <div className="input-control-group">
            <Input
              ref={yTransformOriginRef}
              unit={transformUnits.transformOrigin}
              label="Y"
              id="transform-origin-y-control"
              type="text"
              name="origin-y"
              placeholder="50"
            />
          </div>
        </div>
      </fieldset>

      <div className="form-buttons-container">
        <button
          type="submit"
          className="apply-button"
          onClick={handleFormSubmit}
        >
          Apply
        </button>

        <button className="reset-button" type="reset" onClick={handleFormReset}>
          Reset
        </button>
      </div>
      {audioSetting && (
        <audio
          controls
          className="transfomers-audio"
          ref={audioRef}
          volume={0.5}
        >
          <source src="/transformation-3-100340.mp3" type="audio/mpeg" />
          Your browser does not support the audio tag.
        </audio>
      )}
    </form>
  );
};
