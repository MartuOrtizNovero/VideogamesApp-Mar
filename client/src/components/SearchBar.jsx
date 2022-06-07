import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getVideogameByName } from '../redux/action/index';
import './SearchBar.css';

export default function SearchBar() {

    const dispatch = useDispatch()
    const [name, setName] = useState("")

    function handInputChange(e) {
        e.preventDefault();
        setName(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (Number(name)) {
            return alert("Name is invaled")
        }
        if (name.length > 0) {
            dispatch(getVideogameByName(name));
            setName('');
            e.target.reset()//????????????????
        } else {
            alert('type the name of any game!')
        }
    }
// porque pasa el submit en el form????

    return (
        <div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input
                    type='text'
                    placeholder="Write a videogame..."
                    onChange={(e) => handInputChange(e)} />
                <button className='botonSearch' type='submit'>Enter</button>
            </form>
        </div>
    )


}