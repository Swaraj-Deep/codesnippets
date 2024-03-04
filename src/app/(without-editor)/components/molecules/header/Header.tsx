import Button from '@/components/atoms/button';

function Header() {
  return (
    <header className="col-start-2 flex justify-end gap-2 items-center">
      <Button label="Join Now" variant="accent" />
      <Button label="Login" />
    </header>
  );
}

export default Header;
