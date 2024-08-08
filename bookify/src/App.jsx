import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button  from 'react-bootstrap/Button';
import { Routes,Route } from "react-router-dom";
import Register from './pages/Register';
import LoginPage from './pages/login';
import MyNavbar from './components/Navbar';
import ListingPage from './pages/List';
import HomePage from './pages/Home';
import BookDetailPage from './pages/Detail';
import OrderPage from './pages/ViewOrder';
import ViewOrderDetails from './pages/ViewOrderDetail';

function App() {

  return (
    <div>
      <MyNavbar/>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/login" element={<LoginPage></LoginPage>} />
      <Route path="/register" element={ <Register></Register>} />
      <Route path="/book/list" element={<ListingPage></ListingPage>} />
      <Route path="/book/view/:bookId" element={ <BookDetailPage></BookDetailPage>} />
      <Route path="/book/orders" element={ <OrderPage />} />
      <Route path="/book/orders/:bookId" element={ <ViewOrderDetails />} />
    </Routes>
    </div>
  )
}

export default App
