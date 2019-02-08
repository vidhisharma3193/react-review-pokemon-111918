import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import { Search } from 'semantic-ui-react'
import _ from 'lodash'

class PokemonPage extends React.Component {
 constructor(){
   super()
   this.state = {
     pokemons: [],
     searchValue: ""
   }

 }

 componentDidMount(){
   fetch("http://localhost:3000/pokemon")
   .then(res => res.json())
   .then(pokemons1 => this.setState({
     pokemons: pokemons1
    //  pokemons: pokemons1.map(pokemon => {return {...pokemon, front:true}})
   }))
 }

 handleSearch = (value) => {

  this.setState({
    searchValue: value
  })

 }

 addPokemon = (pokemon) => {
   this.setState({
    pokemons: [...this.state.pokemons, pokemon]
   })

 }



  render() {
    let searchPokemons = this.state.pokemons.filter(pokemon => pokemon.name.includes(this.state.searchValue))
    console.log(searchPokemons)
    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <br />
        <Search onSearchChange={_.debounce((e, value) => {this.handleSearch(value.value)}, 500)} showNoResults={false} />
        <br />
        <PokemonCollection allPokemons={searchPokemons}/>
        <br />
        <PokemonForm addPokemon={this.addPokemon}/>
      </div>
    )
  }
}

export default PokemonPage
