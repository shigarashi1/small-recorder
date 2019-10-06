import { auth } from '../../lib/firebase';
import { ApiError } from '../../models/ApiError';
import Logger from '../../helpers/generals/logger';

const signIn = async (email: string, password: string) => {
  return await auth.signInWithEmailAndPassword(email, password).catch(err => {
    Logger.error('signIn', err);
    return new ApiError('0002');
  });
};

const signUp = async (email: string, password: string) => {
  return await auth.createUserWithEmailAndPassword(email, password).catch(err => {
    Logger.error('signUp', err);
    return new ApiError('0003');
  });
};

const signOut = async () => {
  return await auth.signOut().catch(err => {
    Logger.error('signOut', err);
    return new ApiError('0004');
  });
};

export const AuthenticationService = {
  signIn,
  signUp,
  signOut,
};
