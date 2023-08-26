
import ProductCard from "@/components/ProductCard";
import Product from "@/utils/ProductSchema";

const styles = {
  container: 'container my-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5',
  errorContainer: 'flex flex-col items-center justify-center h-screen'
}

export async function getServerSideProps(context) {
  let products = [];

  // let order = req.query.order ? req.query.order : 'desc'
  // let sortBy = req.query.sortBy ? req.query.sortBy : 'createdAt'
  let order = 'desc'
  let sortBy = 'createdAt'

  products = await Product.find().populate("store").sort([[sortBy, order]])
  products = products.filter(product => { return product.store.isSubscribed == true });
  products.map(product => {
    product.store.hashed_password = undefined
    product.store.salt = undefined
    product.store.expiresAt = undefined
    product.store.email = undefined
  })

  products = JSON.parse(JSON.stringify(products));

  return {
    props: {
      products: products
    }
  }
}

const Products = ({ products }) => {
  return (products.length > 0 ? (
    <div className={styles.container}>
      {products.map((product) => {
        return <ProductCard key={product._id} product={product} />
      })}
    </div>
  ) : (
    <div className={styles.errorContainer}>
      <h1 className="text-2xl font-semibold">No Products Found</h1>
    </div>
  ))
}
export default Products