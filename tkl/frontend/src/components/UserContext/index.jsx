"use client";

import React, { Component, createContext, useState } from 'react'

const UContext = createContext();

export default class UserContext extends Component {
    constructor() {
        super()
        this.state = {}
    }
    render() {
        const {children} = this.props
        return (
        <UContext.Provider 
            value={{
                context: this.state,
                setContext: (value, callback = null) => {
                    if (callback) {
                        this.setState(value, callback)
                    } else this.setState(value)
                }
            }}
        >
            {children}
        </UContext.Provider>
        )
    }
}

export {UContext}
