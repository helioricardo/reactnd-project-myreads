import React from 'react'
import Route from 'react-router-dom/Route'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BooksList from './BooksList'
import BooksSearch from './BooksSearch'

class BooksApp extends React.Component {
  state = {
    books: [],
    searchResults: []
  }

  updateBooks = () => {
    BooksAPI.getAll().then(books => this.setState({ books }))
  }

  moveBook = (book, shelf) => {
    BooksAPI
      .update(book, shelf)
      .then(() => BooksAPI.get(book.id))
      .then(updatedBook => {
        if(updatedBook.shelf === "none") {
          this.setState(prevState => ({
            books: prevState.books.filter(book => (book.id !== updatedBook.id))
          }))
        } else {
          this.setState(prevState => ({
            books: prevState.books.map(book => (
              (book.id === updatedBook.id) ? updatedBook : book
            ))
          }))
        }
      })
  }

  searchBooks = (query) => {
    BooksAPI
      .search(query, 20)
      .then(searchResults => {
        console.log(searchResults)
        if(searchResults.error) {
          this.setState({ searchResults: [] })
          return
        }
        this.setState({ searchResults })
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
          render={({ history }) => (
            <BooksSearch
              searchResults={ this.state.searchResults }
              onSearchBooks={ this.searchBooks }
              onMoveBook={(book, shelf) => {
                this.moveBook(book, shelf)
                history.push('/')
              }}
            />
          )}
        />
      </div>
    )
  }
}

export default BooksApp
