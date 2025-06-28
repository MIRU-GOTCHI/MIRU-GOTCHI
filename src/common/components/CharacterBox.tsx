import FavoriteIcon from '@mui/icons-material/Favorite';
import LinearProgress from '@mui/material/LinearProgress';
import styled from 'styled-components';

import CatBackground from '../../assets/images/background/cat-background.png';
import DogBackground from '../../assets/images/background/dog-background.png';
import HamsterBackground from '../../assets/images/background/hamster-background.png';
import RabbitBackground from '../../assets/images/background/rabbit-background.png';
import TitBackground from '../../assets/images/background/tit-background.png';

// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import type { CharacterStatus } from '@models/character';
import CharactersImage from './CharactersImage';
import LifeIcon from './LifeIcon';

interface CharacterProps {
  failCount?: number;
  title?: string;
  characterStatus?: CharacterStatus;
  totalDays?: number;
  successCount?: number;
  characterId?: string;
  bubbleTalk?: string;
}

const CharacterContent = styled('div')({
  height: '100%',
  padding: '20px',
  textAlign: 'center',
  width: '100%',
  maxWidth: '500px',
  margin: '0 auto',
  '& .characterBg': {
    width: '100%',
  },
  '&.rabbit .character': {
    left: '25%',
    top: '37%',
  },
  '&.dog .character': {
    '& .bubble': {
      right: '40%',
    },
    left: '47%',
    top: '40%',
  },
  '&.cat .character': {
    left: '20%',
    top: '23%',
  },
  '&.tit .character': {
    '& .bubble': {
      right: '20%',
    },
    left: '57%',
    top: '40%',
  },
  '&.hamster .character': {
    '& .bubble': {
      right: '20%',
    },
    left: '56%',
    top: '37%',
  },
});

const CharacterField = styled('div')({
  position: 'relative',
});

const LifeArea = styled('div')({
  position: 'absolute',
  top: '10%',
  right: '10%',
  textAlign: 'right',
  '& svg': {
    width: '10%',
    height: '10%',
  },
});

const Character = styled('div')({
  position: 'absolute',
  width: '40%',
  '& img': {
    width: '100%',
  },
});

const RandomText = styled('div')({
  position: 'absolute',
  right: 0,
  top: '-5%',
  width: '110%',
  padding: '2px 5px',
  border: '2px solid #000',
  borderRadius: '4px',
  backgroundColor: 'rgba(255,255,255,0.7)',
});

const InfoField = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

const LevelBox = styled('div')({
  marginTop: '15px',
  display: 'flex',
  textAlign: 'left',
  alignItems: 'center',
  gap: 10,
  justifyContent: 'center',
  width: '90%',
});

const Level = styled('div')({
  width: '35px',
  flexShrink: 0,
});

const LevelBar = styled('div')({
  flexGrow: 1,
});

const Title = styled('div')({
  marginTop: '10px',
  fontSize: '22px',
});

const CharacterBox = ({
  failCount,
  title,
  characterStatus,
  characterId,
  totalDays,
  successCount,
  bubbleTalk,
}: CharacterProps) => {
  const characterType: { character: string; name: string; class: string, bg: string }[] = [
    { character: "DZ1OHxn48Z5zRwtt50TP", name: '미루찌', class: 'hamster', bg: HamsterBackground},
    { character: "bEFnSlfFSbK9QVq0arjT", name: '레이토', class: 'rabbit', bg: RabbitBackground},
    { character: "YYlClvXJADbJO9ru1VG3", name: '늦장멍', class: 'dog', bg: DogBackground},
    { character: "cJb5qHB1Z7GFm79SCitA", name: '나중삐', class: 'tit', bg: TitBackground},
    { character: "t0vhk3H3NCZACFLL7c0s", name: '미루냥', class: 'cat', bg: CatBackground},
  ];

  const totalProgressValue = successCount && totalDays ? (successCount / totalDays) * 100 : 0;
  const characterLevel = characterStatus ? characterStatus.level : 0;

  let characterData = characterType.find((item) => {
    return item.character === characterId;
  })


  return (
    // className : rabbit hamster tit dog cat
    <CharacterContent className={`${characterStatus?.growthStage} ${characterData?.class}`}>
      <CharacterField>
        <LifeArea>
          <LifeIcon failCount={failCount}/>
        </LifeArea>
        <Character className="character">
          
          {bubbleTalk && <RandomText className="fontGalmuri bubble">{bubbleTalk}</RandomText>}

          <CharactersImage characterId={characterId} characterStatus={characterStatus} name={characterData?.name}/>
        </Character>
        <img src={characterData?.bg} alt="" className="characterBg" />
      </CharacterField>

      <InfoField>
        <LevelBox>
          <Level className="fontBitBit">
            <span>Lv {characterLevel}</span>
          </Level>
          <LevelBar>
            <LinearProgress variant="determinate" value={totalProgressValue} />
          </LevelBar>
        </LevelBox>
        {title && <Title className="fontBitBit">{`"${title}"`}</Title>}
      </InfoField>
    </CharacterContent>
  );
};

export default CharacterBox;
