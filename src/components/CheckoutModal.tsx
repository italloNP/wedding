import { useEffect, useState } from 'react';
import { X, Lock, ShieldCheck, Copy } from 'lucide-react';
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
  const [pixData, setPixData] = useState<any>(null);

  useEffect(() => {
    // A PUBLIC_KEY é segura para ficar no Frontend.
    // Puxando da variável de ambiente VITE_PUBLIC_KEY ou da Public_key da Vercel
    const publicKey = import.meta.env.Public_key || import.meta.env.VITE_PUBLIC_KEY || 'APP_USR-00d448c2-3aeb-40b9-9c4f-0026758320ac';
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

  const onSubmit = async ({ formData, selectedPaymentMethod }: any) => {
    return new Promise((resolve, reject) => {
      console.log('Dados do Pagamento:', formData);
      
      fetch('/api/process_payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ formData, giftTitle: gift.title }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 'pending' || data.status === 'approved') {
            if (formData.payment_method_id === 'pix' && data.point_of_interaction) {
              setPixData(data.point_of_interaction.transaction_data);
            }
            resolve('ok');
          } else {
            console.error('Erro no pagamento:', data);
            reject();
          }
        })
        .catch((error) => {
          console.error('Erro na requisição:', error);
          reject();
        });
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
            {!pixData ? (
              <Payment
                initialization={initialization}
                customization={customization}
                onSubmit={onSubmit}
              />
            ) : (
              <div className="flex flex-col items-center justify-center space-y-6 py-8 animate-in fade-in">
                <div className="text-center space-y-2">
                  <h3 className="text-2xl font-serif text-text">Pague com Pix</h3>
                  <p className="text-sm text-muted">
                    Escaneie o QR Code ou copie o código para finalizar seu presente.
                  </p>
                </div>
                
                <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-100">
                  <img 
                    src={`data:image/jpeg;base64,${pixData.qr_code_base64}`} 
                    alt="QR Code Pix" 
                    className="w-48 h-48"
                  />
                </div>

                <div className="w-full max-w-sm space-y-2">
                  <p className="text-xs font-medium text-muted uppercase tracking-wider text-center">
                    Código Copia e Cola
                  </p>
                  <div className="flex items-center space-x-2">
                    <input 
                      type="text" 
                      readOnly 
                      value={pixData.qr_code} 
                      className="flex-1 p-3 text-sm bg-zinc-50 border border-zinc-200 rounded-lg text-zinc-600 outline-none truncate"
                    />
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(pixData.qr_code);
                        alert('Código Pix copiado!');
                      }}
                      className="p-3 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors flex items-center justify-center shrink-0"
                      title="Copiar código"
                    >
                      <Copy size={20} />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
