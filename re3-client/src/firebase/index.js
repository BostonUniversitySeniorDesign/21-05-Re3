import FirebaseContext, { withFirebase } from './context';
import AuthContext, { AuthProvider } from './auth';
import Firebase from './firebase';

export { FirebaseContext, withFirebase };
export { AuthContext, AuthProvider };

const FirebaseInstance = new Firebase();
export default FirebaseInstance;
