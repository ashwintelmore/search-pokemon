import React from 'react';

function BookmarkIcon({ isBookmarked, onClick }) {
    return (
        <div onClick={onClick}>
            {isBookmarked ? 'Bookmarked' : 'Not Bookmarked'}
        </div>
    );
}

export default BookmarkIcon;
