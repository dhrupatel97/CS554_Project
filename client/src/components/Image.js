import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Images from '../ImageList';
import download from '../imgs/download.png';
import like from '../imgs/like.png';

function MyVerticallyCenteredModal(props) {
//add single image backend route , id can be taken from props.id
    let image={};
    let posterName="tejashree";

    Images.map(re=>{
        if(re.ID===props.id)
        {
            image=re
        }
    })

    
    
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <p>@{image.POSTED_BY}</p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        
          
          <img className="modalImage" variant="top" src={image.PHOTO_NAME} />
         
        </Modal.Body>
        <Modal.Footer>
        {/* add the download functionality from backend*/}
        <a href={image.PHOTO_NAME} target="blank" download="xyz"><img src={download} className="downloadIcon"></img></a>
        {/* add like functionality from backend */}
        <img src={like} className="likeIcon"></img>
     
        </Modal.Footer>
      </Modal>
    );
  }

  export default MyVerticallyCenteredModal;