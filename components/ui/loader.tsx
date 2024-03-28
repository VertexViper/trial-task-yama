import { ReloadIcon } from "@radix-ui/react-icons"

interface LoaderProps {
    size?: number
}
const Loader = ({size = 100}:LoaderProps) => {
    return (
        <div className={`flex w-[${size}px] h-[${size}px] items-center justify-center rounded-full bg-background-secondary`}>
            <ReloadIcon className={`animate-spin text-white w-[${size}px] h-[${size}px]`} />
        </div>
    )
}

export default Loader