import React, { useEffect, useState } from "react";

export const BookmarkContext = React.createContext({});

export const BookmarkProvider = (props) => {
    const [bookmarks, setbookmarks] = useState([]);
    const [loading, setLoading] = useState(false);


    return (
        <BookmarkContext.Provider value={{ bookmarks, setbookmarks, loading, setLoading }}>
            {props.children}
        </BookmarkContext.Provider>
    );
};

export const useBookmark = () => React.useContext(BookmarkContext);
