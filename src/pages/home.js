import Hero from "../screens/Hero"
import Hotbids from "../screens/Hotbids"
import Collections from "../screens/Collections"
import Category from "../screens/Category";
import SellItems from "../screens/SellItems"
import { useEffect, useState } from "react";
import { useLoadingContext } from '../hooks/useLoadingContext';
import { getFeaturedCollections, getHotBidItems, getPopularCollections } from "../adapters/backend";
import { toast } from 'react-toastify';
import { getPastTimeStamp } from "../common/CommonUtils";
import { CATEGORIES } from "../common/const";

export default function Home(){
  const { setLoading } = useLoadingContext();
  
  const [hotBitItems, setHotBitItems] = useState([]);
  const [popularCollections, setPopularCollections] = useState([]);
  const [featuredCollections, setFeaturedCollections] = useState([]);

  const getDashBoardData = async () => {
    setLoading(true);

    try {
      let hotBidItems = await getHotBidItems();
      if (!hotBidItems) {
        throw new Error('Getting hot bid items failed.');
      }

      setHotBitItems(hotBidItems.data.tokens);

      let popularCollections = await getPopularCollections(getPastTimeStamp(7));
      if (!popularCollections) {
        throw new Error('Getting popular collections failed.');
      }
      setPopularCollections(popularCollections.data.collections);

      let featuredCollections = await getFeaturedCollections(0);
      if (!featuredCollections) {
        throw new Error('Getting featured collections failed.');
      }
      setFeaturedCollections(featuredCollections.data.collections);
    } catch (err) {
      console.log(err);
      toast('Getting dashboard items failed.');
    }

    setLoading(false);
  }

  useEffect(() => {
    getDashBoardData();
  }, [])

    return (
    <>
      <Hero />
      <Hotbids items={hotBitItems}/>
      <Collections items={popularCollections} setItems={setPopularCollections}/>
      <Category items={featuredCollections} setItems={setFeaturedCollections}/>
      <SellItems />
    </>
  );
}