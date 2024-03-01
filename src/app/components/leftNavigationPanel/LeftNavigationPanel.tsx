// Constants
import { ROUTES } from '@/constants/routes';

// Components
import LinkButton from '@/components/atoms/linkButton';
import Logo from './components/atoms/Logo';

function LeftNavigationPanel() {
  return (
    <nav className="row-start-1 row-end-4">
      <Logo />
      <ul className="mt-10">
        <li className="mb-4">
          <LinkButton
            href={ROUTES.CREATE_SNIPPET}
            label="Create Snippet"
            className="p-4 h-20 border-4"
          />
        </li>
        <li>
          <LinkButton
            href={ROUTES.SEARCH}
            label="Search Snippets"
            variant="outline"
          />
        </li>
      </ul>
    </nav>
  );
}

export default LeftNavigationPanel;
