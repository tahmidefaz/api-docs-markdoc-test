import { useRouter } from 'next/router'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const router = useRouter()

  // const handleClick = (e) => {
  //   e.preventDefault()
  //   router.push(href)
  // }

  return(
    <>
    <div id="app">
      <div id="toc">
        <h2>Contents</h2>
        <h4 onClick={()=> router.push("/dispatcher")} className="tocContent">Dispatcher</h4>
        <h4 onClick={()=> router.push("/servicelog")} className="tocContent">Service Log</h4>
      </div>
      <div id="page">
        <Component {...pageProps} />
      </div>
    </div>
    </>
  )
}

export default MyApp
