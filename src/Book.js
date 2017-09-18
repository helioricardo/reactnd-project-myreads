import React from 'react'
import PropTypes from 'prop-types'
import shelves from './Shelves'

const Book = props => {
  return (
    <div className="book">
      <div className="book-top">
        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${props.image})` }}></div>
            <div className="book-shelf-changer">
              <select
                value={ props.shelf }
                onChange={ (event) => props.onMoveBook(event.target.value) }>
                <option value="none" disabled>Move to...</option>
                {
                  shelves.map((shelf) => (
                    <option key={shelf.key} value={ shelf.key }>{ shelf.title }</option>
                  ))
                }
                <option value="none">None</option>
              </select>
            </div>
        </div>
      <div className="book-title">{ props.title }</div>
      <div className="book-authors">{ props.authors }</div>
    </div>
  )
}

Book.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  authors: PropTypes.string,
  shelf: PropTypes.string.isRequired,
  onMoveBook: PropTypes.func.isRequired
}

export default Book