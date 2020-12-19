import React, {useState} from 'react';
import {Alert} from 'react-bootstrap'
import axios from 'axios'
import firebaseApp from '../firebase/Firebase'
import '../App.css';
import FooterPage from './FooterPage';

const createToken = async () => {
    const user = firebaseApp.auth().currentUser;
    const token = user && (await user.getIdToken());
    const payloadHeader = {
      headers: {
        // 'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      },
    };
    return payloadHeader;
  }

const UploadImage = () => {

    const [imgName, setImgName] = useState('')
    const [descp, setDesc] = useState('')
    const [cate, setCate] = useState('Office')
    const [imgFile, setImgFile] = useState()
    const [keywords, setKeywords] = useState('')
    const [alert, setAlert] = useState(false)
    
    const onChangeImg = (e) => {
        setImgName(e.target.value)
    }
    const onChangeDesc = (e) => {
        setDesc(e.target.value)
    }
    const onChangeKeywords = (e) => {
        setKeywords(e.target.value)
    }

    const onChangeCate = (e) => {
        setCate(e.target.value)
    }
    const onChangeFile = (e) => {
        setImgFile(e.target.files[0])
    }

    const onUpload = async (e) => {
        e.preventDefault()
        let header = await createToken();
        header.headers['Content-Type'] = 'multipart/form-data'
        let data = new FormData() 
        data.append('image', imgFile)
        data.append('category', cate)
        data.append('desc', descp)
        data.append('image_name',imgName)
        data.append('keywords', keywords)
        
        axios.post('/api/images', data, header)
        .then((res) => {
            console.log(res.data)
            setAlert(true)
        })
        .catch((err) => {
            console.log(err)
            setAlert(false)
        })

        setImgName('')
        setCate('')
        setDesc('')
        setKeywords('')
    }

    return (
        <div className="container-box">
            {alert ? <Alert variant='success'>Successfully Uploaded</Alert> : null}
            <h3 className="text-center">Upload Image </h3>
            <form onSubmit={onUpload} class="registration-form">
                <label>
                    <span class="label-text">Add Image Name</span>
                    <input class="inputFields" type='text' name='image_name' value={imgName} onChange={onChangeImg} placeholder='Add Image Name'/>
                </label>
                <br></br>
                <label>
                    <span class="label-text">Add Image Description</span>
                    <input class="inputFields" type='text' name='desc' value={descp} onChange={onChangeDesc} placeholder='Add Image Description'/>
                </label>
                <br></br>

                <label>
                    <span class="label-text">Choose Category</span>
                    <select  className="inputFields" name="category" id="category" value={cate} onChange={onChangeCate}>
                        <option value="Office" selected>Office</option>
                        <option value="Home">Home</option>
                        <option value="Outdoor">Outdoor</option>
                        <option value="Abstract">Abstract</option>
                        <option value="Other">Other</option>
                    </select>
                </label>
                <br></br>
                <label>
                    <span class="label-text">Choose a File</span>
                    <input class="inputFields" type="file" id="myfile" name="myfile" accept="image/png, image/jpg, image/jpeg" onChange ={onChangeFile} single />  
                </label>
                <br></br>
                <label>
                    <span class="label-text">Set Keywords</span>
                    <input class="inputFields"  type='text' name='keywords' value={keywords} onChange={onChangeKeywords} placeholder='Please add comma sepearated single words'/>
                </label>
                <br></br>
                <div class='text-centre'>
                    <button type='submit' class='submit'>Upload</button>
                </div>
            </form>
         
        </div>
      
    );
};

export default UploadImage;