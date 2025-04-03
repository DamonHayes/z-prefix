import { useEffect, useState } from "react";
import { Link } from "react-router"
import './Home.css'
import Inventory from "../Inventory/inventory";

export default function Home() {
    



    return (
        <>
            <div>
                <Inventory />
                <Link to="/login">LOG IN</Link>
            </div>   
        </>
    )
}