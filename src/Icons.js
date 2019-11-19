import React from "react";

export const IconGirl = props => (
  <svg width={32} height={32} {...props}>
    <title>{"woman-25"}</title>
    <g strokeWidth={2}>
      <circle cx={11.5} cy={17.5} r={1.5} stroke="none" />
      <circle cx={20.5} cy={17.5} r={1.5} stroke="none" />
      <path
        fill="none"
        strokeMiterlimit={10}
        d="M16 1C7.716 1 1 7.716 1 16v11s4 4 15 4 15-4 15-4V16c0-8.284-6.716-15-15-15z"
      />
      <path
        fill="none"
        strokeMiterlimit={10}
        d="M20.869 6.148C18.126 9.701 13.837 12 9 12a15.06 15.06 0 01-3.113-.328A10.95 10.95 0 005 16c0 6.075 4.925 11 11 11s11-4.925 11-11c0-4.324-2.501-8.055-6.131-9.852z"
      />
    </g>
  </svg>
);

export const IconGuy = props => (
  <svg width={32} height={32} {...props}>
    <title>{"man"}</title>
    <g strokeWidth={2}>
      <path
        fill="none"
        strokeMiterlimit={10}
        d="M1.07 14.545c4.347-5.795 12.033.83 20.385-6.727 4.091 6.477 9.484 6.813 9.484 6.813"
      />
      <circle fill="none" strokeMiterlimit={10} cx={16} cy={16} r={15} />
      <circle fill="none" strokeMiterlimit={10} cx={9} cy={19} r={1} />
      <circle fill="none" strokeMiterlimit={10} cx={23} cy={19} r={1} />
      <circle cx={9} cy={19} r={1} stroke="none" />
      <circle cx={23} cy={19} r={1} stroke="none" />
    </g>
  </svg>
);
