import { DocumentOrigin, Document, DocumentType, User, Storage } from '../models'


const documentResolvers = {
  createDocument: async({inputData}, req) => {
    try {
      let documentType = await DocumentType.findOne({title: inputData.documentType})
      if (!documentType) {
        documentType = await new DocumentType({title: inputData.documentType}).save()
      }

      let owner = await User.findOne({username: inputData.owner})
      if (!owner) {
        owner = await new User({username: inputData.owner}).save()
      }

      const newDocument = await new Document({
        title: inputData.title,
        owner: owner,
        comment: inputData.comment,
        documentType: documentType
      }).save()

      const {storages} = inputData
      const returnedStorages = []

      for (let origin of storages) {

        const docOrigin = await DocumentOrigin.findById(origin._id)
        let place = await Storage.findOne({place: origin.value, documentOrigin: docOrigin})
        if (!place) {
          place = await new Storage({
            place: origin.value, 
            documentOrigin: docOrigin
            }).save()

          docOrigin.storages.push(place)
          await docOrigin.save()
        }

        returnedStorages.push({
          place: origin.value, 
          originId: origin._id
        })

        place.documents.push(newDocument)
        await place.save()
        newDocument.storages.push(place)
        await newDocument.save()
      }

      return {
        _id: newDocument._id,
        title: newDocument.title,
        owner:  owner.username,
        comment: newDocument.comment,
        documentType: documentType.title,
        storages: returnedStorages
      }

    } catch (err) {
      console.log('outside', err)
    }
  },
  updateDocument: async({_id, inputData}, req) => {

  },
  deleteDocument: async({_id}, req) => {
    console.log(_id)
    await Storage.updateMany( { }, {$pull: {documents: _id}}, { multi: true })
    await Document.deleteOne({_id})
    
    return _id
  },
  createDocumentOrigin: async ({inputData}, req) => {
     const newOrigin = await new DocumentOrigin({
       type:inputData.type,
       title: inputData.title
     }).save()

     return newOrigin
  },
  getDocumentOrigins: async(args, req) => {
    const docOrigins = await DocumentOrigin.find().populate('storages') 

    return docOrigins.map(origin => {
      return {
        _id: origin._id,
        type: origin.type,
        title: origin.title,
        storages: origin.storages.map(storage => {
          return {
            _id: storage._id,
            place: storage.place
          }
        })
      }
    })

  },
  getOwners: (args, req) => {
    return User.find()
  },
  getDocumentTypes: (args, req) => {
    return DocumentType.find()
  },
  getDocuments: async (args, req) => {
    const docs =  await Document.find()
    const updatedDocuments = []

    for (const singleDocument of docs ) {
      const owner = await User.findById(singleDocument.owner)
      const documentType = await DocumentType.findById(singleDocument.documentType)
      const updatedStorages = []
      for (const storage of singleDocument.storages) {
        const updatedStorage = await Storage.findById(storage)
        updatedStorages.push({originId: updatedStorage.documentOrigin, place: updatedStorage.place})
      }

      updatedDocuments.push({
        _id: singleDocument._id,
        title: singleDocument.title,
        owner:  owner.username,
        comment: singleDocument.comment,
        documentType: documentType.title,
        storages: updatedStorages
      })
    }

    return updatedDocuments
  }
}

export default documentResolvers