import React from 'react';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import firebaseApp from '../firebase/Firebase';

  function SubmitComment (props) {
      console.log("id",props.id)
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
  
        const [comment, setComment] = React.useState('')
        const onChangeComment = (e) => {
            setComment(e.target.value)
        }
        

        const addComment = async (e) => {
            e.preventDefault();
            let header = await createToken();
            header.headers['Content-Type'] = 'application/json'
            let data= {
              "comment" : comment
            }
            axios.post(`/api/images/${props.id}/comments`, data, header)
            .then((res) => {
                console.log(res.data)
                props.comments( res.data.comments )
            })
            .catch((err) => {
                console.log(err)
            })

            setComment('');
        }
    
    
  
      return (
      <div >
        <form  onSubmit={addComment}>
     
          
          <textarea className="commentBox" type='text' name='comment' value={comment} onChange={onChangeComment} placeholder=' Add comment'/>
          <br></br>
          <button type='submit' className="submit1">Submit</button>
        </form>
      </div>
      );
    }

  
  export default SubmitComment;