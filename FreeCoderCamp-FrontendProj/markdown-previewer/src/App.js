import { marked } from "marked";
import "./App.css";
import Editor from "./components/Editor";
import Previewer from "./components/Previewer";
import { useEffect, useReducer, useState } from "react";

const ACTIONS = {
    MAXIMIZE_EDITOR: "MAXIMIZE_EDITOR",
    MAXIMIZE_PREVIEWER: "MAXIMIZE_PREVIEWER",
    BOTH_WINDOW: "BOTH_WINDOW",
};

const DUMMY_DATA = `
# Heading
## Heading 2

- list item 1
- list item 2
- list item 3

[visit google](https://google.com/search)

This is inline \`<div></div>\`

This is a block of code

\`\`\`
  let x = 1
  ley y = 2
  let z = x + y 

`;

// const WindowReducer = (state, action) => {
//     switch (action.type) {
//         case ACTIONS.MAXIMIZE_EDITOR:
//             return {
//                 editor: true,
//                 preview: false,
//             };
//         case ACTIONS.MAXIMIZE_PREVIEWER:
//             return {
//                 editor: false,
//                 preview: true,
//             };

//         case ACTIONS.BOTH_WINDOW:
//             return {
//                 editor: true,
//                 preview: true,
//             };
//         default:
//             return state;
//     }
// };

function App() {
    const [markUpIp, setMarkUpIp] = useState(DUMMY_DATA);
    const [previewData, setPreviewData] = useState(marked(DUMMY_DATA));
    // const [maxState, dispatch] = useReducer(WindowReducer, {
    //     editor: true,
    //     preview: true,
    // });
    const handleMarkUpIpChange = (event) => {
        setMarkUpIp(event.target.value);
    };

    const convertMarkUpToHTML = (markUp) => {
        return marked(markUp);
    };

    useEffect(() => {
        setPreviewData(convertMarkUpToHTML(markUpIp));
    }, [markUpIp]);

    // const maxEditorWindow = () => {
    //     dispatch({ type: "MAXIMIZE_EDITOR" });
    // };

    // const maxPreviewerWindown = () => {
    //     dispatch({ type: "MAXIMIZE_PREVIEW" });
    // };

    // const minWindow = () => {
    //     dispatch({ type: "BOTH_WINDOW" });
    // };

    return (
        <div className="App">
            {/* {maxState.editor ? ( */}
            <Editor
                data={markUpIp}
                label="EDITOR"
                onChange={handleMarkUpIpChange}
                // state={maxState.editor}
                // maxWindow={maxEditorWindow}
                // minWindow={minWindow}
            />
            {/* ) : null}
            {maxState.preview ? ( */}
            <Previewer
                label="PREVIEWER"
                data={previewData}
                // state={maxState.preview}
                // maxWindow={maxPreviewerWindown}
                // minWindow={minWindow}
            />
            {/* ) : null} */}
        </div>
    );
}

export default App;
