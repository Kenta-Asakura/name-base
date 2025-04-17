import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import cors from 'cors'

const app = new Hono()

app.use('*', cors()) // enable CORS for all routes (optional, but useful)

app.get('/', (c) => {
  return c.text('Backend is running!')
})

serve(app)
