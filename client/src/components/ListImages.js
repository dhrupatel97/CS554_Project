import React, {useState, useEffect} from 'react';
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';
import Images from '../ImageList';
import Button from 'react-bootstrap/Button';
import MyVerticallyCenteredModal from './Image';
import download from '../imgs/download.png';
import like from '../imgs/like.png';
import axios from 'axios'
import firebaseApp from '../firebase/Firebase'

function ListImages(props) {

  const [imgData, setImgData] = useState([])
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

  useEffect(() =>{
    fetch('/api/images', {
      accept: 'application/json',
    }).then(res => res.json())
      .then(pic => {
        setImgData(pic)
        console.log('ListImages.js - ')
        console.log(pic)
      })
      .catch(err => console.log(err));
  }, [])

  let images=[];
  //add get all images route and replace the Images.map function with the api 
 
   if(props.imageType==="home") {
    imgData.map(re=>{    
      if(re.category==="home")
      {
         images.push(re)
       }   
     })
  }else if(props.imageType==="outdoor") {
    imgData.map(re=>{    
      if(re.category==="outdoor")
      {
         images.push(re)
       }   
     })
  }else if(props.imageType==="office") {
    imgData.map(re=>{    
      if(re.category==="office")
      {
         images.push(re)
       }   
     })
  }else if(props.imageType==="all") {
    imgData.map(re=>{    
      
      images.push(re)
     
  })
  }
  
  const [modalShow, setModalShow] = useState(false);
  const [ID, setId] = useState('');
  
  function modal(id){
    setModalShow(true)
    setId(id)
  }

  const handleDownload = (id) => {
    //e.preventDefault();
    console.log(id)
    fetch(`/api/images/${id}/download`, {
      accept: 'application/json',
    }).then(res => res.json())
      .then(pic => {
        //setImgData(pic)
        //console.log('ListImages.js - ')
        console.log(id)
      })
      .catch(err => console.log(err));
  }
 
  const handleLike = async (id) => {
    let header = await createToken();
    header.headers['Content-Type'] = 'application/json'
    console.log(id)

    axios.patch(`/api/images/${id}/like`, {}, header)
    .then((res) => {
        console.log(res.data)
    })
    .catch((err) => {
        console.log(err)
    })
   
  }

  return (
    
    <div> 
    
     <CardColumns>
    {
        imgData.map(re=>{
          console.log(re)
          
          return(         
          <Card>
            
          <a className=" modalButton" onClick={() => modal(re._id)} >
            <Card.Img variant="top" src={re.url} />
            </a>
            <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        id={ID}/>
         
            <Card.Footer>
            {/*add download functionality from backend */}
            <button onClick={ () => handleDownload(re._id) }> <img src={download} className="downloadIcon"></img> </button>
            {/*add like functionality from backend */}
            <button onClick={ () => handleLike(re._id) }> <img src={like} className="likeIcon"></img> </button>
            {/* <img src={like} className="likeIcon"></img> */}
       
              {/* <p className="text-right text-muted">@{re.POSTED_BY}</p> */} 
        </Card.Footer>      
          </Card>
          
        
        )})
  
    }
 
  </CardColumns> 
    </div>
  );}

export default ListImages;