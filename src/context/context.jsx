// Context is a feature that provides a way to share data across components without passing props manually at every level of the component tree. 
// React Context that is intended to manage and share global state across components in an application. Here’s a breakdown of what’s happening in the code:
import { createContext, useState } from "react";
import run from "../config/gemini";

// It is particularly useful for managing global state or configurations that multiple components in the app need to access, such as themes, user authentication, or language settings.
export const Context = createContext();
// This creates a context object (Context) that other components can use to access the shared state.ex main component
const ContextProvider = (props) => {

    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompt, setPrevPrompt] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const delayPara = (index, nextWord) => {
        setTimeout(function () {
            setResultData(prev => prev + nextWord);
        }, 75 * index)
    }
    const newChat = () => {
        setLoading(false)
        setShowResult(false)

    }
    const onSent = async (prompt) => {
        setResultData("")
        setLoading(true)
        setShowResult(true)
        let response;
        if (prompt !== undefined) {
            response = await run(prompt);
            setRecentPrompt(prompt)
        }
        else {
            setPrevPrompt(prev => [...prev, input])
            setRecentPrompt(input)
            response = await run(input)
        }
        let responseArray = response.split("**");
        let newResponse = "";
        for (let i = 0; i < responseArray.length; i++) {
            if (i === 0 || i % 2 !== 1) {
                newResponse += responseArray[i];
            }
            else {
                newResponse += "<b>" + responseArray[i] + "</b>";
            }
        }
        let newResponse2 = newResponse.split("*").join("</br>")
        let newResponseArray = newResponse2.split(" ");
        for (let i = 0; i < newResponseArray.length; i++) {
            const nextWord = newResponseArray[i];
            delayPara(i, nextWord + " ")
        }
        setLoading(false)
        setInput("")

    }
    // onSent("what is react js?")

    const contextValue = {
        // This object holds the state values and functions that should be shared with components accessing the context:
        prevPrompt,
        setPrevPrompt,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat
    }
    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
        /* props.children: Represents all the components nested inside the ContextProvider in the component tree.
            These children can now consume the Context values. */
    )
}
export default ContextProvider;