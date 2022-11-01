
export default function JsonSnippet({ title, omitFirst, children }) {
    return (
        <div className="example-response">
            <div className="example-response-title">{title}</div>
            <div className="example-response-body">
                { omitFirst ? children[children.length -1] : children }
            </div>
        </div>
    )
}
