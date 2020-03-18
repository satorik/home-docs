import express from 'express'
import mongoose from 'mongoose'

const app = express()

mongoose
  .connect('mongodb://localhost/homeDocs', { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => app.listen({ port: process.env.PORT || 4000 }, () => {
    console.log(`Server ready at http://localhost:${process.env.PORT || '4000'}`)
  }))
  .catch(err => console.log(err));