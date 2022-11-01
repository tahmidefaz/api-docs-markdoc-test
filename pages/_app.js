import { useRouter } from 'next/router'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const router = useRouter()

  return(
    <>
    <div id="app">
      <div id="toc">
        <h3>API Docs</h3>
        <h2>Contents</h2>
        <h4 onClick={()=> router.push("/")} className="tocContent">Home</h4>
        <h4 onClick={()=> router.push("/dispatcher")} className="tocContent">Dispatcher</h4>
        <h4 onClick={()=> router.push("/servicelog")} className="tocContent">Service Log</h4>
        <h4 onClick={()=> router.push("/devarticle")} className="tocContent">Developer Article</h4>
        <h4 onClick={()=> router.push("/payloadtracker")} className="tocContent">Payload Tracker</h4>
      </div>
      <div id="page">
        <Component {...pageProps} />
      </div>
    </div>
    </>
  )
}

export default MyApp
