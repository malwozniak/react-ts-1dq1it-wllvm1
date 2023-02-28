import firebase from 'firebase';

const configDB = {
  databaseURL: 'https://aniamate-app-default-rtdb.firebaseio.com/',
  projectId: 'aniamate-app',
  storage: 'gs://aniamate-app.appspot.com',
};

const app = firebase.initializeApp(configDB);

export const db = app.firestore();
