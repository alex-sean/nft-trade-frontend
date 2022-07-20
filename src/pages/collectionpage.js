import { useState, useEffect } from 'react';
import CollectionTab from '../screens/CollectionTab';
import CollectionHero from '../screens/CollectionHero';
import { useParams } from 'react-router-dom';
import { useLoadingContext } from '../hooks/useLoadingContext';
import { getCollectionDetail, getCollectionPrices, getTokensByCollection } from '../adapters/backend';
import { toast } from 'react-toastify';
import { SORT_TOKEN } from '../common/const';

export default function CollectionPage(){
  const { collectionAddress } = useParams();
  const [collectionInfo, setCollectionInfo] = useState();
  const [tokens, setTokens] = useState([]);
  const [prices, setPrices] = useState([]);

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

      let tokens = await getTokensByCollection(collectionAddress, SORT_TOKEN.PRICE_HIGH_TO_LOW, false, false);
      if (!tokens) {
        throw new Error('Getting User information failed.');
      }

      if (tokens.data) {
        setTokens(tokens.data.tokens);
      }

      let prices = await getCollectionPrices(collectionAddress);
      if (!prices) {
        throw new Error('Getting prices failed.');
      }

      if (prices.data) {
        setPrices(prices.data.prices);
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
      <CollectionTab tokens={tokens} setTokens= {setTokens} prices={prices}/>
    </>
  );
}