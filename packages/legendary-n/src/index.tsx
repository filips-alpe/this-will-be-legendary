import * as React from "react";

const style = {
    "padding": "0 2% 0",
    "fontSize": "100px",
    "color": "white",
    "textShadow": "white 0 0 9px",
};

const animationStyle = {
  "transform": "translate3d(0, 0, 0)",
  "animation": "shake 3s, boom 1.5s 2s ease-out, scale 1s 2s ease-out forwards, pulse 1.3s 3.5s infinite ease-in-out"
}

export default function N() {
    return <div style={style}>N</div>;
    // return <div style={{...style, ...animationStyle}}>N</div>;
}
