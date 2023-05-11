import React, {useEffect, useState} from 'react'
import {Link} from "wouter";
import Moment from 'moment';



export default function Inicio () {
    const auxval = `/lista_medicos`; //slash para que no se mezcle el id con lo de antes
    return(
        <div className='inicio'>
            <Link to={auxval}>
            <button type="button" class="btn btn-primary bigbtn">WIP Log in </button>
            </Link>
        </div>

    );
}