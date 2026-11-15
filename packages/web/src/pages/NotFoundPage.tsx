import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Home } from 'lucide-react';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="h-[calc(100vh-12rem)] flex flex-col items-center justify-center text-center px-4">
      <div className="text-9xl font-bold text-[var(--accent)] mb-8 opacity-20">404</div>
      <h1 className="text-4xl font-bold text-[var(--text)] mb-4">Page Not Found</h1>
      <p className="text-[var(--text-secondary)] max-w-md mb-8">
        Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
      </p>
      <Button
        leftIcon={<Home size={18} />}
        onClick={() => navigate('/')}
        size="lg"
      >
        Back to Home
      </Button>
    </div>
  );
};
