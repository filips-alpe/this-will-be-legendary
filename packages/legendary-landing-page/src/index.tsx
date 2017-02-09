import * as React from "react";

const style = {
    display: "flex",
    justifyContent: "space-around" as any,
    alignItems: "center",
    padding: "0 5% 0"
};

const hrStyle = {
    "border": "0",
    "height": "1px",
    "backgroundImage": "linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.7), rgba(0, 0, 0, 0))"
}

import L from "legendary-l";
import E from "legendary-e";
import G from "legendary-g";
import N from "legendary-n";
import D from "legendary-d";
import A from "legendary-a";
import R from "legendary-r";
import Y from "legendary-y";

export default function LandingPage() {
    return (
        <div>
            <div style={style}>
                <L/><E/><G/><E/><N/><D/><A/><R/><Y/>
            </div>
            <hr style={hrStyle} />
        </div>
    );
}
