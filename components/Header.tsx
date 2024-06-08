import Image from "next/image"

export default function Header() {
    return (
        <header className="h-[70px] w-full bg-[#abffb3] flex items-center px-[100px] top-0 sticky">
            <Image src="/header_image.png" width={100} height={70} alt="header img"/>
        </header>
    )
}