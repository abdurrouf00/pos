import Cookies from 'js-cookie';


export function login(token, userData, permissions, rememberMe = false) {
  // Set cookie
  const cookieOptions = {
    ...(rememberMe && { expires: 7 }),
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  };

  Cookies.set('hh_token', token, cookieOptions);
  Cookies.set('permissions', permissions, cookieOptions);
  Cookies.set('user_data', JSON.stringify({
    email: userData.email,
    name: userData.name || 'User',
    organization_id: userData.organization_id,
    company_id: userData.company_id,
    role: userData?.role
  }), cookieOptions);

  return token;
}

// Remove auth cookie when user logs out
export function logout() {
  Cookies.remove('hh_token');
  Cookies.remove('user_data');
  Cookies.remove('permissions');


}

// Check if user is logged in
export function isLoggedIn() {
  return !!Cookies.get('hh_token');
}

// Get current user data
export function getCurrentUser() {
  const userData = Cookies.get('user_data');
  if (!userData) return null;

  try {
    return JSON.parse(userData);
  } catch (error) {
    console.error('Failed to parse user data:', error);
    return null;
  }
}