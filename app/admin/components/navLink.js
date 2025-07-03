
import Link from "next/link"
import { usePathname } from "next/navigation"
import { IoMdAnalytics } from "react-icons/io"

export const NavLink = ({to, label, icon}) => {
    const pathname = usePathname()
    return (
        
        <Link href={to}>
            <li className={`h-fit text-dark text-dark flex gap-4 items-center ${pathname.endsWith(to) ? "text-primary font-semibold": 'text-gray'}`}>
                <span className={`rounded-r-3xl w-[6px] py-5 min-h-[100%]  ${pathname.endsWith(to) ? "bg-primary": 'bg-secondary'}`}></span>
                {icon}
                <p className="text-dark">{label}</p>
            </li>
        </Link>
    )
}