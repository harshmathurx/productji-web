import ProductCard from '@/components/ProductCard';
import ShopCard from '@/components/ShopCard';
import { getAllStores, getProducts } from '@/utils/apiCalls';
import Head from 'next/head';

const API = process.env.NEXT_PUBLIC_API_URL;

export async function getServerSideProps(context) {
  let products = [];
  let shops = [];

  const resProducts = await getProducts()
  if(resProducts){
    products = resProducts
  }
  else{
    console.log("couldn't fetch products")
  }

  const resShops = await getAllStores()
  if(resShops){
    shops = resShops
  }
  else{
    console.log("couldn't fetch shops")
  }

  return {
    props: {
      products: products,
      shops: shops
    }
  }
}


export default function Home({ products, shops }) {
  const styles = {
    container: 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5',
    errorContainer: 'flex flex-col items-center justify-center h-screen'
  }

  return (
    <>
      <Head>
        <title>ProductJi</title>
        <meta property="og:title" content="ProductJi" />
        <meta name="description" content="Buy products from small businesses on ProductJi" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:description" content="Buy products from small businesses on ProductJi" />
      </Head>
      <main className='mx-4'>
        <div>
          <h1 className='text-4xl font-semibold my-5'>Featured Products</h1>
          {products?.length > 0 ? (
            <div className={styles.container}>
              {products.map((product) => {
                return <ProductCard key={product._id} product={product} />
              })}
            </div>
          ) : (
            <div className={styles.errorContainer}>
              <h1 className="text-2xl font-semibold">No Products Found</h1>
            </div>
          )}
        </div>
        <div>
          <h1 className='text-4xl font-semibold my-5'>Featured Shops</h1>
          {shops && (shops?.length > 0 ? (
            <div className={styles.container}>
              {shops?.map((shop) => {
                return <ShopCard key={shop._id} shop={shop} />
              })}
            </div>
          ) : (
            <div className={styles.errorContainer}>
              <h1 className="text-2xl font-semibold">No Shops Found</h1>
            </div>
          ))}
        </div>
      </main>
    </>
  )
}
