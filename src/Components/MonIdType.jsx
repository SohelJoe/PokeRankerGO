const MonIdType = ({ id, type1, type2, className, idClassName, typeClassName }) => {
    const typings = ['normal', 'fighting', 'flying', 'poison', 'ground', 'rock', 'bug', 'ghost', 'steel', 'fire', 'water', 'grass', 'electric', 'psychic', 'ice', 'dragon', 'dark', 'fairy']

    return <div className={className}>
        <h6 className={`'block leading-none max-h-max ${idClassName} font-bold text-sky-600 dark:text-sky-500`}>#{('000' + id).slice(-3)}</h6>
        {type1 && <img className={typeClassName} src={`https://db.pokemongohub.net/_next/image?url=%2Fimages%2Ficons%2Fico_${typings.indexOf(type1)}_${type1}.webp&w=32&q=75`} alt={type1} />}
        {type2 && <img className={typeClassName} src={`https://db.pokemongohub.net/_next/image?url=%2Fimages%2Ficons%2Fico_${typings.indexOf(type2)}_${type2}.webp&w=32&q=75`} alt={type2} />}
    </div>
}

export default MonIdType