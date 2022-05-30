import { styled, alpha } from '@mui/material/styles';

const Search = styled('div')(({ theme }) => ({
    border: 'solid 1px #E7E8EC',
    borderRadius: '15px',
    position: 'relative',
    backgroundColor: alpha(theme.palette.common.white, 1),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 1),
    },
    marginRight: theme.spacing(2),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));

export default Search;
