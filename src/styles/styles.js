import { makeStyles } from '@mui/styles';
import { fontWeight } from '@mui/system';

const styles = (theme) => {
  const isDark = theme.palette.mode === 'dark'
  return {
    displayFlex: {display: 'flex', alignItems: 'center'},
    justifyBetween: {justifyContent: 'space-between'},
    justifyCenter: {justifyContent: 'center'},
    textCenter: {textAlign: 'center'},
    textLeft: {textAlign: 'left'},
    textRight: {textAlign: 'right'},
    mx16: {marginLeft: '16px', marginRight: '16px'}, 
    mx32: {marginLeft: '32px', marginRight: '32px'}, 
    my8: {marginTop: '8px', marginBottom: '8px'}, 
    my16: {marginTop: '16px', marginBottom: '16px'}, 
    my32: {marginTop: '32px', marginBottom: '32px'}, 
    mr32: {marginRight: '32px'},
    mr16: {marginRight: '16px'},
    mt32: {marginTop: '32px'},
    text: {
      color: `${isDark ? '#fff' : 'rgb(19, 23, 64)'}`,
      '&:hover': {
        color: 'rgb(131, 88, 255)'
      }, 
    },
    commonBackgroundColor: {backgroundColor: `rgb(${isDark ? '16, 20, 54' : '245, 248, 250'})`, backgroundSize: 'cover'},
    gradientBackground: {background:`${isDark ? 'rgb(16, 20, 54)' : 'url(images/gradient_light.jpg)'}`, backgroundSize: 'cover'},
    paperBackground: {backgroundColor:`${isDark? 'rgb(19, 23, 64)' : '#fff'}`},
    para: {
      color: `${isDark ? 'rgb(161, 162, 179)' : 'rgb(90, 93, 121)'}`,
      fontFamily: 'DM Sans,sans-serif'
    },
    whiteText: {
      color: `${!isDark ? '#fff' : 'rgb(19, 23, 64)'}`,
    },
    darkText: {
      color: `${isDark ? '#fff' : 'rgb(19, 23, 64)'}`,
    },
    borderColor: {
      border: `solid 1px ${isDark ? 'rgb(54 58 93)' : 'rgb(231 232 236)'}`,
    },

    commonButton: {
      padding: '8px',
      borderRadius: '8px',
      border: 'solid 1px rgb(231, 232, 236)',
      backgroundColor: `${isDark ? 'transparent' : '#fff'}`,
      color: `${isDark ? '#a1a2b3' : '#5A5D79'}`,
      '&:hover': {
        backgroundColor: 'rgb(131, 88, 255)',
        color: '#fff',
      },
    },
    hoverShadow: {
      '&:hover': {
        boxShadow: "0 0 transparent,0 0 transparent,0px 4px 6px -4px rgba(13,16,45,.1),0px 10px 15px -3px rgba(13,16,45,.1)",
      }
    },
    
    toolBar: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '1.5rem 6rem',
    },
    logo: {
      color: 'blue',
      cursor: 'pointer',
      maxHeight: '1.75rem',
    },
    link: {
      color: `${isDark ? '#fff' : '#000'}`,
      fontWeight: "700",
      fontSize: "1.2rem",
      marginRight: "1rem"
    },
    mobileLink: {
      color: `${isDark ? '#fff' : '#000'}`,
      fontWeight: "700",
      fontSize: "0.875rem",
      lineHeight: '32px',
    },
    menuIcon: {
      border:'solid 1px darkgray', 
      backgroundColor: `${isDark ? 'rgba(0, 0, 0, 0.1)' : '#fff'}`,
      color: `${isDark ? '#fff' : '#000'}`,
      width: '40px',
      height: '40px',
    },
    heroBox: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '-99px',
      paddingTop: '90px',
      backgroundImage: `url(images/gradient${isDark ? '_dark' : ''}.jpg)`,
      backgroundSize: 'cover',
    },
    animateFly: {
      position: 'absolute',
      right: '-4%',
      width: '100%',
      animation: '$fly 6s cubic-bezier(.75,.02,.31,.87) infinite',
    },
    "@keyframes fly": {
      '0%,to': {transform: 'translateY(5%)'},
      '50%': {transform: 'translateY(0)'}
    },

    primaryButton: {
      margin: '16px 16px 16px 0px',
      padding: '0.75rem 3rem 0.75rem 3rem',
      backgroundColor: '#8358ff',
      color: '#fff',
      borderRadius: '99px',
      boxShadow: "4px 5px 10px rgba(108,106,213,.25),inset 2px 2px 6px #a78df0,inset -5px -5px 10px #6336e4",
      '&:hover': {
        backgroundColor: '#8358ff',
      },
      fontWeight: '700'
    },
    secondaryButton: {
      padding: '0.75rem 3rem 0.75rem 3rem',
      backgroundColor: '#fff',
      color: '#8358ff',
      borderRadius: '99px',
      boxShadow: "5px 5px 10px rgba(108,106,212,.25),inset 2px 2px 6px #eef1f9,inset -5px -5px 10px #dfe3ef;",
      '&:hover': {
        backgroundColor: '#fff',
      },
      fontWeight: '700'
    },

    hotBids: {
      padding: '32px 0',
    },
    hotbidTitle: {
      color: `${isDark ? '#fff' : '#131740'}`,
      marginLeft: '0.25rem'
    },
    hotBidItem: {
      backgroundColor:`${isDark? 'rgb(19, 23, 64)' : '#fff'}`,
      border:'solid 1px rgba(0, 0, 0, 0.1)', 
      borderRadius:'1.25rem', 
      maxWidth: '230px', 
      padding: '1.1875rem',
      margin: 'auto'
    },
    hotBidPrice: {
      fontSize: '.875rem',
      fontWeight: '550',
      lineHeight: 'normal',
      marginLeft: '2px'
    },
    hotBidSubtitle: {
      fontSize: '.875rem',
      marginTop: '1rem',
      color: `${isDark ? '#a1a2b3' : '#5A5D79'}`,
    },
    hotBidPlaceBid: {
      fontWeight: '600',
      fontSize: '.875rem',
      color: '#8358ff'
    },
    hotBidLike: {
      fontSize: '.875rem',
      color: `${isDark ? '#a1a2b3' : '#5A5D79'}`,
      marginLeft: '2px'
    },

    collections: {
      flexGrow: 1, 
      minHeight: '400px', 
      textAlign:'center', 
      background:`${isDark ? 'rgb(16, 20, 54)' : 'url(images/gradient_light.jpg)'}`,
      backgroundSize: 'cover'
    },
    collectionTitle: {
      color: `${isDark ? '#fff' : '#131740'}`,
      marginLeft: '0.25rem'
    },
    collectionMenuItem: {
      fontWeight: '700'
    },
    trendingTitle: {
      color: `${isDark ? '#fff' : '#131740'}`,
      marginLeft: '0.25rem'
    },
    collectionItemTitle: {
      fontSize: '1rem',
      color: `${isDark ? '#fff' : '#131740'}`,
    },
    collectionSubtitle: {
      fontSize: '.875rem',
      marginTop: '1rem',
      color: `${isDark ? '#a1a2b3' : '#5A5D79'}`,
    },
    collectionBuy: {
      fontWeight: '600',
      fontSize: '.875rem',
      color: '#8358ff'
    },
    collectionHistory: {
      fontSize: '.875rem',
      fontWeight: '600',
      color: `${isDark ? '#a1a2b3' : '#5A5D79'}`,
      marginLeft: '2px'
    },

    sellItems: {
      flexGrow: 1, 
      background:`${isDark ? 'rgb(16, 20, 54)' : 'url(images/gradient_light.jpg)'}`,
      backgroundSize: 'cover',
      padding: '32px'
    },
    SellTitle: {
      color: `${isDark ? '#fff' : '#131740'}`,
    },

    formContainer: {
      flexGrow: 1,
      padding: '10px',
      maxWidth: '700px',
      margin: '30px auto',
      [theme.breakpoints.between('xs', 'sm')]: {
        width: '100%',
      },
    },
    form: {
      marginTop: '30px',
    },
    formHeading: {
      textAlign: 'center',
      color: `${isDark ? '#fff' : '#131740'}`,
      fontSize: '1.25rem'
    },

    footerContainer: {
      display: 'flex',
      alignItems: 'center',
      miHeight: '10vh',
      padding: '64px',
      justifyContent: 'center',
      flexDirection: 'column',
    },
    footerIcons: {
      color: `${isDark ? '#a1a2b3' : '#5A5D79'}`,
    },
    footerTitle: {
      fontSize: '.875rem',
      color: `${isDark ? '#fff' : '#131740'}`,
      marginBottom: '1.5rem',
      fontWeight: 'bold'
    },
    footerItem: {
      marginBottom: '5px',
      color: `${isDark ? '#a1a2b3' : '#5A5D79'}`,
      cursor: 'pointer',
      fontSize: '0.8rem',
      '&:hover': {
        color: '#8358ff'
      }, 
    },
    footerText: {
      paddingBottom: '10px',
    },

    gridContainer: {
      display: 'flex',
      alignItems: 'center',
      maxWidth: '1300px',
      padding: '50px',
    },
    title: {
      paddingBottom: '15px',
      color: `${isDark ? '#fff' : '#131740'}`
    },
    subtitle: {
      paddingBottom: '30px',
      color: '#6A6C86',
      fontSize: '1.25rem'
    },
    largeImage: {
      width: '100%',
    },
    footerDate: {
      opacity: '0.4',
    },

    itemHeroContainer: {
      width: '100%',
      display: 'flex',
      minHeight: '400px',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '30px 0px 50px 0px',
      background:`${isDark ? 'rgb(16, 20, 54)' : 'url(images/gradient_light.jpg)'}`,
      backgroundSize: 'cover',
    },
    itemHeroSubtitle: {
      opacity: '0.7',
      paddingBottom: '30px',
      fontSize: '18px',
    },
    collectionsPage:{
      background:`${isDark ? 'rgb(16, 20, 54)' : 'url(images/gradient_light.jpg)'}`,
      backgroundSize: 'cover'
    },
    
    sectionGridContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      width: '100%',
      // minHeight: '500px',
      marginTop: '0px',
      marginLeft: '0px',
    },
    sectionGridItem: {
      backgroundColor: '#f2f0f1',
      textAlign: 'center',
      padding: '30px',
      width: '200px',
      borderRadius: '10px',
      margin: '10px',
    },
    inputField: {
      marginBottom: '20px',
    },
    textArea: {
      width: '100%',
      marginBottom: '20px',
      fontSize: '16px',
      padding: '10px',
    },
    testimonialCard: {
      backgroundColor: '#fff',
      padding: '10px',
      minHeight: '200px',
      display: 'flex',
      alignItems: 'center',
    },
    testimonialStatement: {
      paddingBottom: '25px',
    },
    avatar: {
      marginRight: '10px',
    },
    testimonialPosition: {
      fontSize: '14px',
      opacity: '0.6',
    },
    rounded: {
      borderRadius: '0.625rem'
    },
    
    createItemTitle: {
      fontWeight: '700',
      color: `${isDark ? '#fff' : '#131740'}`,
      marginBottom: '0.5rem',
      marginTop: '0.5rem'
    },
    createItemDetail: {
      fontSize:'0.8125rem',
      color: `${isDark ? 'rgb(161 162 179)' : 'rgb(90 93 121)'}`,
    },
    fileUpload: {
      borderRadius: '0.5rem',
      border: 'solid 2px #E7E8EC',
    },
    inputBorder: {
      borderColor: '#E7E8EC',
      borderRadius: '0.5rem',
      padding: '0.5rem 1rem 0.5rem 1rem',
      font: 'inherit'
    },
    checkIconStyle: {
      position: 'absolute',
      left: '-10px',
      bottom: 0,
      background: '#fff',
      borderRadius: '99px',
    },
    darkCircleNumber: {
      position: 'absolute',
      left: '-10px',
      top: '14px',
      width: '24px',
      background: '#000',
      color: '#fff',
      borderRadius: '99px',
    },
    modalTitle: {
      display: 'flex'
    },
    modalCloseButton: {
      marginLeft: 'auto',
      marginRight: '0px'
    },
    modalProgressContent: {
      marginTop: 'auto',
      marginBottom: 'auto'
    },
    modalProgressBtn: {
      display: 'block',
      margin: '5px auto 15px auto',
      padding: '0.75rem 3rem 0.75rem 3rem',
      backgroundColor: '#8358ff',
      color: '#fff',
      borderRadius: '99px',
      boxShadow: "4px 5px 10px rgba(108,106,213,.25),inset 2px 2px 6px #a78df0,inset -5px -5px 10px #6336e4",
      '&:hover': {
        backgroundColor: '#8358ff',
      },
      fontWeight: '700'
    },
    modalProgressProcessedBtn: {
      display: 'block',
      margin: '5px auto 15px auto',
      padding: '0.75rem 3rem 0.75rem 3rem',
      backgroundColor: '#fff',
      color: '#8358ff',
      borderRadius: '99px',
      boxShadow: "5px 5px 10px rgba(108,106,212,.25),inset 2px 2px 6px #eef1f9,inset -5px -5px 10px #dfe3ef;",
      '&:hover': {
        backgroundColor: '#fff',
      },
      fontWeight: '700'
    },
    creatorLink: {
      border: `solid 1px ${isDark ? 'rgb(54 58 93)' : 'rgb(231 232 236)'} !important`,
      borderRadius: '999px', 
      width: '24px', 
      height: '24px'
    },
    ellipseText: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  };
};

const useStyles = makeStyles(styles);
export default useStyles;