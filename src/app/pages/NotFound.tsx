import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 bg-[#faf8f5]">
      <div className="text-center max-w-2xl">
        <div className="w-20 h-20 bg-gradient-bronze rounded flex items-center justify-center mx-auto mb-10">
          <span className="text-3xl text-white font-serif">404</span>
        </div>
        
        <div className="w-16 h-px bg-gradient-bronze mx-auto mb-8" />
        
        <h1 className="mb-6 text-[#2c2c2c]">Page Not Found</h1>
        <p className="text-xl text-[#6b6b6b] mb-12 max-w-md mx-auto leading-relaxed">
          The page you're looking for doesn't exist. Let's redirect you to where exceptional skincare awaits.
        </p>
        
        <Link to="/">
          <Button className="btn-bronze px-10 py-6 rounded hover:shadow-md transition-all">
            <Home className="w-5 h-5 mr-2" />
            Return Home
          </Button>
        </Link>
      </div>
    </div>
  );
}