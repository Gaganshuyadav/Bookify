import { createContext, useState, useEffect } from "react";

export const FirebaseContext = createContext();

//----------------------( initialize)-------------------------------------------------------------------
import { initializeApp } from "firebase/app";

// https://firebase.google.com/docs/web/setup#available-libraries
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain:  process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env. messagingSenderId,
  appId:  process.env.appId
};
const firebaseApp = initializeApp(firebaseConfig);

//----------------------( Authentication)-------------------------------------------------------------------
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,     GoogleAuthProvider, signInWithPopup      ,onAuthStateChanged,     signOut} from "firebase/auth";

const firebaseAuth = getAuth(firebaseApp);

const googleProvider = new  GoogleAuthProvider();
 
//----------------------( Storage)-------------------------------------------------------------------

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const storage = getStorage(firebaseApp);


//----------------------( firestore)-------------------------------------------------------------------

import { getFirestore, addDoc, collection , getDocs    , getDoc, doc     ,query, where } from "firebase/firestore";

const firestore = getFirestore( firebaseApp);

//----------------------------------------------------------------------------------------

export const FirebaseProvider = ( props ) => {

  let [ user, setUser ] = useState(null);
  console.log(user);
  // console.log("11 ",user.reloadUserInfo.localId )

  const signupUserWithEmailAndPassword = async ( email,password )=>{
    let res = await createUserWithEmailAndPassword( firebaseAuth , email, password)
    return res;
  }

  const loginUserWithEmailAndPassword = async ( email,password) => {
    let res = signInWithEmailAndPassword( firebaseAuth, email, password);
    return res;
  }

  const signinWithGoogle = async () =>{
    let res = await signInWithPopup( firebaseAuth, googleProvider);
    return res;
  }

  const logout = async ()=>{
    const res = await signOut(firebaseAuth);
    return res;
  }



  const handleCreateNewListing = async ( name, isbn, price, cover )=>{
    const imageRef = ref( storage, `uploads/images/${Date.now()}-${cover.name}`);
    const uploadResult = await uploadBytes( imageRef, cover);
    await addDoc( collection( firestore, "books"), {
      name,
      isbn,
      price,
      imageURL: uploadResult.ref.fullPath,
      userID: user.uid,
      userEmail: user.email,
      displayName: user.displayName ,
      photoURL: user.photoURL,
    });
  }

  const listAllBooks = () =>{
    return getDocs( collection(firestore, "books"));
  }
  
  const getBookById = async ( id)=>{
    const docRef  = doc( firestore, "books", id);
    const result = await getDoc( docRef);
    return result;
  }

  const getImageURL = ( path) =>{
    return getDownloadURL( ref(storage, path ));
  }

  const placeOrder = async ( bookId, qty ) =>{
    const orderRef = collection( firestore, "books", bookId, "orders");
    const result = await addDoc( orderRef , {
      qty: Number(qty),
      userID: user.uid,
      userEmail: user.email,
      displayName: user.displayName ,
      photoURL: user.photoURL,

    }); 
    return result;
  }


  const fetchMyBooks = async () =>{
    if(user){

    const res = await getDocs( query( collection( firestore, "books"), where( "userID", "==", user.uid)));
    return res;
    
  }

  }

  const getOrders= async ( bookId) => {
    const res = await getDocs( collection( firestore, "books", bookId, "orders"))
    return res;
  }

  useEffect(()=>{
    onAuthStateChanged( firebaseAuth, ( userA)=>{
      if(userA){
        setUser(userA);
      }
      else{
        setUser(null);
      }

    })
  },[])

  const isLoggedIn = user ? true : false ;
   return <FirebaseContext.Provider value={ {  isLoggedIn, signupUserWithEmailAndPassword, loginUserWithEmailAndPassword, signinWithGoogle, logout, handleCreateNewListing, listAllBooks, getImageURL , getBookById, placeOrder, fetchMyBooks, getOrders } } > {props.children} </FirebaseContext.Provider>
}
