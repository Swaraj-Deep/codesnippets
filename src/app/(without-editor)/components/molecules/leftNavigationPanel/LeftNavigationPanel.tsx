import ShortUniqueId from 'short-unique-id';

// Constants
import { ROUTES } from '@/constants/routes';

// Components
import LinkButton from '@/components/atoms/linkButton';
import Logo from '@/components/atoms/logo';

function LeftNavigationPanel() {
  const { randomUUID } = new ShortUniqueId({ length: 12 });
  const snippetId = randomUUID();
  return (
    <nav className="row-start-1 row-end-4">
      <Logo className="h-[117px]" />
      <ul className="mt-10">
        <li className="mb-4">
          <LinkButton
            href={`${ROUTES.CREATE_SNIPPET}/${snippetId}`}
            label="Create Snippet"
            className="p-4 h-20 border-4"
          />
        </li>
      </ul>
    </nav>
  );
}

export default LeftNavigationPanel;
