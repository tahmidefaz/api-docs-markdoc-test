import { useState, useEffect } from "react";


export default function CodeSamples({ children }) {
    const [selected, setSelected] = useState(0)

    return (
        <div className="samples">
            <div className="code-sample-tabs">
                { children.map((sample, i) => {
                        return(
                            <div key={`tab-${i}`} className={`tab ${selected==i ? 'selected' : ''}`} onClick={() => setSelected(i)}>{sample.props['data-language']}</div>
                        )
                    })
                }
            </div>
            <div className="code-samples">
                { children.map((sample, i) => {
                    return(
                        selected == i && <div className="code-sample">
                            <pre>
                                <code className={`language-${sample.props['data-language']}`}>
                                    {sample.props.children}
                                </code>
                            </pre>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
