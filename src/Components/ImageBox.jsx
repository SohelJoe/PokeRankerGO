import React, { useState, useEffect } from 'react'

import megaSvg from "../assets/mega.svg";
import substitute from "../assets/substitute.jpeg";

const ImageBox = ({ id, form = null, name, className, megaClassName, imgClassName, w = 64, q = 75 }) => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (loaded != id) setLoaded(false);
    }, [id])


    return (<div className={`relative ${className}`}>
        {form && form.includes('Mega') && loaded && <img className={`absolute -z-999 ${megaClassName}`} src={megaSvg} alt="Mega BG" />}
        <img className={loaded ? 'hidden' : imgClassName + ' opacity-75'} src={substitute} alt='Substitute' />
        <img className={!loaded ? 'hidden' : imgClassName} src={`https://db.pokemongohub.net/_next/image?url=%2Fimages%2Fofficial%2Ffull%2F${('000' + id).slice(-3)}${form == 'Mega Y' ? '_f3' : ['Hisuian', 'Galar'].includes(form) ? '_' + form.toLowerCase() : form ? '_f2' : ''}.webp&w=${w}&q=${q}`} alt={name} onLoad={() => setLoaded(id)} />
    </div>)
}

export default ImageBox