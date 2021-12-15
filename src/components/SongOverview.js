import React, { Component } from "react"
import SongList from "./SongList"
import SongForm from "./SongForm"
import YoutubeEmbed from "./YoutubeEmbed";
import InputFilter from "./InputFilter";
import sorticon from '../img/sort.png'

class SongOverview extends Component {

    constructor() {
        super()
        this.state =
        {
            filter:
            {
                genre: '',
                rating: ''
            },
            sort:
            {
                column: 'title',
                order: true
            },
            embedId: '',
            songs: [
                {
                    id: 1,
                    title: "Gypsy",
                    artist: "Fleetwood Mac",
                    genre: "Pop",
                    link: "mwgg1Pu6cNg",
                    rating: 4
                },
                {
                    id: 2,
                    title: "Half Moon",
                    artist: "Blind Pilot",
                    genre: "Pop",
                    link: "PfZKwjPjlW8",
                    rating: 2
                },
                {
                    id: 3,
                    title: "Karma Police",
                    artist: "Radiohead",
                    genre: "Rock",
                    link: "1uYWYWPc9HU",
                    rating: 2
                },
                {
                    id: 4,
                    title: "Shark Smile",
                    artist: "Big Thief",
                    genre: "Indie Pop",
                    link: "w1QlOfYxykI",
                    rating: 1
                },
                {
                    id: 5,
                    title: "Southern Nights",
                    artist: "Whitney",
                    genre: "Pop",
                    link: "e7fy8nwiTNw",
                    rating: 3
                },
                {
                    id: 6,
                    title: "Upper West Side",
                    artist: "King Princess",
                    genre: "Indie Pop",
                    link: "62fsOE7rZx8",
                    rating: 4
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
        this.handleChangeFilter = this.handleChangeFilter.bind(this)
    }

    handleChange(event) {
        const { name, value } = event.target
        this.setState(prevState => ({
            inputSong: { ...prevState.inputSong, [name]: value }
        }))
    }

    handleChangeFilter = (event) => {
        const { name, value } = event.target
        this.setState(prevState => ({
            filter: { ...prevState.filter, [name]: value }
        }))
    }

    handleClick = (event) => {
        let value = event.currentTarget.getAttribute("value")
        let newId = (this.state.songs.filter(item => item.title === value).map(filteredItem => filteredItem.link)).join()
        this.setState({ embedId: newId })
    }

    handleClickDelete = (event) => {
        let value = event.currentTarget.getAttribute("value")
        let songs = this.state.songs
        const newData = songs.filter(item => item.title !== value)
        this.setState({
            songs: newData
        })
    }

    handleClickSort = (event) => {
        let sortSongs = (data, byKey, order) => {
            let sortedData;
            if (byKey === "rating") {
                if (order) {
                    sortedData = data.sort(function (a, b) {
                        return a.rating - b.rating
                    })
                } else {
                    sortedData = data.sort(function (a, b) {
                        return b.rating - a.rating
                    })
                }
                return sortedData;
            } else {
                let x
                let y
                sortedData = data.sort(function (a, b) {
                    switch (byKey) {
                        case "artist":
                            x = a.artist.toLowerCase();
                            y = b.artist.toLowerCase();
                            break;
                        case "genre":
                            x = a.genre.toLowerCase();
                            y = b.genre.toLowerCase();
                            break;
                        default:
                            x = a.title.toLowerCase();
                            y = b.title.toLowerCase();
                            break;
                    }
                    if (order) {
                        if (x > y) { return 1; }
                        if (x < y) { return -1; }
                        return 0;
                    } else {
                        if (x > y) { return -1; }
                        if (x < y) { return 1; }
                        return 0;
                    }
                })
                return sortedData;
            }
        }

        let value = event.currentTarget.getAttribute("value")
        if (value === this.state.sort.column) {
            sortSongs(this.state.songs, value, !this.state.sort.order)
            this.setState(prevState => ({
                sort: { column: prevState.sort.column, order: !prevState.sort.order }
            }))
        } else {
            sortSongs(this.state.songs, value, true)
            this.setState({
                sort: { column: value, order: true }
            })
        }
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
            <div className="main" >
                <SongForm
                    handleChange={this.handleChange}
                    inputSong={this.state.inputSong}
                    handleSubmit={this.addSong}
                />
                <div className="songBody">
                    <table className="table1" style={{ width: "100%" }}>
                        <tbody>
                            <tr className="song-header">
                                <th onClick={this.handleClickSort} value="title" className="song-row__item">Song<img src={sorticon} alt="trashcan" className="sorticon" /></th>
                                <th onClick={this.handleClickSort} value="artist" className="song-row__item">Artist<img src={sorticon} alt="trashcan" className="sorticon" /></th>
                                <th onClick={this.handleClickSort} value="genre" className="song-row__item">Genre<img src={sorticon} alt="trashcan" className="sorticon" /></th>
                                <th onClick={this.handleClickSort} value="rating" className="song-row__item">Rating<img src={sorticon} alt="trashcan" className="sorticon" /></th>
                                <th onClick={this.handleClickSort} className="song-row__item" style={{ width: "10%" }}>Remove </th>
                            </tr>
                        </tbody>
                    </table>
                    <SongList
                        songs={this.state.songs}
                        handleClick={this.handleClick}
                        handleClickDelete={this.handleClickDelete}
                        filter={this.state.filter}
                    />
                </div>
                <div>
                    <InputFilter
                        songs={this.state.songs}
                        handleChangeFilter={this.handleChangeFilter}
                        filter={this.state.filter}
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