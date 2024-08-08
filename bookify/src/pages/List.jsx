import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useContext} from "react";
import { FirebaseContext } from "../context/Firebase";

export default function ListingPage(){

    let firebaseC = useContext(FirebaseContext);

    let [ name, setName ] = useState("");
    let [ isbnNumber, setIsbnNumber] = useState("");
    let [ price, setPrice] = useState("");
    let [ coverPic, setCoverPic] = useState("");

    let handleSubmit = (e)=>{
        e.preventDefault();
        firebaseC.handleCreateNewListing( name, isbnNumber, price, coverPic);
    }

    return(
        <div className='container'>
            <div className='row flex justify-content-center '>
                <div className="col-7">
                <Form>
                <Form.Group className="mb-3" con>
                    <Form.Label>Enter Book Name</Form.Label>
                    <Form.Control value={name} onChange={ (e)=>{ setName(e.target.value);}} type="text" placeholder="Enter name" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>ISBN</Form.Label>
                    <Form.Control value={isbnNumber} onChange={ (e)=>{ setIsbnNumber(e.target.value);}} type="number" placeholder="ISBN Number" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Price</Form.Label>
                    <Form.Control value={price} onChange={ (e)=>{ setPrice(e.target.value);}} type="number" placeholder="Enter Price" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>IMAGE</Form.Label>
                    <Form.Control onChange={ (e)=>{ setCoverPic(e.target.files[0]); } } type="file" />
                </Form.Group>

                <Button onClick={ handleSubmit} variant="primary" type="submit">
                    Create
                </Button >
                </Form>
            </div>
        </div>
    </div>
    )
}