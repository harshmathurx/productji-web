import ProductCard from "@/components/ProductCard";
import { getProductsByShop, getShop } from "@/utils/apiCalls";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

const styles = {
    container: 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6',
    errorContainer: 'flex flex-col items-center justify-center h-screen'
}

// TODO: ERROR HANDLING YET TO BE IMPLEMENTED
export async function getServerSideProps(context) {
    let shop = await getShop(context.params.shopId);
    let products = await getProductsByShop(context.params.shopId);
    shop = JSON.parse(JSON.stringify(shop));
    products = JSON.parse(JSON.stringify(products));

    return {
        props: {
            shop,
            products
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
                        <Link className="text-[#0000EE]" href={shop?.link} target="_blank">{shop?.link}</Link>
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
        </>
    )
}
export default Shop