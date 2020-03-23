import mongoose from "mongoose"

const Schema = mongoose.Schema

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  documentsOwned: [{type: Schema.Types.ObjectId, ref: 'Document'}],
  documentsCreated: [{type: Schema.Types.ObjectId, ref: 'Document'}]

}, {timestamps: true});

export default mongoose.model("User", userSchema)