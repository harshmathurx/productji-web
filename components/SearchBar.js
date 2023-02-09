import { useRouter } from "next/router";
import { useState } from "react";

const Search = () => {

    const router = useRouter();

    const [data, setData] = useState({
        search: '',
    })

    const { search } = data

    const searchSubmit = (event) => {
        event.preventDefault();
        router.push(`/search?search=${search}`);
    }

    const handleChange = (name) => (event) => {
        setData({ ...data, [name]: event.target.value, searched: false })
    }
    return (
        <form onSubmit={searchSubmit} className='mt-1 max-w-full w-full'>
            <div className="flex justify-center items-center max-w-full w-full">
                <input type="search" className='block appearance-none max-w-full w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded mx-4 my-2 pb-2' onChange={handleChange("search")} placeholder='Search' />
            </div>
        </form>

    )
}
export default Search