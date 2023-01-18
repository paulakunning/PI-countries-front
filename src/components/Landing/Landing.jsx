import React from "react";
import { Link } from "react-router-dom";
import l from "../Landing/Landing.module.css"

export default function Landing(){
    return (
      <div className={l.landing}>
        <div className={l.landingContainer} >
        <h1>Welcome to Countries App</h1>
          <Link to="/countries">
            <button className={l.startBtn} > Start 
            </button>
          </Link>
        <h2>Are you ready?</h2>
        </div>
      </div>
    );
}