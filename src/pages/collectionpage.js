import useStyles from '../styles/styles';
import CollectionTab from '../screens/CollectionTab';
import CollectionHero from '../screens/CollectionHero';

export default function CollectionPage(){
  const classes = useStyles();
  return (
    <>
      <CollectionHero />
      <CollectionTab />
    </>
  );
}