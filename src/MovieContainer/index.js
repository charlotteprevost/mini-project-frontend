import React, { Component } from 'react';
import CreateMovie from '../CreateMovie';
import MovieList from '../MovieList';
import EditMovie from '../EditMovie';
import { Grid, Form, Button, Segment } from 'semantic-ui-react';
import Cookie from 'js-cookie';

class MovieContainer extends Component {
  constructor(){
    super();

    this.state = {
      movies: [],
      search : '', 
      movieToEdit: {
        title: '',
        release_date: '',
        synopsis: '',
        created_by: null,
        id: ''
      },
      showEditModal: false
    }
  }


  getMovies = async () => {

    const cookie = Cookie('csrftoken');

    const movies = await fetch('http://localhost:8000/movies', {
      'credentials': 'include',
      headers: {
        'X-CSRFToken': cookie
      }
    });

    const moviesParsed = movies.json();
    return moviesParsed;
  }


  componentDidMount(){

    this.getMovies().then(movies => {

      this.setState({movies: movies.data});

    }).catch(err => {
      console.error(`Error: `, err);
    })
  }


  addMovie = async (movie, e) => {
    // .bind arguments take presidence over every other argument
    e.preventDefault();

    const cookie = Cookie('csrftoken');
    movie.release_date = parseInt(movie.release_date);

    try {
      const newMovie = await fetch('http://localhost:8000/movies/', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(movie),
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': cookie
        }
      })

      const newMovieParsed = await newMovie.json();

      this.setState({movies: [...this.state.movies, newMovieParsed.data]});

    } catch(err) {
      console.error(`Error: `, err);
    }
    // request address will start with 'http://localhost:9000'
    // Set up your post request with fetch, Maybe lookup how do i do post request with fetch,
    // headers: {'Content-Type': 'application/json'}
    // becuase after we create it, we want to add it to the movies array
  }


  deleteMovie = async (id) => {

    const cookie = Cookie('csrftoken');

    try {

      await fetch('http://localhost:8000/movies/' + id + '/', {
        method: 'DELETE',
        'credentials': 'include',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': cookie
        }
      })

    this.setState({movies: this.state.movies.filter(movie => movie.id !== id)})

    } catch(err){
      console.error(`Error: `, err);
    }
  }


  handleEditChange = (e) => {
    this.setState({movieToEdit: {...this.state.movieToEdit, [e.currentTarget.name]: e.currentTarget.value} });
  }


  closeAndEdit = async (e) => {

    e.preventDefault();

    try {
      const cookie = Cookie('csrftoken');

      const movieToEdit = await fetch('http://localhost:8000/movies/' + this.state.movieToEdit.id + '/', {
        method: 'PUT',
        credentials: 'include',
        body: JSON.stringify({
          title: this.state.movieToEdit.title,
          release_date: parseInt(this.state.movieToEdit.release_date),
          synopsis: this.state.movieToEdit.synopsis
        }),
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': cookie
        }
      })

      const movieToEditParsed = await movieToEdit.json();

      const newMovieArrayWithEdit = this.state.movies.map((movie) => {

        if(movie.id === movieToEditParsed.data.id){
          movie = movieToEditParsed.data
        }

        return movie
      });

      this.setState({
        showEditModal: false,
        movies: newMovieArrayWithEdit
      });


    } catch(err){
      console.error(`Error: `, err);
    }

  }


  openAndEdit = (movieFromTheList) => {
    this.setState({
      showEditModal: true,
      movieToEdit: {
        ...movieFromTheList
      }
    })
  }


  handleSearchChange = (e) => {
    this.setState({ search: e.currentTarget.value });
  }


  render(){
    return (
      <Grid columns={2} divided textAlign='center' style={{ height: '100%' }} verticalAlign='top' stackable>
        <Grid.Row>
          <Grid.Column>
            <CreateMovie addMovie={this.addMovie}/>

            <Segment>
              <Form onSubmit={this.handleSearchChange}>
                <Form.Input type='text' name='search' value={this.state.search} onChange={this.handleSearchChange}/>
                <Button type='Submit'>Search</Button>
              </Form>
            </Segment>

          </Grid.Column>

          <Grid.Column>
            <MovieList movies={this.state.movies} deleteMovie={this.deleteMovie} openAndEdit={this.openAndEdit}/>
          </Grid.Column>
          <EditMovie open={this.state.showEditModal} movieToEdit={this.state.movieToEdit} handleEditChange={this.handleEditChange} closeAndEdit={this.closeAndEdit}/>
        </Grid.Row>

      </Grid>
      )
  }
}

export default MovieContainer;
