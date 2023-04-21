import { useEffect, useReducer } from "react";
import "./App.css";

const PRIMARY_COLOR = "#627a7b";

const ACTIONS = {
    INITIAL_QUOTE: "INITIAL_QUOTE",
    NEW_QUOTE: "NEW_QUOTE",
};

const quoteReducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.INITIAL_QUOTE:
            return action.payload;
        case ACTIONS.NEW_QUOTE:
            return action.payload;
        default:
            return state;
    }
};

function App() {
    const [quoteState, dispatch] = useReducer(quoteReducer, {
        quote: "",
        author: "",
        color: PRIMARY_COLOR,
    });

    useEffect(() => {
        fetch("https://api.quotable.io/random")
            .then((res) => res.json())
            .then((data) => {
                dispatch({
                    type: ACTIONS.INITIAL_QUOTE,
                    payload: {
                        quote: data.content,
                        author: data.author,
                        color: PRIMARY_COLOR,
                    },
                });
            });
    }, []);

    function generateRandomColor() {
        let maxVal = 0xffffff; // 16777215
        let randomNumber = Math.random() * maxVal;
        randomNumber = Math.floor(randomNumber);
        randomNumber = randomNumber.toString(16);
        let randColor = randomNumber.padStart(6, 0);
        return `#${randColor.toUpperCase()}`;
    }
    useEffect(() => {
        console.log("newState", quoteState);
    }, [quoteState]);

    const newQuoteHnadler = () => {
        fetch("https://api.quotable.io/random")
            .then((res) => res.json())
            .then((data) => {
                dispatch({
                    type: ACTIONS.NEW_QUOTE,
                    payload: {
                        quote: data.content,
                        author: data.author,
                        color: generateRandomColor(),
                    },
                });
            });
    };

    return (
        <div
            className="App"
            style={{
                backgroundColor: quoteState.color,
                transition: "all 1.5s ease-in",
            }}
        >
            <div id="quote-box">
                <div
                    id="text"
                    style={{
                        color: quoteState.color,
                        transition: "all 1.5s ease-in",
                    }}
                >
                    <span className="icon-wrapper">
                        <i
                            class="bi bi-quote"
                            style={{
                                color: quoteState.color,
                                transition: "all 1.5s ease-in",
                            }}
                        ></i>
                    </span>
                    {quoteState.quote}
                </div>
                <div
                    id="author"
                    style={{
                        color: quoteState.color,
                        transition: "all 1.5s ease-in",
                    }}
                >
                    {`- ${quoteState.author}`}
                </div>
                <div id="buttons">
                    <a
                        id="tweet-quote"
                        href="https://twitter.com/intent/tweet"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <span className="icon-wrapper">
                            <i
                                className="bi bi-twitter"
                                style={{
                                    color: quoteState.color,
                                    transition: "all 1.5s ease-in",
                                }}
                            ></i>
                        </span>
                    </a>
                    <button
                        id="new-quote"
                        onClick={newQuoteHnadler}
                        style={{
                            backgroundColor: quoteState.color,
                            transition: "all 1.5s ease-in",
                        }}
                    >
                        New Quote
                    </button>
                </div>
            </div>
            <div className="footer"></div>
        </div>
    );
}

export default App;
