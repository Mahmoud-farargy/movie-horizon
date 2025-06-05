'use client';
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "use-intl";
import { useSearchParams } from 'next/navigation';

export default function SearchInput() {
    const router = useRouter();   
    const searchParams = useSearchParams();
    const query = searchParams.get('s');
    const [value, setInputValue] = useState(query || "");
    const searchBarInputRef = useRef<HTMLInputElement>(null);
    const $t = useTranslations();

    const searchWord = useCallback(() => {
        router.replace(`?s=${encodeURIComponent(value)}`); 
    }, [router, value]);

    const handleKeyup = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
      const isEnterKey = e.key === 'Enter';
     
      if(isEnterKey){
        searchWord();
      }
    }, [searchWord]);

    useEffect(() => {
      searchBarInputRef.current?.focus();
    }, []);
   
  return (
    <div className="flex bg-[#9ca3af1a] items-center px-6 py-4 gap-3 sticky">
        <Icon icon="ph:magnifying-glass" ssr={true} className="text-xl opacity-50" />
        <input
            ref={searchBarInputRef}
            onChange={(e) => setInputValue(e.target.value)}
            type="text"
            className="text-2xl bg-transparent outline-none w-full"
            placeholder={$t("type_to_search")}
            onKeyUp={handleKeyup}
            value={value}
        />
    </div>
  )
}
