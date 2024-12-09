import React from 'react'
import { Link } from 'react-router-dom'

function Start() {
    return (
        <div>
            <div className="bg-cover bg-left bg-[url(https://images.unsplash.com/photo-1653655165500-a4d942520d91?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzF8fHRyYWZmaWMlMjBsaWdodHxlbnwwfHwwfHx8MA%3D%3D)] h-screen pt-8 flex justify-between flex-col w-full">
                <img className='w-16 ml-6'  src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
                <div className='bg-white pb-7 py-4 px-4'>
                    <h2 className='text-[30px] font-bold'>Get Started with Uber</h2>
                    <Link to='/login' className='flex items-center justify-center w-full bg-black text-white py-3 rounded-lg mt-5'>Continue</Link>
                </div>
            </div>
        </div>
    )
}

export default Start
