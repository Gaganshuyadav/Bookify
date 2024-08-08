import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useContext, useState, useEffect } from 'react';
import { FirebaseContext } from '../context/Firebase';
import { useNavigate } from 'react-router-dom';

export default function Register() {

    const firebaseC = useContext( FirebaseContext);

    let [ email, setEmail] = useState("");
    let [ password, setPassword] = useState("");

    let navigate = useNavigate();

    const handleSubmit = (e)=>{
        e.preventDefault();
        let result = firebaseC.signupUserWithEmailAndPassword( email, password);
        console.log("signup response...");
        console.log(result);
        
    }

    const handleWithGoogle = ( )=>{
      let res = firebaseC.signinWithGoogle();
      console.log("signin with google...")
      console.log(res);
    }

  useEffect(()=>{
    if(firebaseC.isLoggedIn){
      navigate("/");
    }
  }, [ firebaseC, navigate]);

  return (
    <div className='container'>
        <div className='row flex justify-content-center '>
            <div className="col-7">
           <Form>
         <Form.Group className="mb-3" controlId="formBasicEmail">
           <Form.Label>Email address</Form.Label>
           <Form.Control value={email} onChange={ (e)=>{ setEmail(e.target.value);}} type="email" placeholder="Enter email" />
         </Form.Group>
    
         <Form.Group className="mb-3" controlId="formBasicPassword">
           <Form.Label>Password</Form.Label>
           <Form.Control value={password} onChange={ (e)=>{ setPassword(e.target.value);}} type="password" placeholder="Password" />
         </Form.Group>
         <Button onClick={ handleSubmit} variant="primary" type="submit">
           Signup
         </Button >
    </Form>
    <h5>or</h5>
    <Button onClick={handleWithGoogle} variant="success"> Signin with Google</Button>
        </div>
      </div>
    </div>
    
  );
}
