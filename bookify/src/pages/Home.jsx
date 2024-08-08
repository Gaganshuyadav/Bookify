import BookCard from "../components/Card";
import { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../context/Firebase";

export default function HomePage(){

    const firebaseC = useContext( FirebaseContext); 
    let [ books, setBooks] =  useState([]);

    useEffect(()=>{
        firebaseC.listAllBooks()
        .then((books)=>{ 
            setBooks(books.docs); 
    })
    },[])
    
    return(
        <div>
            <div className="container">
            <div className="row">
                { books.map((book)=>{
                return <BookCard key={book.id} id={ book.id} link={`/book/view/${book.id}`} book={{...book.data()} } ></BookCard>
            })}
            </div>
            </div>
        </div>
    )
}