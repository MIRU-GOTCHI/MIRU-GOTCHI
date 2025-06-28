import { doc, getDoc } from 'firebase/firestore';

import { db } from '../../firebase';

import type { Character } from '@models/character';

export const getCharacter = async (characterId: string): Promise<Character | null> => {
  try {
    const characterRef = doc(db, 'characters', characterId);
    const characterDoc = await getDoc(characterRef);

    if (!characterDoc.exists()) return null;

    const data = characterDoc.data();

    const character: Character = {
      id: characterId,
      name: data.name,
      type: data.type,
      description: data.description,
    };

    return character;
  } catch (error) {
    console.error('Failed to fetch character:', error);
    return null;
  }
};
