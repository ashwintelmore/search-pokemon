import React, { useEffect, useState } from "react";

export const BookmarkContext = React.createContext({});

export const BookmarkProvider = (props) => {
    const [card, setCard] = useState({});
    const [loading, setLoading] = useState(false);

    // useEffect(() => {
    //     const cardStorage = localStorage.getItem("_id");

    //     async function fetchData() {
    //         // setLoading(true)
    //         const res = await getcard(cardStorage);
    //         if (res.error) {
    //             setCard({})
    //             setLoading(false)

    //         } else if (res.payload) {
    //             setCard(res.payload)
    //             setLoading(false)
    //         }
    //     }
    //     if (cardStorage) {
    //         fetchData();
    //     }
    // }, []);

    return (
        <BookmarkContext.Provider value={{ card, setCard, loading, setLoading }}>
            {props.children}
        </BookmarkContext.Provider>
    );
};

export const useBookmark = () => React.useContext(BookmarkContext);
