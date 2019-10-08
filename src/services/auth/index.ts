import { auth, TFirebaseUser } from '../../lib/firebase';
import { ApiError } from '../../models/ApiError';
import Logger from '../../helpers/generals/logger';
import { Nullable } from '../../types';

const signIn = async (email: string, password: string) => {
  return await auth.signInWithEmailAndPassword(email, password).catch(err => {
    return new ApiError('0002');
  });
};

const signUp = async (email: string, password: string) => {
  return await auth.createUserWithEmailAndPassword(email, password).catch(err => {
    return new ApiError('0003');
  });
};

const signOut = async () => {
  return await auth.signOut().catch(err => {
    return new ApiError('0004');
  });
};

const onAuthStateChanged = (
  next: (user: Nullable<TFirebaseUser>) => void,
  error: (err: any) => void,
  completed?: () => void,
) => {
  const subscription = auth.onAuthStateChanged(
    user => {
      next(user);
    },
    err => {
      Logger.log('changedUser error', err);
    },
  );
  return subscription;
};

export const AuthenticationService = {
  signIn,
  signUp,
  signOut,
  onAuthStateChanged,
};
