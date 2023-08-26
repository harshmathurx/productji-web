import ProductCard from "@/components/ProductCard";
import StructuredData from "@/components/StructuredData";
import Product from "@/utils/ProductSchema";
import Store from "@/utils/StoreSchema";
import { getProductsByShop, getShop } from "@/utils/apiCalls";
import connectDB from "@/utils/connectDB";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

const styles = {
    container: 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6',
    errorContainer: 'flex flex-col items-center justify-center h-screen'
}

export async function getServerSideProps(context) {

    await connectDB()

    let shop = {}
    let products = []
    let shopId = context.params.shopId

    shop = await Store.findById(shopId).select(['-hashed_password', '-salt', '-isSubscribed'])
    shop = JSON.parse(JSON.stringify(shop))

    products = await Product.find({ store: shopId })
    products = JSON.parse(JSON.stringify(products))

    return {
        props: {
            shop: shop,
            products: products
        }
    }
}

const Shop = ({ shop, products }) => {

    const data = {
        '@context': 'https://schema.org',
        '@type': 'Store',
        name: `${shop?.name}`,
        description: `${shop?.about}`,
        address: {
            '@type': 'PostalAddress',
            addressRegion: `${shop?.city}`,
        },
        telephone: `${shop?.phone}`,
    }

    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <title>{shop.name} | ProductJi</title>
                <meta property="og:title" content={`${shop.name} | ProductJi`} />
                <meta name="description" content={shop?.about} />
                <meta property="og:description" content={shop?.about} />
                <meta property="og:type" content="ecommerce" />
                <meta property="og:site_name" content="ProductJi" />
                {/* <meta property="og:image" content={product.photo[0]} /> */}
            </Head>
            <div className="">
                <div className="container m-auto grid grid-cols-3">
                    <div className="flex justify-center items-center col-span-1">
                        <Image class="rounded-circle img-fluid" priority={true} alt={shop?.name} src="/placeholder.png" data-holder-rendered="true" width={200} height={200} />
                    </div>
                    <div className="flex flex-col justify-center col-span-2">
                        <h1 className="text-2xl font-semibold">{shop?.name}</h1>
                        <p>{shop?.about}</p>
                        <p>{shop?.city}</p>
                        <p>{shop?.phone}</p>
                        <p>{shop?.openTiming}</p>
                        <p>{shop?.address}</p>
                        {shop?.link && (<Link className="text-[#0000EE]" href={shop?.link} target="_blank">{shop?.link}</Link>)}
                    </div>
                </div>

                <div className="mt-6">
                    {(products.length > 0 ? (
                        <div className={styles.container}>
                            {products.map((product) => {
                                return <ProductCard key={product._id} product={product} />
                            })}
                        </div>
                    ) : (
                        <div className={styles.errorContainer}>
                            <h1 className="text-2xl font-semibold">No Products Found</h1>
                        </div>
                    ))}
                </div>
            </div>
            <StructuredData data={data} />
        </>
    )
}
export default Shop