
import React from 'react';
import { Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import useEmblaCarousel from 'embla-carousel-react';

interface BannerProps {
  backgroundColor: string;
  title: string;
  subtitle: string;
  buttonText?: string;
  buttonBackgroundColor?: string;
  onButtonClick?: () => void;
  imageSrc?: string;
  iconComponent?: React.ReactNode;
}

const Banner: React.FC<BannerProps> = ({
  backgroundColor,
  title,
  subtitle,
  buttonText,
  buttonBackgroundColor = "#FFF8E0",
  onButtonClick,
  imageSrc,
  iconComponent,
}) => {
  return (
    <div 
      className="relative overflow-hidden rounded-[24px] p-5 flex flex-col justify-between min-h-[200px] border-2 border-white"
      style={{ backgroundColor }}
    >
      <div className="z-10 max-w-[70%]">
        <h3 className="text-white text-lg font-bold mb-1 leading-tight">{title}</h3>
        <p className="text-white/90 mb-4 text-sm leading-tight">{subtitle}</p>
        
        {buttonText && (
          <Button 
            onClick={onButtonClick} 
            className="rounded-full px-4 py-2 h-auto text-sm font-medium"
            style={{ backgroundColor: buttonBackgroundColor, color: "#000" }}
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
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true, 
    align: 'start',
    slidesToScroll: 1,
    dragFree: true,
  });
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);

  // Update states when the carousel changes
  React.useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    emblaApi.on('init', onSelect);

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('init', onSelect);
    };
  }, [emblaApi]);

  return (
    <section className="mb-16">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Специальные предложения</h2>
      </div>
      
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4">
          {/* Ramadan Banner */}
          <div className="min-w-[240px] sm:min-w-[240px] md:min-w-[280px] flex-grow-0 flex-shrink-0">
            <Banner
              backgroundColor="#5D4777"
              title="Священный месяц Рамадан"
              subtitle="Ифтар-комбо и подарки каждый день"
              imageSrc="/lovable-uploads/15c74c04-67b6-4162-9fb4-68782e440298.png"
            />
          </div>
          
          {/* Invite Friends Banner */}
          <div className="min-w-[240px] sm:min-w-[240px] md:min-w-[280px] flex-grow-0 flex-shrink-0">
            <Banner
              backgroundColor="#00B2B0"
              title="Зови друзей и получай баллы"
              subtitle="Приглашайте друзей и получайте бонусы"
              buttonText="Баллы за друга"
              buttonBackgroundColor="#FFF8E0"
              iconComponent={<Gift size={16} />}
              onButtonClick={() => {
                console.log('Invite friends clicked');
                // Add functionality here
              }}
            />
          </div>
          
          {/* Discount Banner */}
          <div className="min-w-[240px] sm:min-w-[240px] md:min-w-[280px] flex-grow-0 flex-shrink-0">
            <Banner
              backgroundColor="#FF5757"
              title="20% скидка"
              subtitle="на первый заказ в приложении"
              buttonText="Промокод: ЦВЕТЫ20"
              buttonBackgroundColor="#FFF8E0"
              onButtonClick={() => {
                console.log('Discount clicked');
                // Add functionality here
              }}
            />
          </div>
          
          {/* Additional Banner */}
          <div className="min-w-[240px] sm:min-w-[240px] md:min-w-[280px] flex-grow-0 flex-shrink-0">
            <Banner
              backgroundColor="#FF9D42"
              title="Доставка за 30 минут"
              subtitle="Или вернём вам деньги за заказ"
              buttonText="Подробнее"
              buttonBackgroundColor="#FFF8E0"
              onButtonClick={() => {
                console.log('Express delivery clicked');
                // Add functionality here
              }}
            />
          </div>
        </div>
      </div>
      
      {/* Pagination dots */}
      <div className="flex justify-center gap-2 mt-6">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            className={`h-1.5 rounded-full transition-all ${
              index === selectedIndex ? "w-8 bg-primary" : "w-2 bg-gray-300"
            }`}
            onClick={() => emblaApi?.scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default PromotionalBanners;
