
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/utils/apiCalls";

const styles = {
  container: 'container my-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5',
  errorContainer : 'flex flex-col items-center justify-center h-screen'
}

export async function getServerSideProps(context) {
  let products = await getProducts()
  if (products != undefined) {
    products = JSON?.parse(JSON?.stringify(products));

    return {
      props: {
        products
      }
    }
  }
  else {
    return {
      props: {
        products: []
      }
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