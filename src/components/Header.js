import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
    return (
        <div className='flex justify-between items-center'>
            <h1 className='text-center text-5xl my-7 font-bold'>Pokemon Search</h1>
            <Link
                to={'/'}
            >
                Search
            </Link>
            <Link
                to={'/bookmarks'}
            >
                <i class="fa-solid fa-bookmark"></i> Bookmarks
            </Link>
        </div>
    )
}

export default Header