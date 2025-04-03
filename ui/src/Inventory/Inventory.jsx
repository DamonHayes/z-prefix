import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import './Inventory.css'

export default function Inventory() {
    const [data, setData] = useState([])
    const navigate = useNavigate()


    useEffect(() => {
        fetch('http://localhost:8081/items')
            .then(res => res.json())
            .then(res2 => setData(res2))
    }, [])

    useEffect(() => {
        if(data){
            console.log("data changed", data)
        }
    }, [data])

    function shorten(essay){
        if(essay.length > 100){
            essay = essay.slice(100) + "..."
        }else{
            return essay
        }
    }



    return (
        <>
            <div className="table-div">
                <table className="table-container">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>User ID</th>
                            <th>Item Name</th>
                            <th>Description</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.map((row) => { return (
                            <tr key={row.id} onClick={() => {navigate(`/inventory/item/${row.id}`)}}>
                                <td>{row.id}</td>
                                <td>{row.user_id}</td>
                                <td>{row.item_name}</td>
                                <td>{shorten(row.description)}</td>
                                <td>{row.quantity}</td>
                            </tr>
                        )})}
                    </tbody>
                    
                    
                </table>
                
                
            </div>    
        </>
    )
}