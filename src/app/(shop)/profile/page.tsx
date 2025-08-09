import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import React from 'react'

export default async function ProfilePage() {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    if(!session){
        return (
            <div>
                <p className='text-red-700'>Unauthorized</p>
            </div>
        )
    }

    return (
        <>
            <div>ProfilePage</div>
            <pre className='text-sm overflow-clip'>
                {JSON.stringify(session, null, 2)}
            </pre>
        </>

    )
}
