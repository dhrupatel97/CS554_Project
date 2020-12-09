import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Images from '../ImageList';

function MyVerticallyCenteredModal(props) {

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
        <a href={image.PHOTO_NAME} download="xyz">Click to download</a>
      <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-heart-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
      </svg>
        </Modal.Footer>
      </Modal>
    );
  }

  export default MyVerticallyCenteredModal;