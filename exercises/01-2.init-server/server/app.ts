import { serve, type HttpBindings } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { trimTrailingSlash } from 'hono/trailing-slash'

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

app.get('/', async context => {
  return context.json({ message: 'Hello, World!' })
})

app.onError((err, context) => {
  console.error('error', err)
  return context.json({ error: true, message: 'Something went wrong' }, 500)
})

serve({ fetch: app.fetch, port: PORT }, info => {
  const url = `http://localhost:${info.port}`
  console.log(`🚀  We have liftoff!\n${url}`)
})
