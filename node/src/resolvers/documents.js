import { DocumentOrigin, Document, DocumentType, User, Storage } from '../models'


const documentResolvers = {
  createDocument: async({inputData}, req) => {
    console.log(inputData)
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

      documentType.documents.push(newDocument)
      await documentType.save()

      const {storages} = inputData
      for (let origin in storages) {
        console.log(origin)
        console.log(storages[origin])
        let docOrigin = await DocumentOrigin.findById(origin)
        let place = await Storage.findOne({place: storages[origin], documentOrigin: docOrigin})
        if (!place) {
          place = await new Storage({
            place: storages[origin], 
            documentOrigin: docOrigin
            }).save()
        }
        place.documents.push(newDocument)
        await place.save()
        
        newDocument.storages.push(place)
        await newDocument.save()
        
        docOrigin.storages.push(place)
        docOrigin.documents.push(newDocument)
        await docOrigin.save()
      }

      return newDocument

    } catch (err) {
      throw err;
    }
  },
 createDocumentOrigin: async ({inputData}, req) => {
     const newOrigin = await new DocumentOrigin({
       type:inputData.type,
       title: inputData.title
     }).save()

     return newOrigin
  },
  getDocumentOrigins: (args, req) => {
    return DocumentOrigin.find()
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