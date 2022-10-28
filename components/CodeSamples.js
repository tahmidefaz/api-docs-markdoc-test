import { useState } from "react";


export default function CodeSamples({ children }) {
    const [selected, setSelected] = useState(0)

    children.forEach(element => {
        console.log("child...", element.props)
    });
    return (
        <div className="samples">
            <div className="code-sample-tabs">
                { children.map((sample, i) => {
                        return(
                            <div className="tab" onClick={() => setSelected(i)}>{sample.props['data-language']}</div>
                        )
                    })
                }
            </div>
            <div className="code-samples">
                { children.map((sample, i) => {
                    return(
                        selected == i && <div className="code-sample">
                            {sample}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}