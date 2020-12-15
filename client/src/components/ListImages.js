import React, {useState, useEffect} from 'react';
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';
import Images from '../ImageList';
import  {Button, DropdownButton, Dropdown} from 'react-bootstrap';
import MyVerticallyCenteredModal from './Image';
import download from '../imgs/download.png';
import like from '../imgs/like.png';
import axios from 'axios'
import firebaseApp from '../firebase/Firebase';
import Search from './Search';
const FileDownload = require( 'js-file-download');

function ListImages(props) {

  const [imgData, setImgData] = useState([])
  const [liked, setLike] = useState(false);
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

  useEffect(() =>{
    async function loadImages(){
      if( props.imageType === "All") {
        fetch('/api/images', {
          accept: 'application/json',
        }).then(res => res.json())
          .then(pic => {
            setImgData(pic)
          }).catch(err => console.log(err));
      }else if( props.imageType === 'User-Uploaded') {
        let header = await createToken();
        header.headers['Content-Type'] = 'application/json'
       /* axios.post(`/api/images/${id}/comments`,data, header).then((res)=>{
        })*/

        
        axios.get('/api/imagesByUser', header)
          .then((res) => {
            setImgData(res.data)
        })
        .catch((err) => {
          // TODO Can redirect to login page 
          // TODO Dhruv
          alert( "Please sign in" );
          console.log(err)
        })
      }else {
        let header = await createToken();
        header.headers['Content-Type'] = 'application/json'
        axios.get(`/api/imagesByFilter?category=${props.imageType}`, header)
          .then((res) => {
            setImgData(res.data)
        })
        .catch((err) => {
          // TODO Can redirect to login page 
          // TODO Dhruv
          alert( "Please sign in" );
          console.log(err)
      })
    }
  }
  loadImages();
  }, [props, liked])

  const [modalShow, setModalShow] = useState(false);
  const [modalImage, setModalImage] = useState('');
  
  function modal(image){
    setModalShow(true)
    setModalImage(image)
  }

  const handleDownload = (id, name, size) => {
    axios.get( `api/images/${id}/download?size=${size}`, { responseType: 'blob' } ).then( (response) =>{
      const fileName = "artsy-" + name + "-" + size + ".jpg"
      FileDownload( response.data, fileName);
    } )
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
  const onChangeSize = (e, id, image) => {

    handleDownload(id, image, e.target.value)
}
  return (
    
    <div className='container'> 
    <div className="search">
    <Search/>
    </div>
    
     <CardColumns>
    {
        imgData.map(re=>{
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
            {/* TODO Dhruv, Tejashree add style to */}
            
            <button>
                <select  className="cat" name="category" id="category" onChange={ (e) => onChangeSize(e, re._id, re.image_name)} >
                    <option selected disabled>Download</option>
                    <option value="small"  > Small</option>
                    <option value="default">Default</option>
                    <option value="large">Large</option>
                </select>
            </button>
            

            {/* <button onClick={ () => handleDownload(re._id, re.image_name, 'default') }> <img src={download} alt="Download" className="downloadIcon"></img> </button>
            <button onClick={ () => handleDownload(re._id, re.image_name, 'small') }> <img src={download} alt="Download" className="downloadIcon"></img> </button>
            <button onClick={ () => handleDownload(re._id, re.image_name, 'large') }> <img src={download} alt="Download" className="downloadIcon"></img> </button> */}

            
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

export default ListImages;