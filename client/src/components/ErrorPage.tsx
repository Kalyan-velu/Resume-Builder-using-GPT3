import React from 'react'

const ErrorPage = () => {
  return(
    //use tailwindcss to style the error page
    <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-9xl font-bold">404</h1>
        <h2 className="text-6xl mb-14">Page Not Found</h2>
    </div>
  )
}

export default ErrorPage