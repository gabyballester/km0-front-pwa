import { Languages } from 'lucide-react';

export const LanguageSection = () => {
  return (
    <div className='flex items-center gap-2'>
      <Languages className='h-4 w-4' />
      <span>ES</span>
    </div>
  );
};
