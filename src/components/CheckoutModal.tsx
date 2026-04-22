import { useEffect } from 'react';
import { X, Lock, ShieldCheck } from 'lucide-react';
import { initMercadoPago, Payment } from '@mercadopago/sdk-react';

interface CheckoutModalProps {
  gift: {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
  };
  onClose: () => void;
  formatCurrency: (value: number) => string;
}

export default function CheckoutModal({ gift, onClose, formatCurrency }: CheckoutModalProps) {
  useEffect(() => {
    // A PUBLIC_KEY é segura para ficar no Frontend.
    // Puxando da variável de ambiente VITE_PUBLIC_KEY (com fallback para desenvolvimento local)
    const publicKey = import.meta.env.VITE_PUBLIC_KEY || 'APP_USR-00d448c2-3aeb-40b9-9c4f-0026758320ac';
    initMercadoPago(publicKey, { locale: 'pt-BR' });
  }, []);

  const initialization = {
    amount: gift.price,
  };

  const customization: any = {
    paymentMethods: {
      creditCard: 'all',
      bankTransfer: 'all', // Permite PIX
    },
  };

  const onSubmit = async (formData: any) => {
    // Callback executado quando o pagamento é enviado.
    return new Promise((resolve) => {
      console.log('Dados do Pagamento:', formData);
      // Aqui você enviará o pagamento para o banco de dados/backend futuramente.
      resolve('ok');
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-text/50 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white w-full max-w-4xl rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Left Side: Summary */}
        <div className="w-full md:w-5/12 bg-zinc-50 p-6 md:p-8 border-r border-zinc-100 flex flex-col">
          <div className="mb-8">
            <h3 className="text-sm font-medium text-muted uppercase tracking-wider mb-2">Resumo do Presente</h3>
            <div className="flex items-center space-x-4">
              <img src={gift.imageUrl} alt={gift.title} className="w-16 h-16 rounded-lg object-cover" />
              <div>
                <p className="font-serif text-lg leading-tight text-text">{gift.title}</p>
                <p className="text-primary font-medium mt-1">{formatCurrency(gift.price)}</p>
              </div>
            </div>
          </div>

          <div className="mt-auto space-y-4">
            <div className="flex items-center space-x-2 text-emerald-600 bg-emerald-50 p-3 rounded-lg">
              <ShieldCheck size={20} />
              <p className="text-sm font-medium">Pagamento 100% Seguro</p>
            </div>
            <div className="text-xs text-muted/70 flex items-center space-x-1 justify-center">
              <Lock size={12} />
              <span>Ambiente criptografado.</span>
            </div>
          </div>
        </div>

        {/* Right Side: Payment Form */}
        <div className="w-full md:w-7/12 p-6 md:p-8 flex flex-col relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 md:top-6 md:right-6 p-2 text-zinc-400 hover:text-text transition-colors bg-zinc-50 rounded-full hover:bg-zinc-100"
          >
            <X size={20} />
          </button>

          <h2 className="text-2xl font-serif text-text mb-6">Pagamento Seguro</h2>

          {/* Integração Real do Mercado Pago Brick */}
          <div className="flex-1 w-full min-h-[400px] bg-white rounded-lg relative overflow-y-auto pr-2">
            <Payment
              initialization={initialization}
              customization={customization}
              onSubmit={onSubmit}
            />
          </div>

        </div>
      </div>
    </div>
  );
}
