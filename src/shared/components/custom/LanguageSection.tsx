/**
 * Componente para seleccionar el idioma de la aplicación
 *
 * @example
 * ```tsx
 * <LanguageSection />
 * ```
 */
import { Languages } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import ESFlag from '@/assets/svg/flags/es.svg';
import GBFlag from '@/assets/svg/flags/gb.svg';
import { Button, Popover, PopoverContent, PopoverTrigger } from '@/shared/components';
import { combineClassNames } from '@/shared/utils';

const FLAG_DICTIONARY = {
  en: { component: GBFlag, altKey: 'header.ukFlag' },
  es: { component: ESFlag, altKey: 'header.spainFlag' }
};

export const LanguageSection = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en', label: t('header.english') },
    { code: 'es', label: t('header.spanish') }
  ];

  const CurrentFlag = FLAG_DICTIONARY[currentLanguage as keyof typeof FLAG_DICTIONARY];

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <div className='bg-white p-2 hover:bg-gray-500 rounded-lg cursor-pointer uppercase flex items-center gap-2'>
          <Languages className='h-6 w-6' />
          <div className='size-6 rounded-full overflow-hidden relative'>
            <img
              src={CurrentFlag.component}
              className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full object-cover'
              aria-label={t(CurrentFlag.altKey)}
            />
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent side='left' align='end' className='w-56 p-4 bg-background'>
        <div className='flex flex-col gap-4'>
          <div className='flex items-center justify-between'>
            <h3 className='text-sm font-medium text-foreground'> {t('header.selectLanguage')}:</h3>
          </div>
          <div className='grid grid-cols-1 gap-2'>
            {languages.map(lang => {
              const { component: Flag, altKey } =
                FLAG_DICTIONARY[lang.code as keyof typeof FLAG_DICTIONARY];
              const isCurrent = currentLanguage === lang.code;

              return (
                <Button
                  aria-label={t('header.close')}
                  key={lang.code}
                  variant={isCurrent ? 'default' : 'outline'}
                  onClick={() => {
                    i18n.changeLanguage(lang.code);
                    setIsOpen(false);
                  }}
                  className={combineClassNames(
                    'w-full h-12 justify-start gap-3',
                    isCurrent && 'ring-2 ring-primary'
                  )}
                  aria-current={isCurrent ? 'true' : undefined}
                  tabIndex={-1}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                    }
                  }}
                >
                  <div className='flex items-center gap-3'>
                    <div className='size-6 rounded-full overflow-hidden relative shadow-sm'>
                      <img
                        src={Flag}
                        className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full object-cover'
                        alt={altKey}
                      />
                    </div>
                    <span className='font-medium'>{lang.label}</span>
                  </div>
                </Button>
              );
            })}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
