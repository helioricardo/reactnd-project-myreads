import React from 'react'
import PropTypes from 'prop-types'
import Link from 'react-router-dom/Link'
import Book from './Book'

class BooksSearch extends React.Component {
  state = {
    query: ''
  }

  handleChange = event => {
    const { onSearchBooks } = this.props
    const query = event.target.value

    this.setState({ query })
    onSearchBooks(query)
  }

  render = () => {
    const { searchResults, onMoveBook } = this.props

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={ this.state.query }
              onChange={ this.handleChange }
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {searchResults.map(book => (
              <li key={ book.id }>
                <Book
                  shelf={ book.shelf }
                  image={ book.imageLinks.thumbnail }
                  title={ book.title }
                  authors={ (Array.isArray(book.authors)) ? book.authors.join(", ") : null }
                  onSearchPage
                  onMoveBook={shelf => onMoveBook(book, shelf) }
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

BooksSearch.propTypes = {
  searchResults: PropTypes.array,
  onSearchBooks: PropTypes.func.isRequired,
  onMoveBook: PropTypes.func.isRequired
}

export default BooksSearch