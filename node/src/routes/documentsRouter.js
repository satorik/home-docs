import express from 'express'
import resolvers from '../resolvers'

const router = express.Router()

const documentRouter = router
.get( '/origin', async(req, res, next) => {
  const allOrigins = await resolvers.getDocumentOrigins()
  res.send(allOrigins)
})
.post('/origin', async (req, res, next) => {
  const inputData = req.body
  const newOrigin =  await resolvers.createDocumentOrigin({inputData})

  res.send(newOrigin)
})
.post('/add', async(req, res, next) => {
  const newDocument = await resolvers.createDocument(req.body)

  res.send(newDocument)
})
.get('/all', async(req, res, next) => {
  const allDocuments = await resolvers.getDocuments()

  res.send(allDocuments)
})

export default documentRouter