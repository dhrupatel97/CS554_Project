import React, {useState, useEffect} from 'react';
import  { DropdownButton, Dropdown} from 'react-bootstrap';
import MyVerticallyCenteredModal from './Image';
import axios from 'axios'
import firebaseApp from '../firebase/Firebase';
import Search from './Search';
import '../App.css';
import FooterPage from './FooterPage';
const FileDownload = require( 'js-file-download');

function HottestImages(props) {
  const [imgData, setImgData] = useState([])
  const [liked, setLike] = useState(false);
  const [Images, setImages] = React.useState([])
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
     
        fetch('/api/images', {
          accept: 'application/json',
        }).then(res => res.json())
          .then(pic => {
            setImgData(pic)

            imgData.sort(function (a, b) {
              return a.no_of_likes - b.no_of_likes;
            });
            let revImgData= imgData.reverse();
            setImages(revImgData)
          
          }).catch(err => console.log(err));
      
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
        alert( "Please Sign In" );
        console.log(err)
    })   
  }

  const handleSelect = ( e, id, image) => {
    console.log( "Selected , " , e );
    handleDownload(id, image, e)
  }
  
  return (
    <div class="listImages">
    <div className="searchContent">
          <Search/>
        </div>
      <div class='container-list'>
        {Images.map(re => {
          return (
            <div class='card'>
              <a className="modalButton" onClick={() => modal(re)} >
                <img class='gallery-img' src={re.url} />
                </a>
                <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                image={modalImage}
                />
                <div class='like-count'>
                  { re.no_of_likes }
                </div>
                <div class='like-button'>
                <i class='material-icons' onClick={ () => handleLike(re._id) }>favorite</i>
                </div>
                <div class = "overlay-top">
                  <DropdownButton
                    alignRight
                    title = "Download"
                    variant="secondary"
                    id="dropdown-menu-align-right"
                    onSelect={(e) => handleSelect(e, re._id, re.image_name)}                    
                  >
                    <Dropdown.Item eventKey="small">Small</Dropdown.Item>
                    <Dropdown.Item eventKey="default">Default</Dropdown.Item>
                    <Dropdown.Item eventKey="large">Large</Dropdown.Item>
                  </DropdownButton>
                </div>
                <div class='overlay'>@{re.posted_by}</div>
            </div>
          )
        })}
      </div>
      
    </div>              
);}

export default HottestImages;