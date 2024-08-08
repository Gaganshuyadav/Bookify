import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { FirebaseContext } from '../context/Firebase';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function BookCard( { link, book } ) {

    const firebaseC = useContext(FirebaseContext);
    const [ url, setURL] = useState(null);
    const navigate = useNavigate();

    useEffect(( )=>{
        firebaseC.getImageURL( book.imageURL).then((url)=>{ setURL(url); });
    },[])

    return (
      <div className="col col-sm-11 col-md-5 col-lg-4">
      <Card style={{ width: '18rem' }} >
        <Card.Img variant="top" src={url} />
        <Card.Body>
          <Card.Title>{ book.name}</Card.Title>
          <Card.Text>
           This book has a title { book.name} is sold by {book.displayName} and this book costs Rs.{ book.price}
          </Card.Text>
          <Button variant="dark" onClick={ (e)=>{ navigate(link)} }>View</Button>
        </Card.Body>
      </Card>
      </div>
    );
  }