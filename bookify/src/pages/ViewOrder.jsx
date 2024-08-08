import BookCard from "../components/Card";
import { useEffect, useState, useContext } from "react"; 
import { FirebaseContext } from '../context/Firebase';

export default function OrderPage() {

    let firebaseC = useContext(FirebaseContext);
    let [ books, setBooks ] = useState([]);

    useEffect(()=>{
        if( firebaseC.isLoggedIn){
            firebaseC.fetchMyBooks().then((books)=>{ setBooks(books.docs); console.log(books.docs)});
        }
    },[ firebaseC])

    if(!firebaseC.isLoggedIn){
        return (
        <div>
            <h1>No Orders Yet</h1>
            <h3>Please!! Add some products</h3>
        </div>)
    }
    
    return(
        <div>
        <h1>This is Home</h1>
        <div className="container">
        <div className="row">
            { books.map((book)=>{
            return <BookCard key={book.id} id={ book.id} link={`/book/orders/${book.id}`} book={ {...book.data()} } ></BookCard>
        })}
        </div>
        </div>
    </div>
    )
}