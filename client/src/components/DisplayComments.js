import React from 'react';
import Card from 'react-bootstrap/Card';

  function DisplayComments (props) {
    
      return (
      <div>
        <h3>Comments</h3>
        {props.data.map(re=>           
      
        <Card>
        <Card.Header>@{re.name}</Card.Header>
        <Card.Body>
          
          <Card.Text>
            {re.comment}
          </Card.Text>
          
        </Card.Body>
      </Card>
      )}

       
        
      </div>
      );
    }
  
  
  export default DisplayComments;