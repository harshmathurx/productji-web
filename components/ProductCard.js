import Image from 'next/image';
import Link from 'next/link';

const styles = {
    cardContainer: 'mb-4 flex-col flex items-center',
    card: 'h-80 w-64 cursor-pointer border bg-white rounded-2xl transition-all ease-in-out duration-300 hover:opacity-90 hover:scale-105 hover:border-0.01 border-solid',
    cardBody: 'flex-auto p-6',
    cardImage: 'mb-3 flex justify-center'
}

const ProductCard = ({ product }) => {
    return (
        <div className={styles.cardContainer}>
        <Link href={`/products/${product._id}`} style={{ textDecoration: "none" }}>
                <div className={styles.card} >
                    <div className='flex h-80 flex-col p-6 justify-between flex-wrap'>
                        {/* <ShowImage item={product} url="product" /> */}
                        <div className={styles.cardImage} >
                            <Image src={product.photo[0]} alt={product.name} priority={true} height={150} width={150} />
                        </div>
                        <div >
                            <h3 className='font-semibold'>{product.name.substring(0, 25) + "..."}</h3>
                            <p className='text-gray-500'>by - {product.store.name}</p>
                            <h3 className='font-semibold'>₹{product.price}</h3>
                            {/* <p>{product.description.substring(0, 35) + "..."}</p> */}
                        </div>
                    </div>
                </div>
        </Link>
            </div>
        // </div>
    )
}

export default ProductCard
