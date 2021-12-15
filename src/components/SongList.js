import React from "react"
import ListItem from "./ListItem.js"

function SongList(props) {

    let newSongs = []
    if (props.filter.genre === '' && props.filter.rating === '') {
        newSongs = props.songs
    } else {
        if (props.filter.rating !== '' && props.filter.genre === '') {
            let ratings = props.songs.filter(item => item.rating - props.filter.rating === 0)
            newSongs = ratings
        } else if (props.filter.rating === '' && props.filter.genre !== '') {
            let genres = props.songs.filter(item => item.genre === props.filter.genre)
            newSongs = genres
        } else {
            let genres = props.songs.filter(item => item.genre === props.filter.genre)
            let ratings = genres.filter(item => item.rating - props.filter.rating === 0)
            newSongs = ratings
        }
    }

    const list = newSongs.map(item => <ListItem
        key={item.id}
        item={item}
        handleClick={props.handleClick}
        handleClickDelete={props.handleClickDelete}
    />
    )

    return (
        <table className="table2" >
            <tbody>
                {list}
            </tbody>
        </table >
    )
}

export default SongList