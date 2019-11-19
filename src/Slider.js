import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const StyledSlider = styled.div`
  --slider-height: 30px;

  .input-field {
    border: 2px solid rgba(0, 0, 0, 0.1);
    font-size: 20px;
    letter-spacing: 0.05em;
    padding: 0.5em 1em;
    border-radius: 2em;
    display: flex;

    &.invalid {
      border-color: var(--color-error);
    }

    &:after {
      content: "cm";
      color: rgba(0, 0, 0, 0.3);
    }

    input {
      flex: 1;
      appearance: none;
      outline: none;
      border: none;
      font-size: inherit;
      letter-spacing: inherit;
    }
  }

  .track {
    position: relative;
    height: var(--slider-height);
    display: flex;
    align-items: center;

    &:before {
      left: 0;
      content: "";
      width: 100%;
      height: calc(var(--slider-height) / 8);
      border-radius: 99px;
      background-color: var(--color-black10);
    }
  }

  .progress {
    position: absolute;
    height: calc(var(--slider-height) / 2);
    width: var(--slider-progress);
    border-radius: calc(var(--slider-height) / 2);
    background-color: rgb(var(--color-primary));
  }

  .handle {
    cursor: pointer;

    position: absolute;
    top: 0;
    left: calc(var(--slider-height) / -2);
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.8);
    box-sizing: border-box;
    width: var(--slider-height);
    height: var(--slider-height);

    background-color: rgba(var(--color-primary), 0.5);
    border-radius: 50%;
  }
`;

const Slider = ({ min = 160, max = 200, step = 1 }) => {
  const initialValue = (max - min) / 2 + min;

  const [value, setValue] = useState(initialValue);
  const [inputValue, setInputValue] = useState(initialValue);
  const [inputInvalid, setInputInvalid] = useState(false);
  const [sliderWidth, setSliderWidth] = useState(false);

  const trackRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    if (!trackRef.current) return;

    setSliderWidth(trackRef.current.getBoundingClientRect().width);
  }, [trackRef]);

  /**
   * This updates the slider value itself
   * and the value of the input box which is a different one,
   * so we can let the user enter a value which is outside of the
   * min / max boundaries.
   */
  const handleSliderChange = event => {
    const value = event.target.value;

    // update input- and slider value
    setInputValue(value);
    setValue(value);
  };

  /**
   * Change and Blur events are separated here because the user should be
   * able to enter a number which is way too high or low.
   *
   * In that case we set the field to "invalid" (which turns it red).
   */
  const handleInputChange = event => {
    const value = event.target.value;

    // check if value is out of range and set invalid state
    if (value < min || value > max) {
      setInputInvalid(true);
    } else {
      setInputInvalid(false);
    }

    // update input value in state
    setInputValue(value);
  };

  /**
   * When the input looses focus, we clamp the value for the user
   * remove the invalid state of the input and update the slider with the new value
   */
  const handleInputBlur = event => {
    const value = clampValue(event.target.value);

    // since value is clamped, we can safely remove the invalid state
    setInputInvalid(false);

    // update input- and slider value
    setInputValue(value);
    setValue(value);
  };

  /**
   * Handle dragging of the slider handle through framer moton
   */
  const handleDrag = (event, info) => {
    const x = info.point.x;
    const rawValue = (x / sliderWidth) * (max - min) + min;
    const value = clampValue(Math.round(rawValue));

    // update input- and slider value
    setInputValue(value);
    setValue(value);

    // update progress bar
    progressRef.current.style.setProperty(
      "--slider-progress",
      `${Math.min(sliderWidth, x)}px`
    );
  };

  /**
   * Helper function to clamp the value between min and max
   */
  const clampValue = value => Math.min(max, Math.max(min, value));

  return (
    <div>
      <pre>Slider width: {sliderWidth} px</pre>
      <pre>{value} cm</pre>
      <StyledSlider>
        <header>
          <label htmlFor="slider">Body Height</label>
          <button>help</button>
        </header>

        <motion.div className="track" ref={trackRef}>
          <div className="progress" ref={progressRef} />

          <motion.div
            className="handle"
            drag="x"
            dragConstraints={{ left: 0, right: sliderWidth }}
            dragElastic={0.02}
            dragMomentum={false}
            onDrag={handleDrag}
          />
        </motion.div>

        <input
          type="range"
          name="slider"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleSliderChange}
        />

        <div className={`input-field ${inputInvalid ? "invalid" : "valid"}`}>
          <input
            type="number"
            min={min}
            max={max}
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
          />
        </div>
      </StyledSlider>
    </div>
  );
};

export default Slider;
