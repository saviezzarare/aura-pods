import pod1 from '@/assets/pod-1.jpg';
import pod2 from '@/assets/pod-2.jpg';
import pod3 from '@/assets/pod-3.jpg';
import pod4 from '@/assets/pod-4.jpg';
import pod5 from '@/assets/pod-5.jpg';
import pod6 from '@/assets/pod-6.jpg';

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: 'pods' | 'kits' | 'accessories';
  flavor?: string;
  rating: number;
  reviews: number;
  description: string;
  features: string[];
  inStock: boolean;
  badge?: string;
}

export const products: Product[] = [
  {
    id: 'vapor-x-pro',
    name: 'Vapor X Pro',
    brand: 'VaporTech',
    price: 49.99,
    originalPrice: 64.99,
    image: pod1,
    category: 'pods',
    flavor: 'Classic Tobacco',
    rating: 4.8,
    reviews: 234,
    description: 'The Vapor X Pro delivers an unparalleled experience with its advanced ceramic coil technology and sleek matte finish. Engineered for maximum flavor extraction with zero compromise on cloud production.',
    features: ['800mAh Battery', 'Type-C Charging', 'Ceramic Coil', 'Draw-Activated'],
    inStock: true,
    badge: 'Best Seller',
  },
  {
    id: 'nova-elite',
    name: 'Nova Elite',
    brand: 'NovaVape',
    price: 59.99,
    image: pod2,
    category: 'pods',
    flavor: 'Cool Mint',
    rating: 4.9,
    reviews: 189,
    description: 'Premium pod system featuring dual-mesh coil technology for exceptionally smooth vapor. The Nova Elite sets a new standard in portable vaping with its aerospace-grade aluminum body.',
    features: ['1000mAh Battery', 'Dual Mesh Coil', 'LED Indicator', 'Adjustable Airflow'],
    inStock: true,
    badge: 'New',
  },
  {
    id: 'aurora-pod',
    name: 'Aurora Pod',
    brand: 'AuraTech',
    price: 39.99,
    originalPrice: 49.99,
    image: pod3,
    category: 'pods',
    flavor: 'Mango Ice',
    rating: 4.7,
    reviews: 312,
    description: 'Compact and powerful, the Aurora Pod combines rose gold elegance with cutting-edge vaporization. Perfect for those who demand both style and substance.',
    features: ['650mAh Battery', 'Magnetic Pods', 'Auto-Draw', 'Compact Design'],
    inStock: true,
  },
  {
    id: 'nexus-starter-kit',
    name: 'Nexus Starter Kit',
    brand: 'NexVape',
    price: 79.99,
    image: pod4,
    category: 'kits',
    rating: 4.6,
    reviews: 156,
    description: 'Everything you need to get started. The Nexus Starter Kit includes the device, charging case, and three premium pod flavors. The ultimate introduction to premium vaping.',
    features: ['Complete Kit', 'Charging Case', '3 Pod Flavors', 'USB-C Cable'],
    inStock: true,
    badge: 'Popular',
  },
  {
    id: 'phantom-air',
    name: 'Phantom Air',
    brand: 'PhantomVape',
    price: 44.99,
    image: pod5,
    category: 'pods',
    flavor: 'Vanilla Cream',
    rating: 4.5,
    reviews: 98,
    description: 'Ultra-lightweight and whisper-quiet, the Phantom Air disappears in your pocket but delivers full-sized flavor. Its minimalist white design is a statement of modern simplicity.',
    features: ['750mAh Battery', 'Silent Operation', 'Leak-Proof', 'Ultra Light'],
    inStock: true,
  },
  {
    id: 'prism-pod',
    name: 'Prism Pod',
    brand: 'PrismTech',
    price: 54.99,
    originalPrice: 69.99,
    image: pod6,
    category: 'pods',
    flavor: 'Berry Blast',
    rating: 4.8,
    reviews: 267,
    description: 'The Prism Pod features a stunning gradient finish that shifts colors in the light. Beyond its mesmerizing appearance, it packs advanced temperature control for the perfect draw every time.',
    features: ['900mAh Battery', 'Temp Control', 'Gradient Finish', 'Fast Charge'],
    inStock: true,
    badge: 'Sale',
  },
];
