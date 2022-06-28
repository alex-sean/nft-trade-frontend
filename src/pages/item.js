import { useParams } from 'react-router-dom';
import ItemHero from "../screens/ItemHero";

export default function Item() {
  const { collectionAddress, tokenID } = useParams();

  return (
    <>
      <ItemHero collectionAddress={collectionAddress} tokenID={tokenID}/>
      {/* <ItemCollection /> */}
    </>
  );
}