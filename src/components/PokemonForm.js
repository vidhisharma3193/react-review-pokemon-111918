import React from 'react'
import { Form } from 'semantic-ui-react'

class PokemonForm extends React.Component {
  constructor() {
    super()

    this.state = {
      name: '',
      hp: '',
      frontUrl: '',
      backUrl: ''
    }
  }

  handleSubmit = (e) => {
   this.setState({
    name: e.target.name.value,
    hp: e.target.hp.value,
    frontUrl: e.target.frontUrl.value,
    backUrl: e.target.backUrl.value
   }, () => this.postPokemon()) // because setState is Async function

  
  }

  postPokemon = () => {
    fetch("http://localhost:3000/pokemon",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        name: this.state.name,
        stats: [{name:"hp", value:this.state.hp}],
        sprites: {front: this.state.frontUrl, back: this.state.backUrl }

      })
    }
    )
    .then(res => res.json())
    .then(pokemon => this.props.addPokemon(pokemon))

  }

  render() {
    return (
      <div>
        <h3>Add a Pokemon!</h3>
        <Form onSubmit={(e) => this.handleSubmit(e)}>
          <Form.Group widths="equal">
            <Form.Input fluid label="Name" placeholder="Name" name="name" />
            <Form.Input fluid label="hp" placeholder="hp" name="hp" />
            <Form.Input fluid label="Front Image URL" placeholder="url" name="frontUrl" />
            <Form.Input fluid label="Back Image URL" placeholder="url" name="backUrl" />
          </Form.Group>
          <Form.Button>Submit</Form.Button>
        </Form>
      </div>
    )
  }
}

export default PokemonForm
