import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FirebaseContext } from '../context/Firebase';
import { useContext} from "react";

function MyNavbar() {
  const firebaseC = useContext(FirebaseContext);

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand >BOOKIFY</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/book/List">Add Listing</Nav.Link>
            <Nav.Link href="/book/orders">Orders</Nav.Link>
            { firebaseC.isLoggedIn ? <Nav.Link onClick={ ()=>{firebaseC.logout(); } } >logout</Nav.Link> : "" }
            { firebaseC.isLoggedIn ? "" : <Nav.Link href="/register" >Signup</Nav.Link> }
            { firebaseC.isLoggedIn ? "" : <Nav.Link href="/login" >login</Nav.Link> }
          </Nav>
        </Container>

      </Navbar>
    </>
  );
}

export default MyNavbar;