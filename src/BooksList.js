import React from 'react'
import PropTypes from 'prop-types'
import Link from 'react-router-dom/Link'
import Shelf from './Shelf'
import shelves from './Shelves'

const BooksList = ({ books, title, onMoveBook }) => {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>{ title }</h1>
      </div>
      <div className="list-books-content">
        <div>
          {
            shelves.map(shelf => (
              <Shelf
                key={ shelf.key }
                shelf={ shelf }
                onMoveBook={ onMoveBook }
                books={
                  books.filter(book => book.shelf === shelf.key)
                }
              />
            ))
          }
        </div>
      </div>
      <div className="open-search">
        <Link to="/add">Add a book</Link>
      </div>
    </div>
  )
}

BooksList.propTypes = {
  books: PropTypes.array.isRequired,
  title: PropTypes.string,
  onMoveBook: PropTypes.func.isRequired
}

export default BooksList