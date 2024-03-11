'use client';
import { useRouter } from 'next/navigation';

// Constants
import { SEARCH_QUERIES } from '@/constants/routes';

// Components
import Button from '@/components/atoms/button';

function Header() {
  const router = useRouter();

  return (
    <header className="col-start-2 flex justify-end gap-2 items-center">
      <Button
        label="Join Now"
        variant="accent"
        onClick={() => {
          const currUrl = new URL(window.location.href);
          currUrl.searchParams.set(
            SEARCH_QUERIES.JOIN_NOW.key,
            SEARCH_QUERIES.JOIN_NOW.value
          );
          router.push(currUrl.toString());
        }}
      />
      <Button label="Login" />
    </header>
  );
}

export default Header;
