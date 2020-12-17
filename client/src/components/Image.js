import React from 'react';
import Modal from 'react-bootstrap/Modal';
import {Container, Row, Col} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Images from '../ImageList';
import download from '../imgs/download.png';
import like from '../imgs/notfill.svg';
import axios from 'axios'
import firebaseApp from '../firebase/Firebase';
import DisplayComments from './DisplayComments';
import SubmitComment from './SubmitComment';
import {DropdownButton, Dropdown} from 'react-bootstrap';
const FileDownload = require( 'js-file-download');

function MyVerticallyCenteredModal(props) {
//add single image backend route , id can be taken from props.id

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
  const handleDownload = (id, name, size) => {
    axios.get( `api/images/${id}/download?size=${size}`, { responseType: 'blob' } ).then( (response) =>{
      const fileName = "artsy-" + name + "-" + size + ".jpg"
      FileDownload( response.data, fileName);
    } )
  }

  const handleSelect = ( e, id, image) => {
    console.log( "Selected , " , e );
    handleDownload(id, image, e)
  }

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="example-modal-sizes-title-lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            <p>{props.image.image_name}</p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col xs={12} md={8}>
                <img class='img-fluid' alt="img" src={props.image.url} />  
              </Col>
              <Col xs={6} md={4}>
                <div><DisplayComments data={props.image.comments}/></div>
              </Col>
              <SubmitComment id={props.image._id}/>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
        <DropdownButton
                  alignRight
                  title = "Download"
                  variant="secondary"
                  id="dropdown-menu-align-right"
                  onSelect={(e) => handleSelect(e,props.image._id, props.image.image_name)}
                >
                  <Dropdown.Item eventKey="small">Small</Dropdown.Item>
                  <Dropdown.Item eventKey="default">Default</Dropdown.Item>
                  <Dropdown.Item eventKey="large">Large</Dropdown.Item>
              
                </DropdownButton>
        <div class='like'><i class='material-icons' onClick={ () => handleLike( props.image._id)}>favorite</i></div>
        <div>{props.image.no_of_likes}</div>     
        </Modal.Footer>
      </Modal>
    );
  }

  export default MyVerticallyCenteredModal;