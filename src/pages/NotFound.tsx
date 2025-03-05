
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background/80 text-foreground">
      <div className="text-center max-w-md mx-auto p-8 rounded-lg glass neo-shadow">
        <h1 className="text-8xl font-thin text-primary mb-4">404</h1>
        <p className="text-xl text-foreground mb-6">The page you're looking for doesn't exist.</p>
        
        <Button 
          variant="outline" 
          onClick={() => window.history.back()}
          className="mt-2 gap-2 neo-shadow"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Go Back</span>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
