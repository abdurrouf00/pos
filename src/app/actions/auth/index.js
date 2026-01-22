'use server';

import axios from 'axios';
import { cookies } from 'next/headers';


export async function login( { email, password }, res ) {


  try {
    const res = await axios.post( `${process.env.NEXT_PUBLIC_BACKEND_URL}api/auth/login`, { email, password } );
    const token = res.data.token;

    // ✅ Correct usage — no recursive call
    const cookieStore = await cookies();

    cookieStore.set( 'hh_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'lax',
    } );

    return res;
  } catch ( err ) {

    return { error: err.message };
  }
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete( 'hh_token' )
  cookieStore.delete( 'user_data' );
  cookieStore.delete( 'permissions' )
}
