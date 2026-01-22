import axios from 'axios'
import { NextResponse } from 'next/server'

export async function POST( request ) {
    try {
        const { email, password } = await request.json()

        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}api/auth/login`
        const res = await axios.post( url, { email, password } )

        const token = res.data.token

        const response = NextResponse.json( { message: 'Login success', response: res.data } )
        const cookieOptions = {
            httpOnly: false,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60 * 24, // 1 day
        }
        const userData = res.data.user;
        const permissions = res.data.permissions;
        response.cookies.set( 'hh_token', token, cookieOptions )
        // response.cookies.set('user_data', userData, cookieOptions)
        // response.cookies.set('permissions', permissions, cookieOptions)
        // NextResponse.redirect( new URL( '/organization/modules', request.url ) )

        return response
    } catch ( err ) {
        console.error( 'Login error:', err?.response?.data || err.message )
        return NextResponse.json(
            { message: 'Login failed', error: err?.response?.data || err.message },
            { status: err?.response?.status || 500 }
        )
    }
}
