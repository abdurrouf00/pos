// app/api/logout/route.js
import { NextResponse } from 'next/server'

export async function POST() {
    const response = NextResponse.json( { message: 'Logged out' } )

    response.cookies.set( 'hh_token', '', {
        maxAge: 0,         // deletes the cookie
        path: '/',         // must match the original path
    } )
    response.cookies.set( 'user_data', '', {
        maxAge: 0,         // deletes the cookie
        path: '/',         // must match the original path
    } )
    response.cookies.set( 'permissions', '', {
        maxAge: 0,         // deletes the cookie
        path: '/',         // must match the original path
    } )

    return response
}
