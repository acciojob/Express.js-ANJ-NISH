const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Define the routes and implement the CRUD operations for the books collection

let booksarr=[{id: 1,title: "Wings of fire",author: "APJ Abdul Kalam",publication_year: 2002},
  {id: 2,title: "The Kite Runner",author: "Khalid Hosseini",publication_year: 2004}
]

app.get('/books', (req, res)=>
{
  res.send(booksarr);
})

app.get('/books/:id', (req,res)=>
{
  const bookid=req.params.id;

  let spbook=booksarr.filter((book)=> book.id===parseInt(bookid));

  if(spbook.length===0)
  {
    res.status(404).send("Book id not found");
  }
  else
  {
    res.send(spbook[0]);
  }
})

app.post('/books', (req,res)=>
{
  const bookdata=req.body;
  booksarr.push(bookdata);
  console.log("New book added to list");
  res.end();
})

app.put('/books/:id',(req,res)=>
{
  const bookid=req.params.id;

  let indexofbook=-1;
  booksarr.forEach((ele,index)=> {if(ele.id===parseInt(bookid)){indexofbook=index}});

  if(indexofbook===-1)
  {
    res.status(404).send("Book to be updated not found");
  }
  else
  {
    booksarr[indexofbook]=req.body;
    console.log("Book data updated");
    res.end();
  }
})

app.delete('/books/:id', (req,res)=>
{
  const bookid=req.params.id;

  let newbookarr=booksarr.filter((indibook)=> indibook.id!==parseInt(bookid));

  if(newbookarr.length===booksarr.length)
  {
    res.status(404).send("Book to be deleted not found");
  }

  else
  {
  booksarr=[];

  for(let i=0;i<newbookarr.length;i++)
  {
     booksarr.push(newbookarr[i]);
  }

  console.log("Book deleted from list");
  res.end();
}
})

const server = app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
