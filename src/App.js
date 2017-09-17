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

  updateBooks = () => {
    BooksAPI.getAll().then(books => this.setState({ books }))
  }

  moveBook = (book, shelf) => {
    BooksAPI
      .update(book, shelf)
      .then(() => this.updateBooks())
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
