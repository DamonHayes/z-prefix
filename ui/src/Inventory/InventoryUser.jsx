import { useEffect, useState } from "react";
import './Inventory.css'
import '../LogIn/Login.css'
import { useLocation } from "react-router-dom";

export default function InventoryUser(Userid) {
    const location = useLocation()
    const id = location.pathname.slice(11)

    const [data, setData] = useState([])
    const [editable, setEditable] = useState(true)
    const [deletable, setDeletable] = useState(true)
    const [editform, setEditForm] = useState(true)
    const [addform, setAddForm] = useState(true)
    const [itemid, setItemid] = useState(0)
    const [patchValues, setPatchValues] = useState({user_id: id, item_name: '', description: '', quantity: 0})
    const [postValues, setPostValues] = useState({user_id: id, item_name: '', description: '', quantity: 0})

    


    useEffect(() => {
        fetch('http://localhost:8081/items/user/' + id)
            .then(res => res.json())
            .then(res2 => setData(res2))
    }, [])


    const handleChange = (event) => {
        const { name, value } = event.target
        setPatchValues(e => ({...e, [name]: value}))
    }

    const handlePostChange = (event) => {
        const { name, value } = event.target
        setPostValues(e => ({...e, [name]: value}))
    }

    const handleEdit = (EitemName, Edescription, Equantity) => {
        setPatchValues(e => ({...e, item_name: EitemName}))
        setPatchValues(e => ({...e, description: Edescription}))
        setPatchValues(e => ({...e, quantity: Equantity}))
    }


    function shorten(essay){
        if(essay.length > 100){
            essay = essay.slice(0, 100) + "..."
            return essay
        }else{
            return essay
        }
    }

    function addItem(){

        fetch(`http://localhost:8081/items`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postValues)
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                  window.location.reload();
                  alert('Item added!')
                }
            })
    }

    function edit(){
        setEditForm(!editform)

        fetch(`http://localhost:8081/items/${itemid}`, {
            method: 'PATCH',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(patchValues)
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                  window.location.reload();
                  alert('Item updated!')
                }
            })
            

    }

    function deleter(id){
        const confirmDelete = window.confirm("Are you sure you want to delete item id: " + id)

        if(confirmDelete){
            fetch(`http://localhost:8081/items/${id}`, {
                method: 'DELETE',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
                .then(res => {
                    if(res.ok){
                        alert('Item Deleted')
                        window.location.reload()
                    }
                })
        }
    }



    return (
        <>
            {/* PATCH FORM BOX */}
            <div hidden={editform} className="login-container">
                <button className="exitbutton" onClick={() => {setEditForm(!editform)}}>X</button>
                <form className="login-form">
                    <label>Item Name</label>
                    <input type="text" name="item_name" placeholder={patchValues.item_name} value={patchValues.item_name} onChange={handleChange}/>
                    <label>Description</label>
                    <input type="text" name="description" placeholder={patchValues.description} value={patchValues.description} onChange={handleChange}/>
                    <label>Quantity</label>
                    <input type="number" name='quantity' placeholder={patchValues.quantity} value={patchValues.quantity} onChange={handleChange}/>
                    <button onClick={() => {edit()}}>Submit</button>
                </form>              
            </div>
            {/* POST FORM BOX */}
            <div hidden={addform} className="login-container">
                <button className="addexitbutton" onClick={() => {setAddForm(!addform)}}>X</button>
                <form className="login-form">
                    <input type="text" name="item_name" placeholder="Item Name" value={postValues.item_name} onChange={handlePostChange}/>
                    <input type="text" name="description" placeholder="Description" value={postValues.description} onChange={handlePostChange}/>
                    <input type="number" name='quantity' placeholder="Quantity" value={postValues.quantity} onChange={handlePostChange}/>
                    <button onClick={() => {addItem()}}>Submit</button>
                </form>
            </div>
            {/* TABLE */}
            <div className="table-div" hidden={!editform || !addform}>
                <table className="table-container">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>User ID</th>
                            <th>Item Name</th>
                            <th>Description</th>
                            <th>Quantity</th>
                            <th hidden={(editable)}> </th>
                            <th hidden={(deletable)}> </th>

                        </tr>
                    </thead>
                    <tbody>
                        {data && data.map((row) => { return (
                            <tr key={row.id}  onClick={() => {navigate(`/inventory/item/${row.id}`)}}>
                                <td>{row.id}</td>
                                <td>{row.user_id}</td>
                                <td>{row.item_name}</td>
                                <td>{shorten(row.description)}</td>
                                <td>{row.quantity}</td>
                                <td hidden={editable} onClick={() => {setEditForm(!editform), setItemid(row.id), handleEdit(row.item_name, row.description, row.quantity)}}>EDIT</td>
                                <td hidden={deletable} onClick={() => {deleter(row.id)}}>DELETE</td>
                            </tr>
                        )})}
                    </tbody>
                    
                    
                </table>
                <div className="table-buttons">
                        <button className="addbutton" onClick={() => {addItem(), setAddForm(!addform)}}>Add</button>
                        <button className="editbutton" onClick={() => {setEditable(!editable)}}>Edit</button>
                        <button className="deletebutton" onClick={() => {setDeletable(!deletable)}}>Delete</button>
                </div>
                
            </div>    
        </>
    )
}