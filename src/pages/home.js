import Hero from "../screens/Hero"
import Hotbids from "../screens/Hotbids"
import Collections from "../screens/Collections"
import Category from "../screens/Category";
import SellItems from "../screens/SellItems"

export default function Home(){
    return (
    <>
      <Hero />
      <Hotbids />
      <Collections/>
      <Category />
      <SellItems />
    </>
  );
}