import React from 'react'
import { NavLink } from 'react-router-dom'

export const Header = () => ({

    render() {
        return (
            <header>
                <nav>
                    <ul>
                        <li><NavLink to='/'>Weather</NavLink></li>
                        <li><NavLink to='/manage'>Manage</NavLink></li>
                    </ul>
                </nav>
            </header>
        )
    }
});
