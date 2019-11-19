import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

export default function TodoHeader(props) {
    return (
        <Fragment>
            <h1>{props.children}</h1>
            <h3>{props.desc}</h3>
        </Fragment>
    )
}

TodoHeader.propTypes = {
    desc: PropTypes.string.isRequired,
}
TodoHeader.defaultProps = {
    children: "明天呢还事"
}