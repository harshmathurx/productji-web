import ShopCard from "@/components/ShopCard";
import { getAllStores } from "@/utils/apiCalls";

const styles = {
    container: 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6',
    errorContainer: 'flex flex-col items-center justify-center h-screen'
}

export async function getServerSideProps(context) {
    let shops = await getAllStores();
    if (shops != undefined) {
        shops = JSON.parse(JSON.stringify(shops));

        return {
            props: {
                shops
            }
        }
    }
    else {
        return {
            props: {
                shops: []
            }
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