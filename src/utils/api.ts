
import { User, Store, Coupon } from '@/types';

const BASE_URL = 'https://staging.coupons.fit';

export async function getUserData(cookies: string): Promise<User> {
  try {
    const response = await fetch(`${BASE_URL}/api/test`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': cookies
      },
      credentials: 'include'
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
}

export async function fetchStores(domain: string): Promise<Store[]> {
  try {
    const response = await fetch(`${BASE_URL}/api/public/stores?store_website=${domain}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching stores:', error);
    throw error;
  }
}

export async function fetchOffers(domain: string): Promise<Coupon[]> {
  try {
    const response = await fetch(`${BASE_URL}/api/public/offers?store_website=${domain}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching offers:', error);
    throw error;
  }
}

export function getCurrentDomain(): string {
  const url = new URL(window.location.href);
  return url.hostname;
}

export function parseJwt(token: string) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
}

export function getCookies(): string {
  return document.cookie;
}
