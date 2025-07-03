
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
const Artists = () => {
  return <div className="min-h-screen bg-soft-beige">
    <Navigation />

    {/* Header */}
    <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 gradient-elegant">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="font-semplicita text-5xl md:text-6xl font-light text-deep-black mb-6 fade-in">
          Sobre Simone Oliveira
        </h1>
        <p className="font-helvetica text-xl text-deep-black/80 max-w-3xl mx-auto leading-relaxed slide-up justified-text text-center">
          Conheça a trajetória, inspirações e processo criativo de uma das mais talentosas
          artistas do cenário nacional, cujas obras tocam a alma e despertam emoções profundas.
        </p>
      </div>
    </section>

    {/* Artist Profile */}
    <section className="px-4 sm:px-6 lg:px-8 pb-20 bg-soft-beige">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-warm-terracotta/20 to-light-blue/20 rounded-3xl transform rotate-3"></div>
            <img src="/lovable-uploads/1730db82-b48a-4890-a40a-92dcfb123144.png" alt="Simone Oliveira" className="relative w-full h-[600px] object-cover rounded-3xl shadow-elegant hover-lift-elegant" />
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="font-semplicita text-4xl font-light text-deep-black mb-4 py-[25px]">
                Simone Oliveira
              </h2>
              <p className="art-gallery-tag text-warm-terracotta text-lg mb-6">
                Artista Visual
              </p>

              <div className="space-y-4 text-deep-black/80 leading-relaxed">
                <p className="font-helvetica justified-text">
                  Nascida em São Paulo, Simone Oliveira desenvolveu sua paixão pela arte desde muito jovem.
                  Formada em Artes Visuais pela Universidade de São Paulo, dedicou sua carreira à exploração
                  de técnicas mistas que combinam tradição e inovação contemporânea.
                </p>

                <p className="font-helvetica justified-text">
                  Suas obras refletem uma profunda conexão com questões humanas universais, explorando temas como
                  emoção, identidade e transformação pessoal através de uma linguagem visual única que
                  mescla cores vibrantes com formas expressivas e texturas envolventes.
                </p>

                <p className="font-helvetica justified-text">
                  Com mais de 25 exposições realizadas e obras em coleções privadas por todo o Brasil,
                  Simone continua a expandir os limites de sua expressão artística, sempre buscando novas
                  formas de conectar-se profundamente com seu público através da arte.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-6 bg-gentle-green/20 rounded-xl shadow-lg">
                <div className="font-semplicita text-3xl font-light text-warm-terracotta mb-2">35+</div>
                <div className="font-helvetica text-sm text-deep-black/70">Obras Criadas</div>
              </div>
              <div className="text-center p-6 bg-gentle-green/20 rounded-xl shadow-lg">
                <div className="font-semplicita text-3xl font-light text-warm-terracotta mb-2">4</div>
                <div className="font-helvetica text-sm text-deep-black/70">Exposições</div>
              </div>
              <div className="text-center p-6 bg-gentle-green/20 rounded-xl shadow-lg">
                <div className="font-semplicita text-3xl font-light text-warm-terracotta mb-2">15+</div>
                <div className="font-helvetica text-sm text-deep-black/70">Anos de Carreira</div>
              </div>
              <div className="text-center p-6 bg-gentle-green/20 rounded-xl shadow-lg">
                <div className="font-semplicita text-3xl font-light text-warm-terracotta mb-2">15+</div>
                <div className="font-helvetica text-sm text-deep-black/70">Colecionadores</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Artist at Work Section */}
    <section className="px-4 sm:px-6 lg:px-8 pb-20 bg-gentle-green/10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-semplicita text-4xl font-light text-deep-black mb-6">
            Processo Criativo
          </h2>
          <p className="font-helvetica text-lg text-deep-black/80 max-w-2xl mx-auto justified-text text-center">O processo criativo da artista plástica Simone Oliveira é fundamentado em três pilares essenciais que orientam cada obra, a união desses pilares confere às suas criações uma identidade única, sensível e profundamente conectada com o observador.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="space-y-4">
            <img src="/lovable-uploads/e06b8e32-b139-4ac9-9789-dd2d68767dca.png" alt="Simone pintando em seu ateliê" className="w-full h-80 object-cover rounded-2xl shadow-lg hover-lift-elegant" />
            <div className="text-center">
              <h3 className="font-semplicita text-lg font-light text-deep-black">Intuição Emocional</h3>
              <p className="font-helvetica text-sm text-deep-black/70">O ponto de partida é sempre o sentir</p>
            </div>
          </div>

          <div className="space-y-4">
            <img src="/lovable-uploads/79f14aaa-ddef-4045-8d3e-50714c9dc43b.png" alt="Simone em seu ateliê" className="w-full h-80 object-cover rounded-2xl shadow-lg hover-lift-elegant" />
            <div className="text-center">
              <h3 className="font-semplicita text-lg font-light text-deep-black">Exploração Matérica</h3>
              <p className="font-helvetica text-sm text-deep-black/70">A textura é linguagem</p>
            </div>
          </div>

          <div className="space-y-4">
            <img src="/lovable-uploads/03348f07-97c9-429b-a76d-774e1979a3e4.png" alt="Simone com seus pincéis" className="w-full h-80 object-cover rounded-2xl shadow-lg hover-lift-elegant" />
            <div className="text-center">
              <h3 className="font-semplicita text-lg font-light text-deep-black">Narrativa Silenciosa</h3>
              <p className="font-helvetica text-sm text-deep-black/70">A arte como espaço de contemplação</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Call to Action */}
    <section className="px-4 sm:px-6 lg:px-8 pb-20 bg-soft-beige">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-warm-terracotta to-warm-terracotta/80 rounded-2xl p-12 text-center text-soft-beige">
          <h2 className="font-semplicita text-3xl md:text-4xl font-light mb-4">
            Interessado em uma Obra?
          </h2>

            <p className="font-helvetica text-lg mb-8 opacity-90 max-w-2xl mx-auto justified-text">
              Entre em contato para conhecer as obras disponíveis ou encomendar uma peça personalizada
              que reflita sua sensibilidade e estilo únicos.
            </p>
            <Link to="/contact" className="inline-flex items-center px-8 py-3 bg-soft-beige text-warm-terracotta font-helvetica font-medium rounded-full hover:bg-gentle-green/20 transition-all duration-300">
              Entre em Contato
              <ArrowRight size={20} className="ml-2" />
            </Link>
          </div>
        </div>
    </section>

    <Footer />
  </div>;
};
export default Artists;
