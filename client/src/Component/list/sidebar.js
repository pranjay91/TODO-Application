import React, { useState, useEffect } from "react";
import "./list.css";
import axios from "axios";
import {useNavigate} from "react-router-dom"

const Sidebar =()=>{
    const Navigate=useNavigate();
    const [taskData, setTaskData] = useState([]);
 
    const logoutHandler = () =>{
        localStorage.setItem("authorization", "")
        localStorage.setItem("username", "")
        Navigate("/Login");
    }
    return(
        <>
        <div className="side">
            <div id="side_child">
                <h2>Todo List</h2>
                <h3>History</h3>
                <ul type="none">
                {taskData.map((data)=>{
                        <li>{data.activity}</li>
                })}
                </ul>
                <button className="logout"onClick={()=>{logoutHandler()}}>Logout</button>
            </div>
            </div>
        </>
    )
}
export default Sidebar