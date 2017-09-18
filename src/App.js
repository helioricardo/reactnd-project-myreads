import React from 'react'
import Route from 'react-router-dom/Route'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BooksList from './BooksList'
import BooksSearch from './BooksSearch'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  updateBooks = () => {
    BooksAPI.getAll().then(books => this.setState({ books }))
  }

  moveBook = (book, shelf) => {
    BooksAPI
      .update(book, shelf)
      .then(() => BooksAPI.get(book.id))
      .then(book => {
        this.setState(prevState => ({
          books: prevState.books.map(actualBook => (
            (actualBook.id === book.id) ? book : actualBook
          ))
        }))
      })
  }

  componentDidMount() {
    this.updateBooks();
  }

  render() {
    return (
      <div className="app">
        <Route
          exact path="/"
          render={() => (
            <BooksList
              books={ this.state.books }
              title={ "MyReads by @helioricardo" }
              onMoveBook={ this.moveBook }
            />
          )}
        />
        <Route
          path="/search"
          component={BooksSearch}
        />
      </div>
    )
  }
}

export default BooksApp
