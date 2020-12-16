import React from 'react';
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';
import Images from '../ImageList';
import Button from 'react-bootstrap/Button';
import MyVerticallyCenteredModal from './Image';
import download from '../imgs/download.png';
import like from '../imgs/notfill.svg';
import Search from './Search';


function SearchImages(props) {
let temp=window.location.pathname.split("/");
let keyword=temp[2]  
let images=[];

Images.map(re=>{
  re.KEYWORDS.map(res=>{
    if (res===keyword)
    {
      images.push(re)
    }



  })
})


 
 console.log("ia", images)   
  
  const [modalShow, setModalShow] = React.useState(false);
  const [ID, setId] = React.useState('');
  
  function modal(id){
    setModalShow(true)
    setId(id)
  }
  

  return (
    
    <div> 
    
  <h2 className="searchTitle">{keyword} backgrounds</h2>
  
     <CardColumns>
    {
        images.map(re=>{
          return(         
          <Card>
            
          <a className=" modalButton" onClick={() => modal(re.ID)} >
            <Card.Img variant="top" src={re.PHOTO_NAME} />
            </a>
       
         
            <Card.Footer>
            {/*add download functionality from backend */}
            <a href={re.PHOTO_NAME} target="blank" download="xyz"><img src={download} className="downloadIcon"></img></a>
            {/*add like functionality from backend */}
        <img src={like} className="likeIcon"></img>
              <p className="text-right text-muted">@{re.POSTED_BY}</p>
        </Card.Footer>      
          </Card>
          
        
        )})
        
    }
    
  </CardColumns> 
    </div>
  );}

export default SearchImages;