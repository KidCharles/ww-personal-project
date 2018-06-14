import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addTrip } from '../../ducks/reducer';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import Nav from '../Nav/Nav'
import './Trip.css';
import '../../App.css';
import '../Dashboard/Dashboard.css';


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
                this.setState({ trips: trips.data });
                this.props.addTrip(this.state.trips);
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
        return (
            <div>
                <Nav />
                <div className='backgroundPhoto column' >
                    <form className='mappedtrip column' >
                        <p>ENTER TRIP NAME:</p>
                        <input className='column' onChange={(e) => this.handleTripName(e.target.value)} value={this.state.trip_name} type='text'  />
                        <p>ENTER TRIP ICON:</p>
                        <Dropzone
                            onDrop={this.handleDrop}
                            multiple
                            accept="image/*"
                        >
                            <p>Drop your files or click here to upload</p>
                        </Dropzone>
                        <input className='column' onChange={(e) => this.handleTripImg(e.target.value)} value={this.state.trip_img} type='text'  />
                        <p>ENTER LONG DESCRIPTION:</p>
                        <input className='column' onChange={(e) => this.handleLongDesc(e.target.value)} value={this.state.trip_long_desc} type='text' />
                        <p>ENTER SHORT DESCRIPTION:</p>
                        <input  className='column' onChange={(e) => this.handleShortDesc(e.target.value)}value={this.state.trip_short_desc} type='text' />
                        <p>ENTER TRIP PRICE:</p>
                        <input className='column' onChange={(e) => this.handleTripPrice(e.target.value)} value={this.state.trip_price} type='number'  />
                        <p>ENTER COLOR:</p>
                        <input  className='column' onChange={(e) => this.handleTripColor(e.target.value)} value={this.state.trip_color} type='color' />
                        <button onClick={(e) => this.handleClick(e)} >CREATE NEW TRIP</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default connect(null, { addTrip })(AdminTrip);