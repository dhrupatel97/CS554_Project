import React from 'react';
import Card from 'react-bootstrap/Card';

  function DisplayComments (props) {
    
      return (
      <div>
        <h3>Comments</h3>
        {props.data.map(re=> {
          return(
            <div>
              <p>@{re.name}</p>
              <p>{re.comment}</p>
            </div>
  
          )}           
      )}
      </div>
      );
    }
  
  
  export default DisplayComments;