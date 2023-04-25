import "./App.css";
import Controls from "./components/Controls";
import Logo from "./components/Logo";
import PadBank from "./components/PadBank";

export const POWER_BANK1 = [
    {
        key: "Q",
        src: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3",
    },
    {
        key: "W",
        src: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3",
    },
    {
        key: "E",
        src: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3",
    },
    {
        key: "A",
        src: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3",
    },
    {
        key: "S",
        src: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3",
    },
    { key: "D", src: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3" },
    {
        key: "Z",
        src: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3",
    },
    {
        key: "X",
        src: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3",
    },
    {
        key: "C",
        src: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3",
    },
];

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

function App() {
    return (
        <div className="App">
            <div className="inner-container">
                <PadBank />
                <Logo />
                <Controls />
            </div>
        </div>
    );
}

export default App;
