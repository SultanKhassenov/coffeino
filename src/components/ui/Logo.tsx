import Link from "next/link";

type LogoProps = {
    className?: string;
}

export default function Logo({ className = ""}: LogoProps ) {
    return (
        <Link href="/" className={`text-lg font-semibold ${className}`}>
            COFFEINO
        </Link>
    )
}