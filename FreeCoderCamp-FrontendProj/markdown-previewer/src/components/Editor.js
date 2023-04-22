import React from "react";
import "./Editor.css";
import Toolbar from "./Toolbar";

function Editor(props) {
    return (
        <div className="editor-wrapper">
            <Toolbar
                // state={props.state}
                // maxWindow={props.maxWindow}
                // minWindow={props.minWindow}
                label={props.label}
            />
            <textarea
                value={props.data}
                onChange={props.onChange}
                id="editor"
            />
        </div>
    );
}

export default Editor;
