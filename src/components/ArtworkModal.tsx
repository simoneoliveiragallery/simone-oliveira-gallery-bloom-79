
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { X, Mail } from 'lucide-react';
import { BsWhatsapp } from "react-icons/bs";
import { Artwork } from '../hooks/useArtworks';

interface ArtworkModalProps {
  artwork: Artwork | null;
  onClose: () => void;
}

const ArtworkModal = ({ artwork, onClose }: ArtworkModalProps) => {
  if (!artwork) return null;

  const whatsappNumber = "5534991101000";
  const email = "gallery@simoneoliveiragallery.com";

  const handleWhatsApp = () => {
    const message = encodeURIComponent(`Olá! Gostaria de saber mais sobre a obra "${artwork.title}" e seu preço. Poderia me fornecer mais informações?`);
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  const handleEmail = () => {
    const subject = encodeURIComponent(`Interesse na obra: ${artwork.title}`);
    const body = encodeURIComponent(`Olá Simone,\n\nGostaria de saber mais sobre a obra "${artwork.title}" (${artwork.year}).\n\nPoderia me informar:\n- Preço da obra\n- Disponibilidade\n- Formas de pagamento\n- Outras informações relevantes\n\nAguardo seu contato.\n\nObrigado(a)!`);
    window.open(`mailto:${email}?subject=${subject}&body=${body}`, '_blank');
  };

  return (
    <Dialog open={!!artwork} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-soft-beige border-gentle-green/20">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="font-semplicita text-2xl font-light text-deep-black">
              {artwork.title}
            </DialogTitle>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gentle-green/10 rounded-full transition-colors duration-300"
            >
              <X size={20} className="text-deep-black/70" />
            </button>
          </div>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
          <div className="aspect-[3/4] overflow-hidden rounded-2xl">
            <img
              src={artwork.image}
              alt={artwork.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-semplicita text-xl font-light text-deep-black mb-4">
                Detalhes da Obra
              </h3>
              
              <div className="space-y-3">
                {artwork.description && (
                  <div>
                    <span className="font-helvetica text-sm font-medium text-deep-black/70">Descrição:</span>
                    <p className="font-helvetica text-deep-black leading-relaxed">{artwork.description}</p>
                  </div>
                )}
                
                <div>
                  <span className="font-helvetica text-sm font-medium text-deep-black/70">Técnica:</span>
                  <p className="font-helvetica text-deep-black">{artwork.medium}</p>
                </div>
                
                <div>
                  <span className="font-helvetica text-sm font-medium text-deep-black/70">Ano:</span>
                  <p className="font-helvetica text-deep-black">{artwork.year}</p>
                </div>
                
                {artwork.dimensions && (
                  <div>
                    <span className="font-helvetica text-sm font-medium text-deep-black/70">Dimensões:</span>
                    <p className="font-helvetica text-deep-black">{artwork.dimensions}</p>
                  </div>
                )}
                
                {artwork.exhibition_id && (
                  <div>
                    <span className="font-helvetica text-sm font-medium text-deep-black/70">Exposição:</span>
                    <p className="font-helvetica text-deep-black">Obra de exposição</p>
                  </div>
                )}
              </div>
            </div>

            {/* Botões de Contato */}
            <div className="border-t border-gentle-green/20 pt-6">
              <h4 className="font-semplicita text-lg font-light text-deep-black mb-4">
                Interessado nesta obra?
              </h4>
              <p className="font-helvetica text-sm text-deep-black/70 mb-4">
                Entre em contato para saber mais sobre preço e disponibilidade
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleWhatsApp}
                  className="flex items-center justify-center px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-helvetica font-medium transition-all duration-300 group shadow-lg hover-lift-elegant"
                >
                  <BsWhatsapp size={18} className="mr-2 group-hover:scale-110 transition-transform duration-300" />
                  WhatsApp
                </button>
                
                <button
                  onClick={handleEmail}
                  className="flex items-center justify-center px-4 py-3 bg-warm-terracotta hover:bg-warm-terracotta/90 text-soft-beige rounded-xl font-helvetica font-medium transition-all duration-300 group shadow-lg hover-lift-elegant"
                >
                  <Mail size={18} className="mr-2 group-hover:scale-110 transition-transform duration-300" />
                  E-mail
                </button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ArtworkModal;
