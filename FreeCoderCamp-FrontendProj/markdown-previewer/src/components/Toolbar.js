import React from "react";

function Toolbar(props) {
    return (
        <div className="toolbar">
            {props.label}
            {/* <div className="icon-container">
                {props.state ? (
                    <span onClick={props.maxWindow}>
                        <i className="bi bi-arrows-angle-expand"></i>
                    </span>
                ) : (
                    <span onClick={props.minWindow}>
                        <i class="bi bi-arrows-angle-contract"></i>
                    </span>
                )}
            </div> */}
        </div>
    );
}

export default Toolbar;
