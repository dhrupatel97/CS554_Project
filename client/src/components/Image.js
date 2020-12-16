import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Images from '../ImageList';
import download from '../imgs/download.png';
import like from '../imgs/notfill.svg';
import axios from 'axios'
import firebaseApp from '../firebase/Firebase'
import DisplayComments from './DisplayComments';
import SubmitComment from './SubmitComment';

function MyVerticallyCenteredModal(props) {
//add single image backend route , id can be taken from props.id
  const handleDownload = (id, size) => {
    window.open(`http://localhost:4000/api/images/${id}/download?size=${size}`, "_blank") 
  }

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

  const handleLike = async (id) => {
    let header = await createToken();
    header.headers['Content-Type'] = 'application/json'
    console.log(id)

    axios.patch(`/api/images/${id}/like`, {}, header)
    .then((res) => {
        console.log(res.data)
    })
    .catch((err) => {
        // TODO Can redirect to login page 
        // TODO Dhruv
        alert( "Please Sign In" );
        console.log(err)
    })
   
  }
  
  
  

    return (
      <Modal
        {...props}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <p>{props.image.image_name}</p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
<<<<<<< HEAD
        <div className="row">
          <div className="colLeft"><img className="modalImage" variant="top" alt="img" src={props.image.url} /></div>
          <div className="colRight"><DisplayComments data={props.image.comments}/><SubmitComment id={props.image._id}/></div>
          </div>
          
         
=======
          <img class='img-fluid' alt="img" src={props.image.url} />
>>>>>>> 22dd065cc7352b3f16d7a4aab39ae05008be5208
        </Modal.Body>
        
        <Modal.Footer>
        {/* add the download functionality from backend*/}
        <button onClick={ () => handleDownload( props.image._id, "default")}><img src={download} className="downloadIcon"></img></button>
        {/* add like functionality from backend */}
        <div class='like'><i class='material-icons' onClick={ () => handleLike( props.image._id)}>favorite</i></div>
        <div>{props.image.no_of_likes}</div>
        {/* <button onClick={ () => handleLike( props.image._id)}><img src={like} className="likeIcon"></img></button> */}
     
        </Modal.Footer>
      </Modal>
    );
  }

  export default MyVerticallyCenteredModal;