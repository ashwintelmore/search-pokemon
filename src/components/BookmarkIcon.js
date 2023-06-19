import React from 'react';

function BookmarkIcon({ isBookmarked, onClick }) {
    return (
        <div onClick={onClick}>
            {isBookmarked ? <i class="fa-solid fa-bookmark"></i> : <i class="fa-regular fa-bookmark"></i>}
        </div>
    );
}

export default BookmarkIcon;
