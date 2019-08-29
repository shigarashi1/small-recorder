import firebase from 'firebase';
import config from '../configuration/config';
import { firebaseConfig } from '../../config/firebase';

export const firebaseApp = firebase.initializeApp(config.isDev ? firebaseConfig.dev : firebaseConfig.dev);
export const firebaseDb = firebaseApp.database();
