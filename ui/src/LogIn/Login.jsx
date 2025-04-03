import { useEffect, useState, useRef } from "react";
import { Link } from 'react-router'
import { useNavigate } from "react-router";
import { useLocalStorage } from "@uidotdev/usehooks"
import './Login.css'
import bcrypt from "bcryptjs-react"

export default function Login(){
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [data, setData] = useState('')
    const [loggedIn, setLoggedIn] = useLocalStorage('loggedIn')
    const navigate = useNavigate()
    const saltRounds = 10;

    useEffect(() => {
        fetch('http://localhost:8081/users')
            .then(res => res.json())
            .then(json => setData(json))
    }, [])


    function HandleUserNameChange(event){
        setUserName(event.target.value)
    }
    function HandlePasswordChange(event){
        setPassword(event.target.value)
    }

    

    function submit(){
        var loggedInbool = false;
        var userid = 0
        if(data){
            for(let i of data){
                if(i.user_name == username){
                    var salt = bcrypt.genSaltSync(10);
                    var hash = bcrypt.hashSync(password, salt)
                    if(bcrypt.compare(i.password, hash)){
                        alert("Successful Login");
                        setLoggedIn(i)
                        loggedInbool = true;
                        userid = i.id;
                    }
                }
            }
        }

        

        if(!loggedInbool){
            alert("Incorrect Password or username")
        }else(
            navigate('/Inventory/' + userid, {state: {id: userid}})
        )

        

    }
    




    return (
        <>
            <div className="login-container">
                <h1 className="headertext">Login</h1>
                <form className="login-form">
                    <input type="text" placeholder="USERNAME" onChange={HandleUserNameChange}/>
                    <input type="text" placeholder="PASSWORD" onChange={HandlePasswordChange}/>
                    <button className="login-submit" onClick={()=>{submit()}}>SUBMIT</button>
                </form>
                <div className="login-links">
                    <Link to="/createUser">Create Account</Link>
                    <Link to="/forgotPassword">Forgot Password</Link>
                </div>
            </div>
        </>
    )
}