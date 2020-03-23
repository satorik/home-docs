import mongoose from "mongoose"

const Schema = mongoose.Schema;

const storageSchema = new Schema({
  place: {
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
  documentOrigin: {
    type: Schema.Types.ObjectId,
    ref: "DocumentOrigin"
  },
  documents: [{
    type: Schema.Types.ObjectId,
    ref: 'document'
  }]
}, {timestamps: true});

export default mongoose.model("Storage", storageSchema)