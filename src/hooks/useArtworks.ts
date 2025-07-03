
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Artwork {
  id: string;
  title: string;
  image: string;
  year: string;
  medium: string;
  description?: string;
  dimensions?: string;
  exhibition_id?: string;
  featured?: boolean;
  created_at: string;
  updated_at: string;
}

export const useArtworks = (exhibitionId?: string) => {
  return useQuery({
    queryKey: ['artworks', exhibitionId],
    queryFn: async () => {
      let query = supabase
        .from('artworks')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (exhibitionId) {
        query = query.eq('exhibition_id', exhibitionId);
      }
      
      const { data, error } = await query;
      
      if (error) {
        console.error('Error fetching artworks:', error);
        throw error;
      }
      
      return data as Artwork[];
    },
  });
};

export const useFeaturedArtworks = () => {
  return useQuery({
    queryKey: ['artworks', 'featured'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('artworks')
        .select('*')
        .eq('featured', true)
        .order('created_at', { ascending: false })
        .limit(6);
      
      if (error) {
        console.error('Error fetching featured artworks:', error);
        throw error;
      }
      
      return data as Artwork[];
    },
  });
};
