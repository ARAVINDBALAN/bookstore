
const { db } = require('../utils/admin')



exports.getAllBooks = async (req,res) => {
    let bookList =[]
    let books
    if(req.query.sortbyprice){
        if(req.query.sortbyprice==='hightolow'){
            books =  await db.collection('books').orderBy('price','desc').get()
        }
        else if(req.query.sortbyprice==='lowtohigh'){
            books =  await db.collection('books').orderBy('price','asc').get()
            
        }    
    }
    else if(req.params.category){
        books =  await db.collection('books').where('category','==',req.params.category).get()

    }
    else{
        books =  await db.collection('books').orderBy('title','asc').get()
    }
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

    const bookToUpdate =  db.collection('books').doc(req.params.id)
    if(!bookToUpdate){
        return res.status(404).json({err : req.params.id})
    }
    else{
        
        await bookToUpdate.update(req.body)
        return json(bookToUpdate.id)
    }


}


exports.deleteBook = async (req,res) => {

    const bookToDelete =  db.collection('books').doc(req.params.id)
    if(!bookToDelete){
        return res.status(404).json({err : req.params.id})
    }
    else{
        await bookToDelete.delete()
        return res.json({status:"successful"})
    }

}


