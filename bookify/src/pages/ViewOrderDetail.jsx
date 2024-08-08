import { useParams } from "react-router-dom";
import { FirebaseContext } from "../context/Firebase";
import { useContext, useEffect, useState } from "react";

export default function ViewOrderDetails() {

    const params = useParams();
    const firebaseC = useContext(FirebaseContext);
    let [ orders, setOrders] = useState([]);

    useEffect(()=>{
        if(firebaseC.isLoggedIn){
            firebaseC.getOrders(params.bookId).then((orders)=>{ setOrders(orders.docs); });
        }
    },[ firebaseC])

    return (
        <div>
            <h1>Orders</h1>
            {
                orders.map((order)=>{
                    return (
                        <div class="border border-2 border-dark rounded w-75 ms-4 mb-4">
                            <h3>Order By: {order.data().displayName}</h3>
                            <h3>Qty: {order.data().qty}</h3> 
                            <h4>Email: {order.data().userEmail}</h4>
                        </div>
                    )
                })
            }
        </div>
    )
}

