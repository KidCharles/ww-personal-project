import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addGear, getGear, deleteGear } from '../../ducks/reducer';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import Nav from '../Nav/Nav'
import '../Dashboard/Dashboard.css';
import './Gear.css'


class AdminTrip extends Component {
    constructor(props) {
        super()
        this.state = {
            gear_name: '',
            gear_img: '',
            gear_long_desc: '',
            gear_short_desc: '',
            gear_price: 0
        }
    }

    componentDidMount() {
        axios.get('/api/gear').then((res) => {
            this.props.getGear(res.data);
        })
    }


    handleGearName(val) {
        this.setState({ gear_name: val })
    }

    //  handleTripImg(val) {
    //     this.setState({ trip_img: val })
    // }

    handleGearLongDesc(val) {
        this.setState({ gear_long_desc: val })
    }

    handleGearShortDesc(val) {
        this.setState({ gear_short_desc: val })
    }

    handleGearPrice(val) {
        this.setState({ gear_price: val })
    }

    handleClick(e) {
        e.preventDefault()
        let body = {
            gear_name: this.state.gear_name,
            gear_img: this.state.gear_img,
            gear_long_desc: this.state.gear_long_desc,
            gear_short_desc: this.state.gear_short_desc,
            gear_price: this.state.gear_price
        }
        !body.gear_name
            ?
            alert('please fill out form correctly')
            :
            axios.post('/addGear', body).then((gear) => {
                // this.setState({ trips: trips.data });
                this.props.addGear(gear.data);
                if (gear.status === 200) {
                    this.setState({
                        gear_name: '',
                        gear_img: '',
                        gear_long_desc: '',
                        gear_short_desc: '',
                        gear_price: 0
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
                this.setState({ gear_img: fileURL })
            })
        });
        // Once all the files are uploaded 
        // axios.all(uploaders).then(() => {
        //     // ... perform after upload is successful operation

        // });
    }

    render() {
        let mappedGear = this.props.gear.map((e, i) => {
            return (
                <div key={e.gear_id} className=' column instapic' >
                    <img src={e.gear_img} className='' alt='Wayfaring World Product' />
                    <button onClick={() => { this.props.deleteGear(e.gear_id) }}>DELETE</button>
                    <p>${e.gear_price}</p>
                    <p>{e.gear_name}</p>
                    <p>{e.gear_long_desc}</p>
                    <p>{e.gear_short_desc}</p>
                </div>
            )
        })
        return (
            <div>
                <Nav />
                <div className='backgroundPhoto column' >
                    <form className=' column' >
                        <p>ENTER GEAR NAME:</p>
                        <input className='column' onChange={(e) => this.handleGearName(e.target.value)} value={this.state.gear_name} type='text' />
                        <p>ENTER GEAR IMG:</p>
                        <Dropzone
                            onDrop={this.handleDrop}
                            multiple
                            accept="image/*"
                        >
                            <p>Drop your files or click here to upload</p>
                        </Dropzone>
                        <input className='column' onChange={(e) => this.handleGearImg(e.target.value)} value={this.state.gear_img} type='text' />
                        <p>ENTER LONG DESCRIPTION:</p>
                        <input className='column' onChange={(e) => this.handleGearLongDesc(e.target.value)} value={this.state.gear_long_desc} type='text' />
                        <p>ENTER SHORT DESCRIPTION:</p>
                        <input className='column' onChange={(e) => this.handleGearShortDesc(e.target.value)} value={this.state.gear_short_desc} type='text' />
                        <p>ENTER GEAR PRICE:</p>
                        <input className='column' onChange={(e) => this.handleGearPrice(e.target.value)} value={this.state.gear_price} type='number' />
                        <button onClick={(e) => this.handleClick(e)} >CLICK TO ADD NEW PRODUCT TO GEAR</button>
                    </form>
                    <div className='row inventory' >
                        {mappedGear}
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        gear: state.gear
    }
}

export default connect(mapStateToProps, { addGear, getGear, deleteGear })(AdminTrip);