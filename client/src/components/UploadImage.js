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
            
            
            
        </div>
      
    );
};
// const UploadImage = () => {

//     const [imgName, setImgName] = useState('')
//     const [descp, setDesc] = useState('')
//     const [cate, setCate] = useState('')
//     const [imgFile, setImgFile] = useState()
//     const [keywords, setKeywords] = useState('')
    
//     const onChangeImg = (e) => {
//         setImgName(e.target.value)
//     }
//     const onChangeDesc = (e) => {
//         setDesc(e.target.value)
//     }
//     const onChangeKeywords = (e) => {
//         setKeywords(e.target.value)
//     }

//     const onChangeCate = (e) => {
//         setCate(e.target.value)
//     }
//     const onChangeFile = (e) => {
//         setImgFile(e.target.files[0])
//     }

//     const onUpload = async (e) => {
//         e.preventDefault()
//         let header = await createToken();
//         header.headers['Content-Type'] = 'multipart/form-data'
//         let data = new FormData() 
//         data.append('image', imgFile)
//         data.append('category', cate)
//         data.append('desc', descp)
//         data.append('image_name',imgName)
//         data.append('keywords', keywords)
        
//         axios.post('/api/images', data, header)
//         .then((res) => {
//             console.log(res.data)
//         })
//         .catch((err) => {
//             console.log(err)
//         })

//         setImgName('')
//         setCate('Office')
//         setDesc('')
//     }

//     return (
//         <div>
//             <p>Welcome to Upload Images page</p>
//             <form onSubmit={onUpload}>
//                 <label>
//                     Image Name:
//                 </label>
//                 <input type='text' name='image_name' value={imgName} onChange={onChangeImg} placeholder='Add Image Name'/>
//                 <label>
//                     Description:
//                 </label>
//                 <input type='text' name='desc' value={descp} onChange={onChangeDesc} placeholder='Add Image Description'/>
//                 <label>
//                     Category:
//                 </label>
//                 <select name="category" id="category"  value={cate} onChange={onChangeCate}>
//                     <option value="Office">Office</option>
//                     <option value="Home">Home</option>
//                     <option value="Outdoor">Outdoor</option>
//                 </select>
//                 <label>
//                     Image file:
//                 </label>
//                 <input type="file" id="myfile" name="myfile" accept="image/png, image/jpeg" onChange ={onChangeFile} single />  
//                 <label>
//                     Keywords:
//                 </label>
//                 <input type='text' name='keywords' value={keywords} onChange={onChangeKeywords} placeholder='Add Image Keywords'/>
//                 <button type='submit'>Upload</button>
//             </form>
//         </div>
      
//     );
// };

export default UploadImage;