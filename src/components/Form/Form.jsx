import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { clearFilters, createActivity, getCountries, sortCountries } from "../../redux/actions/actions";
import NavBar from "../NavBar/NavBar"
import f from "../Form/Form.module.css"

function validate(input){
    var errors ={}
    if (!input.name) {errors.name = 'Name is required'}
    if(!/^[a-zA-Z ]*$/.test(input.name)) {errors.name = 'Name is invalid'}
    if(!input.difficulty){errors.difficulty = 'Difficulty is required'}
    if(!input.duration){errors.duration = 'Duration is required'}
    if(input.duration < 1 || input.duration > 24) {errors.duration = 'Duration should be a numer betweeen 1 and 24'}
    if(!input.season) {errors.season = 'Season is required'}
    if(!input.countries.length) {errors.countries = 'Please select at least one country'}
    return errors
}

export default function Form(){
    const allCountries = useSelector((state) => state.allCountries)
    const dispatch = useDispatch()
    const history = useHistory()
    const [ errors, setErrors ] = useState({})
    const [ input, setInput ] = useState({
        name: "",
        difficulty: 0,
        duration: 0,
        season: "",
        countries: []
    })

    useEffect(()=> {
        dispatch(getCountries())
        dispatch(sortCountries())
        return ()=> {dispatch(clearFilters())}
    }, [dispatch])

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    function handleCheckDif(e){
        if(e.target.checked){
            setInput({
                ...input,
                difficulty: e.target.value
            })
            setErrors(validate({
                ...input,
                difficulty: e.target.value
            }))
            errors.difficulty = ''
        }
    }
    
    function handleCheckSeason(e){
        if(e.target.checked){
            setInput({
                ...input,
                season: e.target.value
            })
            setErrors(validate({
                ...input,
                season: e.target.value
            }))
            errors.season = ''
        }
    }

    function handleSelect(e){   
        const country = e.target.value
        const filterCountry = input.countries.find(c => c === country)
        if(filterCountry) return alert('You have already added that country.')
        setInput({
            ...input,
            countries: [...input.countries, e.target.value]
        })
        setErrors(validate({
            ...input,
            countries:  [...input.countries, e.target.value]
        }))
    }

    function handleDelete(el){
        setInput({
            ...input,
            countries: input.countries.filter(c => c !== el)
        })
    }

    const handleDisabled = () => {
        if (!input.name || !input.difficulty || !input.duration || !input.season || input.duration < 1 || input.duration > 24 || input.countries.length === 0 || !/^[a-zA-Z ]*$/.test(input.name) ) return true 
        return false
    }

     function handleSubmit(e){
        e.preventDefault();
        try {
            dispatch(createActivity(input))
            setInput({
                name: "",
                difficulty: 0,
                duration: 0,
                season: "",
                countries: []
            })
            alert('Activity created successfully')
            history.push('/countries')
        } catch (error) {
            alert('Oops! Something went wrong. Please try again')
        }
    }

    return (
      <>
        <NavBar />
        <div className={f.formBackground}>
            <div>
                <Link to="/countries">
            <button className={f.backBtn} >Back to home</button>
            </Link>
            </div>
            <form className={f.formContainer} onSubmit={(e) => handleSubmit(e)}>
            <h1> New activity</h1>
            <div className={f.inputContainer} >
                <label className={f.label}> Name: </label>
                <input
                type="text"
                value={input.name}
                name="name"
                onChange={(e) => handleChange(e)}
                />
                {errors.name && <p className={f.errors}>{errors.name}</p>}
            </div>
            <div className={f.inputContainer}>
                <label className={f.label}> Difficulty: </label>
                <input
                type="radio"
                id="diff1"
                name="difficulty"
                value={1}
                onChange={(e) => handleCheckDif(e)}
                />
                <label htmlFor="diff1"> Begginer </label>
                <input
                type="radio"
                id="diff2"
                name="difficulty"
                value={2}
                onChange={(e) => handleCheckDif(e)}
                />
                <label htmlFor="diff2"> Amateur </label>
                <input
                type="radio"
                id="diff3"
                name="difficulty"
                value={3}
                onChange={(e) => handleCheckDif(e)}
                />
                <label htmlFor="diff3"> Normal </label>
                <input
                type="radio"
                id="diff4"
                name="difficulty"
                value={4}
                onChange={(e) => handleCheckDif(e)}
                />
                <label htmlFor="diff4"> Professional </label>
                <input
                type="radio"
                id="diff5"
                name="difficulty"
                value={5}
                onChange={(e) => handleCheckDif(e)}
                />
                <label htmlFor="diff5"> Expert </label>
                {errors.difficulty && <p className={f.errors}>{errors.difficulty}</p>}
            </div>
            <div className={f.inputContainer}>
                <label className={f.label}> Duration: </label>
                <input
                type="number"
                min="1"
                max="24"
                name="duration"
                value={input.duration}
                onChange={(e) => handleChange(e)}
                />
                hours.
                {errors.duration && <p className={f.errors}>{errors.duration}</p>}
            </div>
            <div className={f.inputContainer}>
                <label className={f.label}> Season: </label>
                <input
                type="radio"
                id="seasonChoice1"
                name="season"
                value={"Summer"}
                onChange={(e) => handleCheckSeason(e)}
                />
                <label htmlFor="seasonChoice1"> Summer </label>
                <input
                type="radio"
                id="seasonChoice2"
                name="season"
                value={"Autumn"}
                onChange={(e) => handleCheckSeason(e)}
                />
                <label htmlFor="seasonChoice2"> Autumn </label>
                <input
                type="radio"
                id="seasonChoice3"
                name="season"
                value={"Spring"}
                onChange={(e) => handleCheckSeason(e)}
                />
                <label htmlFor="seasonChoice3"> Spring </label>
                <input
                type="radio"
                id="seasonChoice4"
                name="season"
                value={"Winter"}
                onChange={(e) => handleCheckSeason(e)}
                />
                <label htmlFor="seasonChoice4"> Winter </label>
                {errors.season && <p className={f.errors}>{errors.season}</p>}
            </div>
            <div className={f.inputContainer}>
            <label className={f.label}> Countries: </label>
                <select onChange={(e) => handleSelect(e)} >
                {allCountries.map((c) => (
                    <option key={c.id} name={c.name} value={c.name}>
                    {c.name} 
                    </option>
                ))}
                </select>
                {errors.countries && <p className={f.errors}>{errors.countries}</p>}
            </div>
            {input.countries?.map((el) => (
            <div className={f.countriesNames} key={el}>
                <p>{el}</p>
                <button className={f.closeBtn} onClick={() => handleDelete(el)}> x </button>
            </div>
            ))}
            <div className={f.inputContainer}>
                <button className={f.submitBtn} disabled={handleDisabled()} > Create activity </button>
            </div>
            </form>
        </div>
      </>
    );
}