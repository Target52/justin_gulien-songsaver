import React from "react"
import ListItem from "./ListItem.js"

function SongList(props) {

    const list = props.songs.map(item => <ListItem
        key={item.id}
        item={item}
        handleClick={props.handleClick}
    />
    )

    return (
        <table style={{ width: "100%" }}>
            <tbody>
                {list}
            </tbody>
        </table>
    )
}

export default SongList