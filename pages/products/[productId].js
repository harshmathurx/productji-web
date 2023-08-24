import StructuredData from "@/components/StructuredData";
import { getProductById } from "@/utils/apiCalls";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { RWebShare } from "react-web-share"
import { EmailIcon, EmailShareButton, TelegramIcon, TelegramShareButton, TwitterIcon, TwitterShareButton, WhatsappIcon, WhatsappShareButton } from "next-share";


export async function getServerSideProps(context) {
  let product = {}
  let productRes = await getProductById(context.params.productId);
  if (productRes) {
    product = productRes
  }
  return {
    props: {
      product: product
    }
  }
}


const Product = ({ product }) => {

  const origin = process.env.NEXT_PUBLIC_WEBSITE_HOST
  const productLink = `${origin}/products/${product?._id}`

  const data = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${product?.name}`,
    description: `${product?.description}`,
    sku: `${product?._id}`,
    url: `${productLink}`,
    brand: {
      '@type': 'Brand',
      name: `${product.store.name}`,
      url: `${origin}/stores/${product.store._id}`,
    },
    image: [`${product?.photo[0]}`],
    offers: {
      '@type': 'Offer',
      priceCurrency: 'INR',
      price: `${product?.price}`,
      seller: {
        '@type': 'Organization',
        name: `${product.store.name}`,
        url: `${origin}/stores/${product.store._id}`,
      }
    }
  }

  return (product ? (<>

    <Head>
      <meta charSet="utf-8" />
      <title>{`${product.name} | ProductJi`}</title>
      <meta property="og:title" content={`${product.name} | ProductJi`} />
      <meta name="description" content={product.description.substring(0, 60)} />
      <meta property="og:description" content={product.description.substring(0, 60)} />
      <meta property="og:type" content="ecommerce" />
      <meta property="og:site_name" content="ProductJi" />
      <meta property="og:image" content={product.photo[0]} />
    </Head>
    <StructuredData data={data} />
    <div className="container mt-7 w-5/6 mx-auto sm:px-4">
      <div className="container w-full sm:px-4" id="product-section">
        <div className="flex flex-wrap ">
          <div className="md:w-1/2 w-4/5 pr-4 pl-4 mx-auto">
            {product.photo !== undefined &&
              <Carousel emulateTouch={true} infiniteLoop={true} renderThumbs={() => product.photo.map((img, idx) => (
                <div key={idx} className="w-full h-20 relative">
                  <Image
                    src={img}
                    fill={true}
                    style={{objectFit: 'contain'}}
                    sizes='(max-width: 600px) 80vw, 600px'
                    alt="logo"
                  ></Image>
                </div>
              ))}>
                {product.photo.map(image => (
                  <div key={image}>
                    <Zoom>
                      <Image src={image} alt={product.name}
                        className="mb-3" width={2000} height={2000} priority={true} />
                    </Zoom>
                  </div>
                ))}
              </Carousel>}
          </div>

          <div className="md:w-1/2 pr-4 pl-4">
            <h1 className='mb-3 text-3xl font-semibold'>{product.name}</h1>
            <h2 className='mb-4 text-2xl font-semibold'>₹{product.price}</h2>
            <p className='mb-4'>{product.description}</p>
            <h6 className="font-semibold">Category: {product.category && (
              product.category.map(c => {
                return `#${c} `
              })
            )}</h6>
            {/* <p>Created {moment(product?.createdAt).fromNow()}</p> */}

            <Link href={product.link ? product.link : "#"} target="_blank">
              <button className='inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline bg-yellow-400 text-black hover:bg-yellow-500 mb-4 mt-4' style={{ borderRadius: '5px' }}>Buy from shop</button>
            </Link>
            <div >
              <EmailShareButton
                body={`I think you'd like this product \n ${product.name} by ${product.store.name}. \n`}
                url={productLink}
                separator="Learn more at: "
                subject="Check out this product on ProductJi"
                className
                style={{ marginRight: "10px" }}>
                <EmailIcon size={36} />
              </EmailShareButton>

              <WhatsappShareButton
                url={productLink}
                title={`Check out this product on ProductJi. \n ${product.name} by ${product.store.name}. \n`}
                separator='Learn more at: '
                className
                style={{ marginRight: "10px" }}>
                <WhatsappIcon size={36} />
              </WhatsappShareButton>
              <TwitterShareButton
                url={productLink}
                title={`Check out this product on ProductJi. \n ${product.name} by ${product.store.name}. \n`}
                hashtag="#ProductJi"
                className
                style={{ marginRight: "10px" }}>
                <TwitterIcon size={36} />
              </TwitterShareButton>
              <TelegramShareButton
                url={productLink}
                title={`Check out this product on ProductJi. \n ${product.name} by ${product.store.name}. \n`}
                className
                style={{ marginRight: "10px" }}>
                <TelegramIcon size={36} />
              </TelegramShareButton>
              <RWebShare
                data={{
                  url: productLink,
                  title: `Check out this product on ProductJi. \n ${product.name} by ${product.store.name}. \n`,
                  text: `Check out this product on ProductJi. \n ${product.name} by ${product.store.name}. \n`,
                }}>
                <button>
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                    width="40" height="40"
                    viewBox="0 0 24 24">
                    <path d="M 18 2 A 3 3 0 0 0 15 5 A 3 3 0 0 0 15.054688 5.5605469 L 7.9394531 9.7109375 A 3 3 0 0 0 6 9 A 3 3 0 0 0 3 12 A 3 3 0 0 0 6 15 A 3 3 0 0 0 7.9355469 14.287109 L 15.054688 18.439453 A 3 3 0 0 0 15 19 A 3 3 0 0 0 18 22 A 3 3 0 0 0 21 19 A 3 3 0 0 0 18 16 A 3 3 0 0 0 16.0625 16.712891 L 8.9453125 12.560547 A 3 3 0 0 0 9 12 A 3 3 0 0 0 8.9453125 11.439453 L 16.060547 7.2890625 A 3 3 0 0 0 18 8 A 3 3 0 0 0 21 5 A 3 3 0 0 0 18 2 z"></path>
                  </svg>

                </button>
              </RWebShare>

            </div>
            <hr />
            <div className="mt-4">
              <h2 className="text-2xl font-semibold">Seller</h2>
              <div className="flex flex-wrap  mt-4">
                <div className="md:w-1/4 pr-4 pl-4 sm:w-1/2 mb-4 justify-center items-center mx-auto">

                  {/* {product.store.photo ? <img className="rounded-full max-w-full h-auto" alt="100x100" src={product.store.photo} data-holder-rendered="true" /> : <img className="rounded-full max-w-full h-auto" alt="100x100" src="https://cdn2.iconfinder.com/data/icons/facebook-ui-colored/48/JD-15-512.png" data-holder-rendered="true" />} */}

                  <Image className="rounded-circle img-fluid" priority={true} alt={product?.store?.name} src="/placeholder.png" data-holder-rendered="true" width={200} height={200} />

                </div>
                <div className="md:w-3/4 pr-4 pl-4 sm:w-full flex flex-col">
                  <p className="my-2 font-semibold">{product.store.name}</p>
                  <p className="my-2">City: {product.store.city}</p>
                  {product.store.address && <p className="my-2">Address: {product.store.address}</p>}
                  {product.store.about && <p className="my-2">{product.store.about}</p>}
                  {product.store.phone && <p className="my-2">Phone: {product.store.phone}</p>}
                  {/* {product.store.photo && <p>Photo: {product.store.photo}</p>} */}
                  {product.store.openTiming && <p className="my-2">Open At: {product.store.openTiming}</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  )
    : (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-semibold">No Product Found</h1>
      </div>
    ))
}
export default Product