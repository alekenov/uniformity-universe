
import React from 'react';
import { Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BannerProps {
  backgroundColor: string;
  title: string;
  subtitle: string;
  buttonText?: string;
  onButtonClick?: () => void;
  imageSrc?: string;
  iconComponent?: React.ReactNode;
}

const Banner: React.FC<BannerProps> = ({
  backgroundColor,
  title,
  subtitle,
  buttonText,
  onButtonClick,
  imageSrc,
  iconComponent,
}) => {
  return (
    <div 
      className="relative overflow-hidden rounded-3xl p-6 flex flex-col justify-between h-full"
      style={{ backgroundColor }}
    >
      <div className="z-10">
        <h3 className="text-white text-2xl font-bold mb-2">{title}</h3>
        <p className="text-white/90 mb-4">{subtitle}</p>
        
        {buttonText && (
          <Button 
            onClick={onButtonClick} 
            className="bg-white/90 hover:bg-white text-foreground mt-4 font-medium rounded-full px-6"
          >
            {iconComponent && <span className="mr-2">{iconComponent}</span>}
            {buttonText}
          </Button>
        )}
      </div>
      
      {imageSrc && (
        <div className="absolute bottom-0 right-0 w-1/2 h-full overflow-hidden flex items-end justify-end">
          <img 
            src={imageSrc} 
            alt={title} 
            className="object-contain max-h-full"
          />
        </div>
      )}
    </div>
  );
};

const PromotionalBanners: React.FC = () => {
  return (
    <section className="mb-16">
      <h2 className="text-2xl font-bold mb-6">Специальные предложения</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Ramadan Banner */}
        <Banner
          backgroundColor="#5D4777"
          title="Священный месяц Рамадан"
          subtitle="Ифтар-комбо и подарки каждый день"
          imageSrc="/lovable-uploads/15c74c04-67b6-4162-9fb4-68782e440298.png"
        />
        
        {/* Invite Friends Banner */}
        <Banner
          backgroundColor="#00B2B0"
          title="Зови друзей и получай баллы"
          subtitle="Приглашайте друзей и получайте бонусы"
          buttonText="Баллы за друга"
          iconComponent={<Gift size={18} />}
          onButtonClick={() => {
            console.log('Invite friends clicked');
            // Add functionality here
          }}
        />
        
        {/* Discount Banner */}
        <Banner
          backgroundColor="#FF5757"
          title="20% скидка"
          subtitle="на первый заказ в приложении"
          buttonText="Промокод: ЦВЕТЫ20"
          onButtonClick={() => {
            console.log('Discount clicked');
            // Add functionality here
          }}
        />
      </div>
    </section>
  );
};

export default PromotionalBanners;
