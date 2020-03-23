import express from 'express'
import mongoose from 'mongoose'
import documentRouter from './routes/documentsRouter'

const app = express()
app.use('/', (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
})

app.use(express.json())

app.use('/document', documentRouter)


mongoose
  .connect('mongodb://localhost/homeDocs', { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => app.listen({ port: process.env.PORT || 4000 }, () => {
    console.log(`Server ready at http://localhost:${process.env.PORT || '4000'}`)
  }))
  .catch(err => console.log(err));