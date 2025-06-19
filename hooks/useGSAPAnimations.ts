import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Registramos el plugin ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const useGSAPAnimations = () => {
  useEffect(() => {
    // Animación para el header
    gsap.from('.header-animation', {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
    });

    // Animación para las tarjetas de productos
    gsap.utils.toArray('.product-card').forEach((card: any) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top bottom-=100',
          toggleActions: 'play none none reverse',
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
      });
    });

    // Animación para las categorías destacadas
    gsap.utils.toArray('.category-card').forEach((card: any, index: number) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top bottom-=50',
          toggleActions: 'play none none reverse',
        },
        x: index % 2 === 0 ? -50 : 50,
        opacity: 0,
        duration: 0.8,
        delay: index * 0.2,
        ease: 'power2.out',
      });
    });

    // Animación para el footer
    gsap.from('.footer-animation', {
      scrollTrigger: {
        trigger: '.footer-animation',
        start: 'top bottom',
        toggleActions: 'play none none reverse',
      },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
    });

    // Limpieza de las animaciones al desmontar
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
};

export default useGSAPAnimations; 