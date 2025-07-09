
import { useEffect, useState } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import ArtworkGrid from '../components/ArtworkGrid';
import FloatingContactButtons from '../components/FloatingContactButtons';
import { ArrowRight, MapPin, Phone, Mail, Sparkles, Eye, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useIsMobile } from '../hooks/use-mobile';

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0
  });
  const [logoVisible, setLogoVisible] = useState(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    setIsLoaded(true);

    // Only track mouse position on desktop for performance
    if (!isMobile) {
      const handleMouseMove = (e: MouseEvent) => {
        setMousePosition({
          x: e.clientX,
          y: e.clientY
        });
      };
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [isMobile]);

  // Handle logo visibility on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const logoHeight = 200; // Approximate height of logo section
      setLogoVisible(scrollPosition < logoHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const stats = [{
    icon: Eye,
    label: 'Obras Criadas',
    value: '+50'
  }, {
    icon: Users,
    label: 'Colecionadores',
    value: '+25'
  }, {
    icon: Sparkles,
    label: 'Anos de Carreira',
    value: '+20'
  }];

  return (
    <div className="min-h-screen bg-soft-beige overflow-hidden">
      <Navigation />

      {/* Floating Elements Background - Desktop only for performance */}
      {!isMobile && (
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute w-96 h-96 bg-gradient-to-r from-warm-terracotta/10 to-light-blue/10 rounded-full blur-3xl floating"
            style={{
              left: mousePosition.x * 0.02 + '%',
              top: mousePosition.y * 0.02 + '%'
            }}
          />
          <div
            className="absolute w-64 h-64 bg-gradient-to-r from-gentle-green/10 to-warm-terracotta/10 rounded-full blur-3xl floating"
            style={{
              right: mousePosition.x * 0.01 + '%',
              bottom: mousePosition.y * 0.01 + '%',
              animationDelay: '2s'
            }}
          />
        </div>
      )}

      {/* Hero Section with Artworks */}
      <section className="relative pt-16 sm:pt-20 pb-12 sm:pb-16 md:pb-24 lg:pb-32 gradient-elegant">
        {/* Parallax background - Desktop only for performance */}
        {!isMobile && (
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1920&h=1080')] bg-cover bg-center opacity-5 parallax-bg"></div>
        )}

        <div className={`z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto ${isLoaded ? 'hero-reveal' : 'opacity-0'}`}>
          {/* Brand Identity - Logo */}
          <div className={`text-center mb-8 sm:mb-12 md:mb-16 transition-all duration-500 ${logoVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>
            <div className="mb-3 sm:mb-4 md:mb-6">
              <img
                src="/lovable-uploads/LOGO-SIMONE-OLIVEIRA-ART.png"
                alt="Simone Oliveira Art Gallery"
                className="mx-auto h-20 sm:h-32 md:h-40 lg:h-48 w-auto object-contain"
              />
            </div>

            <p className="font-helvetica text-sm sm:text-base md:text-lg text-deep-black/80 max-w-3xl mx-auto mb-6 sm:mb-8 leading-relaxed font-light text-center px-2">
              Explore o universo artístico de Simone Oliveira através de
              <span className="text-warm-terracotta font-medium"> cores vibrantes e formas expressivas </span>
              que tocam a alma.
            </p>

            {/* Compact Stats */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-lg mx-auto mb-8 sm:mb-12">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="bg-soft-beige/90 backdrop-blur-lg border border-gentle-green/30 rounded-xl p-3 sm:p-4 text-center hover-lift-elegant stagger-animation touch-manipulation"
                  style={{
                    animationDelay: `${0.8 + index * 0.2}s`
                  }}
                >
                  <stat.icon size={14} className="mx-auto mb-1 sm:mb-2 text-warm-terracotta sm:w-4 sm:h-4" />
                  <div className="font-semplicita text-sm sm:text-lg font-light text-deep-black">{stat.value}</div>
                  <div className="font-helvetica text-xs text-deep-black/70">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Artworks - Now in Hero */}
          <div className="mb-8 sm:mb-12">
            <div className="text-center mb-6 sm:mb-8 md:mb-12">
              <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-warm-terracotta/10 rounded-full mb-3 sm:mb-4 touch-manipulation">
                <Sparkles size={12} className="mr-2 text-warm-terracotta sm:w-4 sm:h-4" />
                <span className="font-helvetica text-xs sm:text-sm font-medium text-warm-terracotta">Obras de Destaque</span>
              </div>

              <h2 className="font-semplicita text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-deep-black mb-3 sm:mb-4 leading-tight">
                Criações de <span className="text-gradient-artistic">Simone</span>
              </h2>
            </div>

            <ArtworkGrid featuredOnly={true} />

            <div className="text-center mt-6 sm:mt-8">
              <Link
                to="/expositions"
                className="inline-flex items-center px-4 sm:px-6 py-3 bg-warm-terracotta text-soft-beige font-helvetica font-medium rounded-full hover:bg-warm-terracotta/90 transition-all duration-300 group shadow-elegant hover-lift-elegant text-sm sm:text-base touch-manipulation active:scale-95"
                style={{ minHeight: '48px' }}
              >
                <span className="relative z-10 flex items-center">
                  Ver Todas as Obras
                  <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1 sm:w-5 sm:h-5" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section - Simplified */}
      <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-soft-beige">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">
            <div className="reveal-up">
              <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-gentle-green/20 rounded-full mb-4 sm:mb-6 touch-manipulation">
                <span className="font-helvetica text-xs sm:text-sm font-medium text-warm-terracotta">Sobre a Artista</span>
              </div>

              <h2 className="font-semplicita text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-deep-black mb-4 sm:mb-6 leading-tight">
                Visão
                <span className="text-gradient-artistic"> Artística</span>
              </h2>

              <p className="font-helvetica text-sm sm:text-base text-deep-black/80 leading-relaxed mb-3 sm:mb-4 font-light justified-text">
                Simone Oliveira é uma artista que dedica sua vida à criação de obras que
                desafiam convenções e exploram as profundezas da experiência humana.
              </p>

              <p className="font-helvetica text-sm sm:text-base text-deep-black/80 leading-relaxed mb-6 sm:mb-8 font-light justified-text">
                Com mais de 15 anos de dedicação à arte, Simone desenvolveu um estilo próprio que
                combina técnicas tradicionais com elementos modernos.
              </p>

              <Link
                to="/artists"
                className="inline-flex items-center text-warm-terracotta font-helvetica font-medium hover:text-warm-terracotta/80 transition-all duration-300 group text-sm sm:text-base touch-manipulation active:scale-95"
              >
                Conheça mais sobre Simone
                <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1 sm:w-5 sm:h-5" />
              </Link>
            </div>

            <div className="reveal-up" style={{ animationDelay: '0.3s' }}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-warm-terracotta/20 to-light-blue/20 rounded-2xl sm:rounded-3xl transform rotate-3"></div>
                <img
                  src="/lovable-uploads/1730db82-b48a-4890-a40a-92dcfb123144.png"
                  alt="Simone Oliveira - Retrato"
                  className="relative w-full h-full object-cover rounded-2xl sm:rounded-3xl shadow-elegant hover-lift-elegant"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Artist in Studio Section - Compact */}
      <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gentle-green/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="font-semplicita text-2xl sm:text-3xl md:text-4xl font-light text-deep-black mb-3 sm:mb-4">
              No Ateliê
            </h2>
            <p className="font-helvetica text-sm sm:text-base text-deep-black/80 max-w-2xl mx-auto justified-text font-normal text-center">
              Simone tem seu processo criativo onde cada obra nasce da paixão e dedicação à arte.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="lg:col-span-1">
              <img
                src="/lovable-uploads/e06b8e32-b139-4ac9-9789-dd2d68767dca.png"
                alt="Simone Oliveira pintando em seu ateliê"
                className="w-full h-48 sm:h-64 object-cover rounded-2xl shadow-elegant hover-lift-elegant touch-manipulation"
              />
            </div>
            <div className="lg:col-span-1">
              <img
                src="/lovable-uploads/79f14aaa-ddef-4045-8d3e-50714c9dc43b.png"
                alt="Simone Oliveira criando arte"
                className="w-full h-48 sm:h-64 object-cover rounded-2xl shadow-elegant hover-lift-elegant touch-manipulation"
              />
            </div>
            <div className="lg:col-span-1">
              <img
                src="/lovable-uploads/simone-pintando.jpg"
                alt="Simone Oliveira criando arte"
                className="w-full h-48 sm:h-64 object-cover rounded-2xl shadow-elegant hover-lift-elegant touch-manipulation"
              />
            </div>
            <div className="lg:col-span-1 flex flex-col justify-center space-y-4">
              <img
                src="/lovable-uploads/03348f07-97c9-429b-a76d-774e1979a3e4.png"
                alt="Simone Oliveira com pincéis"
                className="w-full h-32 sm:h-40 object-cover rounded-xl shadow-lg hover-lift-elegant touch-manipulation"
              />
              <div className="bg-gentle-green/20 rounded-xl p-3 sm:p-4">
                <h3 className="font-semplicita text-lg sm:text-xl font-light text-deep-black mb-2">
                  Processo Criativo
                </h3>
                <p className="font-helvetica text-xs sm:text-sm text-deep-black/80 leading-relaxed justified-text">
                  Cada obra é resultado de um processo meditativo e intuitivo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section - Simplified */}
      <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-soft-beige">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20">
            <div className="reveal-up">
              <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-warm-terracotta/10 rounded-full mb-4 sm:mb-6 touch-manipulation">
                <span className="font-helvetica text-xs sm:text-sm font-medium text-warm-terracotta">Localização</span>
              </div>

              <h2 className="font-semplicita text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-deep-black mb-6 sm:mb-8 leading-tight">
                Visite a Galeria
              </h2>

              <div className="space-y-4 sm:space-y-6">
                {[
                  {
                    icon: MapPin,
                    title: 'Endereço',
                    content: 'Rua Elias Alves da Cunha, 73\nSão Lucas, Patrocínio - MG\nCEP: 38747-506'
                  },
                  {
                    icon: Phone,
                    title: 'WhatsApp',
                    content: '(34) 99110-1000'
                  },
                  {
                    icon: Mail,
                    title: 'E-mail',
                    content: 'gallery@simoneoliveiragallery.com'
                  }
                ].map((item, index) => (
                  <div key={item.title} className="flex items-start space-x-3 sm:space-x-4 group touch-manipulation">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 bg-warm-terracotta/10 rounded-xl flex items-center justify-center group-hover:bg-warm-terracotta/20 transition-colors duration-300">
                      <item.icon size={18} className="text-warm-terracotta sm:w-5 sm:h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-helvetica font-semibold text-deep-black mb-1 text-sm sm:text-base">{item.title}</h3>
                      <p className="font-helvetica text-deep-black/70 whitespace-pre-line leading-relaxed text-sm sm:text-base">{item.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 sm:mt-8">
                <div className="bg-gentle-green/10 rounded-xl p-4 mb-6">
                  <h4 className="font-helvetica font-semibold text-deep-black mb-2 text-sm sm:text-base">Horário de Funcionamento</h4>
                  <p className="font-helvetica text-deep-black/70 text-sm sm:text-base">Visitação mediante agendamento</p>
                  <p className="font-helvetica text-deep-black/60 text-xs sm:text-sm mt-1">Entre em contato para agendar sua visita</p>
                </div>

                <Link
                  to="/contact"
                  className="inline-flex items-center px-4 sm:px-6 py-3 bg-warm-terracotta text-soft-beige font-helvetica font-medium rounded-full hover:bg-warm-terracotta/90 transition-all duration-300 group shadow-elegant hover-lift-elegant text-sm sm:text-base touch-manipulation active:scale-95"
                  style={{ minHeight: '48px' }}
                >
                  <span className="relative z-10 flex items-center">
                    Entre em Contato
                    <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1 sm:w-5 sm:h-5" />
                  </span>
                </Link>
              </div>
            </div>

            <div
              className="h-64 sm:h-80 md:h-96 lg:h-full min-h-[250px] sm:min-h-[320px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-elegant hover-lift-elegant reveal-up touch-manipulation"
              style={{ animationDelay: '0.3s' }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3749.8631987654!2d-46.9942235!3d-18.9354321!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c08b49a0b4c8d9%3A0x8a8b8c0d1e2f3a4b!2sRua%20Elias%20Alves%20da%20Cunha%2C%2073%20-%20S%C3%A3o%20Lucas%2C%20Patroc%C3%ADnio%20-%20MG%2C%2038747-506!5e0!3m2!1spt!2sbr!4v1649876543210!5m2!1spt!2sbr"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização da Simone Oliveira Art Gallery"
                className="filter grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Floating Contact Buttons */}
      <FloatingContactButtons />

      <Footer />
    </div>
  );
};

export default Index;
