import React from "react";
import "./Previewer.css";
import Toolbar from "./Toolbar";

function Previewer(props) {
    return (
        <div className="previewer-wrapper">
            <Toolbar
                label={props.label}
                // state={props.state}
                // maxWindow={props.maxWindow}
                // minWindow={props.minWindow}
            />
            <div
                id="preview"
                dangerouslySetInnerHTML={{ __html: props.data }}
            ></div>
        </div>
    );
}

export default Previewer;
