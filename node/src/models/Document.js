import mongoose from "mongoose"

const Schema = mongoose.Schema

const documentSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  comment: {
    type: String
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  documentType: {
    type: Schema.Types.ObjectId,
    ref: 'DocumentType'
  },
  storages: [{
    type: Schema.Types.ObjectId,
    ref: "Storage"
  }]
}, {timestamps: true});

export default mongoose.model("Document", documentSchema)