import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-modal'
import moment from 'moment'
import QRCode from 'qrcode.react'

import shelves from '../utils/Shelves'
import '../styles/BookDetail.css'

class BookDetail extends Component {
  returnDetailsInfo = book => {
    let detailsInfo = [];

    if(book.publisher !== undefined) {
      detailsInfo.push(book.publisher)
    }
    if(book.publishedDate !== undefined) {
      detailsInfo.push(moment(book.publishedDate).format("MMM, D YYYY"))
    }
    if(book.language !== undefined) {
      detailsInfo.push(book.language)
    }
    if(book.pageCount !== undefined) {
      detailsInfo.push(book.pageCount + " pages")
    }

    return detailsInfo.join(" - ")
  }

  render () {
    const { onClose, book, onMoveBook } = this.props
    const isValidBook = (book !== null && typeof book === 'object')
    if(!isValidBook) return null

    return (
      <Modal
        isOpen={ this.props.isOpen }
        contentLabel="Book detail"
      >
        <div className="detail-container">

          <div className="detail-header">
            <button className="detail-close" onClick={() => onClose()}>Close</button>
            <h1 className="detail-title">
              { book.title }
              <span className="detail-subtitle">{ book.subtitle }</span>
            </h1>
          </div>

          <div className="detail-content">

            <div className="detail-images">
              <div className="detail-cover"
                style={{ width: 128, height: 193, backgroundImage: `url(${(book.imageLinks !== undefined) ? book.imageLinks.thumbnail : ''})` }}
              ></div>

              {(book.canonicalVolumeLink !== undefined) && (
                <div className="detail-links">
                  <QRCode value={ book.canonicalVolumeLink } />

                  <a className="detail-link" target="_blank" href={ book.canonicalVolumeLink }>
                    More detail
                  </a>
                </div>
              )}
            </div>

            <div className="detail-detail">
              {Array.isArray(book.authors) &&
                <div className="detail-authors">{ book.authors.join(" | ") }</div>
              }
              <div className="detail-info">{ this.returnDetailsInfo(book) }</div>
              {Array.isArray(book.categories) &&
                <ul className="detail-categories">
                  {book.categories.map(category => (
                    <li key={ category }>{ category }</li>
                  ))}
                </ul>
              }
              <div className="detail-description">{ book.description }</div>
              <ul className="detail-shelves">
              <li><span className="detail-add">Add to MyReads:</span></li>
                {shelves.map(shelf => (
                  <li key={ shelf.key }>
                    <button
                      className={(book.shelf === shelf.key) ? "selected" : ""}
                      onClick={() => { onMoveBook(book, shelf.key) }}
                    >
                      { shelf.title }
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Modal>
    )
  }
}

BookDetail.propTypes = {
  book: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onMoveBook: PropTypes.func.isRequired,
}

export default BookDetail
