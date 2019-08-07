/* @flow */

import React from 'react'
import './Labels.css'

export function LabelOutline(props: {type: string, children?: any}) {
    return (
        <i className={`tpp-lbl-outline tpp-lbl-outline-${props.type}`} {...props}>
            {props.children}
        </i>
    )
}

export function Label(props: {showMark: string}) {
    const marks = props.showMark.split(' ')
    if (marks.length === 1) {
        return <i className="tpp-lbl">{marks[0]}</i>
    } else {
        return(<i className="tpp-lbl-g">
            <i className="lbl-hdr">{marks[0]}</i>
            <i className="lbl">{marks[1]}</i>
        </i>)
    }
}
