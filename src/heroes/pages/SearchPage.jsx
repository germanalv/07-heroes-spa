import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm"
import { HeroCard } from "../components"
import  queryString from 'query-string'
import { getHeroesByName } from "../helpers";

export const SearchPage = () => {

  const navigate = useNavigate();
  const location = useLocation();

  //desustructuré el objeto que me devuelve queryString y me quedo solo con 'q'
  const { q = '' } = queryString.parse( location.search );

  const heroesSearch = getHeroesByName(q);

  const showSearch = (q.length === 0); 
  const showError = (q.length > 0) && (heroesSearch.length === 0); 
  
  //Desestructuro el objeto que me devuelve useForm
  const { searchText, onInputChange } = useForm({
    searchText: q
  });

  const onSearchSubmit = (event) => {
    event.preventDefault();
    if ( searchText.trim().length <= 1 ) return;

    navigate(`?q=${searchText}`)

  }

  return (
    <>
    
    <h1>Search</h1>
    <hr />

    <div className="row">
      <div className="col-5">

        <h4>Searching</h4>
        <hr />
        <form onSubmit={ onSearchSubmit }>
          <input 
            type="text" 
            placeholder="Search a hero"
            className="form-control"
            name="searchText"
            autoComplete="off"
            value={searchText}
            onChange={onInputChange}
          />

          <button className="btn btn-outline-primary mt-1">
            Search
          </button>
        </form>

      </div>

      <div className="col-7">
        <h4>Results</h4>
        <hr />

        {/* {
          ( q === '' ) 
          ? <div className="alert alert-primary">Search a hero</div>
          : heroesSearch.length === 0 && 
        } */}


        <div 
          className="alert alert-primary animate__animated animate__fadeIn" 
          style={{ display: showSearch ? '' : 'none' }}
        >
          Search a hero
        </div>

        <div 
          className="alert alert-danger animate__animated animate__fadeIn" 
          style={{ display: showError ? '' : 'none' }}
        >
          No a hero <b>{ q }</b>
        </div>

        {

          heroesSearch.map( hero => (
            <HeroCard key={hero.id} {...hero} />
          ))

        }

        {/* <HeroCard/> */}

      </div>

    </div>

    
    </>
  )
}
