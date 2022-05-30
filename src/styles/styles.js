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
    gradientBackground: {backgroundImage: `url(images/gradient${isDark ? '_dark' : ''}.jpg)`, backgroundSize: 'cover'},
    commonButton: {
      padding: '8px',
      borderRadius: '8px',
      backgroundColor: "#fff",
      color: '#5a5d79',
      '&:hover': {
        backgroundColor: 'rgb(131, 88, 255)',
        color: '#fff',
      },
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
      color: "#000",
      fontWeight: "700",
      fontSize: "1.2rem",
      marginRight: "1rem"
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
      marginTop: '-90px',
      paddingTop: '90px',
      backgroundImage: `url(images/gradient${isDark ? '_dark' : ''}.jpg)`
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
    hotBids: {
      padding: '32px 0',
    },
    hotBidItem: {
      border:'solid 1px rgba(0, 0, 0, 0.1)', 
      borderRadius:'1.25rem', 
      maxWidth: '230px', 
      padding: '1.1875rem',
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
      color: '#5A5D79'
    },
    hotBidPlaceBid: {
      fontWeight: '600',
      fontSize: '.875rem',
      color: '#8358ff'
    },
    hotBidLike: {
      fontSize: '.875rem',
      color: '#5A5D79',
      marginLeft: '2px'
    },
    collections: {
      flexGrow: 1, 
      minHeight: '400px', 
      textAlign:'center', 
      backgroundImage:`url(images/gradient_${theme.palette.mode}.jpg)`,
    },
    collectionTitle: {
      color: '#131740',
      marginLeft: '0.25rem'
    },
    collectionMenuItem: {
      fontWeight: '700'
    },
    trendingTitle: {
      color: '#131740',
      marginLeft: '0.25rem'
    },
    gridContainer: {
      display: 'flex',
      alignItems: 'center',
      maxWidth: '1300px',
      padding: '50px',
    },
    sellItems: {
      flexGrow: 1, 
      backgroundImage:`url(images/gradient_${theme.palette.mode}.jpg)`, 
      padding: '32px'
    },
    title: {
      paddingBottom: '15px',
      color: '#131740'
    },
    subtitle: {
      paddingBottom: '30px',
      color: '#6A6C86',
      fontSize: '1.25rem'
    },
    largeImage: {
      width: '100%',
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
    footerContainer: {
      display: 'flex',
      alignItems: 'center',
      miHeight: '10vh',
      padding: '64px',
      justifyContent: 'center',
      flexDirection: 'column',
    },
    footerText: {
      paddingBottom: '10px',
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
      backgroundImage:`url(images/gradient_${theme.palette.mode}.jpg)`,
    },
    itemHeroSubtitle: {
      opacity: '0.7',
      paddingBottom: '30px',
      fontSize: '18px',
    },
    collectionsPage:{
      backgroundImage:`url(images/gradient_${theme.palette.mode}.jpg)`,
      backgroundSize: 'cover'
    },
    collectionItemTitle: {
      fontSize: '1rem',
      marginTop: '1.75rem',
      color: '#131740'
    },
    collectionItemMore: {
      fontSize: '1rem',
      marginTop: '1.75rem',
      color: '#131740',
      fontWeight: '1000',
      cursor: 'pointer'
    },
    collectionSubtitle: {
      fontSize: '.875rem',
      marginTop: '1rem',
      color: '#5A5D79'
    },
    collectionBuy: {
      fontWeight: '600',
      fontSize: '.875rem',
      color: '#8358ff'
    },
    collectionHistory: {
      fontSize: '.875rem',
      fontWeight: '600',
      color: '#5A5D79',
      marginLeft: '2px'
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
      color: '#131740',
      fontSize: '1.25rem'
    },
    sectionGridContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
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
    hotbidTitle: {
      color: '#131740',
      marginLeft: '0.25rem'
    },
    SellTitle: {
      color: '#131740',
    },
    rounded: {
      borderRadius: '0.625rem'
    },
    footerIcons: {
      color: '#5A5D79'
    },
    footerTitle: {
      fontSize: '.875rem',
      color: '#131740',
      marginBottom: '1.5rem',
      fontWeight: 'bold'
    },
    footerItem: {
      marginBottom: '5px',
      color: '#505379',
      cursor: 'pointer',
      fontSize: '0.8rem',
      '&:hover': {
        color: '#8358ff'
      }, 
    },
    createItemTitle: {
      fontWeight: '700',
      color: '#131740',
      marginBottom: '0.5rem',
      marginTop: '0.5rem'
    },
    createItemDetail: {
      fontSize:'0.8125rem'
    },
    fileUpload: {
      borderRadius: '0.5rem',
      border: 'solid 2px #E7E8EC'
    },
    inputBorder: {
      borderColor: '#E7E8EC',
      borderRadius: '0.5rem',
      padding: '0.5rem 1rem 0.5rem 1rem',
      font: 'inherit'
    }
  };
};

const useStyles = makeStyles(styles);
export default useStyles;