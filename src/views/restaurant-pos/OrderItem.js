import React, { useState, useEffect, useRef } from 'react';

const OrderItem = ({ item, updateQty, removeFromCart }) => {
  const [val, setVal] = useState(Number(item.qty).toFixed(2));
  const [isFocused, setIsFocused] = useState(false);

  // Sync with prop changes when not focused (e.g. via +/- buttons)
  useEffect(() => {
    if (!isFocused) {
      setVal(Number(item.qty).toFixed(2));
    }
  }, [item.qty, isFocused]);

  const handleChange = (e) => {
    let newVal = e.target.value;

    // Allow only numbers and dots
    if (!/^[0-9.]*$/.test(newVal)) {
        return;
    }

    // If dot is deleted, auto-append .00 to previous integer part
    if (!newVal.includes('.')) {
      const prevInt = val.split('.')[0];
      newVal = (prevInt || '0') + '.00';
    }

    if (newVal === '' || parseFloat(newVal) < 1) {
      newVal = '1.00';
    }

    setVal(newVal);
    updateQty(item.Code, newVal, true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setVal(Number(item.qty).toFixed(2));
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  return (
    <tr className="hover:bg-gray-50 transition-colors group">
      <td className="px-2 md:px-3 py-2 md:py-3 text-[10px] md:text-xs font-semibold text-gray-800 border-r border-b border-gray-300 leading-tight">
        {item.Item}
      </td>
      <td className="px-1 py-2 md:py-3 text-center border-r border-b border-gray-300">
        <div className="flex items-center justify-center gap-1 md:gap-1.5">
          <button 
            onClick={() => updateQty(item.Code, -1)}
            className="w-4 h-4 md:w-5 md:h-5 flex items-center justify-center rounded bg-gray-100 text-gray-600 hover:bg-[#109df9] hover:text-white transition-all text-[10px] font-bold"
          >
            -
          </button>
          <input
            type="text"
            value={val}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            className="w-12 text-center bg-transparent border-none text-[10px] md:text-xs font-bold p-0 focus:ring-0 outline-none appearance-none"
          />
          <button 
            onClick={() => updateQty(item.Code, 1)}
            className="w-4 h-4 md:w-5 md:h-5 flex items-center justify-center rounded bg-gray-100 text-gray-600 hover:bg-[#109df9] hover:text-white transition-all text-[10px] font-bold"
          >
            +
          </button>
        </div>
      </td>
      <td className="px-1 py-2 md:py-3 text-[10px] md:text-xs text-black text-center border-r border-b border-gray-300">
        {item.Price}
      </td>
      <td className="px-1 py-2 md:py-3 text-[10px] md:text-xs font-bold text-black text-right border-r border-b border-gray-300">
        {(item.Price * item.qty).toFixed(2)}
      </td>
      <td className="px-1 py-2 md:py-3 text-center border-b border-gray-300">
        <button 
          onClick={() => removeFromCart(item.Code)}
          className="text-gray-400 hover:text-red-500 transition-colors p-1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </td>
    </tr>
  );
};

export default OrderItem;
