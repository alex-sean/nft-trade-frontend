import { useState, useEffect } from 'react';
import CollectionTab from '../screens/CollectionTab';
import CollectionHero from '../screens/CollectionHero';
import { useParams } from 'react-router-dom';
import { useLoadingContext } from '../hooks/useLoadingContext';
import { getCollectionDetail, getTokensByCollection } from '../adapters/backend';
import { toast } from 'react-toastify';

export default function CollectionPage(){
  const { collectionAddress } = useParams();
  const [collectionInfo, setCollectionInfo] = useState();
  const [tokens, setTokens] = useState([]);

  const { setLoading } = useLoadingContext();

  const getInfo = async () => {
    setLoading(true);

    try {
      let collectionInfo = await getCollectionDetail(collectionAddress);
      if (!collectionInfo) {
        throw new Error('Getting User information failed.');
      }

      if (collectionInfo.data) {
        setCollectionInfo(collectionInfo.data.collection);
      }

      let tokens = await getTokensByCollection(collectionAddress);
      if (!tokens) {
        throw new Error('Getting User information failed.');
      }

      if (tokens.data) {
        setTokens(tokens.data.tokens);
      }
    } catch (err) {
      console.log(err);
      toast('Getting collection information failed.');
    }

    setLoading(false);
  }

  useEffect(() => {
    getInfo();
  }, [])

  return (
    <>
      <CollectionHero collection={collectionInfo}/>
      <CollectionTab tokens={tokens}/>
    </>
  );
}