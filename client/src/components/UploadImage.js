import React, {useState} from 'react';
import Images from '../ImageList';

import '../App.css';

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
            POSTED_BY:"tejashree",
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

export default UploadImage;