import { useState } from 'react';
import { Gift } from 'lucide-react';
import CheckoutModal from './CheckoutModal';

interface GiftItem {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
}

const GIFTS: GiftItem[] = [
  {
    id: '1',
    title: 'Jantar Romântico na Lua de Mel',
    price: 350,
    imageUrl: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: '2',
    title: 'Passeio de Barco',
    price: 500,
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: '3',
    title: 'Cota Passagens Aéreas',
    price: 1000,
    imageUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop',
  },
  {
    id: '4',
    title: 'Mergulho com Tartarugas',
    price: 250,
    imageUrl: 'https://images.pexels.com/photos/1618606/pexels-photo-1618606.jpeg',
  },
  {
    id: '5',
    title: 'Dia de Spa para o Casal',
    price: 800,
    imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: '6',
    title: 'Brinde com Champagne',
    price: 150,
    imageUrl: 'https://images.unsplash.com/photo-1569488859134-24b2d490f23f?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: '7',
    title: 'Cafezinho da Tarde (Teste)',
    price: 0.10,
    imageUrl: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg',
  },
  {
    id: '8',
    title: 'Bala de Menta (Teste)',
    price: 0.10,
    imageUrl: 'https://images.pexels.com/photos/4016579/pexels-photo-4016579.jpeg',
  },
];

export default function GiftRegistry() {
  const [selectedGift, setSelectedGift] = useState<GiftItem | null>(null);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  return (
    <section className="py-24 px-4 bg-zinc-50 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <span className="h-[1px] w-8 bg-primary"></span>
            <Gift className="text-primary" size={24} strokeWidth={1.5} />
            <span className="h-[1px] w-8 bg-primary"></span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-text">Lista de Presentes</h2>
          <p className="text-muted max-w-2xl mx-auto text-lg pt-4">
            A nossa maior alegria é ter você celebrando conosco. Caso queira nos abençoar com um presente, 
            criamos algumas cotas para a nossa lua de mel.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {GIFTS.map((gift) => (
            <div key={gift.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-zinc-100 flex flex-col">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={gift.imageUrl} 
                  alt={gift.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-serif text-xl mb-2 text-text">{gift.title}</h3>
                <p className="font-medium text-lg text-primary mb-6">{formatCurrency(gift.price)}</p>
                <div className="mt-auto">
                  <button 
                    onClick={() => setSelectedGift(gift)}
                    className="w-full py-3.5 px-4 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors duration-300 font-medium"
                  >
                    Presentear
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedGift && (
        <CheckoutModal 
          gift={selectedGift} 
          onClose={() => setSelectedGift(null)} 
          formatCurrency={formatCurrency}
        />
      )}
    </section>
  );
}
