import Firebase from 'firebase';
import config from '../../config';
Firebase.initializeApp(config);

function FirebaseService() {
  return Firebase;
}

export default FirebaseService;
