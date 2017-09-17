import React from 'react'
import Route from 'react-router-dom/Route'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookList from './BookList'
import BooksSearch from './BooksSearch'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  moveBook = (book, shelf) => {
    // TODO save to API

    book.shelf = shelf
    this.setState(prevState => ({
      books: prevState.books.map(b => {
        if(b.id === book.id) return book
        return b
      })
    }))
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => this.setState({ books }))
  }

  render() {
    return (
      <div className="app">
        <Route
          exact path="/"
          render={() => (
            <BookList
              books={ this.state.books }
              title={ "MyReads by @helioricardo" }
              onMoveBook={ this.moveBook }
            />
          )}
        />
        <Route
          path="/add"
          component={BooksSearch}
        />
      </div>
    )
  }
}

export default BooksApp
