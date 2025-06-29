import HomeFilledIcon from '@mui/icons-material/HomeFilled';
import ListIcon from '@mui/icons-material/List';
import MarginIcon from '@mui/icons-material/Margin';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
// import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
// import DensitySmallIcon from '@mui/icons-material/DensitySmall';
// import EditNoteIcon from '@mui/icons-material/EditNote';
const MenuContainer = styled('nav')({
  position: 'fixed',
  left: 0,
  bottom: 0,
  width: '100%',
  height: '50px',
  backgroundColor: '#050505',
  '@media (max-width:1279px)': {
    '& .name': {
      display: 'none',
    },
    '&.nameType': {
      height: '54px',
      '& li > a': {
        flexDirection: 'column',
        gap: '1px',
        '& .name': {
          display: 'block',
          fontSize: '10px',
        },
      },
    },
  },
  '@media (min-width:1280px)': {
    '&.menuList': {
      top: '70px',
      bottom: 'unset',
      backgroundColor: 'rgba(5,5,5,0.8)',
      '& li': {
        flexGrow: 'unset',
        minWidth: '140px',
        '&:nth-child(1)': {
          order: 3,
        },
        '&:nth-child(2)': {
          order: 1,
          minWidth: 'unset',
          '& .name': {
            display: 'none',
          },
        },
        '&:nth-child(3)': {
          order: 2,
        },
        '&:nth-child(4)': {
          order: 4,
        },
        '& > a': {
          gap: '10px',
          padding: '0 15px',
          '&:hover': {
            backgroundColor: 'rgba(91,147,213,0.8)',
          },
          '& .name': {
            fontSize: '16px',
            fontWeight: 600,
          },
        },
      },
    },
  },
});

const NevList = styled('ul')({
  display: 'flex',
  height: '100%',
  maxWidth: '1280px',
  minWidth: '320px',
  margin: '0 auto',

  '& li': {
    flexGrow: 1,
    '& a': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      color: '#fff',
      '&.active': {
        backgroundColor: 'rgba(91,147,213,0.8)',
      },
      // backgroundColor: "#5B93D5",
      // backgroundColor: "#050505",
    },
  },
});
const Menu = () => {
  return (
    <MenuContainer className="menuList nameType">
      <NevList>
        <li>
          <NavLink to="/character">
            <MarginIcon />
            <span className="name">캐릭터</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/">
            <HomeFilledIcon />
            <span className="name">홈</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/habit">
            <ListIcon />
            <span className="name">목표</span>
          </NavLink>
        </li>
        {/* <li> 
          <NavLink to="/guide">
            <ViewSidebarIcon />
            <span className='name'>가이드</span>
          </NavLink>
        </li> */}
      </NevList>
    </MenuContainer>
  );
};

export default Menu;
