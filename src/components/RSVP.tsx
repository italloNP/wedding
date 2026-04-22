import { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

export default function RSVP() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setSubmitted(true);
    }, 600);
  };

  return (
    <section className="py-24 px-4 bg-white border-t border-zinc-100">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-serif text-text mb-6">Confirme sua Presença</h2>
        <p className="text-muted text-lg mb-12">
          Por favor, confirme sua presença até o dia 01 de Novembro de 2026.
        </p>

        {submitted ? (
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-12 flex flex-col items-center animate-in zoom-in duration-500">
            <CheckCircle2 size={48} className="text-primary mb-4" />
            <h3 className="text-2xl font-serif text-text mb-2">Presença Confirmada!</h3>
            <p className="text-muted">Agradecemos sua confirmação. Mal podemos esperar para celebrar com você!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-zinc-50 p-8 md:p-12 rounded-2xl border border-zinc-100 text-left">
            <div className="space-y-6">
              
              <div>
                <label className="block text-sm font-medium text-text mb-2">Nome Completo</label>
                <input 
                  required
                  type="text" 
                  placeholder="Seu nome" 
                  className="w-full px-4 py-3 bg-white border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-text mb-2">Você irá ao evento?</label>
                  <select className="w-full px-4 py-3 bg-white border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none cursor-pointer">
                    <option value="sim">Sim, estarei lá!</option>
                    <option value="nao">Infelizmente, não poderei comparecer.</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-text mb-2">Número de Acompanhantes</label>
                  <select className="w-full px-4 py-3 bg-white border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none cursor-pointer">
                    <option value="0">Vou sozinho(a)</option>
                    <option value="1">1 Acompanhante</option>
                    <option value="2">2 Acompanhantes</option>
                    <option value="3">3 Acompanhantes</option>
                  </select>
                  <p className="text-xs text-muted/70 mt-2">*Incluindo crianças</p>
                </div>
              </div>

            </div>

            <button 
              type="submit"
              className="mt-10 w-full py-4 px-6 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors duration-300 font-medium flex items-center justify-center space-x-2"
            >
              <span>Enviar Confirmação</span>
              <Send size={18} />
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
