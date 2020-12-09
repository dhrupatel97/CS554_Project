import React from 'react';
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';
import Images from '../ImageList';
import Button from 'react-bootstrap/Button';
import MyVerticallyCenteredModal from './Image';


function ListImages(props) {
  let images=[];
 
   if(props.imageType==="home") {
    Images.map(re=>{    
      if(re.CATEGORY==="home")
      {
         images.push(re)
       }   
     })
  }else if(props.imageType==="outdoor") {
    Images.map(re=>{    
      if(re.CATEGORY==="outdoor")
      {
         images.push(re)
       }   
     })
  }else if(props.imageType==="office") {
    Images.map(re=>{    
      if(re.CATEGORY==="office")
      {
         images.push(re)
       }   
     })
  }else if(props.imageType==="all") {
    Images.map(re=>{    
      
      images.push(re)
     
  })
  }else {

    Images.map(re=>{
      if(re.POSTED_BY===props.imageType)
      {
        images.push(re)
      }
    })
    
  }
  
  const [modalShow, setModalShow] = React.useState(false);
  const [ID, setId] = React.useState('');
  
  function modal(id){
    setModalShow(true)
    setId(id)
  }
  
  return (
    
    <div> 
    
     <CardColumns>
    {
        images.map(re=>{

          return(
          
            
          <Card>
            
          <a className=" modalButton" onClick={() => modal(re.ID)} >
            <Card.Img variant="top" src={re.PHOTO_NAME} />
            </a>
            <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        id={ID}
        
      
      />

            
            <Card.Footer>
            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-down-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
              <path fill-rule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z"/>
            </svg>
            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-heart-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
            </svg>
              <p className="text-right text-muted">@{re.POSTED_BY}</p>
        </Card.Footer>      
          </Card>
          
        
        )})
        
    }
    
  </CardColumns> 
    </div>
  );}

export default ListImages;