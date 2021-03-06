import React from 'react'
import PropTypes from 'prop-types'

import shelves from '../utils/Shelves'

const Book = props => (
  <div className={(props.shelf !== "none" && props.onSearchPage) ? "book book-on-shelf" : "book"}>
    <div className="book-top">
      <button
        className="book-cover"
        onClick={() => props.onBookDetail()}
        style={{ width: 128, height: 193, backgroundImage: `url(${props.image})` }} />
          <div className="book-shelf-changer">
            <select
              value={ props.shelf }
              onChange={ (event) => props.onMoveBook(event.target.value) }>
              <option value="none" disabled>Move to...</option>
              {
                shelves.map((shelf) => (
                  <option key={ shelf.key } value={ shelf.key }>{ shelf.title }</option>
                ))
              }
              { !props.onSearchPage &&
                <option value="none">None</option>
              }
            </select>
          </div>
      </div>
    <div className="book-title">{ props.title }</div>
    <div className="book-authors">{ props.authors }</div>
  </div>
)

Book.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string.isRequired,
  authors: PropTypes.string,
  shelf: PropTypes.string.isRequired,
  onMoveBook: PropTypes.func.isRequired,
  onSearchPage: PropTypes.bool,
  onBookDetail: PropTypes.func.isRequired
}

export default Book