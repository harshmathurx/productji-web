import ProductCard from "@/components/ProductCard";
import { search } from "@/utils/apiCalls";

export async function getServerSideProps(context) {
    const q = context.query.search
    let response = await search({ search: q })
    if (response) {
        return {
            props: {
                results: response
            }
        }
    }
    else {
        return {
            props: {
                results: []
            }
        }
    }
}

const styles = {
    container: 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6',
    errorContainer: 'flex flex-col items-center justify-center h-screen'
}


const SearchResults = ({ results }) => {
    const searchMessage = (results = []) => {
        if (results.length > 0) {
            return `Found ${results.length} product(s)`
        }

        if (results.length < 1) {
            return `No products found :(`
        }
    }

    return (
        <div>

            <h2 className="text-2xl font-semibold m-5">{searchMessage(results)}</h2>
            <div className={styles.container}>
                {results.map((product, i) => {
                    return <ProductCard key={i} product={product} />
                })}
            </div>
        </div>
    )
}
export default SearchResults