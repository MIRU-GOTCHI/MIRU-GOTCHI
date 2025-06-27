import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import styled from "styled-components";


import RabbitBackground from '../../assets/images/background/rabbit-background.png';
import CatAdult from "../../assets/images/character/cat/cat-adult.png";
import CatBaby from "../../assets/images/character/cat/cat-baby.png";
import CatEgg from "../../assets/images/character/cat/cat-egg.png";
import DogAdult from "../../assets/images/character/dog/dog-adult.png";
import DogBaby from "../../assets/images/character/dog/dog-baby.png";
import DogEgg from "../../assets/images/character/dog/dog-egg.png";
import RabbitBaby from "../../assets/images/character/rabbit/rabbit-baby.png";
import RabbitEgg from "../../assets/images/character/rabbit/rabbit-egg.png";
import RabbitTeen from "../../assets/images/character/rabbit/rabbit-teen.png";
import DogTeen from "../../assets/images/character/dog/dog-teen.png";
import CatTeen from "../../assets/images/character/cat/cat-teen.png";
import HamsterEgg from "../../assets/images/character/hamster/hamster-egg.png";
import HamsterBaby from "../../assets/images/character/hamster/hamster-baby.png";
import HamsterTeen from "../../assets/images/character/hamster/hamster-teen.png";
import HamsterAdult from "../../assets/images/character/hamster/hamster-adult.png";
import TitAdult from "../../assets/images/character/tit/tit-adult.png";
import TitBaby from "../../assets/images/character/tit/tit-baby.png";
import TitEgg from "../../assets/images/character/tit/tit-egg.png";
import TitTeen from "../../assets/images/character/tit/tit-teen.png";
import DogBackground from '../../assets/images/background/dog-background.png';
import CatBackground from '../../assets/images/background/cat-background.png';
import HamsterBackground from '../../assets/images/background/hamster-background.png';
import TitBackground from '../../assets/images/background/tit-background.png';
import RabbitAdult from "../../assets/images/character/rabbit/rabbit-adult.png";

import type { CharacterStatus } from "@models/character";


interface CharacterProps {
  failCount?: number,
  title?: string,
  characterStatus?: CharacterStatus,
  totalDays?: number,
  successCount?: number,
  characterId?: string,
}

const CharacterContent = styled("div") ({
  height: "100%",
  padding: "20px",
  textAlign: "center",
  width: "100%",
  maxWidth: "500px",
  margin: "0 auto",
  "& .characterBg": {
    width: "100%",
  },
  "&.rabbit .character": {
    left: "25%",
    top: "37%",
  },
  "&.dog .character": {
    "& .bubble":{
      right: "40%",
    },
    left: "47%",
    top: "40%",
  },
  "&.cat .character": {
    left: "20%",
    top: "23%",
  },
  "&.tit .character": {
    "& .bubble":{
      right: "20%",
    },
    left: "57%",
    top: "40%",
  },
  "&.hamster .character": {
    "& .bubble":{
      right: "20%",
    },
    left: "56%",
    top: "37%",
  }
})

const CharacterField = styled("div") ({
   position: "relative",
})

const Life = styled("div") ({
  position: "absolute",
  top: "10%",
  right: "10%",
  color: "#FF1010",
  textAlign: "right",
  "& svg":{
    width: "10%",
    height: "10%",
    stroke: "#2a251e",
    strokeWidth: 2,
  }
})

const Character = styled("div") ({
  position: "absolute",
  width: "40%",
  "& img": {
    width: "100%",
  }
})

const Name = styled("div") ({
  position: "absolute",
  bottom: "-8%",
  left: "50%",
  transform: "translateX(-50%)",
  padding: "2px 5px",
  borderRadius: "3px",
  background: "#050505",
  color: "#fff",
  fontSize: "12px",
})

const RandomText = styled("div") ({
  position: "absolute",
  right: 0,
  top: "-5%",
  width: "110%",
  padding: "2px 5px",
  border: "2px solid #000", 
  borderRadius: "4px",
  backgroundColor: "rgba(255,255,255,0.7)",
})

const InfoField = styled("div") ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
})

const LevelBox = styled("div") ({
  marginTop: "15px",
  display: "flex",
  textAlign: "left",
  alignItems: "center",
  gap: 10,
  justifyContent: "center",
  width: "90%",
})

const Level = styled("div") ({
  width: "35px",
  flexShrink: 0,
})

const LevelBar = styled("div") ({
  flexGrow: 1,
})

const Title = styled("div") ({
  marginTop: "10px",
  fontSize: "22px",
})


const CharacterBox = ({failCount, title, characterStatus, characterId
, totalDays, successCount}:CharacterProps) => {
  return (
    // className : rabbit hamster tit dog cat
    <CharacterContent className="cat">
      <CharacterField>
        <Life>
          <FavoriteIcon />
          <FavoriteIcon />
          <FavoriteIcon />
        </Life>
        <Character className="character">
          <Name className="fontBitBit">레이토</Name>
          <RandomText className="fontGalmuri bubble">습관은 습관으로 극복할 수 있다.</RandomText>
          {/* <img src={RabbitEgg} alt=""/> */}
          {/* <img src={RabbitBaby} alt=""/> */}
          {/* <img src={RabbitTeen} alt=""/> */}
          {/* <img src={RabbitAdult} alt=""/> */}

          {/* <img src={DogEgg} alt=""/> */}
          {/* <img src={DogBaby} alt=""/> */}
          {/* <img src={DogTeen} alt=""/> */}
          {/* <img src={DogAdult} alt=""/> */}

          {/* <img src={HamsterEgg} alt=""/> */}
          {/* <img src={HamsterBaby} alt=""/> */}
          {/* <img src={HamsterTeen} alt=""/> */}
          {/* <img src={HamsterAdult} alt=""/> */}

          {/* <img src={TitEgg} alt=""/> */}
          {/* <img src={TitBaby} alt=""/> */}
          {/* <img src={TitTeen} alt=""/> */}
          {/* <img src={TitAdult} alt=""/> */}

          {/* <img src={CatEgg} alt=""/> */}
          {/* <img src={CatBaby} alt=""/> */}
          <img src={CatTeen} alt=""/>
          {/* <img src={CatAdult} alt=""/> */}

        </Character>
        {/* <img src={RabbitBackground} alt="" className="characterBg"/> */}
        {/* <img src={DogBackground} alt="" className="characterBg"/> */}
        {/* <img src={HamsterBackground} alt="" className="characterBg"/> */}
        {/* <img src={TitBackground} alt="" className="characterBg"/> */}
        <img src={CatBackground} alt="" className="characterBg"/>
      </CharacterField>

      <InfoField>
        <LevelBox>
          <Level className="fontBitBit">
            <span>Lv 2</span>
          </Level>
          <LevelBar>
            <LinearProgress variant="determinate" value={50} />
          </LevelBar>
        </LevelBox>
         <Title className="fontBitBit">"물 마시기"</Title>
      </InfoField>
    </CharacterContent>
  )
}

export default CharacterBox;