

import { useState } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import AdminAuth from '../components/AdminAuth';
import { Plus, Edit, Trash2, Save, X, Upload, Calendar, MapPin, Star } from 'lucide-react';
import { useArtworks } from '../hooks/useArtworks';
import { useExhibitions } from '../hooks/useExhibitions';
import { useCreateArtwork, useUpdateArtwork, useDeleteArtwork, useToggleFeaturedArtwork } from '../hooks/useAdminArtworks';
import { useCreateExhibition, useUpdateExhibition, useDeleteExhibition } from '../hooks/useAdminExhibitions';
import { toast } from 'sonner';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'artworks' | 'exhibitions'>('artworks');
  
  // Fetch data from Supabase
  const { data: artworks = [], isLoading: artworksLoading } = useArtworks();
  const { data: exhibitions = [], isLoading: exhibitionsLoading } = useExhibitions();
  
  // Artwork mutations
  const createArtworkMutation = useCreateArtwork();
  const updateArtworkMutation = useUpdateArtwork();
  const deleteArtworkMutation = useDeleteArtwork();
  const toggleFeaturedMutation = useToggleFeaturedArtwork();
  
  // Exhibition mutations
  const createExhibitionMutation = useCreateExhibition();
  const updateExhibitionMutation = useUpdateExhibition();
  const deleteExhibitionMutation = useDeleteExhibition();

  const [editingArtworkId, setEditingArtworkId] = useState<string | null>(null);
  const [editingExhibitionId, setEditingExhibitionId] = useState<string | null>(null);
  const [isAddingArtwork, setIsAddingArtwork] = useState(false);
  const [isAddingExhibition, setIsAddingExhibition] = useState(false);
  const [artworkFormData, setArtworkFormData] = useState<any>({});
  const [exhibitionFormData, setExhibitionFormData] = useState<any>({});

  // Artwork handlers
  const handleEditArtwork = (artwork: any) => {
    console.log('Editing artwork:', artwork);
    setEditingArtworkId(artwork.id);
    setArtworkFormData({
      title: artwork.title || '',
      image: artwork.image || '',
      year: artwork.year || new Date().getFullYear().toString(),
      medium: artwork.medium || '',
      description: artwork.description || '',
      dimensions: artwork.dimensions || '',
      exhibition_id: artwork.exhibition_id || '',
      featured: artwork.featured || false
    });
    setIsAddingArtwork(false);
  };

  const handleAddArtwork = () => {
    setIsAddingArtwork(true);
    setEditingArtworkId(null);
    setArtworkFormData({
      title: '',
      image: '',
      year: new Date().getFullYear().toString(),
      medium: '',
      description: '',
      dimensions: '',
      exhibition_id: '',
      featured: false
    });
  };

  const handleSaveArtwork = async () => {
    try {
      console.log('Saving artwork:', artworkFormData);
      
      if (isAddingArtwork) {
        await createArtworkMutation.mutateAsync(artworkFormData);
        toast.success('Obra criada com sucesso!');
      } else if (editingArtworkId) {
        await updateArtworkMutation.mutateAsync({ 
          id: editingArtworkId, 
          ...artworkFormData 
        });
        toast.success('Obra atualizada com sucesso!');
      }
      
      setEditingArtworkId(null);
      setIsAddingArtwork(false);
      setArtworkFormData({});
    } catch (error) {
      console.error('Error saving artwork:', error);
      if (error instanceof Error && error.message.includes('Máximo de 6 obras')) {
        toast.error('Máximo de 6 obras podem estar em destaque');
      } else {
        toast.error('Erro ao salvar obra');
      }
    }
  };

  const handleCancelArtwork = () => {
    setEditingArtworkId(null);
    setIsAddingArtwork(false);
    setArtworkFormData({});
  };

  const handleDeleteArtwork = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta obra?')) {
      try {
        await deleteArtworkMutation.mutateAsync(id);
        toast.success('Obra excluída com sucesso!');
      } catch (error) {
        toast.error('Erro ao excluir obra');
      }
    }
  };

  const handleToggleFeatured = async (id: string, currentFeatured: boolean) => {
    try {
      await toggleFeaturedMutation.mutateAsync({ 
        id, 
        featured: !currentFeatured 
      });
      toast.success(
        !currentFeatured 
          ? 'Obra adicionada aos destaques!' 
          : 'Obra removida dos destaques!'
      );
    } catch (error) {
      console.error('Error toggling featured:', error);
      if (error instanceof Error && error.message.includes('Máximo de 6 obras')) {
        toast.error('Máximo de 6 obras podem estar em destaque');
      } else {
        toast.error('Erro ao alterar destaque');
      }
    }
  };

  // Exhibition handlers
  const handleEditExhibition = (exhibition: any) => {
    setEditingExhibitionId(exhibition.id);
    setExhibitionFormData({
      ...exhibition,
      startDate: exhibition.start_date,
      endDate: exhibition.end_date
    });
    setIsAddingExhibition(false);
  };

  const handleAddExhibition = () => {
    setIsAddingExhibition(true);
    setEditingExhibitionId(null);
    setExhibitionFormData({
      title: '',
      description: '',
      startDate: '',
      endDate: '',
      image: '',
      status: 'upcoming',
      location: ''
    });
  };

  const handleSaveExhibition = async () => {
    try {
      const formattedData = {
        title: exhibitionFormData.title,
        description: exhibitionFormData.description,
        start_date: exhibitionFormData.startDate,
        end_date: exhibitionFormData.endDate,
        image: exhibitionFormData.image,
        status: exhibitionFormData.status,
        location: exhibitionFormData.location
      };

      if (isAddingExhibition) {
        await createExhibitionMutation.mutateAsync(formattedData);
        toast.success('Exposição criada com sucesso!');
      } else if (editingExhibitionId) {
        await updateExhibitionMutation.mutateAsync({ 
          id: editingExhibitionId, 
          ...formattedData 
        });
        toast.success('Exposição atualizada com sucesso!');
      }
      
      setEditingExhibitionId(null);
      setIsAddingExhibition(false);
      setExhibitionFormData({});
    } catch (error) {
      toast.error('Erro ao salvar exposição');
    }
  };

  const handleCancelExhibition = () => {
    setEditingExhibitionId(null);
    setIsAddingExhibition(false);
    setExhibitionFormData({});
  };

  const handleDeleteExhibition = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta exposição?')) {
      try {
        await deleteExhibitionMutation.mutateAsync(id);
        toast.success('Exposição excluída com sucesso!');
      } catch (error) {
        toast.error('Erro ao excluir exposição');
      }
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'artwork' | 'exhibition') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (type === 'artwork') {
          setArtworkFormData({ ...artworkFormData, image: e.target?.result as string });
        } else {
          setExhibitionFormData({ ...exhibitionFormData, image: e.target?.result as string });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isAuthenticated) {
    return <AdminAuth onAuthenticated={() => setIsAuthenticated(true)} />;
  }

  if (artworksLoading || exhibitionsLoading) {
    return (
      <div className="min-h-screen bg-soft-beige flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-warm-terracotta border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="font-helvetica text-deep-black/70">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-soft-beige">
      <Navigation />
      
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="font-semplicita text-5xl lg:text-6xl font-light text-deep-black mb-6 leading-tight">
              Administração
            </h1>
            <p className="font-helvetica text-lg text-deep-black/80 max-w-2xl mx-auto justified-text">
              Gerencie o acervo de obras e exposições da galeria Simone Oliveira.
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
              Obras
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

          {/* Add New Button */}
          <div className="mb-12 text-center">
            <button
              onClick={activeTab === 'artworks' ? handleAddArtwork : handleAddExhibition}
              className="inline-flex items-center px-8 py-4 bg-warm-terracotta text-soft-beige font-helvetica font-medium rounded-full hover:bg-warm-terracotta/90 transition-all duration-300 shadow-elegant hover-lift-elegant"
            >
              <Plus size={20} className="mr-2" />
              {activeTab === 'artworks' ? 'Adicionar Nova Obra' : 'Adicionar Nova Exposição'}
            </button>
          </div>

          {/* Artworks Tab */}
          {activeTab === 'artworks' && (
            <>
              {/* Artwork Form */}
              {(isAddingArtwork || editingArtworkId) && (
                <div className="mb-12 bg-gentle-green/10 rounded-3xl p-8 border border-gentle-green/20">
                  <h3 className="font-semplicita text-2xl font-light text-deep-black mb-8">
                    {isAddingArtwork ? 'Adicionar Nova Obra' : 'Editar Obra'}
                  </h3>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div>
                        <label className="block font-helvetica text-sm font-medium text-deep-black mb-2">
                          Título
                        </label>
                        <input
                          type="text"
                          value={artworkFormData.title || ''}
                          onChange={(e) => setArtworkFormData({ ...artworkFormData, title: e.target.value })}
                          className="w-full px-4 py-3 bg-soft-beige border border-gentle-green/30 rounded-xl focus:ring-2 focus:ring-warm-terracotta/20 focus:border-warm-terracotta transition-all duration-300 font-helvetica"
                          placeholder="Nome da obra"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block font-helvetica text-sm font-medium text-deep-black mb-2">
                            Ano
                          </label>
                          <input
                            type="text"
                            value={artworkFormData.year || ''}
                            onChange={(e) => setArtworkFormData({ ...artworkFormData, year: e.target.value })}
                            className="w-full px-4 py-3 bg-soft-beige border border-gentle-green/30 rounded-xl focus:ring-2 focus:ring-warm-terracotta/20 focus:border-warm-terracotta transition-all duration-300 font-helvetica"
                            placeholder="2024"
                          />
                        </div>
                        
                        <div>
                          <label className="block font-helvetica text-sm font-medium text-deep-black mb-2">
                            Técnica
                          </label>
                          <input
                            type="text"
                            value={artworkFormData.medium || ''}
                            onChange={(e) => setArtworkFormData({ ...artworkFormData, medium: e.target.value })}
                            className="w-full px-4 py-3 bg-soft-beige border border-gentle-green/30 rounded-xl focus:ring-2 focus:ring-warm-terracotta/20 focus:border-warm-terracotta transition-all duration-300 font-helvetica"
                            placeholder="Óleo sobre tela"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-helvetica text-sm font-medium text-deep-black mb-2">
                          Dimensões
                        </label>
                        <input
                          type="text"
                          value={artworkFormData.dimensions || ''}
                          onChange={(e) => setArtworkFormData({ ...artworkFormData, dimensions: e.target.value })}
                          className="w-full px-4 py-3 bg-soft-beige border border-gentle-green/30 rounded-xl focus:ring-2 focus:ring-warm-terracotta/20 focus:border-warm-terracotta transition-all duration-300 font-helvetica"
                          placeholder="120 x 80 cm"
                        />
                      </div>

                      <div>
                        <label className="block font-helvetica text-sm font-medium text-deep-black mb-2">
                          Exposição
                        </label>
                        <select
                          value={artworkFormData.exhibition_id || ''}
                          onChange={(e) => setArtworkFormData({ ...artworkFormData, exhibition_id: e.target.value || null })}
                          className="w-full px-4 py-3 bg-soft-beige border border-gentle-green/30 rounded-xl focus:ring-2 focus:ring-warm-terracotta/20 focus:border-warm-terracotta transition-all duration-300 font-helvetica"
                        >
                          <option value="">Sem exposição</option>
                          {exhibitions?.map(exhibition => (
                            <option key={exhibition.id} value={exhibition.id}>
                              {exhibition.title}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            checked={artworkFormData.featured || false}
                            onChange={(e) => setArtworkFormData({ ...artworkFormData, featured: e.target.checked })}
                            className="w-5 h-5 text-warm-terracotta bg-soft-beige border-gentle-green/30 rounded focus:ring-2 focus:ring-warm-terracotta/20"
                          />
                          <span className="font-helvetica text-sm font-medium text-deep-black">
                            <Star size={16} className="inline mr-1 text-warm-terracotta" />
                            Obra em destaque (máximo 6)
                          </span>
                        </label>
                        <p className="font-helvetica text-xs text-deep-black/60 mt-1">
                          Obras em destaque aparecem na página inicial
                        </p>
                      </div>
                      
                      <div>
                        <label className="block font-helvetica text-sm font-medium text-deep-black mb-2">
                          Descrição
                        </label>
                        <textarea
                          value={artworkFormData.description || ''}
                          onChange={(e) => setArtworkFormData({ ...artworkFormData, description: e.target.value })}
                          rows={4}
                          className="w-full px-4 py-3 bg-soft-beige border border-gentle-green/30 rounded-xl focus:ring-2 focus:ring-warm-terracotta/20 focus:border-warm-terracotta transition-all duration-300 font-helvetica resize-none"
                          placeholder="Descrição da obra..."
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block font-helvetica text-sm font-medium text-deep-black mb-2">
                        Imagem
                      </label>
                      <div className="border-2 border-dashed border-gentle-green/30 rounded-xl p-8 text-center hover:border-warm-terracotta/50 transition-all duration-300">
                        {artworkFormData.image ? (
                          <div className="relative">
                            <img
                              src={artworkFormData.image}
                              alt="Preview"
                              className="w-full h-48 object-cover rounded-lg mb-4"
                            />
                            <button
                              onClick={() => setArtworkFormData({ ...artworkFormData, image: '' })}
                              className="absolute top-2 right-2 p-2 bg-warm-terracotta text-soft-beige rounded-full hover:bg-warm-terracotta/90 transition-all duration-300"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ) : (
                          <div>
                            <Upload size={48} className="mx-auto text-gentle-green/60 mb-4" />
                            <p className="font-helvetica text-deep-black/60 mb-4">
                              Clique para fazer upload ou cole uma URL
                            </p>
                          </div>
                        )}
                        
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, 'artwork')}
                          className="hidden"
                          id="artwork-image-upload"
                        />
                        <label
                          htmlFor="artwork-image-upload"
                          className="inline-block px-6 py-2 bg-gentle-green/20 text-deep-black font-helvetica text-sm rounded-full cursor-pointer hover:bg-gentle-green/30 transition-all duration-300 mb-2"
                        >
                          Upload Arquivo
                        </label>
                        
                        <input
                          type="url"
                          value={artworkFormData.image || ''}
                          onChange={(e) => setArtworkFormData({ ...artworkFormData, image: e.target.value })}
                          className="w-full px-4 py-2 bg-soft-beige border border-gentle-green/30 rounded-lg text-sm font-helvetica mt-2"
                          placeholder="ou cole uma URL da imagem"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-4 mt-8">
                    <button
                      onClick={handleCancelArtwork}
                      className="px-6 py-3 bg-gentle-green/20 text-deep-black font-helvetica font-medium rounded-full hover:bg-gentle-green/30 transition-all duration-300"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={handleSaveArtwork}
                      disabled={createArtworkMutation.isPending || updateArtworkMutation.isPending}
                      className="inline-flex items-center px-6 py-3 bg-warm-terracotta text-soft-beige font-helvetica font-medium rounded-full hover:bg-warm-terracotta/90 transition-all duration-300 shadow-elegant disabled:opacity-50"
                    >
                      <Save size={18} className="mr-2" />
                      {(createArtworkMutation.isPending || updateArtworkMutation.isPending) ? 'Salvando...' : 'Salvar'}
                    </button>
                  </div>
                </div>
              )}

              {/* Artworks List */}
              {artworks.length === 0 ? (
                <div className="text-center py-16">
                  <p className="font-helvetica text-deep-black/70 text-lg">
                    Nenhuma obra cadastrada ainda
                  </p>
                  <p className="font-helvetica text-deep-black/50 text-sm mt-2">
                    Clique no botão "Adicionar Nova Obra" para começar
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                  {artworks.map((artwork) => (
                    <div key={artwork.id} className="bg-soft-beige border border-gentle-green/20 rounded-3xl overflow-hidden shadow-elegant hover-lift-elegant">
                      <div className="aspect-[4/3] relative">
                        <img
                          src={artwork.image}
                          alt={artwork.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 left-4">
                          <button
                            onClick={() => handleToggleFeatured(artwork.id, artwork.featured || false)}
                            disabled={toggleFeaturedMutation.isPending}
                            className={`p-2 rounded-full transition-all duration-300 shadow-lg disabled:opacity-50 ${
                              artwork.featured 
                                ? 'bg-warm-terracotta text-soft-beige' 
                                : 'bg-soft-beige/90 text-warm-terracotta hover:bg-soft-beige'
                            }`}
                            title={artwork.featured ? 'Remover dos destaques' : 'Adicionar aos destaques'}
                          >
                            <Star size={16} className={artwork.featured ? 'fill-current' : ''} />
                          </button>
                        </div>
                        <div className="absolute top-4 right-4 flex space-x-2">
                          <button
                            onClick={() => handleEditArtwork(artwork)}
                            className="p-2 bg-soft-beige/90 rounded-full hover:bg-soft-beige transition-all duration-300 shadow-lg"
                          >
                            <Edit size={16} className="text-warm-terracotta" />
                          </button>
                          <button
                            onClick={() => handleDeleteArtwork(artwork.id)}
                            disabled={deleteArtworkMutation.isPending}
                            className="p-2 bg-soft-beige/90 rounded-full hover:bg-soft-beige transition-all duration-300 shadow-lg disabled:opacity-50"
                          >
                            <Trash2 size={16} className="text-warm-terracotta" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semplicita text-xl font-light text-deep-black">
                            {artwork.title}
                          </h3>
                          {artwork.featured && (
                            <Star size={16} className="text-warm-terracotta fill-current flex-shrink-0 ml-2" />
                          )}
                        </div>
                        <p className="font-helvetica text-sm text-deep-black/70 mb-1">
                          {artwork.year} • {artwork.medium}
                        </p>
                        {artwork.dimensions && (
                          <p className="font-helvetica text-sm text-deep-black/70 mb-1">
                            {artwork.dimensions}
                          </p>
                        )}
                        <p className="font-helvetica text-sm text-deep-black/60 line-clamp-2">
                          {artwork.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* Exhibitions Tab */}
          {activeTab === 'exhibitions' && (
            <>
              {/* Exhibition Form */}
              {(isAddingExhibition || editingExhibitionId) && (
                <div className="mb-12 bg-gentle-green/10 rounded-3xl p-8 border border-gentle-green/20">
                  <h3 className="font-semplicita text-2xl font-light text-deep-black mb-8">
                    {isAddingExhibition ? 'Adicionar Nova Exposição' : 'Editar Exposição'}
                  </h3>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div>
                        <label className="block font-helvetica text-sm font-medium text-deep-black mb-2">
                          Título
                        </label>
                        <input
                          type="text"
                          value={exhibitionFormData.title || ''}
                          onChange={(e) => setExhibitionFormData({ ...exhibitionFormData, title: e.target.value })}
                          className="w-full px-4 py-3 bg-soft-beige border border-gentle-green/30 rounded-xl focus:ring-2 focus:ring-warm-terracotta/20 focus:border-warm-terracotta transition-all duration-300 font-helvetica"
                          placeholder="Nome da exposição"
                        />
                      </div>
                      
                      <div>
                        <label className="block font-helvetica text-sm font-medium text-deep-black mb-2">
                          Localização
                        </label>
                        <input
                          type="text"
                          value={exhibitionFormData.location || ''}
                          onChange={(e) => setExhibitionFormData({ ...exhibitionFormData, location: e.target.value })}
                          className="w-full px-4 py-3 bg-soft-beige border border-gentle-green/30 rounded-xl focus:ring-2 focus:ring-warm-terracotta/20 focus:border-warm-terracotta transition-all duration-300 font-helvetica"
                          placeholder="Local da exposição"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block font-helvetica text-sm font-medium text-deep-black mb-2">
                            Data de Início
                          </label>
                          <input
                            type="date"
                            value={exhibitionFormData.startDate || ''}
                            onChange={(e) => setExhibitionFormData({ ...exhibitionFormData, startDate: e.target.value })}
                            className="w-full px-4 py-3 bg-soft-beige border border-gentle-green/30 rounded-xl focus:ring-2 focus:ring-warm-terracotta/20 focus:border-warm-terracotta transition-all duration-300 font-helvetica"
                          />
                        </div>
                        
                        <div>
                          <label className="block font-helvetica text-sm font-medium text-deep-black mb-2">
                            Data de Término
                          </label>
                          <input
                            type="date"
                            value={exhibitionFormData.endDate || ''}
                            onChange={(e) => setExhibitionFormData({ ...exhibitionFormData, endDate: e.target.value })}
                            className="w-full px-4 py-3 bg-soft-beige border border-gentle-green/30 rounded-xl focus:ring-2 focus:ring-warm-terracotta/20 focus:border-warm-terracotta transition-all duration-300 font-helvetica"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block font-helvetica text-sm font-medium text-deep-black mb-2">
                          Status
                        </label>
                        <select
                          value={exhibitionFormData.status || 'upcoming'}
                          onChange={(e) => setExhibitionFormData({ ...exhibitionFormData, status: e.target.value })}
                          className="w-full px-4 py-3 bg-soft-beige border border-gentle-green/30 rounded-xl focus:ring-2 focus:ring-warm-terracotta/20 focus:border-warm-terracotta transition-all duration-300 font-helvetica"
                        >
                          <option value="upcoming">Em Breve</option>
                          <option value="current">Em Cartaz</option>
                          <option value="past">Finalizada</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block font-helvetica text-sm font-medium text-deep-black mb-2">
                          Descrição
                        </label>
                        <textarea
                          value={exhibitionFormData.description || ''}
                          onChange={(e) => setExhibitionFormData({ ...exhibitionFormData, description: e.target.value })}
                          rows={4}
                          className="w-full px-4 py-3 bg-soft-beige border border-gentle-green/30 rounded-xl focus:ring-2 focus:ring-warm-terracotta/20 focus:border-warm-terracotta transition-all duration-300 font-helvetica resize-none"
                          placeholder="Descrição da exposição..."
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block font-helvetica text-sm font-medium text-deep-black mb-2">
                        Imagem
                      </label>
                      <div className="border-2 border-dashed border-gentle-green/30 rounded-xl p-8 text-center hover:border-warm-terracotta/50 transition-all duration-300">
                        {exhibitionFormData.image ? (
                          <div className="relative">
                            <img
                              src={exhibitionFormData.image}
                              alt="Preview"
                              className="w-full h-48 object-cover rounded-lg mb-4"
                            />
                            <button
                              onClick={() => setExhibitionFormData({ ...exhibitionFormData, image: '' })}
                              className="absolute top-2 right-2 p-2 bg-warm-terracotta text-soft-beige rounded-full hover:bg-warm-terracotta/90 transition-all duration-300"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ) : (
                          <div>
                            <Upload size={48} className="mx-auto text-gentle-green/60 mb-4" />
                            <p className="font-helvetica text-deep-black/60 mb-4">
                              Clique para fazer upload ou cole uma URL
                            </p>
                          </div>
                        )}
                        
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, 'exhibition')}
                          className="hidden"
                          id="exhibition-image-upload"
                        />
                        <label
                          htmlFor="exhibition-image-upload"
                          className="inline-block px-6 py-2 bg-gentle-green/20 text-deep-black font-helvetica text-sm rounded-full cursor-pointer hover:bg-gentle-green/30 transition-all duration-300 mb-2"
                        >
                          Upload Arquivo
                        </label>
                        
                        <input
                          type="url"
                          value={exhibitionFormData.image || ''}
                          onChange={(e) => setExhibitionFormData({ ...exhibitionFormData, image: e.target.value })}
                          className="w-full px-4 py-2 bg-soft-beige border border-gentle-green/30 rounded-lg text-sm font-helvetica mt-2"
                          placeholder="ou cole uma URL da imagem"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-4 mt-8">
                    <button
                      onClick={handleCancelExhibition}
                      className="px-6 py-3 bg-gentle-green/20 text-deep-black font-helvetica font-medium rounded-full hover:bg-gentle-green/30 transition-all duration-300"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={handleSaveExhibition}
                      disabled={createExhibitionMutation.isPending || updateExhibitionMutation.isPending}
                      className="inline-flex items-center px-6 py-3 bg-warm-terracotta text-soft-beige font-helvetica font-medium rounded-full hover:bg-warm-terracotta/90 transition-all duration-300 shadow-elegant disabled:opacity-50"
                    >
                      <Save size={18} className="mr-2" />
                      {(createExhibitionMutation.isPending || updateExhibitionMutation.isPending) ? 'Salvando...' : 'Salvar'}
                    </button>
                  </div>
                </div>
              )}

              {/* Exhibitions List */}
              {exhibitions.length === 0 ? (
                <div className="text-center py-16">
                  <p className="font-helvetica text-deep-black/70 text-lg">
                    Nenhuma exposição cadastrada ainda
                  </p>
                  <p className="font-helvetica text-deep-black/50 text-sm mt-2">
                    Clique no botão "Adicionar Nova Exposição" para começar
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
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            exhibition.status === 'current' ? 'text-green-600 bg-green-100' :
                            exhibition.status === 'upcoming' ? 'text-blue-600 bg-blue-100' :
                            'text-gray-600 bg-gray-100'
                          }`}>
                            {exhibition.status === 'current' ? 'Em Cartaz' :
                             exhibition.status === 'upcoming' ? 'Em Breve' : 'Finalizada'}
                          </span>
                        </div>
                        <div className="absolute top-4 right-4 flex space-x-2">
                          <button
                            onClick={() => handleEditExhibition(exhibition)}
                            className="p-2 bg-soft-beige/90 rounded-full hover:bg-soft-beige transition-all duration-300 shadow-lg"
                          >
                            <Edit size={16} className="text-warm-terracotta" />
                          </button>
                          <button
                            onClick={() => handleDeleteExhibition(exhibition.id)}
                            disabled={deleteExhibitionMutation.isPending}
                            className="p-2 bg-soft-beige/90 rounded-full hover:bg-soft-beige transition-all duration-300 shadow-lg disabled:opacity-50"
                          >
                            <Trash2 size={16} className="text-warm-terracotta" />
                          </button>
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
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Admin;
