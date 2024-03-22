import { ReloadIcon } from "@radix-ui/react-icons"

const Loader = () => {
    return (
        <div className="flex w-40 h-40 items-center justify-center rounded-full bg-background-secondary">
            <ReloadIcon className="animate-spin text-primary" />
        </div>
    )
}

export default Loader