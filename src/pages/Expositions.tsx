
import { useState } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import ArtworkGrid from '../components/ArtworkGrid';
import { useExhibitions } from '../hooks/useExhibitions';
import { Calendar, MapPin, Eye, Users } from 'lucide-react';

const Expositions = () => {
  const [activeTab, setActiveTab] = useState<'artworks' | 'exhibitions'>('artworks');
  const { data: exhibitions = [], isLoading: exhibitionsLoading } = useExhibitions();

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'current': return 'Em Cartaz';
      case 'upcoming': return 'Em Breve';
      case 'past': return 'Finalizada';
      default: return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'current': return 'text-green-600 bg-green-100';
      case 'upcoming': return 'text-blue-600 bg-blue-100';
      case 'past': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-soft-beige">
      <Navigation />
      
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="font-semplicita text-5xl lg:text-6xl font-light text-deep-black mb-6 leading-tight">
              Obras & Exposições
            </h1>
            <p className="font-helvetica text-lg text-deep-black/80 max-w-2xl mx-auto justified-text">
              Explore todo o universo artístico de Simone Oliveira através de suas obras e exposições.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center space-x-1 bg-gentle-green/10 p-1 rounded-2xl mb-12 max-w-md mx-auto">
            <button
              onClick={() => setActiveTab('artworks')}
              className={`flex-1 py-3 px-6 rounded-xl font-helvetica font-medium text-sm transition-all duration-300 ${
                activeTab === 'artworks'
                  ? 'bg-warm-terracotta text-soft-beige shadow-lg'
                  : 'text-deep-black hover:text-warm-terracotta hover:bg-gentle-green/20'
              }`}
            >
              Todas as Obras
            </button>
            <button
              onClick={() => setActiveTab('exhibitions')}
              className={`flex-1 py-3 px-6 rounded-xl font-helvetica font-medium text-sm transition-all duration-300 ${
                activeTab === 'exhibitions'
                  ? 'bg-warm-terracotta text-soft-beige shadow-lg'
                  : 'text-deep-black hover:text-warm-terracotta hover:bg-gentle-green/20'
              }`}
            >
              Exposições
            </button>
          </div>

          {/* Artworks Tab */}
          {activeTab === 'artworks' && (
            <div>
              <div className="text-center mb-12">
                <h2 className="font-semplicita text-3xl lg:text-4xl font-light text-deep-black mb-4">
                  Acervo Completo
                </h2>
                <p className="font-helvetica text-deep-black/70 max-w-xl mx-auto">
                  Descubra todas as obras da artista Simone Oliveira
                </p>
              </div>
              <ArtworkGrid />
            </div>
          )}

          {/* Exhibitions Tab */}
          {activeTab === 'exhibitions' && (
            <div>
              <div className="text-center mb-12">
                <h2 className="font-semplicita text-3xl lg:text-4xl font-light text-deep-black mb-4">
                  Exposições
                </h2>
                <p className="font-helvetica text-deep-black/70 max-w-xl mx-auto">
                  Conheça as exposições passadas, atuais e futuras
                </p>
              </div>

              {exhibitionsLoading ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-gentle-green/10 rounded-3xl h-96 animate-pulse" />
                  ))}
                </div>
              ) : exhibitions.length === 0 ? (
                <div className="text-center py-16">
                  <p className="font-helvetica text-deep-black/70 text-lg">
                    Nenhuma exposição cadastrada ainda
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {exhibitions.map((exhibition) => (
                    <div key={exhibition.id} className="bg-soft-beige border border-gentle-green/20 rounded-3xl overflow-hidden shadow-elegant hover-lift-elegant">
                      <div className="relative h-64 overflow-hidden">
                        <img
                          src={exhibition.image}
                          alt={exhibition.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 left-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(exhibition.status)}`}>
                            {getStatusLabel(exhibition.status)}
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="font-semplicita text-xl font-light text-deep-black mb-2">
                          {exhibition.title}
                        </h3>
                        <p className="font-helvetica text-sm text-deep-black/60 mb-4 leading-relaxed">
                          {exhibition.description}
                        </p>
                        <div className="flex items-center text-deep-black/50 text-sm mb-2">
                          <Calendar size={16} className="mr-2" />
                          <span>
                            {new Date(exhibition.start_date).toLocaleDateString('pt-BR')} - {new Date(exhibition.end_date).toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                        <div className="flex items-center text-deep-black/50 text-sm">
                          <MapPin size={16} className="mr-2" />
                          <span>{exhibition.location}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Expositions;
