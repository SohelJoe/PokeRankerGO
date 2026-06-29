import { useState, useEffect } from 'react'

import megaSvg from "../assets/mega.svg";
import substitute from "../assets/substitute.jpeg";
import shadowSvg from "../assets/shadow.svg";
import BestBuddyRibon from '../assets/bestBuddyRibbon.png';

const ImageBox = ({ id, form = null, name, className, megaClassName, shadowClassName, imgClassName, isBestBuddy = false, isShadow = false, w = 64, q = 75 }) => {
    const [loaded, setLoaded] = useState(false);

    const getFormToImage = () => {
        if (form == 'Ultra') {
            return '_f4';
        } else if (form == 'Fusion X') {
            return '_f2';
        } else if (form == 'Fusion Y') {
            return '_f3';
        } else if (form && form.includes('Mega')) {
            return '_' + form.toLowerCase().replace(' ', '_');
        } else if (['Hisuian', 'Galar'].includes(form)) {
            return '_' + form.toLowerCase();
        } else {
            return '';
        }
    }

    useEffect(() => {
        if (loaded != id) setLoaded(false);
    }, [id])


    return (<div className={`relative ${className}`}>
        {form && form.includes('Mega') && loaded && <img className={`absolute -z-999 ${w > 100 ? 'blur-sm' : 'blur-[2px]'} ${megaClassName}`} src={megaSvg} alt="Mega BG" />}
        {(!form || ['Hisuian', 'Galar'].includes(form)) && isShadow && <img className={`absolute -z-999 blur-[2px] ${shadowClassName}`} src={shadowSvg} alt="Shadow BG" />}
        <img className={loaded ? 'hidden' : imgClassName + ' opacity-75'} src={substitute} alt='Substitute' />
        <img className={!loaded ? 'hidden' : imgClassName} src={`https://db.pokemongohub.net/_next/image?url=%2Fimages%2Fofficial%2Ffull%2F${('000' + id).slice(-3)}${getFormToImage()}.webp&w=${w}&q=${q}`} alt={name} onLoad={() => setLoaded(id)} />
        {isBestBuddy && <img className='absolute h-[17.6%] min-h-4 bottom-[2%] left-[2%] opacity-90 z-99' src={BestBuddyRibon} alt="Best Buddy Ribbon" />}
    </div>)
}

export default ImageBox