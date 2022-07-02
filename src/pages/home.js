import Hero from "../screens/Hero"
import Hotbids from "../screens/Hotbids"
import Collections from "../screens/Collections"
import Category from "../screens/Category";
import SellItems from "../screens/SellItems"
import { useEffect, useState } from "react";
import { useLoadingContext } from '../hooks/useLoadingContext';
import { getHotBidItems } from "../adapters/backend";
import { toast } from 'react-toastify';

export default function Home(){
  const { setLoading } = useLoadingContext();
  
  const [hotBitItems, setHotBitItems] = useState([]);

  const getDashBoardData = async () => {
    setLoading(true);

    try {
      let hotBidItems = await getHotBidItems();
      if (!hotBidItems) {
        throw new Error('Getting hot bid items failed.');
      }

      setHotBitItems(hotBidItems.data.tokens);
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
      {/* <Collections/>
      <Category />
      <SellItems /> */}
    </>
  );
}