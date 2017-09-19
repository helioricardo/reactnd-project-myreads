import React from 'react'
import PropTypes from 'prop-types'

import '../styles/Loading.css'

const Loading = ({ loading }) => (
  <div
    className={(loading) ? "loading-backdrop loading-on" : "loading-backdrop"}
  >
    <div className="loading-box">
      <div className="loading-spinner"></div>
    </div>
  </div>
)

Loading.propTypes = {
  loading: PropTypes.bool.isRequired
}

export default Loading