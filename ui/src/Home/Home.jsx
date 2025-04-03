import { useEffect, useState } from "react";
import './Home.css'

export default function Home() {
    const [data, setData] = useState([])


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



    return (
        <>
            <div>
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
                            <tr key={row.id}>
                                <td>{row.id}</td>
                                <td>{row.user_id}</td>
                                <td>{row.item_name}</td>
                                <td>{row.description}</td>
                                <td>{row.quantity}</td>
                            </tr>
                        )})}
                    </tbody>

                </table>
            </div>    
        </>
    )
}