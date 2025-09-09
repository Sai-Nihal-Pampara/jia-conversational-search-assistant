import React from 'react';
import type { View } from '../types';

const promos = [
  { id: 1, src: "https://assets.ajio.com/cms/AJIO/WEB/D-1.0-UHP-21072024-TopBanner-Z3-P1-Avaasa-AK-min60.jpg", alt: "Avaasa & AK - Min 60% Off" },
  { id: 2, src: "https://assets.ajio.com/cms/AJIO/WEB/D-1.0-UHP-21072024-TopBanner-Z3-P2-Netplay-DNMX-min50.jpg", alt: "Netplay & DNMX - Min 50% Off" },
  { id: 3, src: "https://assets.ajio.com/cms/AJIO/WEB/D-1.0-UHP-21072024-TopBanner-Z3-P3-Puma-Adidas-min50.jpg", alt: "Puma & Adidas - Min 50% Off" },
  { id: 4, src: "https://assets.ajio.com/cms/AJIO/WEB/D-1.0-UHP-21072024-TopBanner-Z3-P4-GAP-Tommy-starting1299.jpg", alt: "GAP & Tommy Hilfiger - Starting at 1299" },
  { id: 5, src: "https://assets.ajio.com/cms/AJIO/WEB/D-1.0-UHP-21072024-TodaysDeals-Z1-P1-Crocs-Upto50.jpg", alt: "Crocs - Up to 50% Off" },
  { id: 6, src: "https://assets.ajio.com/cms/AJIO/WEB/D-1.0-UHP-21072024-TodaysDeals-Z1-P2-Mothercare-Upto50.jpg", alt: "Mothercare - Up to 50% Off" },
  { id: 7, src: "https://assets.ajio.com/cms/AJIO/WEB/D-1.0-UHP-21072024-TodaysDeals-Z1-P3-ONLY-VeroModa-Min60.jpg", alt: "ONLY & Vero Moda - Min 60% Off" },
  { id: 8, src: "https://assets.ajio.com/cms/AJIO/WEB/D-1.0-UHP-21072024-TodaysDeals-Z1-P4-USPA-Celfie-Min60.jpg", alt: "USPA & Celfie - Min 60% Off" },
];

interface PromotionalGridProps {
  navigateTo: (view: View) => void;
}

export const PromotionalGrid: React.FC<PromotionalGridProps> = ({ navigateTo }) => { 
  return (
    <div className="w-full py-4 px-2">
      <div className="max-w-screen-2xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-2">
        {promos.map(promo => (
          <div key={promo.id} className="cursor-pointer group">
            <img 
              src={promo.src} 
              alt={promo.alt} 
              className="w-full h-auto object-cover rounded-md transition-transform duration-300 group-hover:scale-105"
              onClick={() => navigateTo({ page: 'search', payload: promo.alt })}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
