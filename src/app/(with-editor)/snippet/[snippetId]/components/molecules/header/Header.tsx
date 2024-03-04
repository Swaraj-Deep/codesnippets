// Components
import Button from '@/components/atoms/button';
import Logo from '@/components/atoms/logo';

function Header() {
  return (
    <header className="flex justify-between items-center">
      <Logo className="h-12" />
      <div className="flex gap-2">
        <Button label="Save" />
        <Button label="Share" />
        <Button label="Login" />
        <Button label="Join Now" variant="accent" />
      </div>
    </header>
  );
}

export default Header;
