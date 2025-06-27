import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

import { auth } from '../firebase';

const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);

    return result.user;
  } catch (error) {
    console.error('Google 로그인ㅇㅇ 실패: ', error);
    throw error;
  }
};

export const logout = () => signOut(auth);
