
const { db } = require('../utils/admin')



exports.getAllBooks = async (req,res) => {
    let books =  await db.collection('books').orderBy('title','desc').get()
    let bookList =[]
    books.forEach(data => {
        bookList.push({
            id:data.id,
            title : data.data().title
        })
    })
    return res.json(bookList)
};


exports.addBooks = async (req,res) =>{
    // if(req.body.title.trim() === '' || req.body.price.trim() === '' || req.body.author.trim() === '' || req.body.ISBN.trim === '')
    //     return res.json({error:"all fields are required"})
    
    const newBook = {
        title : req.body.title,
        isbn : req.body.isbn,
        author : req.body.author,
        price : req.body.price,
        category : req.body.category
    }
    let dbRef = db.collection('books')
    let newBookReturn = await dbRef.add(newBook)
    return res.json(newBookReturn.id)

}


exports.editBooks = async (req,res) =>{

    const bookToUpdate = await db.doc('/books/${req.params.id}')
    if(!bookToUpdate.exists){
        return res.status(404).json({err : "No book found"})
    }
    else{
        
        await bookToUpdate.update(req.body)
        return json(bookToUpdate.id)
    }


}


exports.deleteBook = async (req,res) => {

    const bookToDelete = await db.doc('/books/${req.params.id}')
    if(!bookToDelete.exists){
        return res.status(404).json({err : "No book found"})
    }
    else{
        await bookToDelete.delete()
        return res.json({status:"successful"})
    }

}