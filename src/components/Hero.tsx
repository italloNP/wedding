import { useEffect, useState } from 'react';

const TARGET_DATE = new Date('2026-12-21T16:00:00').getTime();

export default function Hero() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = TARGET_DATE - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-no-repeat"
        style={{ 
          backgroundImage: "url('https://f004.backblazeb2.com/file/WeddingBrother/full_engages_face_photo.png')",
          backgroundPosition: "center 25%"
        }}
      >
        {/* Dark overlay for contrast */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        {/* Subtitle */}
        <p className="text-white/80 uppercase tracking-[0.3em] font-medium text-sm md:text-base mb-4 drop-shadow-md">
          21 de Dezembro de 2026
        </p>

        {/* Main Title */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-10 drop-shadow-lg leading-tight">
          Giullyan <span className="font-light italic text-primary/90">&</span> Larissa
        </h1>

        {/* Countdown */}
        <div className="flex gap-4 md:gap-8 text-white">
          {[
            { label: 'Dias', value: timeLeft.days },
            { label: 'Horas', value: timeLeft.hours },
            { label: 'Minutos', value: timeLeft.minutes },
            { label: 'Segs', value: timeLeft.seconds },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center">
              <span className="text-4xl md:text-5xl font-light font-serif mb-1">{item.value.toString().padStart(2, '0')}</span>
              <span className="text-xs md:text-sm uppercase tracking-widest text-white/70">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
