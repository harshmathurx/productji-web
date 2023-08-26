import ProductCard from '@/components/ProductCard';
import ShopCard from '@/components/ShopCard';
import Product from '@/utils/ProductSchema';
import Store from '@/utils/StoreSchema';
import connectDB from '@/utils/connectDB';
import Head from 'next/head';

const API = process.env.NEXT_PUBLIC_API_URL;

export async function getServerSideProps(context) {
  await connectDB();

  // let order = req.query.order ? req.query.order : 'desc'
  // let sortBy = req.query.sortBy ? req.query.sortBy : 'createdAt'
  let order = 'desc'
  let sortBy = 'createdAt'

  let products = []
  let shops = [];

  products = await Product.find().populate("store").sort([[sortBy, order]])
  products = products.filter(product => { return product.store.isSubscribed == true });
  products.map(product => {
    product.store.hashed_password = undefined
    product.store.salt = undefined
    product.store.expiresAt = undefined
    product.store.email = undefined
  })

  shops = await Store.find().select(['-hashed_password','-email','-salt','-verified','-expiresAt'])

  products = JSON.parse(JSON.stringify(products));
  shops = JSON.parse(JSON.stringify(shops));
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
