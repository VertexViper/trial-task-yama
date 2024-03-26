import { ReloadIcon } from "@radix-ui/react-icons"

const Loader = () => {
    return (
        <div className="flex w-[100px] h-[100px] items-center justify-center rounded-full bg-background-secondary">
            <ReloadIcon className="animate-spin text-white w-[100px] h-[100px]" />
        </div>
    )
}

export default Loader