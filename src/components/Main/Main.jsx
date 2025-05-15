import React, { useContext,useEffect } from 'react'
import hljs from 'highlight.js'
import { marked } from 'marked'
import { markedHighlight } from 'marked-highlight'
import 'highlight.js/styles/github.css'  // Change this line
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/context'
const Main = () => {
    const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context)
    // useEffect(() => {
    //     marked.setOptions({
    //         highlight: function (code, lang) {
    //             if (lang && hljs.getLanguage(lang)) {
    //                 return hljs.highlight(code, { language: lang }).value
    //             }
    //             return hljs.highlightAuto(code).value
    //         },
    //         breaks: true
    //     })
    // }, [])
//     useEffect(() => {
//     marked.setOptions({
//         highlight: function (code, lang) {
//             if (lang && hljs.getLanguage(lang)) {
//                 return hljs.highlight(code, { language: lang }).value;
//             }
//             // Force javascript as default language if none specified
//             return hljs.highlight(code, { language: 'javascript' }).value;
//         },
//         breaks: true,
//         langPrefix: 'hljs language-'
//     });
// }, []);

//     // Function to convert response to HTML with syntax highlighting
//     const formatResponse = (text) => {
//         return marked(text)
//     }
useEffect(() => {
     marked.use(markedHighlight({
            langPrefix: 'hljs language-',
            highlight: (code, language) => {
                if (language && hljs.getLanguage(language)) {
                    try {
                        return hljs.highlight(code, { language }).value;
                    } catch (err) {
                        console.error(err);
                    }
                }
                return hljs.highlightAuto(code).value;
            }
        }));

        // Additional marked options
        marked.setOptions({
            breaks: true,
            gfm: true
        });
    }, []);

    const formatResponse = (text) => {
        try {
            return marked(text);
        } catch (err) {
            console.error('Markdown parsing error:', err);
            return text;
        }
    }
    return (

        <div className="main">
            <div className="nav">
                <p>Gemini</p>
                <img src={assets.user_icon} alt="" />
            </div>
            <div className="main-container">
                {!showResult
                    ? <>
                        <div className="greet">
                            <p><span>Hello, Dev</span></p>
                            <p>How can i help you today?</p>
                        </div>
                        <div className="cards">
                            <div className="card">
                                <p>Suggest some wonderful trekking place.</p>
                                <img src={assets.compass_icon} alt="" />
                            </div>
                            <div className="card">
                                <p>summarize the concept of artificial intelligence.</p>
                                <img src={assets.bulb_icon} alt="" />
                            </div>
                            <div className="card">
                                <p>which is the safest country in the world?</p>
                                <img src={assets.message_icon} alt="" />
                            </div>
                            <div className="card">
                                <p>Identify the best outcome of the given model.</p>
                                <img src={assets.code_icon} alt="" />
                            </div>
                        </div>

                    </> : <div className="result">
                        <div className="result-title">
                            <img src={assets.user_icon} alt="" />
                            <p>{recentPrompt}</p>
                        </div>
                        <div className="result-data">
                            <img src={assets.gemini_icon} alt="" />

                            {loading
                                ? <div className="loader">
                                    <hr />
                                    <hr />
                                    <hr />
                                </div>
                                : <p dangerouslySetInnerHTML={{ __html: formatResponse(resultData) }}></p>
                            }
                        </div>
                    </div>}


                <div className="main-bottom">
                    <div className="search-box">
                        <input onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder="Enter a prompt here.." />
                        <div>
                            <img src={assets.gallery_icon} alt="" />
                            <img src={assets.mic_icon} alt="" />
                            <img onClick={() => onSent()} src={assets.send_icon} alt="" />
                        </div>
                    </div>
                    <p className="bottom-info">
                        Gemini may display incorrect information,be sure to double check the response.Your privacy and Gemini app.
                    </p>
                </div>
            </div>
        </div>

    )
}

export default Main
// The useContext hook in React is used to consume a context created by createContext.
// It allows components to access the values provided by a context without having to manually pass them down through props in the component tree.