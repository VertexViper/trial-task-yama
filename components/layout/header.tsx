import { ConnectButton } from '@rainbow-me/rainbowkit';

const HeaderBar = () =>{
    return (
        <header className='flex items-center justify-end w-full bg-gray-900 p-3 z-50'>
            <ConnectButton />
        </header>
    )
}

export default HeaderBar