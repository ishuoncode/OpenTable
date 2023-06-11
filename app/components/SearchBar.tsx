'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SearchBar() {
  const router = useRouter();
  const [location, setlocation] = useState('');
  function submitFormHandler(event: React.FormEvent) {
    event.preventDefault();
  }
  return (
    <div className="text-left text-lg py-3 m-auto flex justify-center">
      <form onSubmit={submitFormHandler}>
        <input
          className="rounded  mr-3 p-2 w-[450px]"
          type="text"
          placeholder="State, city or town"
          value={location}
          onChange={(e) => {
            setlocation(e.target.value) ; 
          }}
        />
        <button
          className="rounded bg-red-600 px-9 py-2 text-white"
          onClick={() => {
            if (location === '') return;

            router.push(`/search?city=${location}`);
            setlocation('');
          }}
        >
          Let&apos;s go
        </button>
      </form>
    </div>
  );
}
