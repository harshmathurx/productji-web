import { signup } from '@/utils/apiCalls';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { useState } from 'react';
import { toast } from 'react-toastify';

const SignUp = () => {

    const router = useRouter();

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        city: "",
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [terms, setTerms] = useState(false);

    const handleChange = name => event => {
        setUser({ ...user, [name]: event.target.value });
    }

    const handleTerms = () => {
        setTerms(!terms)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!terms) {
            setError("Please accept the terms and conditions")
            toast.dismiss()
            toast.error("Please accept the terms and conditions")
            return
        }
        toast.dismiss()
        toast.info("Setting up your shop")
        await signup({ ...user })
            .then(data => {
                if(data){
                    if (data.error) {
                        setError(data.error)
                        toast.dismiss()
                        toast.error(data.error)
                    }
                    else {
                        console.log(data);
                        toast.success("Your shop is ready")
                        toast.success("Please check your email for verification")
                        router.push('/');
                    }
                }
                else{
                    setError("Something went wrong")
                    toast.dismiss()
                    toast.error("Something went wrong")
                }
            })
    }

    return (
        <div>
            <Head>
                <meta charSet="utf-8" />
                <title>Sign Up - ProductJi</title>
                <meta property="og:title" content="Sign Up - ProductJi" />
                <meta name="description" content="Sell your products on Productji, become a part of the ProductJi family" />
                <meta property="og:description" content="Sell your products on Productji, become a part of the ProductJi family" />
                <meta property="og:type" content="ecommerce" />
                <meta property="og:site_name" content="ProductJi" />
            </Head>
            <Script src="https://kit.fontawesome.com/0c864d7e04.js" crossorigin="anonymous" />
            <div className="flex justify-center items-center bg-white h-full max-h-full">
                <div className="lg:w-full pr-4 pl-4 xl:w-5/6">
                    <div className="">
                        <div className="flex-auto p-6 md:p-12">
                            <div className="flex flex-wrap  justify-center">
                                <div className="md:w-4/5 lg:w-1/2 xl:w-2/5 pr-4 pl-4 order-2 lg:order-1">
                                    <h1 className="text-center text-4xl font-semibold  mb-5 mx-1 md:mx-6 mt-4">Sign up</h1>
                                    {/* <label className="form-label" htmlFor="">Store Image</label>
                                <div className="mx-1 md:mx-6 mb-4 mt-3 flex flex-direction-row items-center ">
                                    <div {...getRootProps({ className: 'dropzone' })} className="flex border border-gray-900 items-center justify-center mb-4 relative flex-grow max-w-full flex-1 px-4 lg:w-1/3 pr-4 pl-4 w-1/3" style={{ border: "1px dotted gray", height: "140px" }}>
                                        <input {...getInputProps()} />
                                        <Add style={{ fontSize: '3rem' }} />
                                    </div>
                                    {thumbs()}
                                </div> */}
                                    <form className="mx-1 md:mx-6">
                                        <div className='text-base text-red-500 font-medium my-5'>
                                            <div className="alert alert-danger" style={{ display: error ? '' : "None " }}>
                                                {error}
                                            </div>
                                            <div className="alert alert-info" style={{ display: success ? '' : "None " }}>
                                                New account is created. Please <Link href="/signin">sign in</Link>
                                            </div>
                                        </div>
                                        <div className="flex flex-row items-center mb-4 w-full">
                                            <div className="form-outline flex-fill mb-0 w-full">
                                                <input onChange={handleChange('name')} type="text" id="form3Example1c" className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded" />
                                                <label className="form-label" htmlFor="form3Example1c"><i className="fa-solid fa-store"></i> Store Name<span className='text-red-600'>*</span></label>
                                            </div>
                                        </div>

                                        <div className="flex flex-row items-center mb-4 w-full">
                                            <div className="form-outline flex-fill mb-0 w-full">
                                                <textarea rows={5} cols={40} required onChange={handleChange('about')} type="text" id="form3Example3c" className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded" />
                                                <label className="form-label" htmlFor="form3Example3c"><i className="fa-solid fa-align-left"></i> About the shop<span className='text-red-600'>*</span></label>
                                            </div>
                                        </div>

                                        <div className="flex flex-row items-center mb-4 w-full">
                                            <div className="form-outline flex-fill mb-0 w-full">
                                                <input required onChange={handleChange('email')} type="email" id="form3Example3c" className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded" />
                                                <label className="form-label" htmlFor="form3Example3c"><i className="fas fa-envelope fa-lg me-3 fa-fw"></i> Your Email<span className='text-red-600'>*</span></label>
                                            </div>
                                        </div>

                                        <div className="flex flex-row items-center mb-4 w-full">
                                            <div className="form-outline flex-fill mb-0 w-full">
                                                <input required onChange={handleChange('password')} type="password" id="form3Example4c" className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded" />
                                                <label className="form-label" htmlFor="form3Example4c"><i className="fas fa-lock fa-lg me-3 fa-fw"></i> Password<span className='text-red-600'>*</span></label>
                                            </div>
                                        </div>

                                        <div className="flex flex-row items-center mb-4 w-full">
                                            <div className="form-outline flex-fill mb-0 w-full">
                                                <input required onChange={handleChange('city')} type="text" id="form3Example4c" className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded" />
                                                <label className="form-label" htmlFor="form3Example4c"><i className="fas fa-city fa-lg me-3 fa-fw"></i> City<span className='text-red-600'>*</span></label>
                                            </div>
                                        </div>

                                        <div className="flex flex-row items-center mb-4">
                                            <div className="form-outline flex-fill mb-0 w-full">
                                                <input onChange={handleChange('address')} type="text" id="form3Example4cd" className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded" placeholder="optional" />
                                                <label className="form-label" htmlFor="form3Example4cd"><i className="fas fa-location-dot fa-lg me-3 fa-fw"></i> Address</label>
                                            </div>
                                        </div>

                                        <div className="flex flex-row items-center mb-4">
                                            <div className="form-outline flex-fill mb-0 w-full">
                                                <input onChange={handleChange('link')} type="text" id="form3Example4cd" className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded" placeholder="optional" />
                                                <label className="form-label" htmlFor="form3Example4cd">                                            <i className="fas fa-link fa-lg me-3 fa-fw"></i> Store link</label>
                                            </div>
                                        </div>

                                        <div className="flex flex-row items-center mb-4">
                                            <div className="form-outline flex-fill mb-0 w-full">
                                                <input onChange={handleChange('openTiming')} type="text" id="form3Example4cd" className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded" placeholder="optional" />
                                                <label className="form-label" htmlFor="form3Example4cd">                                            <i className="fas fa-business-time fa-lg me-3 fa-fw"></i> Open timings</label>
                                            </div>
                                        </div>

                                        <div className="relative block mb-2 d-flex-row justify-center items-center">
                                            <input required
                                                className="absolute mt-1 -ml-6"
                                                type="checkbox"
                                                value=''
                                                checked={terms}
                                                onChange={handleTerms}
                                            />
                                            <label className="text-gray-700 mb-0" htmlFor="form2Example3">
                                                I agree all statements in <a className='text-blue-600 underline'>Terms of service</a>
                                            </label>
                                            {error && <div className="alert alert-danger">
                                                <p className=' text-base text-red-500 font-medium my-5'>Please fill in the details appropriately</p>
                                            </div>}
                                        </div>

                                        <div className="flex justify-center mx-4 mb-3 lg:mb-6">
                                            <button onClick={handleSubmit} type="submit" className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded  no-underline bg-blue-600 text-white hover:bg-blue-600 py-3 px-4 leading-tight text-xl">Register</button>
                                        </div>
                                    </form>
                                </div>
                                <div className="md:w-4/5 lg:w-1/2 pr-4 pl-4 xl:w-3/5 flex items-center order-1 lg:order-2">
                                    <Image priority={true} src="/signup.webp" className="max-w-full h-auto" alt="Sample image" width={500} height={500} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SignUp