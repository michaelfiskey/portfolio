type SpinnerProps = {
    isLoading?: boolean;
}

import { ClipLoader } from 'react-spinners';
const Spinner = ({ isLoading = true}: SpinnerProps) => {

    return (
        <div className='flex flex-col items-center justify-center'>
            <ClipLoader 
            color='#f43f5e' 
            loading={isLoading}
            size={35}
            aria-label='Loading Spinner'
            />
        </div>
    )
}

export default Spinner;