import { useEffect, useState} from "react";
import { Link } from 'react-router'
import { useNavigate } from "react-router";
import "../LogIn/Login.css"

export default function CreateUser() {
    const [postValues, setPostValues ] = useState({first_name: '', last_name: '', user_name: '', password: ''})
    const navigate = useNavigate()


    const handleChange = (event) => {
        const { name, value } = event.target
        setPostValues(e => ({...e, [name]: value}))
    }

    const submit = () => {

        fetch('http://localhost:8081/users', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                first_name: postValues.first_name,
                last_name: postValues.last_name,
                user_name: postValues.user_name,
                password: postValues.password
            })
        })
            .then(res => res.json())
            .then(data => console.log("Server Response: ", data))
            .then(dummy => {if(data.success == true){alert("Account Successfully created")}})
            
        }
        

    return (
        <>
            <div className="login-container">
                <h1>Create User</h1>
                <form className="login-form">
                    <input type="text" name="first_name" placeholder="First Name" value={postValues.first_name} onChange={handleChange}/>
                    <input type="text" name="last_name" placeholder="Last Name" value={postValues.last_name} onChange={handleChange}/>
                    <input type="text" name="user_name" placeholder="Username" value={postValues.user_name} onChange={handleChange}/>
                    <input type="text" name="password" placeholder="Password" value={postValues.password} onChange={handleChange}/>
                    <button className="login-submit" onClick={() => {submit()}}>SUBMIT</button>
                </form>
                <div className="login-links">
                    <Link to="/createUser">Back to Login</Link>
                    <Link to="/forgotPassword">Forgot Password</Link>
                </div>
            </div>
        </>
    )
}