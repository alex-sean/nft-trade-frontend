import ItemHero from "../screens/ItemHero"
import ItemCollection from "../screens/ItemCollection"
import ItemTabs from '../components/ItemTabs';

export default function Item(){
    return (
    <>
      <ItemHero />
      <ItemTabs />
      <ItemCollection />
    </>
  );
}