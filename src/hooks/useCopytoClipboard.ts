import { useState, useCallback, useEffect } from 'react';
import copy from 'copy-to-clipboard';
export default function useCopyToClipboard() {
  const resetInterval = 5000;
  const [isCopied, setIsCopied] = useState<string>('');
  const handleCopy = useCallback((text: any) => {
    if (typeof text === 'string' || typeof text == 'number') {
      copy(text.toString());
      setIsCopied(text.toString());
    } else {
      setIsCopied('');
    }
  }, []);
  useEffect(() => {
    let timeout: any;
    if (isCopied && resetInterval) {
      timeout = setTimeout(() => setIsCopied(false), resetInterval);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [isCopied, resetInterval]);
  return {isCopied, handleCopy};
}
