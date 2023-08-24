import ShopCard from "@/components/ShopCard";
import { getAllStores } from "@/utils/apiCalls";

const styles = {
    container: 'container my-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5',
    errorContainer: 'flex flex-col items-center justify-center h-screen'
}

export async function getServerSideProps(context) {
    let shops = [];
  
    const resShops = await getAllStores()
    if(resShops){
      shops = resShops
    }
    else{
      console.log("couldn't fetch shops")
    }
  
    return {
      props: {
        shops: shops
      }
    }
}

const Shops = ({ shops }) => {
    return (shops?.length > 0 ? (
        <div className={styles.container}>
            {shops?.map((shop) => {
                return <ShopCard key={shop._id} shop={shop} />
            })}
        </div>
    ) : (
        <div className={styles.errorContainer}>
            <h1 className="text-2xl font-semibold">No Shops Found</h1>
        </div>
    ))
}
export default Shops