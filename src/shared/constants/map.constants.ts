import type { MarkerInterface } from '@/shared/types/map.types';

export const INITIAL_CENTER: [number, number] = [39.46975, -0.37739];
export const INITIAL_ZOOM = 15;
export const mapProvider = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';
export const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

export const MARKERS: MarkerInterface[] = [
  {
    geocode: [39.4555, -0.3523],
    popUp: 'Ciudad de las Artes y las Ciencias<br>Complejo arquitectónico vanguardista'
  },
  {
    geocode: [39.4743, -0.3794],
    popUp: 'Mercado Central<br>Uno de los mayores mercados de Europa'
  },
  {
    geocode: [39.4833, -0.3278],
    popUp: 'Playa de la Malvarrosa<br>Famosa playa urbana de Valencia'
  },
  {
    geocode: [39.4798, -0.3756], // Torres de Serranos
    popUp: 'Torres de Serranos<br>Antigua puerta de la muralla medieval'
  },
  {
    geocode: [39.4768, -0.3733], // Catedral de Valencia
    popUp: 'Catedral de Valencia<br>Hogar del Santo Grial según la tradición'
  },
  {
    geocode: [39.4621, -0.3475], // L'Oceanogràfic
    popUp: 'L´Oceanogràfic<br>El acuario más grande de Europa'
  },
  {
    geocode: [39.4819, -0.3584], // Bioparc Valencia
    popUp: 'Bioparc Valencia<br>Zoo de inmersión con hábitats africanos'
  },
  {
    geocode: [39.4697, -0.3763], // Estación del Norte
    popUp: 'Estación del Norte<br>Joyas modernistas valencianas'
  },
  {
    geocode: [39.4667, -0.3753], // Plaza de Toros
    popUp: 'Plaza de Toros<br>Neomudéjar del siglo XIX'
  },
  {
    geocode: [39.4858, -0.3553], // Parque de Cabecera
    popUp: 'Parque de Cabecera<br>Gran espacio verde junto al Bioparc'
  },
  {
    geocode: [39.4572, -0.3994], // Museo de Bellas Artes
    popUp: 'Museo de Bellas Artes<br>Segunda pinacoteca de España'
  },
  {
    geocode: [39.4669, -0.3583], // Palacio del Marqués de Dos Aguas
    popUp: 'Palacio del Marqués de Dos Aguas<br>Mejor ejemplo de rococó valenciano'
  },
  {
    geocode: [39.4625, -0.3675], // Mercado de Colón
    popUp: 'Mercado de Colón<br>Modernismo valenciano en estado puro'
  },
  {
    geocode: [39.3939, -0.3528], // Albufera
    popUp: 'Parque Natural de l´Albufera<br>Humedal de importancia internacional'
  },
  {
    geocode: [39.4712, -0.3431], // Jardines del Turia
    popUp: 'Jardín del Turia<br>Mayor jardín urbano de España'
  }
];
