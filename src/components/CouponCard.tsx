
import { Coupon } from '@/types';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { toast } from '@/components/ui/sonner';

interface CouponCardProps {
  coupon: Coupon;
}

export function CouponCard({ coupon }: CouponCardProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(coupon.code);
    toast.success("Coupon code copied to clipboard!");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-card rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-200 border border-border neo-shadow animate-fadeIn">
      <div className="flex justify-between items-start mb-2">
        <div className="flex flex-col">
          <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary mb-2 w-fit">
            {coupon.discount_value || 'Special Offer'}
          </span>
          <h3 className="font-medium text-sm">{coupon.description}</h3>
        </div>
      </div>
      
      {coupon.expiry_date && (
        <p className="text-xs text-muted-foreground mb-3">
          Expires: {new Date(coupon.expiry_date).toLocaleDateString()}
        </p>
      )}
      
      <div className="flex items-center justify-between mt-2">
        <div className="bg-secondary/50 rounded px-3 py-1.5 font-mono text-sm flex-1 mr-2 border border-border/50">
          {coupon.code}
        </div>
        <Button 
          size="sm"
          onClick={copyToClipboard}
          className={`transition-all duration-300 ${copied ? 'bg-green-500 text-white' : ''}`}
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </Button>
      </div>

      {coupon.success_rate !== undefined && (
        <div className="mt-3 flex items-center">
          <div className="h-1.5 bg-muted rounded-full w-full overflow-hidden">
            <div 
              className="h-full bg-primary rounded-full"
              style={{ width: `${coupon.success_rate}%` }}
            />
          </div>
          <span className="ml-2 text-xs text-muted-foreground whitespace-nowrap">
            {coupon.success_rate}% success
          </span>
        </div>
      )}
    </div>
  );
}
