import React from 'react';
import  {DropdownButton, Dropdown} from 'react-bootstrap';
import MyVerticallyCenteredModal from './Image';
import firebaseApp from '../firebase/Firebase';
import axios from 'axios';
import FooterPage from './FooterPage';
const FileDownload = require( 'js-file-download');


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
const [key, setKey] = React.useState([])
const [refresh, setRefresh ] = React.useState({})


React.useEffect(() =>{
  let temp=window.location.pathname.split("/");
  const catTemp = temp[2]
  const  keyTemp = temp[3]
  setKey(keyTemp)
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
  loadImages(keyTemp, catTemp )
},[props, liked, refresh ])
const refreshList = (data ) => {
  setRefresh( data )
}
const handleDownload = (id, name, size) => {
  axios.get( `/api/images/${id}/download?size=${size}`, { responseType: 'blob' } ).then( (response) =>{
    const fileName = "artsy-" + name + "-" + size + ".jpg"
    FileDownload( response.data, fileName);
  } )
}
const handleSelect = ( e, id, image) => {
  console.log( "Selected , " , e );
  handleDownload(id, image, e)
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

  
  
  const [modalShow, setModalShow] = React.useState(false);
  const [modalImage, setModalImage] = React.useState('');
  
  function modal(image){
    setModalShow(true)
    setModalImage(image)
  }

  return (
    <div> 
    <h2 className="searchTitle">{key} Backgrounds</h2>
    <div class='container-list'>
        {Images && Images.map(re => {
          return (
            <div class='card'>
              <a className="modalButton" onClick={() => modal(re)} >
                <img class='gallery-img' src={re.url} />
                </a>
                <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                image={modalImage}
                refresh={refreshList}
                />
                <div class='like-count'>
                  { re.no_of_likes }
                </div>
                <div class='like-button'>
                <i class='material-icons' onClick={ () => handleLike(re._id) }>favorite</i>
                </div>
                {/* <div class='download-button'>
                  <i class='material-icons md-48' >arrow_circle_down</i>
                </div> */}
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

export default SearchImages;