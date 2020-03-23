import mongoose from "mongoose"

const Schema = mongoose.Schema

const documentTypeSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  comment: {
    type: String
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  documents: [{
    type: Schema.Types.ObjectId,
    ref: 'Document'
  }],
}, {timestamps: true});

export default mongoose.model("DocumentType", documentTypeSchema)