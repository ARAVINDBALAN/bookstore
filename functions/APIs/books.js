
const { db } = require('../utils/admin')



exports.getAllBooks = async (req,res) => {
    let books =  await db.collection('books').get()
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
        ISBN : req.body.ISBN,
        author : req.body.author,
        price : req.body.price
    }
    let dbRef = db.collection('books')
    let newBookReturn = await dbRef.add(newBook)
    return res.json(newBookReturn.id)

}