import React from 'react';

  function DisplayComments (props) {
    
      return (
      <div >
       <br></br>
        <h4>Comments</h4>
        <hr></hr>
        <div class='comments'>
        {props.data.map(re=> {
          return(
            <div class='each-comment'>
              <p>@{re.name}</p>
              <p>{re.comment}</p>
              <hr></hr>
            </div>
          )}           
      )}
      </div>
      <hr></hr>
      </div>
      );
    }
  
  
  export default DisplayComments;