import { MapPin, CalendarHeart, Clock } from 'lucide-react';

export default function StoryAndEvent() {
  return (
    <section className="py-24 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
          
          {/* Our Story */}
          <div className="flex flex-col space-y-6">
            <div className="flex items-center space-x-4 mb-2">
              <span className="h-[1px] w-12 bg-primary"></span>
              <h2 className="text-sm uppercase tracking-[0.2em] text-primary font-medium">Nossa História</h2>
            </div>
            <h3 className="text-4xl md:text-5xl font-serif text-text leading-tight">
              Um encontro <br /> preparado por Deus.
            </h3>
            <p className="text-muted leading-relaxed text-lg mb-8">
              O que começou como uma linda amizade floresceu em um amor profundo e genuíno. 
              Ao longo desses anos, compartilhamos sonhos, superamos desafios e construímos 
              uma base sólida de respeito e carinho. Agora, estamos prestes a dar o passo mais 
              importante de nossas vidas e queremos você ao nosso lado.
            </p>
            <div className="relative h-64 md:h-80 w-full overflow-hidden rounded-2xl shadow-sm">
              <img 
                src="https://f004.backblazeb2.com/file/WeddingBrother/hands_with_drinks.png" 
                alt="Brinde L&G" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* The Event */}
          <div className="bg-white p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl border border-zinc-100 flex flex-col justify-center">
            <div className="flex items-center space-x-4 mb-8">
              <h2 className="text-2xl font-serif text-text">O Evento</h2>
              <span className="h-[1px] flex-1 bg-zinc-100"></span>
            </div>

            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-full text-primary">
                  <CalendarHeart size={24} strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="font-medium text-lg text-text">Data</h4>
                  <p className="text-muted mt-1">Segunda-feira, 21 de Dezembro de 2026</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-full text-primary">
                  <Clock size={24} strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="font-medium text-lg text-text">Horário</h4>
                  <p className="text-muted mt-1">Cerimônia às 16:00h</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-full text-primary">
                  <MapPin size={24} strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="font-medium text-lg text-text">Local</h4>
                  <p className="text-muted mt-1">Fazenda Vila Rica</p>
                  <p className="text-sm text-muted/70 mt-1">Rod. Gov. Doutor Adhemar Pereira de Barros, km 127 - Itatiba, SP</p>
                </div>
              </div>
            </div>

            <button className="mt-10 w-full py-4 px-6 bg-text text-white rounded-lg hover:bg-zinc-800 transition-colors duration-300 font-medium flex items-center justify-center space-x-2 group">
              <span>Ver no mapa</span>
              <MapPin size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
