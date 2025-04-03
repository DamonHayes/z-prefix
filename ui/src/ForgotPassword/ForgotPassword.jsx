import { useEffect, useState} from "react";
import { Link } from 'react-router'
import '../Login/Login.css'

export default function ForgotPassword() {
    const [searchValues, setSearchValues ] = useState({last_name: '', user_name: ''})
    const [data, setData] = useState()

    useEffect(() => {
        fetch('http://localhost:8081/users')
            .then(res => res.json())
            .then(res2 => setData(res2))
    }, [])

    const handleChange = (event) => {
        const { name, value } = event.target
        setSearchValues(e => ({...e, [name]: value}))
    }

    const submit = () => {
        let found = false
        if(data){
            for(let i of data){
                if(i.last_name == searchValues.last_name && i.user_name == searchValues.user_name){
                    alert("Your password is " + i.password)
                    found = true;
                }
            }
            if(!found) {
                alert("No user found try again")
            }
        }
    }

    return (
       <>
            <div className="login-container">
                <h1>Forgot Pasword</h1>
                <form className="login-form">
                    <input type="text" name="user_name" placeholder="Username" value={searchValues.user_name} onChange={handleChange}/>
                    <input type="text" name="last_name" placeholder="Last Name" value={searchValues.last_name} onChange={handleChange}/>
                    <button className="login-submit" onClick={() => {submit()}}>SUBMIT</button>
                </form>
                <div className="login-links">
                    <Link to="/createUser">Create Account</Link>
                    <Link to="/forgotPassword">Forgot Password</Link>
                </div>
            </div>
        </>
    )
}