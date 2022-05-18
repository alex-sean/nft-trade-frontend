import { styled, alpha } from '@mui/material/styles';

const Search = styled('div')(({ theme }) => ({
    marginLeft: '8rem !important',
    border: 'solid 1px #000',
    borderRadius: '15px',
    position: 'relative',
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));

export default Search;
