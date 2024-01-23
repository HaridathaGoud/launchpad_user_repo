import { useState, useCallback, useEffect } from 'react';
import copy from 'copy-to-clipboard';
export default function CopyToClipboard() {
  const resetInterval = 5000;
  const [isCopied, setCopied] = useState<boolean>(false);
  const handleCopy = useCallback((text: any) => {
    if (typeof text === 'string' || typeof text == 'number') {
      copy(text.toString());
      setCopied(true);
    } else {
      setCopied(false);
    }
  }, []);
  useEffect(() => {
    let timeout: any;
    if (isCopied && resetInterval) {
      timeout = setTimeout(() => setCopied(false), resetInterval);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [isCopied, resetInterval]);
  return [isCopied, handleCopy];
}
