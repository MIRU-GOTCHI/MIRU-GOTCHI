import { styled } from "styled-components";

import { characterImageMap } from "../../constants/characterImages";

import type { CharacterStatus } from "@models/character";

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
  minWidth: "50px",
  '@media (max-width: 600px)': { 
    padding: '1px 2px',
  },
});

const CharactersImage = ({ characterStatus, characterId, name}:CharactersImageProps) => {
  const charId = characterId;
  const charImages = charId ? characterImageMap[charId] : null;

  return (
    <div className="characterArea">
      {name && <Name className="fontBitBit nameTag">{name}</Name>}
      {charImages && characterStatus && (
        <img src={charImages[characterStatus?.growthStage]} alt={name} />
      )}
    </div>
  )
}

export default CharactersImage