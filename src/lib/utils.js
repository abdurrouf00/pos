import { clsx } from "clsx";
import Cookies from 'js-cookie';
import Swal from "sweetalert2";
import { twMerge } from "tailwind-merge";
// const MySwal = withReactContent(Swal);
export const confirmDialog = ( confirmObj ) => {
  const { title, text, confirmButtonText, cancelButtonText } = confirmObj;

  return Swal.fire( {
    title,
    html: text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText,
    cancelButtonText,
    customClass: {
      confirmButton: 'bg-blue-500 border border-blue-500 text-white px-4 py-2 rounded cursor-pointer',
      cancelButton: 'border border-blue-500 rounded px-4 py-2 text-blue-500 ml-2 cursor-pointer',
    },
    buttonsStyling: false,
  } );
};
export const confirmObj = {
  title: 'Are you sure?',
  text: "You won't be able to revert this!",
  confirmButtonText: 'Yes',
  cancelButtonText: 'No',
};
export function cn( ...inputs ) {
  return twMerge( clsx( inputs ) );
}

export const convertTo12hourFormatWithAmPm = ( time ) => {
  const [hours, minutesStr] = time.split( ":" );
  const hoursInt = parseInt( hours, 10 );
  const minutesInt = parseInt( minutesStr, 10 );
  const amPm = hoursInt >= 12 ? "PM" : "AM";
  const hours12 = hoursInt % 12 || 12;
  const seconds = minutesInt % 2 === 0 ? "00" : "59";
  return `${hours12}:${minutesStr}:${seconds} ${amPm}`;
};

export const userDataStr = typeof window !== 'undefined' ? Cookies.get( "user_data" ) : null;
export const userData = userDataStr ? JSON.parse( userDataStr ) : null;
export const userRole = userData ? userData.role.name : undefined;

export const setLocal = ( name, value ) => {
  if ( typeof window !== 'undefined' ) {
    return localStorage.setItem( name, JSON.stringify( value ) );
  }
  return null;
}

export const getLocal = ( name ) => {
  if ( typeof window !== 'undefined' ) {
    const item = localStorage.getItem( name );

    return item ? JSON.parse( item ) : null;
  }
  return null;
};

export const clearLocalStorage = () => {
  if ( typeof window !== 'undefined' ) {
    localStorage.clear();
  }
}

export const covertDateToYMD = ( date ) => {
  const [day, month, year] = date.split( "-" );
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};

export const menus = typeof window !== 'undefined' ? JSON.parse( getLocal( "menus" ) || "[]" ) : [];
export const accesses = typeof window !== 'undefined' ? getLocal( "accesses" ) : null;


export function calculateTotalTime( inTime, outTime ) {
  const [inH, inM, inS] = inTime.split( ":" ).map( Number );
  const [outH, outM, outS] = outTime.split( ":" ).map( Number );

  // Convert both to seconds
  const inSeconds = inH * 3600 + inM * 60 + inS;
  const outSeconds = outH * 3600 + outM * 60 + outS;

  // Difference
  let diff = outSeconds - inSeconds;

  // Handle overnight case (out_time is next day)
  if ( diff < 0 ) {
    diff += 24 * 3600;
  }

  // Convert back to hh:mm:ss
  const hours = String( Math.floor( diff / 3600 ) ).padStart( 2, "0" );
  const minutes = String( Math.floor( ( diff % 3600 ) / 60 ) ).padStart( 2, "0" );
  const seconds = String( diff % 60 ).padStart( 2, "0" );

  return `${hours}h:${minutes}m:${seconds}s`;
}

export const getImageUrl = ( image ) => {
  return `${process.env.NEXT_PUBLIC_BACKEND_URL}assets/attachments/${image}`;
}
export const formatBDnumber = ( number, fixedValue = 2 ) => {
  if ( typeof number !== 'number' ) {
    console.error( 'Invalid number', number );
    return number;
  } else {
    const toFixedNumber = number?.toFixed( fixedValue );
    if ( toFixedNumber ) {
      const [integerPart, decimalPart] = toFixedNumber?.toString().split( '.' );
      const formattedIntegerPart = new Intl.NumberFormat( 'en-IN' ).format( integerPart );
      return decimalPart
        ? `${formattedIntegerPart}.${decimalPart}`
        : formattedIntegerPart;
    }
  }

};
export const numberToWords = ( num ) => {
  if ( num === 0 ) return "Zero";

  const belowTwenty = [
    "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
    "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen",
    "Sixteen", "Seventeen", "Eighteen", "Nineteen"
  ];

  const tens = [
    "", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty",
    "Seventy", "Eighty", "Ninety"
  ];

  const thousands = ["", "Thousand", "Million", "Billion"];

  function helper( n ) {
    if ( n === 0 ) return "";
    else if ( n < 20 ) return belowTwenty[n] + " ";
    else if ( n < 100 ) return tens[Math.floor( n / 10 )] + " " + helper( n % 10 );
    else return belowTwenty[Math.floor( n / 100 )] + " Hundred " + helper( n % 100 );
  }

  let result = "";
  let i = 0;

  while ( num > 0 ) {
    if ( num % 1000 !== 0 ) {
      result = helper( num % 1000 ) + thousands[i] + " " + result;
    }
    num = Math.floor( num / 1000 );
    i++;
  }

  return result.trim();
}
