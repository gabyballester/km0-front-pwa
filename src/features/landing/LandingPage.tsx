import { LogIn, UserPlus } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

// Import videos
import introVideoEN from '@/assets/videos/landing/intro-en.mp4';
import introVideoES from '@/assets/videos/landing/intro-es.mp4';
import { PATHS } from '@/router/paths.router';
import { LanguageSection } from '@/shared/components';
import { Button } from '@/shared/components/ui/button';
import { usePageLoading } from '@/shared/hooks/usePageLoading';

import LandingPageSkeleton from './pages/skeletons/LandingPageSkeleton';

const LandingPage = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const videoRef = useRef<HTMLVideoElement>(null);

  // Determinar el video según el idioma actual
  const currentVideo = i18n.language === 'es' ? introVideoES : introVideoEN;

  // Cambiar video cuando cambie el idioma
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load(); // Recargar el video cuando cambie el src
    }
  }, [currentVideo]);

  const handleGoToLogin = () => {
    navigate(PATHS.LOGIN);
  };

  const handleGoToRegister = () => {
    navigate(PATHS.REGISTER);
  };

  // Simular carga de datos
  const isLoading = false; // Aquí iría la lógica real de carga
  const showSkeleton = usePageLoading(isLoading);

  if (showSkeleton) {
    return <LandingPageSkeleton />;
  }

  return (
    <div className='min-h-screen w-full relative overflow-hidden'>
      {/* Video Background */}
      <div className='absolute inset-0 w-full h-full'>
        <video
          ref={videoRef}
          className='absolute inset-0 w-full h-full object-cover'
          autoPlay
          loop
          muted
          playsInline
          preload='auto'
        >
          <source src={currentVideo} type='video/mp4' />
          Tu navegador no soporta el elemento de video.
        </video>

        {/* Overlay para mejorar legibilidad */}
        <div className='absolute inset-0 bg-black/30' />
      </div>

      {/* Language Selector - Top Right */}
      <div className='absolute top-4 right-4 z-20'>
        <LanguageSection />
      </div>

      {/* Main Content - Positioned in lower third */}
      <div className='relative z-10 min-h-screen w-full flex items-end justify-center p-4 pb-[20vh]'>
        <div className='text-center space-y-8 max-w-md w-full'>
          {/* Main Action Buttons */}
          <div className='space-y-4'>
            <Button
              onClick={handleGoToLogin}
              size='lg'
              className='w-full h-12 text-lg font-semibold bg-white/90 text-black hover:bg-white/100 backdrop-blur-sm
                border-2 border-white/20'
            >
              <LogIn className='w-5 h-5 mr-2' />
              {t('landing.loginButton')}
            </Button>

            <Button
              onClick={handleGoToRegister}
              variant='outline'
              size='lg'
              className='w-full h-12 text-lg font-semibold bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm border-2
                border-white/30'
            >
              <UserPlus className='w-5 h-5 mr-2' />
              {t('landing.registerButton')}
            </Button>
          </div>

          {/* Footer Info */}
          <div className='pt-8 text-sm text-white/80 space-y-2 backdrop-blur-sm bg-black/20 rounded-lg p-4'>
            <p>{t('landing.info.hasAccount')}</p>
            <p>{t('landing.info.newUser')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
