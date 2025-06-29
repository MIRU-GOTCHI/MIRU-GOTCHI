import { createTheme } from '@mui/material';

const theme = createTheme({
  typography: {
    fontFamily: 'Paperlogy, Roboto, Arial, sans-serif, DNFBitBitv2, Galmuri14',
    body1: {
      fontSize: '14px',
    },
  },
  palette: {
    primary: {
      main: '#5B93D5',
      // contrastText: "#fff"
    },
    secondary: {
      main: '#B0E501',
      // contrastText: "#FAFDFF"
    },
    error: {
      main: '#FF1010',
    },
    background: {
      default: '#fff',
      paper: '#F2F2F3',
    },
    text: {
      primary: '#050505',
      secondary: '#FAFDFF',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Paperlogy';
          src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/2408-3@1.0/Paperlogy-3Light.woff2') format('woff2');
          font-weight: 300;
          font-style: normal;
        }
        @font-face {
          font-family: 'Paperlogy';
          src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/2408-3@1.0/Paperlogy-4Regular.woff2') format('woff2');
          font-weight: 400;
          font-style: normal;
        }
        @font-face {
          font-family: 'Paperlogy';
          src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/2408-3@1.0/Paperlogy-5Medium.woff2') format('woff2');
          font-weight: 500;
          font-style: normal;
        }
        @font-face {
          font-family: 'Paperlogy';
          src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/2408-3@1.0/Paperlogy-6SemiBold.woff2') format('woff2');
          font-weight: 600;
          font-style: normal;
        }
        @font-face {
          font-family: 'Paperlogy';
          src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/2408-3@1.0/Paperlogy-7Bold.woff2') format('woff2');
          font-weight: 700;
          font-style: normal;
        }
        @font-face {
          font-family: 'Paperlogy';
          src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/2408-3@1.0/Paperlogy-8ExtraBold.woff2') format('woff2');
          font-weight: 800;
          font-style: normal;
        }
        @font-face{
          font-family:'DNFBitBitv2';
          src:url('//cdn.df.nexon.com/img/common/font/DNFBitBitv2.otf')format('opentype');
          font-style:normal;
          font-weight:400;
        }
        @font-face {
          font-family: 'Galmuri14';
          src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/2506-1@1.0/Galmuri14.woff2') format('woff2');
          font-weight: normal;
          font-style: normal;
        }
        `,
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#5B93D5',
          color: '#FAFDFF',
          fontFamily: 'Galmuri14',
          letterSpacing: '0.025em',
          '&:hover': {
            backgroundColor: '#4585d0',
            boxShadow: 'none',
          },
        },
        containedSecondary: {
          backgroundColor: '#B0E501',
          color: '#FAFDFF',
          boxShadow: 'none',
          '&:hover': {
            backgroundColor: '#a2d00a',
          },
        },
        containedError: {
          backgroundColor: '#FF1010',
          color: '#FAFDFF',
          boxShadow: 'none',
          '&:hover': {
            backgroundColor: '#d11818',
          },
        },
        sizeLarge: {
          padding: '8px 32px',
          fontWeight: 700,
          fontSize: '16px',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontWeight: '500',
          // "&.Mui-selected": {
          //   fontWeight: "500",
          // }
          // "&.contain": {
          //   backgroundColor: "#5B93D5",
          // }
          '&:focus': {
            outline: 'none',
          },
        },
        textColorPrimary: {
          color: 'rgba(5, 5, 5, 0.6)',
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: 'rgba(5,5,5,0.5)',
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          height: 24,
          border: '3px solid #000',
          borderRadius: 12,
          '& .MuiLinearProgress-bar': {
            borderRadius: 12,
          },
        },
      },
    },
  },
});

export default theme;
