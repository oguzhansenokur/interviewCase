import React from 'react';
import { EyeInvisibleFilled, EyeFilled } from '@ant-design/icons';

export default function VisibleChange({isVisiblePassword,setVisiblePassword}) {
  return (
    <button
      onClick={() => setVisiblePassword(!isVisiblePassword)}
      className='eye-button'
    >
      {isVisiblePassword ? (
        <EyeFilled className='icon' />
      ) : (
        <EyeInvisibleFilled className='icon' />
      )}
    </button>
  );
}
