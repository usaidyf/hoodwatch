'use client';

import { useCallback, useState, ReactNode } from 'react';

type State = { copied: boolean; share: () => Promise<void> };
type Props = {
   url: string;
   title?: string;
   text?: string;
   // children can be a node or a render-prop that receives state
   children: ReactNode | ((state: State) => ReactNode);
   className?: string;
};

export default function ShareButton({ url, title, text, children, className }: Props) {
   const [copied, setCopied] = useState(false);

   const share = useCallback(async () => {
      if (navigator.share) {
         await navigator.share({ url, title, text }).catch(() => { });
      } else {
         await navigator.clipboard.writeText(url);
         setCopied(true);
         setTimeout(() => setCopied(false), 2_000);
      }
   }, [url, title, text]);

   const state = { copied, share };

   return (
      <>
         {typeof children === 'function' ? (children as (s: State) => ReactNode)(state) : children}
      </>
   );
}
