import express from 'express'
import resolvers from '../resolvers'

const router = express.Router()

const documentRouter = router
.get( '/origin', async(req, res, next) => {
  const allOrigins = await resolvers.getDocumentOrigins()
  res.send(allOrigins)
})
.get( '/owner', async(req, res, next) => {
  const allOwners = await resolvers.getOwners()
  res.send(allOwners)
})
.get( '/docType', async(req, res, next) => {
  const allTypes = await resolvers.getDocumentTypes()
  res.send(allTypes)
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
.post('/update', async(req, res, next) => {
  const updatedDocument = await resolvers.updatedDocument(req.body)

  res.send(updatedDocument)
})
.post('/delete', async(req, res, next) => {
  const deletedDocumentId = await resolvers.deleteDocument(req.body)
  res.send(deletedDocumentId)
})
.get('/all', async(req, res, next) => {
  const allDocuments = await resolvers.getDocuments()

  res.send(allDocuments)
})

export default documentRouter