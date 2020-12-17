import React from 'react';
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';
import Images from '../ImageList';
import Button from 'react-bootstrap/Button';
import MyVerticallyCenteredModal from './Image';
import download from '../imgs/download.png';
import like from '../imgs/notfill.svg';
import Search from './Search';
import firebaseApp from '../firebase/Firebase';
import axios from 'axios';


function SearchImages(props) {
  const [liked, setLike] = React.useState(false);
  const createToken = async () => {
    const user = firebaseApp.auth().currentUser;
    const token = user && (await user.getIdToken());
    const payloadHeader = {
      headers: {
        Authorization: `Bearer ${token}`
      },
    };
    return payloadHeader;
  }
// let temp=window.location.pathname.split("/");
// let keyword=temp[3]  

const [img, setImg] = React.useState([])
const [Images, setImages] = React.useState([])


  const [key, setKey]= React.useState('')

React.useEffect(() =>{
  let temp=window.location.pathname.split("/");
  const catTemp = temp[2]
  const  keyTemp = temp[3]
  
// let keyword=temp[3]  
  async function loadImages(keyTemp, catTemp){
    
      fetch('/api/images', {
        accept: 'application/json',
      }).then(res => res.json())
        .then(pic => {
          setImg(pic)

        if(catTemp==="all")
        {
          const image =  pic.filter(re =>{            
              return re.keywords.includes(keyTemp)             
           })           
           setImages(image)
        }else{
          const temp_list =  pic.filter(re =>{            
              return re.keywords.includes(keyTemp)             
           })
 
          const image = temp_list.filter(re=>{
            
            return re.category.includes(catTemp)
          })
          setImages(image)          
        }       
        }).catch(err => console.log(err));    
      }
  loadImages(keyTemp, catTemp)
},[props])

const handleDownload = (id, size) => {
  window.open(`http://localhost:4000/api/images/${id}/download?size=${size}`, "_blank") 
}

const handleLike = async (id) => {
  let header = await createToken();
  header.headers['Content-Type'] = 'application/json'
  console.log(id)

  axios.patch(`/api/images/${id}/like`, {}, header)
  .then((res) => {
      console.log(res.data)
      setLike( !liked )
  })
  .catch((err) => {
      // TODO Can redirect to login page 
      // TODO Dhruv
      alert( "Please sign in" );
      console.log(err)
  })
 
}

  
  
  const [modalShow, setModalShow] = React.useState(false);
  const [modalImage, setModalImage] = React.useState('');
  const [ID, setId] = React.useState('');
  
  function modal(image){
    setModalShow(true)
    setModalImage(image)
  }

  return (
    
    <div> 
    
  <h2 className="searchTitle">{key} backgrounds</h2>
  
  <CardColumns>
  {
      Images && Images.map(re=>{
        console.log(re)
        
        return(         
        <Card>
          
        <a className="modalButton" onClick={() => modal(re)} >
          <Card.Img variant="top" src={re.url} />
          </a>
          <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            image={modalImage}
          />
       
          <Card.Footer>
          {/*add download functionality from backend */}
          {/* TODO Dhruv, Tejashree can you please make it one button and give user the option to pick up different sizes */}
          <button onClick={ () => handleDownload(re._id, 'default') }> <img src={download} alt="Download" className="downloadIcon"></img> </button>
          <button onClick={ () => handleDownload(re._id, 'small') }> <img src={download} alt="Download" className="downloadIcon"></img> </button>
          <button onClick={ () => handleDownload(re._id, 'large') }> <img src={download} alt="Download" className="downloadIcon"></img> </button>

          
          {/*add like functionality from backend */}
          <button onClick={ () => handleLike(re._id) }> <img src={like} alt="Like" className="likeIcon"></img> </button>
          
          <div> { re.no_of_likes } </div>
          {/* <img src={like} className="likeIcon"></img> */}
     
            {/* <p className="text-right text-muted">@{re.POSTED_BY}</p> */} 
      </Card.Footer>      
        </Card>
        
      
      )})

  }

</CardColumns> 
    </div>
  );}

export default SearchImages;