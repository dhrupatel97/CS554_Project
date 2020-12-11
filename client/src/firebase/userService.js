// import fire from '../fire';
import firebaseApp from './Firebase'

const createToken = async () => {
  const user = firebaseApp.auth().currentUser;
  const token = user && (await user.getIdToken());
  const payloadHeader = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  return payloadHeader;
}
