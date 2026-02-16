import Link from "next/link";
import { FiHome } from "react-icons/fi";

const HomeBtn = () => {
    return (
        <Link href="/">
            <FiHome className="h-7 w-7 hover:cursor-pointer" />
        </Link>
    )
}

export default HomeBtn