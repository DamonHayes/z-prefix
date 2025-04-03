import { useEffect, useState} from "react";
import { Link } from 'react-router'
import { useNavigate } from "react-router";
import './Login.css'

export default function Login(){
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [data, setData] = useState('')
    const navigate = useNavigate()

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
        var loggedIn = false;
        var userid = 0
        if(data){
            for(let i of data){
                if(i.user_name == username){
                    if(i.password == password){
                        alert("Successful Login")
                        loggedIn = true;
                        userid = i.id
                    }
                }
            }
        }

        if(!loggedIn){
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