import { Category, MenuItem, RestaurantConfig } from '../types';

import arrozImg from '../assets/images/dish_arroz_frito_special_1793211200095.jpg';
import yakiImg from '../assets/images/dish_yakisoba_noodles_1793211200477.jpg';
import polloImg from '../assets/images/dish_pollo_frito_crispy_1793211200475.jpg';
import papasImg from '../assets/images/dish_papas_fritas_1793212235749.jpg';
import burgerImg from '../assets/images/dish_hamburguesa_artesanal_1793212235528.jpg';

export const RESTAURANT_DEFAULT_CONFIG: RestaurantConfig = {
  name: 'Wok Crunch Oriental',
  slogan: 'Sabor oriental en cada bocado',
  whatsappPhone: '595992607393', // 0992 607 393 (Paraguay)
  displayPhone: '0992 607 393',
  scheduleText: 'Delivery y retiro · Armá tu pedido y envialo por WhatsApp',
  isOpen: true,
  deliveryCost: 0,
  pickupTimeEstimate: '20-30 min',
  deliveryTimeEstimate: '35-50 min',
  currency: 'Gs.',
  bankDetails: {
    bankName: 'Banco / Billetera',
    accountHolder: 'Wok Crunch Oriental',
    taxId: '',
    accountNumber: '',
    alias: 'wokcrunch.py',
  },
};

export const MENU_CATEGORIES = [
  { id: 'arroz', title: '🍚 Arroz frito' },
  { id: 'yaki', title: '🥢 Yakisoba' },
  { id: 'pollo', title: '🍗 Pollo frito' },
  { id: 'papas', title: '🍟 Papas fritas' },
  { id: 'burg', title: '🍔 Hamburguesas' },
];

export const CATEGORIES: Category[] = [
  { id: 'all', name: 'Todo el Menú', icon: '🔥' },
  { id: 'arroz', name: 'Arroz Frito', icon: '🍚' },
  { id: 'yakisoba', name: 'Yakisoba', icon: '🥢' },
  { id: 'pollo', name: 'Pollo Frito', icon: '🍗' },
  { id: 'papas', name: 'Papas Fritas', icon: '🍟' },
  { id: 'hamburguesas', name: 'Hamburguesas', icon: '🍔' },
];

export const MENU_ITEMS: MenuItem[] = [
  // 🍚 Arroz frito
  {
    id: 'arroz-1',
    name: 'Arroz frito de pollo',
    category: 'arroz',
    price: 23000,
    description: 'Arroz al wok con tiernos cubos de pollo, huevo, verdeo y salsa oriental.',
    image: arrozImg || '/images/arroz_frito.jpg',
  },
  {
    id: 'arroz-2',
    name: 'Arroz frito con carne',
    category: 'arroz',
    price: 25000,
    description: 'Arroz salteado a fuego vivo con jugosa carne vacuna y especias wok hei.',
    image: arrozImg || '/images/arroz_frito.jpg',
  },
  {
    id: 'arroz-3',
    name: 'Arroz frito de camarón',
    category: 'arroz',
    price: 75000,
    description: 'Camarones seleccionados dorados al wok con arroz especiado y verdeo.',
    image: arrozImg || '/images/arroz_frito.jpg',
  },

  // 🥢 Yakisoba
  {
    id: 'yaki-1',
    name: 'Yakisoba de pollo',
    category: 'yakisoba',
    price: 25000,
    description: 'Fideos ramen salteados con pollo, repollo, zanahoria y salsa agridulce oriental.',
    image: yakiImg || '/images/yakisoba.jpg',
  },
  {
    id: 'yaki-2',
    name: 'Yakisoba de carne',
    category: 'yakisoba',
    price: 28000,
    description: 'Fideos orientales al wok con carne tierna en tiras y verduras frescas crocantes.',
    image: yakiImg || '/images/yakisoba.jpg',
  },
  {
    id: 'yaki-3',
    name: 'Yakisoba de camarón',
    category: 'yakisoba',
    price: 75000,
    description: 'Fideos salteados con camarones premium, vegetales y reducción especial.',
    image: yakiImg || '/images/yakisoba.jpg',
  },

  // 🍗 Pollo frito
  {
    id: 'pollo-1',
    name: 'Pollo frito normal',
    category: 'pollo',
    price: 35000,
    description: 'Trozos crujientes de pollo frito estilo oriental, dorados por fuera y jugosos por dentro.',
    image: polloImg || '/images/pollo_frito.jpg',
  },
  {
    id: 'pollo-2',
    name: 'Pollo frito agridulce',
    category: 'pollo',
    price: 40000,
    description: 'Pollo ultra crocante glaseado con salsa agridulce casera y sésamo tostado.',
    image: polloImg || '/images/pollo_frito.jpg',
  },
  {
    id: 'pollo-3',
    name: 'Pollo frito picante',
    category: 'pollo',
    price: 40000,
    description: 'Pollo crujiente bañado en deliciosa salsa picante chili wok artesanal.',
    image: polloImg || '/images/pollo_frito.jpg',
  },

  // 🍟 Papas fritas
  {
    id: 'papas-1',
    name: 'Papas fritas pequeña',
    category: 'papas',
    price: 15000,
    portion: 'Porción individual',
    description: 'Papas bastón crujientes sazonadas con sal marina.',
    image: papasImg || '/images/papas_fritas.jpg',
  },
  {
    id: 'papas-2',
    name: 'Papas fritas grande',
    category: 'papas',
    price: 20000,
    portion: 'Porción para compartir',
    description: 'Abundante porción de papas doradas y crujientes con dip especial.',
    image: papasImg || '/images/papas_fritas.jpg',
  },

  // 🍔 Hamburguesas
  {
    id: 'burg-1',
    name: 'Hamburguesa pequeña',
    category: 'hamburguesas',
    price: 15000,
    portion: 'Simple',
    description: 'Medallón de carne sazonada, queso fundido, lechuga y tomate en pan brioche.',
    image: burgerImg || '/images/hamburguesa.jpg',
  },
  {
    id: 'burg-2',
    name: 'Hamburguesa grande',
    category: 'hamburguesas',
    price: 25000,
    portion: 'Doble + Panceta',
    description: 'Doble carne jugosa, extra queso derretido, panceta crujiente y salsa especial.',
    image: burgerImg || '/images/hamburguesa.jpg',
  },
];
