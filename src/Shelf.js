import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

const Shelf = ({ shelf, books, onMoveBook }) => {
  return (
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
                  authors={ book.authors.join(", ") }
                  onMoveBook={shelf => onMoveBook(book, shelf) }
                />
              </li>
            ))
          }
        </ol>
      </div>
    </div>
  )
}

Shelf.propTypes = {
  shelf: PropTypes.object.isRequired,
  books: PropTypes.array.isRequired,
  onMoveBook: PropTypes.func.isRequired
}

export default Shelf