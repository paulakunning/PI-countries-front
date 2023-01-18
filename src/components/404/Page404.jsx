import React from "react";
import e from '../404/Page404.module.css'
import { Link } from "react-router-dom";

export default function Page404(){
    return (
        <div className={e.errorCont}>
            <h1> Error 404 - Page not found </h1>
            <h2> Please try again </h2>
            <Link to="/countries">
                <button> Back to home </button>
            </Link>
        </div>
    )
}