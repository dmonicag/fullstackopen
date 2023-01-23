import CountryInfo from "./CountryInfo";

const CountryForm = ({handleSearch, results, show_info}) => {
    return (
        <div>
            <h2>Find Countries: </h2>
            <input onChange={handleSearch}></input>
            <ul>
            {
                results.countries_list.length > 10 ?
                (<p>Too many countries to list. Specify name</p>)
                :
                results.countries_list.length !== 1 ?

                results.countries_list.map((r) => (<li>{r.name.common}
                                                        <button value={r.ccn3} onClick={show_info}>Show</button></li>)) 
                :
                results.countries_list.map((r) => (<CountryInfo country_info={r}/>) )
                
            }

            </ul>
        </div>
    )
}

export default CountryForm;