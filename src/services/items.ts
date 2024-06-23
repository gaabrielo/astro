import { supabase } from '../supabase';

export const getItems = async (filters: any, searchTerm: string) => {
  let query = supabase.from('items').select();

  if (!!searchTerm && searchTerm.trim() !== '') {
    query.ilike('name', `%${searchTerm.toLowerCase()}%`);
  }

  //  query =
  //     ? query.match({ name, locale: options.locale })
  //     : query.match({ name }).is('locale', null);
};
