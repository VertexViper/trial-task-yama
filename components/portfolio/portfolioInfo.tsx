interface PortfolioInfoProps {
    total_wallet_balance: string
    address: string
  }

const PortfolioInfo = ({total_wallet_balance, address}: PortfolioInfoProps) => {
    return (
        <div className="flex flex-col gap-2">
            <div className="text-blue-300 flex gap-2 text-xl">Total Balance:<span className='text-white'>${total_wallet_balance ? total_wallet_balance : 0}</span></div>
            <div className="text-blue-300 flex gap-2">Wallet:<span className='text-white'>{address}</span></div>
        </div>
    )
}

export default PortfolioInfo