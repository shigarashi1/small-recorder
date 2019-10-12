import { auth, TFirebaseUser } from '../../lib/firebase';
import { ApiError } from '../../models/error';
import Logger from '../../helpers/generals/logger';
import { Nullable } from '../../types';

const signIn = async (email: string, password: string) => {
  return await auth.signInWithEmailAndPassword(email, password).catch(err => new ApiError(err));
};

const signUp = async (email: string, password: string) => {
  return await auth.createUserWithEmailAndPassword(email, password).catch(err => new ApiError(err));
};

const signOut = async () => {
  return await auth.signOut().catch(err => new ApiError(err));
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
