import { Link, useLocation } from 'react-router-dom';
import './AppShell.css';

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="app-shell">
      {!isHome && (
        <nav className="app-nav" aria-label="Main navigation">
          <ul>
            <li>
              <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/play" className={location.pathname === '/play' ? 'active' : ''}>
                Play
              </Link>
            </li>
            <li>
              <Link to="/rules" className={location.pathname === '/rules' ? 'active' : ''}>
                Rules
              </Link>
            </li>
            <li>
              <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>
                About
              </Link>
            </li>
          </ul>
        </nav>
      )}
      <main className="app-content">{children}</main>
    </div>
  );
}
