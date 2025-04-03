import { useEffect, useState } from "react";
import './Inventory.css'
import '../LogIn/Login.css'
import { useLocation } from "react-router-dom";

export default function ItemDetail(){
    const location = useLocation()
    const Itemid = location.pathname.slice(16)

    const [data, setData] = useState([])
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [username, setUserName] = useState("")

    useEffect(() => {
        fetch(`http://localhost:8081/items/${Itemid}` )
            .then(res => res.json())
            .then(res2 => setData(res2))
            
    }, [])

    useEffect(() => {
        fetch('http://localhost:8081/users')
            .then(res => res.json())
            .then(res2 => setUsers(res2))
            .then(e => setLoading(false))
    }, [data])

    useEffect(() => {
        if(users){
            for(let i of users){
                if(i.id == data[0].user_id){
                    setUserName(i.user_name)
                }
            }
        }
    }, [loading])

    if(loading){
        return(
            <>
                <h1>Loading</h1>
            </>
        )
    }

    return (
        <>
            <h1>{data[0].item_name}</h1>
            <h2>Owner: {username}</h2>
            <h2>{data[0].quantity}</h2>
            <p>{data[0].description}</p>

        </>
    )
}