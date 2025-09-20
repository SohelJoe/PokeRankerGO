import { useState, useEffect } from 'react'
import { Link, useParams, useSearchParams, useNavigate } from "react-router";

// Components
import ImageBox from '../Components/ImageBox';
import MonIdType from '../Components/MonIdType';
import MonIvSelector from '../Components/MonIvSelector';
import MonRankingBox from '../Components/MonRankingBox';
// Functions
import { getMonFromDex, updateMonData } from '../utils/pokeDexFunctions.js';
import { calculateCP, calculateRankByLeauge, getMonByKey } from '../utils/monFunctions';
// React Icons
import { MdOutlineCancel } from "react-icons/md";
import { MdOutlineCheckCircle } from "react-icons/md";


const UpdateMon = () => {
    const { monKey } = useParams();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const monDexIndex = parseInt(searchParams.get('index'));

    const [monDexData, setMonDexData] = useState(null);


    const { name, id, form, type1, type2, base } = getMonByKey(monKey);
    // console.log([monKey, name, id, form, type1, type2, base]);


    const updateStats = (newStats) => {
        setMonDexData(e => ({
            ...e,
            ...newStats
        }))
    }

    const toggleBestBuddy = () => {
        setMonDexData((e) => ({
            ...e,
            isBestBuddy: !e.isBestBuddy,
            lv: (e.isBestBuddy && e.lv == 51) ? 50 : e.lv
        }))
    }

    const toggleShadowMon = () => {
        if (!form || ['Hisuian', 'Galar'].includes(form)) {
            setMonDexData((e) => ({
                ...e,
                isShadow: !e.isShadow
            }))
        }
    }

    const updateLevelBar = ({ target }) => {
        setMonDexData((e) => ({
            ...e,
            lv: target.value
        }))
    }

    const selectedMonCP = monDexData && calculateCP(base.atk + monDexData.attack, base.def + monDexData.defense, base.hp + monDexData.hp, (monDexData.lv - 1) * 2);
    const ranking = monDexData && { [monKey]: calculateRankByLeauge(base.atk, base.def, base.hp, monDexData.isBestBuddy ? 51 : 50, (monDexData.attack + '.' + monDexData.defense + '.' + monDexData.hp)) }

    const handleMonUpdate = () => {
        // (key, index, stats, isShadow, isBestBuddy, rank)
        updateMonData(
            monKey,
            monDexIndex,
            {
                attack: monDexData.attack,
                defense: monDexData.defense,
                hp: monDexData.hp,
                lv: monDexData.lv,
                cp: selectedMonCP
            },
            monDexData.isShadow,
            monDexData.isBestBuddy,
            {
                GreatLeague: ranking[monKey].GreatLeague.rank,
                UltraLeague: ranking[monKey].UltraLeague.rank,
                MasterLeague: ranking[monKey].MasterLeague.rank
            }
        );

        navigate("/pokedex", { replace: true })
    }

    useEffect(() => {
        // console.log('Effect ran. ' + 'Mon Key: ' + monKey + ', Dex Index: ' + monDexIndex);
        const { attack, defense, hp, isBestBuddy, isShadow, lv, rank } = getMonFromDex(monKey, parseInt(searchParams.get('index')));

        setMonDexData({ attack, defense, hp, isBestBuddy, isShadow, lv });

    }, [monKey, monDexIndex])


    return monDexData && <div className='max-w-4xl relative mx-auto'>
        <div className="relative p-1 2xs:p-2 md:p-3 xl:p-4 border-2 border-sky-600 bg-sky-50 dark:border-sky-600/60 dark:bg-sky-700/10 rounded-2xl overflow-hidden">
            <div className='flex items-center xs:items-stretch sm:items-center relative z-0'>
                <ImageBox id={id} form={form} name={name} className="mr-2" megaClassName="w-full max-w-2/3 left-[50%] -translate-x-[50%] opacity-40" shadowClassName="w-full max-w-3/4 left-[50%] -translate-x-[50%] opacity-70 dark:opacity-60 bottom-[15%]" imgClassName="w-full aspect-square h-max" isBestBuddy={monDexData.isBestBuddy} isShadow={monDexData.isShadow} w="256" />
                <div className='font-semibold w-full max-w-7/10'>
                    <span className='text-xs xl:text-sm leading-none text-gray-500/80 dark:text-gray-500'>Update Selected Pokémon</span>
                    <div className='flex relative gap-1.25 sm:gap-2 items-baseline pb-1.75 before:absolute before:block before:w-full before:h-0.5 before:bg-linear-to-r before:from-gray-800/60 dark:before:from-gray-200/60 before:from-30% before:to-transparent before:z-[1] before:left-0.25 before:bottom-0 before:rounded-l-full mb-2'>
                        <h2 className='text-3xl xl:text-4xl leading-none text-sky-700 dark:text-sky-600 font-bold'>
                            {name}
                        </h2>
                    </div>

                    <MonIvSelector stats={{ attack: monDexData.attack, defense: monDexData.defense, hp: monDexData.hp }} setStats={updateStats} />
                </div>
            </div>

            <div className='relative flex items-center before:absolute'>
                <MonIdType id={id} type1={type1} type2={type2} className='flex w-full max-w-3/10 justify-center align-middle items-center gap-1' idClassName="mr-1 md:mr-2 text-xl md:text-2xl" typeClassName="w-full max-w-1/7" />
                <div className="text-center max-w-7/10 grow-1 text-gray-400 dark:text-gray-200/50 font-semibold gap-1">
                    <p className='min-w-fit text-xs 2xs:text-sm mb-0.5'> Species Base Stats </p>
                    <p className='max-w-fit text-sm 2xs:text-base flex gap-0.5 justify-center flex-wrap leading-[1.15] mx-auto'>
                        <span className='whitespace-nowrap'>Attack: <span className='text-gray-800 dark:text-gray-200'>{base.atk}{monDexData.attack > 0 && '+' + monDexData.attack}</span> |</span>
                        <span className='whitespace-nowrap'>Defense: <span className='text-gray-800 dark:text-gray-200'>{base.def}{monDexData.defense > 0 && '+' + monDexData.defense}</span> |</span>
                        <span className='whitespace-nowrap'>Stamina: <span className='text-gray-800 dark:text-gray-200'>{base.hp}{monDexData.hp > 0 && '+' + monDexData.hp}</span></span>
                    </p>
                </div>
            </div>

            <div className="mt-3 relative before:block before:w-full before:h-0.5 before:bg-gradient-to-r before:from-transparent before:via-gray-800/50 dark:before:via-gray-200/50 before:to-transparent before:z-[1] before:left-0.25 before:bottom-0 before:rounded-l-full">
                <div className='flex flex-col-reverse gap-2.5 2xs:flex-row 2xs:gap-0 items-center mt-3'>
                    <div className='flex gap-2 justify-around 2xs:justify-start sm:gap-4 w-full ml-1 text-lg font-semibold text-gray-500 dark:text-gray-100/60'>
                        <h4 className='w-20 sm:w-22'>Level: <span className='text-gray-800 dark:text-gray-200'>{monDexData.lv}</span></h4>
                        <h4>CP: <span className='text-gray-800 dark:text-gray-200'>{selectedMonCP}</span></h4>
                    </div>
                    <div className='flex min-w-max items-center gap-1.5'>
                        {(!form || ['Hisuian', 'Galar'].includes(form)) && <button className={`relative flex items-center gap-0.75 text-md z-0 pl-0.25 pr-3 pt-0 pb-0.25 border-2 border-sky-700 dark:border-sky-600/80 dark:hover:border-sky-600/90 rounded-full h-max cursor-pointer ${monDexData.isShadow ? 'text-white dark:text-white bg-sky-800/80 dark:bg-sky-600/70 hover:bg-sky-800 dark:hover:bg-sky-600/80' : 'text-sky-800 dark:text-sky-500/80 dark:hover:text-sky-500/90 bg-sky-300/20 dark:bg-sky-100/10 hover:bg-sky-300/30 dark:hover:bg-sky-200/10'} text-center uppercase font-semibold hover:drop-shadow-lg`} onClick={toggleShadowMon}>
                            {monDexData.isShadow ? <MdOutlineCheckCircle className='h-6 w-6 mt-0.25' /> : <MdOutlineCancel className='h-6 w-6 mt-0.25' />}
                            Shadow
                        </button>}
                        <button className={`relative flex items-center gap-0.75 text-md z-0 pl-0.25 pr-3 pt-0 pb-0.25 border-2 border-sky-700 dark:border-sky-600/80 dark:hover:border-sky-600/90 rounded-full h-max cursor-pointer ${monDexData.isBestBuddy ? 'text-white dark:text-white bg-sky-800/80 dark:bg-sky-600/70 hover:bg-sky-800 dark:hover:bg-sky-600/80' : 'text-sky-800 dark:text-sky-500/80 dark:hover:text-sky-500/90 bg-sky-300/20 dark:bg-sky-100/10 hover:bg-sky-300/30 dark:hover:bg-sky-200/10'} text-center uppercase font-semibold hover:drop-shadow-lg`} onClick={toggleBestBuddy}>
                            {monDexData.isBestBuddy ? <MdOutlineCheckCircle className='h-6 w-6 mt-0.25' /> : <MdOutlineCancel className='h-6 w-6 mt-0.25' />}
                            Best Buddy
                        </button>
                    </div>
                </div>
                <input className='w-full mt-3 sm:mt-2 lg:mt-1' type="range" min="1" max={monDexData.isBestBuddy ? 51 : 50} step={0.5} value={monDexData.lv} name="level" onChange={updateLevelBar} />
            </div>

            <MonRankingBox family={[monKey]} monFamily={{ [monKey]: [name, id, form, type1, type2, base.atk, base.def, base.hp] }} rankings={ranking} level={monDexData.lv} isShadow={monDexData.isShadow} />

            <div className="flex pt-2 mt-3 gap-2 font-semibold">
                <Link type='button' to="/pokedex" className="cursor-pointer text-center uppercase focus:outline-none px-4 py-1.75 rounded-md flex-1 bg-red-400/60 dark:bg-red-800/60 dark:hover:bg-red-800/80 hover:bg-red-400/80 hover:outline hover:outline-red-500 dark:hover:outline-red-700 text-red-800 dark:text-red-100/90 dark:hover:text-red-100">Cancel</Link>
                <button type='submit' className="cursor-pointer uppercase focus:outline-none px-4 py-1.75 rounded-md flex-1 bg-green-600/75 hover:bg-green-600/90 hover:outline hover:outline-green-700 dark:hover:outline-green-500/90 text-white" onClick={handleMonUpdate}>Update</button>
            </div>
        </div>
    </div>
}

export default UpdateMon