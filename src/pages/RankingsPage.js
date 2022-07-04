import React, { useEffect, useState } from 'react';
import { Typography, Box, Container, Paper, Button,
         Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';
import useStyles from '../styles/styles';
import { styled } from '@mui/material/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useLoadingContext } from '../hooks/useLoadingContext';
import { getCollections } from '../adapters/backend';
import { toast } from 'react-toastify';
import CategoryFilter from '../screens/CategoryFilter';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.mode === 'dark'? 'rgb(54 58 93)' : 'rgb(244 244 246)',
    color: theme.palette.mode === 'dark'? theme.palette.common.white : 'rgb(19 23 64)',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

function createData(img, checked, name, calories, fat, carbs, protein) {
  return { img, checked, name, calories, fat, carbs, protein };
}

const rows = [
  createData('avatars/avatar_1.jpg', true, 'Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('avatars/avatar_2.jpg', false, 'Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('avatars/avatar_3.jpg', false, 'Eclair', 262, 16.0, 24, 6.0),
  createData('avatars/avatar_4.jpg', false, 'Cupcake', 305, 3.7, 67, 4.3),
  createData('avatars/avatar_5.jpg', true, 'Gingerbread', 356, 16.0, 49, 3.9),
];

export default function RankingsPage(props) {
  const classes = useStyles();
  const [category, setCategory] = useState(0);
  const [collections, setCollections] = useState([]);
  const { setLoading } = useLoadingContext();

  const getCollectionsByCategory = async (category) => {
    setLoading(true);

    try {
      let collections = await getCollections(category);
      if (!collections) {
        throw new Error('Getting owned tokens failed.');
      }
      setCollections(collections.data.collections);
    } catch (err) {
      toast('Getting collections failed.');
    }

    setLoading(false);
  }

  useEffect(() => {
    getCollectionsByCategory(0);
  }, [])
  
  useEffect(() => {
    getCollectionsByCategory(category);
  }, [category])

  return (
    <Container maxWidth="lg">
      <Typography my={5} align='center' variant='h4'>Rankings</Typography>

      <CategoryFilter setCategory={setCategory} category={category}/>
      <TableContainer className={`${classes.paperBackground} ${classes.mt32}`} component={Paper}>
        <Table sx={{ minWidth: 650, width:'100%' }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Collection</StyledTableCell>
              <StyledTableCell align="right">Calories</StyledTableCell>
              <StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
              <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
              <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row" sx={{display: 'flex', alignItems: 'center'}}>
                    <Box ml={2} sx={{position: 'relative'}}>
                      <img src={`images/${row.img}`} style={{borderRadius: '10px', width: '48px'}} />
                      {
                        row.checked && 
                        <CheckCircleIcon className={classes.checkIconStyle} sx={{position: 'absolute', color: 'limegreen'}} />
                      }
                    </Box>
                    <Box sx={{textAlign:'start', marginLeft:'16px'}}>
                      <Typography sx={{fontWeight:'500', fontSize:'1.2rem'}}>{row.name}</Typography>
                    </Box>
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}