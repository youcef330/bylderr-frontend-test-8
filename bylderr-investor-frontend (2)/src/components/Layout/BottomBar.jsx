import React from 'react'

//Formats buttons on the bottom of the screen for small screens 

const BottomBar = ({ children }) => {
    return (
        <>
            <nav className="block sm:hidden flex space-x-4 justify-around bg-white h-10">
                <div className="flex space-x-10">
                    {children}
                </div>
            </nav>
        </>
    )
}

export default BottomBar