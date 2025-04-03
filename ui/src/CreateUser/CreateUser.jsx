import { useEffect, useState} from "react";
import { Link } from 'react-router'
import { useNavigate } from "react-router";
import "../LogIn/Login.css"
import bcrypt from 'bcryptjs-react'


export default function CreateUser() {
    const [postValues, setPostValues ] = useState({first_name: '', last_name: '', user_name: '', password: ''})
    const [userData, setUserData] = useState([])
    const navigate = useNavigate()
    const saltRounds = 10;

    useEffect(() => {
        fetch('http://localhost:8081/users')
            .then(res => res.json())
            .then(res2 => setUserData(res2))
    }, [])
    
    


    const handleChange = (event) => {
        var { name, value } = event.target
        console.log(bcrypt.hashSync(postValues.password, saltRounds))
        setPostValues(e => ({...e, [name]: value}))
    }

    const submit = () => {

        //checks for empty fields
        if(postValues.first_name == "" || postValues.last_name == "" || postValues.password == "" || postValues.user_name == ""){
            alert("All fields must be filled out")
            return
        }
        
        //checks for existing user
        for(let i of userData){
            if(i.user_name == postValues.user_name){
                alert("User already exist with that username, choose another one")
                return
            }
        }


        postValues.password = bcrypt.hashSync(postValues.password, saltRounds)

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
                <button onClick={() => {submit()}}></button>
                <div className="login-links">
                    <Link to="/Login">Back to Login</Link>
                    <Link to="/forgotPassword">Forgot Password</Link>
                </div>
            </div>
        </>
    )
}