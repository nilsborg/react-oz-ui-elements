import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { motion, useMotionValue } from "framer-motion";

import { clampValue, convertToPixel } from "./helpers";

const StyledSlider = styled.div`
  --slider-height: 30px;

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1em;
  }

  .input-field {
    border: 2px solid rgba(0, 0, 0, 0.1);
    font-size: 20px;
    letter-spacing: 0.05em;
    padding: 0.5em 1em;
    border-radius: 2em;

    &.invalid {
      border-color: var(--color-error);
    }

    .unit {
      color: rgba(0, 0, 0, 0.3);
    }

    input {
      width: 60px;
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
    grid-column: span 2;
    margin-top: 1em;

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
    /* width: var(--slider-progress); */
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

const Slider = ({ min = 160, max = 200 }) => {
  const initialValue = (max - min) / 2 + min;
  const handlePosition = useMotionValue(0);

  const [value, setValue] = useState(initialValue);
  const [inputValue, setInputValue] = useState(initialValue);
  const [inputInvalid, setInputInvalid] = useState(false);
  const [sliderWidth, setSliderWidth] = useState(0);

  const trackRef = useRef(null);
  const progressRef = useRef(null);

  // get the width of the slider track element
  useEffect(() => {
    setSliderWidth(trackRef.current.getBoundingClientRect().width);
  }, [trackRef]);

  // updathe the slider position as soon as the slider width is measured
  useEffect(() => {
    handlePosition.set(convertToPixel(value, min, max, sliderWidth));
  }, [handlePosition, value, min, max, sliderWidth]);

  /**
   * Handles changing the value directly in the number input field.
   *
   * Change and Blur events are separated here because the user should be
   * able to enter a number which is way too high or low.
   *
   * In that case we set the field to "invalid" (which turns it red).
   */
  const handleInputChange = event => {
    const value = event.target.value;

    // update input value in state
    setInputValue(value);

    // check if value is out of range and set invalid state
    if (value < min || value > max) {
      setInputInvalid(true);
    } else {
      setInputInvalid(false);
    }
  };

  /**
   * When the input looses focus, we clamp the value for the user
   * remove the invalid state of the input and update the slider with the new value
   */
  const handleInputBlur = event => {
    const value = clampValue(event.target.value, min, max);

    // since value is clamped, we can safely remove the invalid state
    setInputInvalid(false);

    // update input- and slider value and drag handle position
    setInputValue(value);
    setValue(value);
    handlePosition.set(convertToPixel(value, min, max, sliderWidth));
  };

  /**
   * Handle dragging of the slider handle (with framer moton)
   */
  const handleDrag = (event, info) => {
    const pixelValue = info.point.x;

    // this formular takes the pixel value between 0 and sliderWidth
    // and converts it into a cm value in the respective min and max range
    const rawValue = (pixelValue / sliderWidth) * (max - min) + min;
    const value = clampValue(Math.round(rawValue), min, max);

    // update input- and slider value
    setValue(value);
    setInputValue(value);
  };

  return (
    <div>
      <pre>Slider width: {sliderWidth} px</pre>
      <pre>{value} cm</pre>
      <StyledSlider>
        <header>
          <div className="label">
            <label htmlFor="slider">Body Height</label>
            <button>help</button>
          </div>

          <div className={`input-field ${inputInvalid ? "invalid" : "valid"}`}>
            <input
              type="number"
              min={min}
              max={max}
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
            />
            <span className="unit">cm</span>
          </div>
        </header>

        <motion.div className="track" ref={trackRef}>
          <motion.div className="progress" ref={progressRef} style={{ width: handlePosition }} />

          <motion.div
            className="handle"
            drag="x"
            dragConstraints={{ left: 0, right: sliderWidth }}
            dragElastic={0.02}
            dragMomentum={false}
            onDrag={handleDrag}
            style={{ x: handlePosition }}
          />
        </motion.div>
      </StyledSlider>
    </div>
  );
};

export default Slider;
