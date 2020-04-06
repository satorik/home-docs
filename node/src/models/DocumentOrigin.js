import mongoose from "mongoose"

const Schema = mongoose.Schema;

const documentOriginSchema = new Schema({
  type: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  storages: [{
    type: Schema.Types.ObjectId,
    ref: 'Storage'
  }],
  // documents: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: 'Document'
  //   }
  // ]
}, {timestamps: true});

export default mongoose.model("DocumentOrigin", documentOriginSchema)