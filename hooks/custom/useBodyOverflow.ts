'use clinet';
import React from 'react';

export const UseBodyOverflow = (isHidden: boolean) => {
  React.useEffect(() => {
    if (isHidden) {
      window.document.body.style.overflow = 'hidden';
    } else {
      window.document.body.style.overflow = 'auto';
    }
    return () => {
      window.document.body.style.overflow = '';
    };
  }, [isHidden]);
};
