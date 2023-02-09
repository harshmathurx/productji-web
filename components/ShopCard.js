import Image from 'next/image';
import Link from 'next/link';

const styles = {
    cardContainer: 'mb-4 flex-col flex items-center',
    card: 'h-80 w-64 cursor-pointer border bg-white rounded-2xl transition-all ease-in-out duration-300 hover:opacity-90 hover:scale-105 hover:border-0.01 border-solid',
    cardBody: 'flex-auto p-6',
    cardImage: 'mb-3 flex justify-center'
}

const ShopCard = ({ shop }) => {
    return (
        <Link href={`/shops/${shop._id}`} style={{ color: "black", textDecoration: "none" }}>
            <div className={styles.cardContainer}>
                <div className={styles.card}>
                    <div className={styles.cardBody}>
                        {/* <ShowImage item={product} url="product" /> */}
                        <div className='mb-3 flex justify-center rounded-full' >
                            <Image src='/placeholder.png' alt={shop?.name} width={200} height={200} />
                            {/* (shop?.photo ? <Image src={shop?.photo} alt={shop?.name} width={200} height={200} /> : <Image src='/placeholder.png' alt={shop?.name} width={200} height={200} />) */}
                        </div>
                        <div >
                            <h3 className='font-semibold'>{shop?.name}</h3>
                            <p>{shop?.about?.substring(0, 50) + "..."}</p>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
        // </div>
    )
}

export default ShopCard
