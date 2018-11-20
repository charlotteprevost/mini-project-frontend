import React from 'react';
import { Card, Button } from 'semantic-ui-react';


const MoviesList = (props) => {
  const movies = props.movies.map((movie, i) => {
    return (
      <Card key={movie.id}>
        <Card.Content>
          <Card.Header>{movie.title}</Card.Header>
          <Card.Description>{movie.synopsis}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button color="green" onClick={props.openAndEdit.bind(null, movie)}>Edit Movie</Button>
          <Button color="red" onClick={props.deleteMovie.bind(null, movie.id)}>Delete Movie</Button>
        </Card.Content>
      </Card>
      )
  })

  return (
    <div>
      <h3>MoviesList</h3>
      <Card.Group className="centered">
        {movies}
      </Card.Group>
    </div>
    )
}


export default MoviesList;
