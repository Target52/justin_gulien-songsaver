import React from "react"

function ListItem(props) {
    const song = props.item

    return (
        <tr className="song-row" key={song.id} >
            <td
                className={song.link !== undefined ? "song-title" : undefined}
                onClick={props.handleClick}
                value={song.title}
            >{song.title}</td>
            <td>{song.artist}</td>
            <td>{song.genre}</td>
            <td>{song.rating}</td>
        </tr >
    )
}

export default ListItem