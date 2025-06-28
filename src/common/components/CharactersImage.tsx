import type { CharacterStatus } from "@models/character";
import { characterImageMap } from "../../constants/characterImages";
import { styled } from "styled-components";

interface CharactersImageProps {
  characterId?: string;
  characterStatus?: CharacterStatus;
  name?: string;
}

const Name = styled('div')({
  position: 'absolute',
  bottom: '-8%',
  left: '50%',
  transform: 'translateX(-50%)',
  padding: '2px 5px',
  borderRadius: '3px',
  background: '#050505',
  color: '#fff',
  fontSize: '12px',
});

const CharactersImage = ({ characterStatus, characterId, name}:CharactersImageProps) => {
  const charId = characterId;
  const charImages = charId ? characterImageMap[charId] : null;

  return (
    <div className="characterArea">
      {name && <Name className="fontBitBit">{name}</Name>}
      {charImages && characterStatus && (
        <img src={charImages[characterStatus?.growthStage]} alt={name} />
      )}
    </div>
  )
}

export default CharactersImage