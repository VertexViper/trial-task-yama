import Loader from "../ui/loader"

interface PortfolioInfoProps {
    total_wallet_balance: number
    address: string
    loading: boolean
  }

const PortfolioInfo = ({total_wallet_balance, address, loading}: PortfolioInfoProps) => {
    return (
        <div className="flex flex-col gap-2">
            <div className="text-blue-300 flex gap-2 text-xl">
                Total Balance:
                {!loading && <span className='text-white'>${total_wallet_balance ? total_wallet_balance : 0}</span>}
                {loading && <Loader size={50} />}
            </div>
            <div className="text-blue-300 flex gap-2">My Wallet:<span className='text-white'>{address}</span></div>
        </div>
    )
}

export default PortfolioInfo