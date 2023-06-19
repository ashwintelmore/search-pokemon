import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
    return (
        <div className='flex justify-between'>
            <h1 className='text-center text-5xl my-7 font-bold'>Pokemon Search</h1>
            <Link
                to={'/'}
            >
                Search
            </Link>
            <Link
                to={'/bookmarks'}
            >
                bookmarks
            </Link>
        </div>
    )
}

export default Header