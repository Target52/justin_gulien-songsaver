import React from "react"

function InputField(props) {

    return (
        <form className="input-field" onSubmit={props.handleSubmit} >
            <table>
                <tbody>
                    <tr>
                        <td>
                            <input
                                className="field"
                                type="text"
                                name="title"
                                value={props.inputSong.title}
                                placeholder="Title"
                                onChange={props.handleChange}
                            />
                        </td>
                        <td>
                            <input
                                className="field"
                                type="text"
                                value={props.inputSong.artist}
                                name="artist"
                                placeholder="Artist"
                                onChange={props.handleChange}
                            />
                        </td>
                        <td>
                            <input
                                className="field"
                                type="text"
                                value={props.inputSong.genre}
                                name="genre"
                                placeholder="Genre"
                                onChange={props.handleChange}
                            />
                        </td>
                        <td>
                            <select
                                className="field"
                                value={props.inputSong.rating}
                                name="rating"
                                placeholder=""
                                onChange={props.handleChange}
                            >
                                <option value=""></option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </td>
                        <td>
                            <button>Voeg toe</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </form>
    )
}

export default InputField