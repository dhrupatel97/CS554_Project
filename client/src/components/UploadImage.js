import React, {useState} from 'react';
import Images from '../ImageList';

import axios from 'axios'
import firebaseApp from '../firebase/Firebase'
import '../App.css';

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
    const [cate, setCate] = useState('')
    const [imgFile, setImgFile] = useState()
    const [keywords, setKeywords] = useState('')
    
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
        })
        .catch((err) => {
            console.log(err)
        })

        setImgName('')
        setCate('Office')
        setDesc('')
    }

    return (
        <div>
            <p>Welcome to Upload Images page</p>
            <form onSubmit={onUpload}>
                <label>
                    Image Name:
                </label>
                <input type='text' name='image_name' value={imgName} onChange={onChangeImg} placeholder='Add Image Name'/>
                <label>
                    Description:
                </label>
                <input type='text' name='desc' value={descp} onChange={onChangeDesc} placeholder='Add Image Description'/>
                <label>
                    Category:
                </label>
                <select name="category" id="category"  value={cate} onChange={onChangeCate}>
                    <option value="Office">Office</option>
                    <option value="Home">Home</option>
                    <option value="Outdoor">Outdoor</option>
                </select>
                <label>
                    Image file:
                </label>
                <input type="file" id="myfile" name="myfile" accept="image/png, image/jpeg" onChange ={onChangeFile} single />  
                <label>
                    Keywords:
                </label>
                <input type='text' name='keywords' value={keywords} onChange={onChangeKeywords} placeholder='Add Image Keywords'/>
                <button type='submit'>Upload</button>
            </form>
        </div>
      
    );
};

export default UploadImage;