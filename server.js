// USANDO O NODE VANILLA (CRU)

// import { createServer } from 'node:http';

// const server = createServer((request, response) => {
//   response.write('server rodando') // escreve no site

//   return response.end()
// })

// server.listen(3333) 


// AGORA USANDO O FASTIFY

import {fastify} from 'fastify';
import { DatabaseMemory } from './database-memory.js'
import { DatabasePostgres } from './database-postgres.js';

const server = fastify()

// const database = new DatabaseMemory()
const database = new DatabasePostgres()


server.get('/videos', async (request, reply) => {
  const search = request.query.search

  const videos = await database.list(search)

  return videos
})

server.post('/videos', async (request, reply) => {
  const {title, description, duration } = request.body

  await database.create({
    title,
    description,
    duration,
  })
  console.log(database.list())

  return reply.status(201).send(  )  // 201 == algo foi criado
})

server.put('/videos/:id', async (request, reply) => {
  const videoId = request.params.id
  const {title, description, duration} = request.body

   await database.update(videoId, {
    title,
    description,
    duration,
  })

  return reply.status(204).send() // 204 => Teve sucesso mas nao tem mensagem
})

server.delete('/videos/:id', async (request, reply) => {
  const videoId = request.params.id

   await database.delete(videoId)

  reply.status(204).send()
})


server.listen({
  port: process.env.PORT ?? 3333,
})