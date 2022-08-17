import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGames, getGenres, filterBySource, sortByName, sortByRating, filterByGenres} from '../redux/action/index';
import Pagination from "./Pagination";
import Cards from "./Cards";
import SearchBar from "./SearchBar";
import './Home.css';
import loading from './images/cargador.png.gif'


export default function Home() {
    const dispatch = useDispatch();
    const allVideoGames = useSelector((state) => state.videogames);
    const genres = useSelector((state) => state.genres);
    const [, setOrder] = useState('');

    //---------------------------------------PAGINADO--------------------------------------------------------------------

    const [currentPage, setCurrentPage] = useState(1);
    const [vgPerPage] = useState(15);
    const indexOfLastVg = currentPage * vgPerPage;//1 * 15 = 15
    const indexOfFirstVg = indexOfLastVg - vgPerPage;// 15 - 15 = 0
    const currentVg = allVideoGames.slice(indexOfFirstVg, indexOfLastVg);// 0 al 15 te toma hasta el 14

    const paginado = (pageNumber) => setCurrentPage(pageNumber);

    useEffect(() => {
        setCurrentPage(1)
    }, [allVideoGames])

    useEffect(() => {
        dispatch(getGames())
        dispatch(getGenres())
    }, [dispatch]);


    function handleClick(e) {
        e.preventDefault();
        dispatch(getGames());
    }

    function handleFilterBySource(e) {
        e.preventDefault();
        dispatch(filterBySource(e.target.value))
    }

    function handleFilterByGenres(e) {
        e.preventDefault();
        dispatch(filterByGenres(e.target.value));
    }

    /* function handleFilterByAge(e) {
        e.preventDefault();
        dispatch(filterByAge(e.target.value))

    } */

    function handleSortByName(e) {
        e.preventDefault();
        dispatch(sortByName(e.target.value));
        setCurrentPage(1);
        setOrder(`${e.target.value}`)
    }

    function handleSortByRating(e) {
        e.preventDefault();
        dispatch(sortByRating(e.target.value));
        setCurrentPage(1);
        setOrder(`${e.target.value}`);
    }

    return (
        <div className="todo">

            <div className='top_nav'>
                <h1 className="home_title">Videogame App</h1>
                <Link className="link" to="/">START</Link>
                <Link className="link_create" to="/videogames">Create Videogame</Link>
                <button className="btn_reload" onClick={(e) => { handleClick(e) }}>Reset all Videogames</button>
                <SearchBar />
            </div>

            <div className='filters'>

                <select onChange={(e) => handleFilterBySource(e)} defaultValue='Filter By Source'>
                    <option disabled>Filter By Source</option>
                    <option value="All">All</option>
                    <option value="Api">Api</option>
                    <option value="Created">Created</option>
                </select>

                {/* <select onChange={(e) => handleFilterByAge(e)} defaultValue='Filter By Age'>
                    <option disabled>Filter By Age</option>
                    <option value="dieciocho">18 a 28</option>
                    <option value="veintiocho">28 a 38</option>
                    <option value="treintiocho">38 a 48</option>
                    <option value="cuarentiocho">48 a 58</option>
                    <option value="cincuentiocho">58 a 68</option>
                    <option value="sesentiocho">68 a 78</option>
                    <option value="setentiocho">78 a 88</option>
                    <option value="ochentiocho">88 a 98</option>
                </select>
 */}
                <select onChange={(e) => handleFilterByGenres(e)} defaultValue='Filter By Genre'>
                    <option disabled>Filter By Genre</option>
                    <option value="All">All Genres</option>
                    {genres.map((genres) => (
                        <option value={genres.name} key={genres.id}>
                            {genres.name}
                        </option>
                    ))}
                </select>

                <select onChange={e => handleSortByName(e)} defaultValue='Sort By Name'>
                    <option disabled>Sort By Name</option>
                    <option value="asc">From A to Z</option>
                    <option value="desc">From Z to A</option>
                </select>

                <select onChange={e => handleSortByRating(e)} defaultValue='Sort By Rating'>
                    <option disabled>Sort By Rating</option>
                    <option value="lower-rating">Lower Rating</option>
                    <option value="higher-rating">Higher Rating</option>
                </select>
            </div>

            <Pagination
                vgPerPage={vgPerPage}
                allVideoGames={allVideoGames.length}
                paginado={paginado}
            />
            <hr color='#91fcf8' />

            <div className="cardss">
                {currentVg.length > 0 ? currentVg.map((g) => {
                    return (
                        <Cards
                            key={g.id}
                            id={g.id}
                            name={g.name}
                            img={g.img ? g.img : g.img}
                            genres={g.genres}
                            platforms={g.platforms}
                            rating={g.rating}
                        />
                    );
                }) : <div className="loading_container">
                    <img src={loading} className='loadingC' height={375} width={425} alt="loading please wait" />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                </div>
                }
            </div>

        </div>
    )
}
