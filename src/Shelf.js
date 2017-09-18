import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

const Shelf = ({ shelf, books, onMoveBook, onBookDetail }) => (
  <div className="bookshelf">
    <h2 className="bookshelf-title">{ shelf.title }</h2>
    <div className="bookshelf-books">
      <ol className="books-grid">
        {
          books.map((book) => (
            <li key={ book.id }>
              <Book
                shelf={ book.shelf }
                image={ book.imageLinks.thumbnail }
                title={ book.title }
                authors={ (Array.isArray(book.authors)) ? book.authors.join(", ") : null }
                onMoveBook={shelf => onMoveBook(book, shelf) }
                onBookDetail={() => onBookDetail(book)}
              />
            </li>
          ))
        }
      </ol>
    </div>
  </div>
)

Shelf.propTypes = {
  shelf: PropTypes.object.isRequired,
  books: PropTypes.array.isRequired,
  onMoveBook: PropTypes.func.isRequired,
  onBookDetail: PropTypes.func.isRequired
}

export default Shelf