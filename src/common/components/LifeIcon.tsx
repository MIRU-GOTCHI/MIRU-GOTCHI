import FavoriteIcon from '@mui/icons-material/Favorite';
import styled from 'styled-components';

interface lifeProps {
  failCount?: number;
}

const LifeGroup = styled("div") ({
  color: '#FF1010',
  "&.life0": {
      color: '#F2F2F3',
  },
  "&.life1": {
      color: '#F2F2F3',
    "& svg:first-child" :{
      color: '#FF1010',
    } 
  },
  "&.life2": {
    "& svg:last-child" :{
      color: '#F2F2F3',
    } 
  },
  '& svg': {
    stroke: '#2a251e',
    strokeWidth: 2,
  },
});

const LifeIcon = ({failCount = 0}:lifeProps) => {
  let life = 3 - failCount;
  return (
    <LifeGroup className={`lifeGrop ${life <= 3 ? `life${life}`: ""}`}>
      <FavoriteIcon />
      <FavoriteIcon />
      <FavoriteIcon />
    </LifeGroup>
  )
}

export default LifeIcon