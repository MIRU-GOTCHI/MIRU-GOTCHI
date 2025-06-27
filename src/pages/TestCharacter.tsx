import { getAllCharacters } from '@service/characterService.ts/getAllCharacterType';
import { getCharacter } from '@service/characterService.ts/getCharacter';
import { useState } from 'react';

import type { Character } from '@models/character';

const TestCharacter = () => {
  const [characterId, setCharacterId] = useState('');
  const [character, setCharacter] = useState<Character | null>(null);
  const [allCharacters, setAllCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFetchCharacter = async () => {
    setLoading(true);
    setError(null);
    setCharacter(null);
    setAllCharacters([]);

    try {
      const result = await getCharacter(characterId);
      if (result) {
        setCharacter(result);
      } else {
        setError('캐릭터를 찾을 수 없습니다.');
      }
    } catch (err) {
      setError('에러 발생: ' + String(err));
    } finally {
      setLoading(false);
    }
  };

  const handleFetchAllCharacters = async () => {
    setLoading(true);
    setError(null);
    setCharacter(null);
    setAllCharacters([]);

    try {
      const results = await getAllCharacters();
      setAllCharacters(results);
    } catch (err) {
      setError('에러 발생: ' + String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Character 테스트</h2>

      <div>
        <input
          type="text"
          value={characterId}
          onChange={(e) => setCharacterId(e.target.value)}
          placeholder="Character ID 입력"
        />
        <button onClick={handleFetchCharacter} disabled={loading || !characterId}>
          개별 조회
        </button>
      </div>

      <div>
        <button onClick={handleFetchAllCharacters} disabled={loading}>
          전체 캐릭터 불러오기
        </button>
      </div>

      {error && <p>{error}</p>}

      {character && (
        <div>
          <h3>단일 캐릭터</h3>
          <p>ID: {character.id}</p>
          <p>이름: {character.name}</p>
          <p>타입: {character.type}</p>
          <p>설명: {character.description}</p>
        </div>
      )}

      {allCharacters.length > 0 && (
        <div>
          <h3>전체 캐릭터 목록</h3>
          {allCharacters.map((char) => (
            <div key={char.id}>
              <p>ID: {char.id}</p>
              <p>이름: {char.name}</p>
              <p>타입: {char.type}</p>
              <p>설명: {char.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TestCharacter;
