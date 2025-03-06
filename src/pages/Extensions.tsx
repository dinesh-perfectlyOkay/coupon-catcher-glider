
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Header } from '@/components/Header';
import { CouponCard } from '@/components/CouponCard';
import { StoreInfo } from '@/components/StoreInfo';
import { LoadingState } from '@/components/LoadingState';
import { EmptyState } from '@/components/EmptyState';
import { fetchStores, fetchOffers, getCurrentDomain } from '@/utils/api';
import { Store, Coupon } from '@/types';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RefreshCw, Tag, Store as StoreIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Extensions() {
  const { isAuthenticated, user } = useAuth();
  const [currentDomain, setCurrentDomain] = useState<string>('');
  const [stores, setStores] = useState<Store[]>([]);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>('coupons');
  
  const fetchData = async () => {
    try {
      setIsLoading(true);
      
      const domain = getCurrentDomain();
      setCurrentDomain(domain);
      
      // Fetch stores data
      const storesData = await fetchStores(domain);
      setStores(storesData);
      
      // Fetch coupons data
      const couponsData = await fetchOffers(domain);
      setCoupons(couponsData);
      
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load data. Please try again.');
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []);
  
  const handleRefresh = () => {
    fetchData();
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-background/80 text-foreground overflow-hidden">
      <Header />
      
      {isLoading ? (
        <LoadingState />
      ) : (
        <div className="flex-1 overflow-auto p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-medium">
              {currentDomain ? `Results for ${currentDomain}` : 'Browse Coupons'}
            </h2>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              className="h-8 w-8 p-0"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Store information section */}
          {stores.length > 0 && (
            <StoreInfo store={stores[0]} />
          )}
          
          {/* Tabs for coupons */}
          <Tabs defaultValue="coupons" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="coupons" className="flex items-center gap-1.5">
                <Tag className="h-4 w-4" />
                <span>Coupons</span>
                {coupons.length > 0 && (
                  <span className="ml-1 text-xs bg-primary/10 text-primary rounded-full px-1.5">
                    {coupons.length}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="stores" className="flex items-center gap-1.5">
                <StoreIcon className="h-4 w-4" />
                <span>Stores</span>
                {stores.length > 0 && (
                  <span className="ml-1 text-xs bg-primary/10 text-primary rounded-full px-1.5">
                    {stores.length}
                  </span>
                )}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="coupons" className="space-y-4 mt-2">
              {coupons.length > 0 ? (
                coupons.map((coupon) => (
                  <CouponCard key={coupon.id} coupon={coupon} />
                ))
              ) : (
                <EmptyState type="coupons" />
              )}
            </TabsContent>
            
            <TabsContent value="stores" className="space-y-4 mt-2">
              {stores.length > 0 ? (
                stores.map((store) => (
                  <StoreInfo key={store.id} store={store} />
                ))
              ) : (
                <EmptyState type="stores" />
              )}
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
}

export default Extensions;
