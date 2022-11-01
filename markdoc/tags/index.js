import Code from "../../components/CodeSamples"
import JsonSnippet from "../../components/JsonSnippet"


export const codesamples = {
    render: Code,
}

export const jsonsnippet = {
    render: JsonSnippet,
    attributes: {
        title: {
            type: String
        },
        omitFirst: {
            type: Boolean
        }
    }
}
