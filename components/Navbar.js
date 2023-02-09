import Link from "next/link"
import { useState } from "react";
import Search from "./SearchBar";

const Navbar = () => {

    const [navbarOpen, setNavbarOpen] = useState(false);

    return (
        <div>
            <nav className="relative flex max-w-full w-full flex-wrap items-center justify-between px-2 py-3 bg-[#007bff]">
                <div className="container max-w-full px-4 flex flex-wrap items-center justify-between">
                    <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
                        <Link
                            className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
                            href="/" onClick={() => setNavbarOpen(false)}
                        >
                            ProductJi
                        </Link>
                        <button
                            className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
                            type="button"
                            onClick={() => setNavbarOpen(!navbarOpen)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width={20} fill="white" viewBox="0 0 448 512"><path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" /></svg>
                        </button>
                    </div>
                    <div
                        className={
                            "lg:flex flex-grow items-center" +
                            (navbarOpen ? " flex" : " hidden")
                        }
                        id="example-navbar-danger"
                    >
                        <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
                            <li className="nav-item">
                                <Link
                                    className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                                    href="/products" onClick={() => setNavbarOpen(false)}
                                >
                                    <span className="ml-2">Products</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                                    href="/shops" onClick={() => setNavbarOpen(false)}
                                >
                                    <span className="ml-2">Shops</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75" onClick={() => setNavbarOpen(false)}
                                    href="/signup"
                                >
                                    <span className="ml-2">Sell on ProductJi</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <Search />
            </nav>

        </div>
    )
}
export default Navbar