import React from "react"
import InputField from "./InputField"

function SongForm(props) {

    return (
        <div className="songForm">

            <InputField
                handleSubmit={props.handleSubmit}
                handleChange={props.handleChange}
                inputSong={props.inputSong}
            />
        </div>
    )
}

export default SongForm