import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Box, Container, Tabs, Tab } from '@mui/material';
import useStyles from '../styles/styles';
import { Icon } from '@iconify/react';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import EarbudsIcon from '@mui/icons-material/Earbuds';
import ListAltIcon from '@mui/icons-material/ListAlt';
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import Paper from '@mui/material/Paper';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function CollectionTab(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="lg">
      <Tabs
      value={value}
      onChange={handleChange}
      aria-label="icon position tabs example"
      >
        <Tab {...a11yProps(0)} icon={<FormatListBulletedIcon />} iconPosition="start" label="Items" />
        <Tab {...a11yProps(1)} icon={<StackedLineChartIcon />} iconPosition="start" label="Activity" />
      </Tabs>
      <TabPanel value={value} index={0}>
        
      </TabPanel>
    </Container>
  );
}