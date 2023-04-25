import React from "react";
import { POWER_BANK1 } from "../App";
import useSound from "use-sound";

const POWER_BANK2 = {
    Q: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
    W: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
    E: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
    A: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
    S: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
    D: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
    Z: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
    X: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
    C: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
};

const style = {
    backgroundColor: "grey",
    marginTop: "10px",
    boxShadow: "black 3px 3px 5px",
};

const styleOnClick = {
    backgroundColor: "orange",
    marginTop: "13px",
    boxShadow: "orange 0 3px",
    height: "77px",
};

function PadBank() {
    const soundUrl = "/sounds/909-drums.mp3";

    const [play] = useSound(soundUrl, {
        sprite: {
            kick: [0, 350],
            hihat: [374, 160],
            snare: [666, 290],
            cowbell: [968, 200],
        },
    });

    // Custom hook that listens for 'keydown',
    // and calls the appropriate handler function.
    // useKeyboardBindings({
    //     1: () => play({ id: "kick" }),
    //     2: () => play({ id: "hihat" }),
    //     3: () => play({ id: "snare" }),
    //     4: () => play({ id: "cowbell" }),
    // });

    return (
        <>
            <button aria-label="kick" onMouseDown={() => play({ id: "kick" })}>
                1
            </button>
            <button
                aria-label="hihat"
                onMouseDown={() => play({ id: "hihat" })}
            >
                2
            </button>
            <button
                aria-label="snare"
                onMouseDown={() => play({ id: "snare" })}
            >
                3
            </button>
            <button
                aria-label="cowbell"
                onMouseDown={() => play({ id: "cowbell" })}
            >
                4
            </button>
        </>
    );
    // const [play] = useSound(POWER_BANK2.Q);
    // return (
    //     <div className="pad-bank">
    //         {POWER_BANK1.map((ele, index) => {
    //             return (
    //                 <div key={index} className="drum-pad" style={style}>
    //                     <span className="clip" onClick={play}></span>
    //                     {ele.key}
    //                 </div>
    //             );
    //         })}
    //     </div>
    // );
}

export default PadBank;
