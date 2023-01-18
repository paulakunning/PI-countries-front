import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getCountriesByName } from "../../redux/actions/actions";
import sb from '../SearchBar/SearchBar.module.css'
import icon from '../SearchBar/search.png'

function validate(name){
    let errors = {}
    if(!name) errors.name = 'Please type a name'
    if (!/^[a-zA-Z ]*$/.test(name)) errors.name = 'Name should contain only letters'
    return errors
}

export default function SearchBar({setCurrentPage}){

    const dispatch = useDispatch()
    const [ name, setName ] = useState([""])
    const [ errors, setErrors ] = useState({})

    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value)
        setErrors(validate(e.target.value))
    }

    function handleSubmit(e){
        e.preventDefault()
        if(!errors.length)dispatch(getCountriesByName(name))
        setName("")
        setCurrentPage(1)
    }

    return (
      <div className={sb.sbContainer}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            value={name}
            type="text"
            placeholder="Search by name"
            onChange={(e) => handleInputChange(e)}
          />
          <button className={sb.sbBtn} type="submit">
            <img src={icon} alt="Search icon" />
          </button> {errors.name && <p className={sb.errors}>{errors.name}</p>}
        </form>
      </div>
    );
}