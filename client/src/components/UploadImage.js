import React, {useState} from 'react';
<<<<<<< HEAD
import Images from '../ImageList';

=======
import axios from 'axios'
import firebaseApp from '../firebase/Firebase'
>>>>>>> 9f93b72fe5c701acd472a5c4ae85fc9b11c5b89c
import '../App.css';

const createToken = async () => {
    const user = firebaseApp.auth().currentUser;
    const token = user && (await user.getIdToken());
    const payloadHeader = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    return payloadHeader;
  }

const UploadImage = () => {
<<<<<<< HEAD
    const [image, setImage] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [keywords, setKeywords] = useState([])
    const [temp, setTemp]= useState('')
    const [postedby, setPostedBy]= useState('')
    
    function onImageChange (event) {
        if (event.target.files && event.target.files[0]) {       
          let img = event.target.files[0];          
            setImage(URL.createObjectURL(img))      
     } };
    const onChangeDescription = (e) => {
        setDescription(e.target.value)
    }
    const onChangeCategory = (e) => {
        setCategory(e.target.value)
    }
    const onChangeKeywords = (e) => {
        setTemp(e.target.value)  
    }


    const onUpload = (e) => {
        e.preventDefault()
//add upload event functionality
        // const newImgObj = {
        //     image_name: imgName,
        //     desc: descp,
        //     category: cate,
        //     url: urL
        //}
        setPostedBy("tejashree")
        let tempList= temp.split(" ")
        console.log("tempList", tempList)    
         for(let i=0;i<tempList.length;i++)
         {
             keywords.push(tempList[i])
         }  

         if(!keywords || !description || !image || !category)
         {
             alert("Some fields empty")
         }
        else{
          
        const newImageObject =  {

            PHOTO_NAME: image,
            DESCRIPTION: description,
            POSTEDBY:postedby,
            CATEGORY:category,
            NO_OF_LIKES:0,
            NO_OF_DISLIKES:0,
            KEYWORDS:keywords,
            COMMENTS:[]
            

        }

        Images.push(newImageObject)
        alert("Image Uploaded")
        setImage('')
        setCategory('')
        setDescription('')
        setTemp('')
        setImage('')

         }
    
        console.log(Images)

        // axios.post('/api/images', newImgObj)
        // .then((res) => {
        //     console.log(res.data)
        // })
        // .catch((err) => {
        //     console.log(err)
        // })

        
    }

    


    return (
        
        <div className="uploadImageBox">
            
            <form onSubmit={onUpload}>

                <label>
                    Description:
                    </label>
                
                <textarea className="desc" type='text' name='desc' value={description} onChange={onChangeDescription} placeholder='Add Image Description'/>
                
                <br></br>
                <label>
                    Category:
                </label>   
                <select className="cat"  name='category' value={category} onChange={onChangeCategory} placeholder='Add Image Category'>
                <option selected value="">Select Category</option>
                <option value="home">Home Background </option>
                <option  value="office">Office Background</option>
                <option value="outdoor">Outdoor Background</option>
                </select>             
                
                <br></br>
                <label>
                    keywords:
                </label>                
                <input className="key"  type='text' name='keywords' value={temp} onChange={onChangeKeywords} placeholder='Add Keywords with space'/>
                <br></br>
                <label>
                    Image:
                </label> 
                 
            
            <input className="img"  type="file" name="myImage"  onChange={onImageChange} accept="image/*" />
            <br></br>
                <button className="uploadImage"  type='submit'>Upload Image</button>
            </form>
            
            
            
=======

    const [imgName, setImgName] = useState('')
    const [descp, setDesc] = useState('')
    const [cate, setCate] = useState('')
    const [urL, setURL] = useState('')
    
    const onChangeImg = (e) => {
        setImgName(e.target.value)
    }
    const onChangeDesc = (e) => {
        setDesc(e.target.value)
    }
    const onChangeCate = (e) => {
        setCate(e.target.value)
    }
    const onChangeURL = (e) => {
        setURL(e.target.value)
    }

    const onUpload = async (e) => {
        e.preventDefault()
        const header = await createToken();

        const newImgObj = {
            image_name: imgName,
            desc: descp,
            category: cate,
            url: urL
        }

        axios.post('/api/images', newImgObj, header)
        .then((res) => {
            console.log(res.data)
        })
        .catch((err) => {
            console.log(err)
        })

        setImgName('')
        setCate('')
        setDesc('')
        setURL('')
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
                <input type='text' name='category' value={cate} onChange={onChangeCate} placeholder='Add Image Category'/>
                <label>
                    URL:
                </label>
                <input type='text' name='url' value={urL} onChange={onChangeURL} placeholder='Add Image URL'/>
                <button type='submit'>Add Image</button>
            </form>
>>>>>>> 9f93b72fe5c701acd472a5c4ae85fc9b11c5b89c
        </div>
      
    );
};

export default UploadImage;