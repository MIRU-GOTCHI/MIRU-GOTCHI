import { collection, getDocs } from 'firebase/firestore';

import { db } from '../../firebase';

import type { Character } from '@models/character';

export const getAllCharacters = async (): Promise<Character[]> => {
  const charactersRef = collection(db, 'characters');
  const querySnapshot = await getDocs(charactersRef);

  return querySnapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      }) as Character,
  );
};
