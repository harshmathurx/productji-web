import { activateEmail } from "@/utils/apiCalls"
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react"

const ActivateEmail = () => {

    const [activated, setActivated] = useState(false)
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const router = useRouter();
    const store_panel = process.env.NEXT_PUBLIC_ADMIN_PANEL

    useEffect(() => {
        const { token } = router.query;
        const activate = async () => {
            await activateEmail(token)
                .then(res => {
                    if (res) {
                        if (res.error) {
                            setError(res.error)
                            setActivated(false)
                            setLoading(false)
                        }
                        else {
                            setActivated(true)
                            setError(null)
                            setLoading(false)
                        }
                    }
                    else {
                        setError("please try again later")
                        setLoading(false)
                    }
                })
        }

        if (token) {
            activate()
        }
    }, [router.query])

    return (
        <div className="flex flex-row mt-10 h-5/6 justify-center items-center">
            {loading && <div aria-label="Loading..." role="status">
                <svg className="h-12 w-12 animate-spin" viewBox="3 3 18 18">
                    <path
                        className="fill-gray-200"
                        d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"></path>
                    <path
                        className="fill-gray-800"
                        d="M16.9497 7.05015C14.2161 4.31648 9.78392 4.31648 7.05025 7.05015C6.65973 7.44067 6.02656 7.44067 5.63604 7.05015C5.24551 6.65962 5.24551 6.02646 5.63604 5.63593C9.15076 2.12121 14.8492 2.12121 18.364 5.63593C18.7545 6.02646 18.7545 6.65962 18.364 7.05015C17.9734 7.44067 17.3403 7.44067 16.9497 7.05015Z"></path>
                </svg>
            </div>
            }

            {(!error && activated) && <div className="flex flex-col items-center justify-center">
                <Image src="/activation_success.svg" width={300} height={300} alt="" />
                <h1 className="text-3xl font-bold mt-5">Your email has been activated</h1>
                <h2 className="text-2xl font-bold mt-5">{`Let's start listing your products`}</h2>
                <Link href={store_panel ? store_panel : "https://admin-panel-1zr.pages.dev"} target="_blank">
                    <button className="bg-blue-700 text-white px-5 py-2 rounded-xl mt-5">Visit Store Panel</button>
                </Link>
            </div>}

            {(!activated && error) && <div className="flex flex-col items-center justify-center">
                <Image src="/activation_failed.svg" width={300} height={300} alt="" />
                <h1 className="text-3xl font-bold mt-10">Something went wrong, {error}</h1>
            </div>}
        </div >
    )
}
export default ActivateEmail