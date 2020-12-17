import React from 'react';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import firebaseApp from '../firebase/Firebase';

  function SubmitComment (props) {
      console.log("id",props.id)
    const[commentList, setCommentList]=React.useState([]);
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
        const [name, setName] = React.useState('')
        const onChangeComment = (e) => {
            setComment(e.target.value)
        }
        

        const onUpload = async (e) => {
            
            //e.preventDefault()
            let header = await createToken();
            header.headers['Content-Type'] = 'application/json'
            let data= {
              //"name" : name,
              "comment" : comment
            }
           /* let data = new FormData() 
            data.append('name',name)
            data.append('comment', comment)*/
            axios.post(`/api/images/${props.id}/comments`, data, header)
            .then((res) => {
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err)
            })

            setComment('');
        }
    
    
  
      return (
      <div>
        <form class="registration-form" onSubmit={onUpload}>
          <br/>
          <label >
          <textarea className="commentBox" type='text' name='comment' value={comment} onChange={onChangeComment} placeholder=' Add comment'/>
          </label>
          <button type='submit' className="submit">Submit</button>
        </form>
      </div>
      );
    }

  
  export default SubmitComment;