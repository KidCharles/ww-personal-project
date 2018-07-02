import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addTrip, getTrips, deleteTrip } from '../../ducks/reducer';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import Nav from '../Nav/Nav'


class AdminTrip extends Component {
    constructor(props) {
        super()
        this.state = {
            trip_name: '',
            trip_img: '',
            trip_long_desc: '',
            trip_short_desc: '',
            trip_price: 0,
            trip_color: '',
        }
    }

    componentDidMount() {
        axios.get('/api/trips').then((res) => {
            this.props.getTrips(res.data);
        })
    }

    handleTripName(val) {
        this.setState({ trip_name: val })
    }

    //  handleTripImg(val) {
    //     this.setState({ trip_img: val })
    // }

    handleLongDesc(val) {
        this.setState({ trip_long_desc: val })
    }

    handleShortDesc(val) {
        this.setState({ trip_short_desc: val })
    }

    handleTripPrice(val) {
        this.setState({ trip_price: val })
    }

    handleTripColor(val) {
        this.setState({ trip_color: val })
    }

    handleClick(e) {
        e.preventDefault()
        let body = {
            trip_name: this.state.trip_name,
            trip_img: this.state.trip_img,
            trip_long_desc: this.state.trip_long_desc,
            trip_short_desc: this.state.trip_short_desc,
            trip_price: this.state.trip_price,
            trip_color: this.state.trip_color,
        }
        !body.trip_name
            ?
            alert('please fill out form correctly')
            :
            axios.post('/addtrip', body).then((trips) => {
                // this.setState({ trips: trips.data });
                console.log(trips)
                this.props.addTrip(trips.data);
                if (trips.status === 200) {
                    console.log(trips)
                    this.setState({
                        trip_name: '',
                        trip_img: '',
                        trip_long_desc: '',
                        trip_short_desc: '',
                        trip_price: 0,
                        trip_color: ''
                    }, () => alert('Succesfully Added'))
                }
            })
    }




    handleDrop = files => {
        // Push all the axios request promise into a single array
        const uploaders = files.map(file => {
            // Initial FormData
            const formData = new FormData();
            formData.append("file", file);
            formData.append("tags", `codeinfuse, medium, gist`);
            formData.append("upload_preset", "b0nx2kyj"); // Replace the preset name with your own
            formData.append("api_key", "822525438173656"); // Replace API key with your own Cloudinary key
            formData.append("timestamp", (Date.now() / 1000) | 0);

            // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
            return axios.post("https://api.cloudinary.com/v1_1/wayfaringworld/image/upload", formData, {
                headers: { "X-Requested-With": "XMLHttpRequest" },
            }).then(response => {
                const data = response.data;
                const fileURL = data.secure_url // You should store this URL for future references in your app
                // console.log(data);
                //put this into my data base
                this.setState({ trip_img: fileURL })
            })
        });
        // Once all the files are uploaded 
        // axios.all(uploaders).then(() => {
        //     // ... perform after upload is successful operation

        // });
    }
    render() {
        let mappedTrips = this.props.trips.map((e, i) => {
            return (
                <div key={e.trips_id} style={{ "backgroundColor": e.trip_color }} className='trips' >
                    <div className='row tripBanner'>
                        <div className='row coord'>
                            <h1>coordinates</h1>
                            <div className='column coord' >
                                <img src={e.trip_img} className='' alt='trip pic' />
                                <h1>{e.trip_name}</h1>
                            </div>
                        </div>
                        <div className='column coord' >
                            <h1>Backpacker Package</h1>
                            <h1>{e.trip_short_desc}</h1>
                            <h1>${e.trip_price}</h1>
                        </div>
                        <button onClick={() => { this.props.deleteTrip(e.trips_id) }}>DELETE</button>
                    </div>
                </div>
            )
        })
        return (
            <div>
                <Nav />
                <div className='backgroundPhoto ' >
                    <div className='admin_form'>
                        <div class=" blue_underline ww_account">
                            <svg height="60" width="320" xmlns="http://www.w3.org/2000/svg">
                                <rect class="shape" height="60" width="320" />
                            </svg>
                            <div class="text">TRIPS ADMIN FORM</div>
                        </div>

                        <form >
                            <p>ENTER TRIP NAME:</p>
                            <input onChange={(e) => this.handleTripName(e.target.value)} value={this.state.trip_name} type='text' />
                            <p>ENTER TRIP ICON:</p>
                            <Dropzone
                                onDrop={this.handleDrop}
                                multiple
                                accept="image/*"
                            >
                                <p>Drop your files or click here to upload</p>
                            </Dropzone>
                            <input onChange={(e) => this.handleTripImg(e.target.value)} value={this.state.trip_img} type='text' />
                            <p>ENTER LONG DESCRIPTION:</p>
                            <input onChange={(e) => this.handleLongDesc(e.target.value)} value={this.state.trip_long_desc} type='text' />
                            <p>ENTER SHORT DESCRIPTION:</p>
                            <input onChange={(e) => this.handleShortDesc(e.target.value)} value={this.state.trip_short_desc} type='text' />
                            <p>ENTER TRIP PRICE:</p>
                            <input onChange={(e) => this.handleTripPrice(e.target.value)} value={this.state.trip_price} type='number' />
                            <p>ENTER COLOR:</p>
                            <input onChange={(e) => this.handleTripColor(e.target.value)} value={this.state.trip_color} type='color' />
                            {/* <button onClick={(e) => this.handleClick(e)} >CREATE NEW TRIP</button> */}

                            <br />
                            <br />
                            <br />
                            <div class="svg-wrapper " onClick={(e) => this.handleClick(e)}>
                                <svg height="60" width="320" xmlns="http://www.w3.org/2000/svg">
                                    <rect class="shape" height="60" width="320" />
                                </svg>
                                <div class="text">ADD NEW TRIP</div>
                            </div>
                            <br />

                        </form>
                    </div >

                    <div className='row inventory' >
                        {mappedTrips}
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        trips: state.trips
    }
}

export default connect(mapStateToProps, { addTrip, getTrips, deleteTrip })(AdminTrip);