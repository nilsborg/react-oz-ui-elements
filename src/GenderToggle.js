import React, { useState } from "react";
import styled from "styled-components";

import { IconGirl, IconGuy } from "./Icons";

// TODO:
// 1. wenn man mit der mouse auf dem element bleibt, was man angeklickt hat
// sieht die animation so aus, als wäre die grüne bubble doppelt
//
// 2. icons könnten gut grün werden => color transition

const StyledToggle = styled.div`
  color: var(--color-text);
  position: relative;
  font-size: 20px;
  letter-spacing: 0.1em;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2vw;
  input {
    display: none;
  }

  .selector,
  label {
    border: 2px solid;
    border-radius: 2em;
    box-sizing: border-box;
  }

  svg {
    fill: var(--color-text);
    stroke: var(--color-text);
  }

  label {
    line-height: 1;
    padding: 0.5em 1em;
    border: 2px solid;
    border-radius: 2em;
    border-color: rgba(0, 0, 0, 0.1);
    transition: border-color 200ms ease;
    display: grid;
    grid-template-columns: 1fr 32px;
    align-items: center;
    gap: 2em;
    cursor: pointer;

    &:hover {
      color: rgb(var(--color-primary));
    }

    span {
      padding: 0 0.5em;
      transition: color 250ms ease-in-out;
    }

    &.guy {
      direction: rtl;
    }
  }

  .selector {
    position: absolute;
    top: 0;
    bottom: 0;
    width: calc(50% - 1vw);
    border-color: rgb(var(--color-primary));
    background-color: rgba(var(--color-primary), 0.1);
    pointer-events: none;
    transition: width 200ms linear, transform 300ms var(--anim-ease);

    &[data-active="0"] {
      width: 38.5%;
      transform: translateX(80%);
    }

    &[data-active="1"] {
      transform: translateX(0);
    }

    &[data-active="2"] {
      transform: translateX(calc(100% + 2vw));
    }
  }
`;

const GenderToggle = () => {
  const [activeGender, setActiveGender] = useState(0);

  const handleClick = event => {
    if (event.target.type !== "radio") return;

    const gender = parseInt(event.target.value, 10);
    setActiveGender(gender);
  };

  const handleReset = event => {
    event.preventDefault();
    setActiveGender(0);
  };

  return (
    <div>
      <pre>
        Selected: {JSON.stringify(activeGender)}
        <button onClick={handleReset}>reset</button>
      </pre>

      <StyledToggle>
        <label className={`girl ${activeGender === 1 ? "active" : ""}`} onClick={handleClick}>
          <span>Woman</span>
          <IconGirl className="icon" />
          <input type="radio" name="gender-toggle" value="1" />
        </label>

        <label className={`guy ${activeGender === 2 ? "active" : ""}`} onClick={handleClick}>
          <span>Man</span>
          <IconGuy className="icon" />
          <input type="radio" name="gender-toggle" value="2" />
        </label>

        <div className="selector" data-active={activeGender} />
      </StyledToggle>
    </div>
  );
};

export default GenderToggle;
