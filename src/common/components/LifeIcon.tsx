// import FavoriteIcon from '@mui/icons-material/Favorite';
import styled from 'styled-components';
import FullHeart from '../../assets/images/fullHeart.png';
import emptyHeart from '../../assets/images/emptyHeart.png';

interface lifeProps {
  failCount?: number;
}

const LifeGroup = styled("div") ({
  // color: '#FF1010',
  // "&.life0": {
  //     color: '#F2F2F3',
  // },
  // "&.life1": {
  //     color: '#F2F2F3',
  //   "& svg:first-child" :{
  //     color: '#FF1010',
  //   } 
  // },
  // "&.life2": {
  //   "& svg:last-child" :{
  //     color: '#F2F2F3',
  //   } 
  // },
  // '& svg': {
  //   stroke: '#2a251e',
  //   strokeWidth: 2,
  // },
  display: "flex",
  gap: "7px",
});

const LifeIcon = ({failCount = 0}:lifeProps) => {
  const life = 3 - failCount;
  return (
    // <LifeGroup className={`lifeGrop ${life <= 3 ? `life${life}`: ""}`}>
    <LifeGroup>
      <img src={life >= 1 ? FullHeart : emptyHeart} alt="" />
      <img src={life >= 2 ? FullHeart : emptyHeart} alt="" />
      <img src={life >= 3 ? FullHeart : emptyHeart} alt="" />
    </LifeGroup>
  )
}

export default LifeIcon