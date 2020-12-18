import React from 'react';

  function DisplayComments (props) {
    
      return (
      <div >
       
        <h4 className="comTitle">Comments</h4>
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