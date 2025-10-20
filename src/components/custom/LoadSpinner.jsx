import React from 'react'

export const LoadSpinner = () => {
  return (
    <>
        <div className='w-10 h-10 flex justify-center items-center mx-auto rotate_load_spinner'>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#008236" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-loader-circle-icon lucide-loader-circle"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
        </div>
    </>
  )
}

export default LoadSpinner
