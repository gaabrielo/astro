import { supabase } from '../supabase';

export type Item = {
  id: number;
  type: string;
  image: string;
  description: string | null;
  ingredients: string;
  name: string;
  price: number;
};

export async function fetchMenu(): Promise<Item[]> {
  const res = await fetch('/menu.json');
  if (!res.ok) {
    throw new Error('Não foi possível carregar o cardápio');
  }
  return res.json();
}

// export const getItems = async (filters: any, searchTerm: string) => {
//   let query = supabase.from('items').select();

//   if (!!searchTerm && searchTerm.trim() !== '') {
//     query.ilike('name', `%${searchTerm.toLowerCase()}%`);
//   }

//   //  query =
//   //     ? query.match({ name, locale: options.locale })
//   //     : query.match({ name }).is('locale', null);
// };
