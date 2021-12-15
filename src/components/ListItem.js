import React from "react"
import trash from '../img/trash.png'

function ListItem(props) {
    const song = props.item
    const MyRating = (rating) => rating ? (<td>{'⭐️'.repeat(rating)}</td >) : null

    return (
        <tr className="song-row" key={song.id} >
            <td
                className={song.link !== undefined ? "song-title" : undefined}
                onClick={props.handleClick}
                value={song.title}
            >{song.title}</td>
            <td>{song.artist}</td>
            <td>{song.genre}</td>
            {MyRating(song.rating)}
            <td style={{ width: "10%" }}><button value={song.title} onClick={props.handleClickDelete} style={{ backgroundColor: "cadetblue", border: "none" }}><img src={trash} alt="trashcan" className="trashcan" /></button></td>
        </tr >
    )
}

export default ListItem