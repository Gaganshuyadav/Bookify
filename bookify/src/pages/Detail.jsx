import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../context/Firebase";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function BookDetailPage(){

    const firebaseC = useContext( FirebaseContext);
    const params = useParams();
    let [ data, setData] = useState(null);
    let [ url, setURL] = useState(null); 
    let [ qty, setQty] = useState("");

    useEffect(( )=>{
        firebaseC.getBookById( params.bookId).then( ( value)=>{ setData( value.data());})
    },[])

    useEffect(( )=>{
        if(data){
        firebaseC.getImageURL( data.imageURL).then( ( URL)=>{ setURL( URL); })
        }
    },[ data])
    
    const placeOrder = ( )=>{
        firebaseC.placeOrder( params.bookId, qty).then((val)=>{console.log("placeOrderByDetailPage  ",val); } )
    }

    if(data==null){
        return <h1>loading...</h1>
    }

    return (
        <div className="ms-5">
            <h1>{data.name}</h1>
            <img src={ url} className="w-50 rounded-3" />
            <h2>Details</h2>
            <p><b>price:</b> {data.price} </p>
            <p><b>ISBN:</b> {data.isbn} </p>
            <h2>Details</h2>
            <p><b>Name:</b> {data.name} </p>
            <p><b>Email:</b> {data.userEmail} </p>

            <Form.Group className="mb-3" controlId="formBasicQty">
            <Form.Label>Qty</Form.Label>
            <Form.Control value={qty} onChange={ (e)=>{ setQty(e.target.value);}} type="number" placeholder="Enter Qty" />
            </Form.Group>

            <Button variant="success" onClick={ placeOrder}>Buy Now</Button>
        </div>
    )
}