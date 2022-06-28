import CollectionTab from '../screens/CollectionTab';
import CollectionHero from '../screens/CollectionHero';
import { useParams } from 'react-router-dom';

export default function CollectionPage(){
  const { collectionAddress } = useParams();

  return (
    <>
      <CollectionHero />
      <CollectionTab />
    </>
  );
}