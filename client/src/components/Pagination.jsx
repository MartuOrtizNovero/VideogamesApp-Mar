import React from 'react';
import './Pagination.css';

export default function Pagination({ vgPerPage, allVideoGames, paginado }) {
    const pageNumber = [];

    for (let i = 1; i <= Math.ceil(allVideoGames / vgPerPage); i++) {
        pageNumber.push(i);
    };

    return (
        <nav>
            <ul className="paginado">
                {pageNumber &&
                    pageNumber.map(number => (
                        <li className="li" key={number}>
                            <button className="boton" onClick={() => paginado(number)}>{number}</button>
                        </li>
                    ))}
            </ul>
        </nav>
    );
};