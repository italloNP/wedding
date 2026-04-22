import Hero from './components/Hero';
import StoryAndEvent from './components/StoryAndEvent';
import GiftRegistry from './components/GiftRegistry';
import RSVP from './components/RSVP';

export default function App() {
  return (
    <div className="min-h-screen bg-background font-sans text-text antialiased selection:bg-primary/30">
      <Hero />
      <StoryAndEvent />
      <GiftRegistry />
      <RSVP />
      
      <footer className="py-8 text-center border-t border-zinc-200">
        <p className="text-muted/60 text-sm font-medium">
          Com amor, Giullyan & Larissa &bull; 2026
        </p>
      </footer>
    </div>
  );
}
