import React, { Component } from "react"
import SongList from "./SongList"
import SongForm from "./SongForm"
import YoutubeEmbed from "./YoutubeEmbed";

class SongOverview extends Component {

    constructor() {
        super()
        this.state =
        {
            sort:
            {
                column: 'title',
                order: 'asc'
            },
            embedId: '',
            songs: [
                {
                    id: 1,
                    title: "Karma Police",
                    artist: "Radiohead",
                    genre: "Rock",
                    link: "1uYWYWPc9HU",
                    rating: 2
                },
                {
                    id: 2,
                    title: "Upper West Side",
                    artist: "King Princess",
                    genre: "Indie Pop",
                    link: "62fsOE7rZx8",
                    rating: 4
                },
                {
                    id: 3,
                    title: "Shark Smile",
                    artist: "Big Thief",
                    genre: "Indie Pop",
                    link: "w1QlOfYxykI",
                    rating: 1
                },
                {
                    id: 4,
                    title: "Gypsy",
                    artist: "Fleetwood Mac",
                    genre: "Pop",
                    link: "mwgg1Pu6cNg",
                    rating: 4
                },
                {
                    id: 5,
                    title: "Half Moon",
                    artist: "Blind Pilot",
                    genre: "Pop",
                    link: "PfZKwjPjlW8",
                    rating: 2
                },
                {
                    id: 6,
                    title: "Southern Nights",
                    artist: "Whitney",
                    genre: "Pop",
                    link: "e7fy8nwiTNw",
                    rating: 3
                }
            ],
            inputSong:
            {
                id: 1,
                title: "",
                artist: "",
                genre: "",
                link: "",
                rating: ""
            }

        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        let name = event.target.name
        let value = event.target.value

        this.setState(prevState => ({
            inputSong: { ...prevState.inputSong, [name]: value }
        }))
    }

    handleClick = (event) => {
        let value = event.currentTarget.getAttribute("value")
        let newId = (this.state.songs.filter(item => item.title === value).map(filteredItem => filteredItem.link)).join()
        this.setState({ embedId: newId })
    }

    componentDidMount() {
        const links = this.state.songs.map(filteredItem => filteredItem.link)
        this.setState({ embedId: links[0] })
    }

    addSong = (song) => {
        song.preventDefault()
        const value = this.state.inputSong.title
        const url = 'https://www.youtube.com/results?search_query=' + value + '+' + this.state.inputSong.artist
        fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`)
            .then(response => (response.ok) ? response.json() : new Error('Network response was not ok.'))
            .then((data) => data.contents.substr((data.contents.indexOf('?v=') + 3), 11))
            .then((embedId) => {
                this.setState({ embedId: embedId })
                this.setState(prevState => ({
                    inputSong: { ...prevState.inputSong, link: embedId }
                }))
                if (!this.state.songs.find(({ title }) => title === value) && value !== '') {
                    let newId = this.state.songs.length + 1
                    let newArray = {
                        id: newId,
                        title: value,
                        artist: this.state.inputSong.artist,
                        genre: this.state.inputSong.genre,
                        rating: this.state.inputSong.rating,
                        link: this.state.inputSong.link
                    }
                    this.setState({
                        songs: [...this.state.songs].concat(newArray),
                        inputSong: {
                            id: 1,
                            title: "",
                            artist: "",
                            genre: "",
                            link: "",
                            rating: ""
                        }
                    })
                }
            })
    }

    render() {
        return (
            <div className="main">
                <SongForm
                    handleChange={this.handleChange}
                    inputSong={this.state.inputSong}
                    handleSubmit={this.addSong}
                />
                <div className="songBody">
                    <table style={{ width: "100%" }}>
                        <tbody>
                            <tr className="song-header">
                                <th className="song-row__item">Song</th>
                                <th className="song-row__item">Artist</th>
                                <th className="song-row__item">Genre</th>
                                <th className="song-row__item">Rating</th>
                            </tr>
                        </tbody>
                    </table>
                    <SongList
                        songs={this.state.songs}
                        handleClick={this.handleClick}
                    />
                </div>
                <div>
                    <YoutubeEmbed embedId={this.state.embedId} />
                </div>
            </div >
        );
    }
}

export default SongOverview;