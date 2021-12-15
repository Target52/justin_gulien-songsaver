import React from "react"

function InputFilter(props) {

    const genres = [...new Set(props.songs.map(item => item.genre))].sort(function (a, b) {
        let x = a.toLowerCase();
        let y = b.toLowerCase();
        if (x > y) { return 1; }
        if (x < y) { return -1; }
        return 0;
    })

    const ratings = [...new Set(props.songs.map(item => item.rating))].sort(function (a, b) {
        return a - b
    })

    return (
        <div>
            <h3>Filter:</h3>
            <label htmlFor="genre">Kies een Genre:</label>
            <select
                name="genre"
                id="genre"
                value={props.filter.genre}
                onChange={props.handleChangeFilter}
            >
                <option key="emptyGenre" value=''></option>
                {genres.map(item =>
                    <option key={item + genres.length + 1} value={item}>{item}</option>
                )}
            </select>
            <label htmlFor="rating">Kies een Rating:</label>
            <select
                name="rating"
                id="rating"
                onChange={props.handleChangeFilter}
                value={props.filter.rating}
            >
                <option key="emptyRating" value=''></option>
                {ratings.map(item =>
                    <option key={item + ratings.length + 1} value={item}>{item}</option>
                )}
            </select>
        </div >
    )
}

export default InputFilter