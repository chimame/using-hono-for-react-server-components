// @ts-expect-error: Unreachable code error
import React, { Suspense, startTransition, use } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
// @ts-expect-error: Unreachable code error
import { createFromFetch } from 'react-server-dom-esm/client'

const getGlobalLocation = () =>
	window.location.pathname + window.location.search

const initialLocation = getGlobalLocation()
const initialContentFetchPromise = fetch(`http://localhost:3000/rsc${initialLocation}`)
const initialContentPromise = createFromFetch(initialContentFetchPromise)

function App() {
	const content = use(initialContentPromise)
	return content
}

startTransition(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <App />
        </Suspense>
        </div>
    </React.StrictMode>,
  )
})