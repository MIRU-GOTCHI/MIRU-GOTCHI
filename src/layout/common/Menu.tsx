import HomeFilledIcon from '@mui/icons-material/HomeFilled';
import ListIcon from '@mui/icons-material/List';
import MarginIcon from '@mui/icons-material/Margin';
import ViewSidebarIcon from '@mui/icons-material/ViewSidebar';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
// import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
// import DensitySmallIcon from '@mui/icons-material/DensitySmall';
// import EditNoteIcon from '@mui/icons-material/EditNote';

const Menu = () => {
  const Menu = styled('nav')({
    position: 'fixed',
    left: 0,
    bottom: 0,
    width: '100%',
    height: '50px',
    backgroundColor: '#050505',
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
        // backgroundColor: "#5B93D5",
        // backgroundColor: "#050505",
      },
    },
  });
  return (
    <Menu>
      <NevList>
        <li>
          <NavLink to="/character">
            <MarginIcon />
            {/* <CatchingPokemonIcon/> */}
          </NavLink>
        </li>
        <li>
          <NavLink to="/">
            <HomeFilledIcon />
          </NavLink>
        </li>
        <li>
          <NavLink to="/habit">
            <ListIcon />
            {/* <DensitySmallIcon />
            <EditNoteIcon /> */}
          </NavLink>
        </li>
        <li>
          {/* 임시 가이드 메뉴 */}
          <NavLink to="/guide">
            <ViewSidebarIcon />
          </NavLink>
        </li>
      </NevList>
    </Menu>
  );
};

export default Menu;
