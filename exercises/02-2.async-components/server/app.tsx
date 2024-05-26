import React from 'react'
import { serve, type HttpBindings } from '@hono/node-server'
import { RESPONSE_ALREADY_SENT } from '@hono/node-server/utils/response'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { trimTrailingSlash } from 'hono/trailing-slash'
import { renderToPipeableStream } from 'react-server-dom-esm/server'
import { App } from './components/App'

const PORT = 3000

const app = new Hono<{ Bindings: HttpBindings }>({ strict: true })
app.use(trimTrailingSlash())
app.use(logger())
app.use(cors({
	origin: 'http://localhost:5173',
	allowMethods: ['POST', 'GET', 'OPTIONS'],
	exposeHeaders: ['Content-Length'],
	maxAge: 600,
	credentials: true,
}))

app.get('/rsc/:dataId?', async context => {
	const dataId = context.req.param('dataId')
  const { pipe } = renderToPipeableStream(<App dataId={dataId ? Number(dataId) : undefined} />)
	// MEMO: Configure CROS to return with `RESPONSE ALREADY SENT`
	context.env.outgoing.setHeader('Content-Type', 'text/html')
	context.env.outgoing.setHeader('Access-Control-Allow-Credentials', 'true')
	context.env.outgoing.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173')
	context.env.outgoing.setHeader('Access-Control-Expose-Headers', 'Content-Length')

  pipe(context.env.outgoing)
  return RESPONSE_ALREADY_SENT
})

app.onError((err, context) => {
  console.error('error', err)
  return context.json({ error: true, message: 'Something went wrong' }, 500)
})

serve({ fetch: app.fetch, port: PORT }, info => {
  const url = `http://localhost:${info.port}`
  console.log(`🚀  We have liftoff!\n${url}`)
})
