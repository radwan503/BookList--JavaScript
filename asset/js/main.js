  //Book Class:Represent Book
class Book{
    constructor(title,author,isbn){
        this.author = author;
        this.title = title;
        this.isbn = isbn;

    }
}

 //UI Classs: Handle UI Tasks
class UI{
    static displayBooks(){

        const books = Store.getBooks();
        books.forEach((book)=>UI.addBookToList(book));

    }

    static addBookToList(book){
        const list = document.querySelector('#book-list');
        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>

        `;

        list.appendChild(row);
    }
    static deleteBook(el){
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
        }
 
     }


     static showAlert(message, className){
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);
       
        //vanish in 3 second

        setTimeout(()=>document.querySelector('.alert').remove(),3003);

    }     

    static clearFields(){
        document.querySelector('#title').value ='';
        document.querySelector('#author').value ='';
        document.querySelector('#isbn').value ='';
        

    }

}


 //Store Class: Handle Storage

 class Store{
     static getBooks(){

        let books;
        if(localStorage.getItem('books')=== null){
            books = [];
        }else{
            books = JSON.parse(localStorage.getItem('books'));
        }
       return books;
     }
    static addBook(book){
         const books = Store.getBooks();
         books.push(book);
         localStorage.setItem('books',JSON.stringify(books));

     }
    static removeBook(isbn){
        const books = Store.getBooks();
        books.forEach((book,index)=>{
        if(books.isbn ===isbn){
        books.splice(index,1);
        }
        });

        localStorage.setItem('books',JSON.stringify(books));

    }

 } 

 
 //Event: Dispaly Book
 document.addEventListener('DOMContentLoaded', UI.displayBooks);


 //Event: Add a Book
 document.querySelector('#book-form').addEventListener('submit', (e)=>{ 
   
   e.preventDefault();
    //Get Form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    //validate
    if(title === '' || author ==='' || isbn === ''){
        UI.showAlert('please fill the all field','danger');
    }else{
       //Initiate book
    const book = new Book(title,author,isbn);

    //Add Book to list
    UI.addBookToList(book);

    //ADD book to store
    Store.addBook(book);

    //Add Success Message

    UI.showAlert('Book Added', 'success'); 

    //Clear field
    UI.clearFields();
    }
 
 });


 //Event: Remove a Book
document.querySelector('#book-list').addEventListener('click',(e)=>{

//remove book    
UI.deleteBook(e.target);

//remove book from store
Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

// show success message
UI.showAlert('Book Remove','success');


})
