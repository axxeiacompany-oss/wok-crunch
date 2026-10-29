import { Category, MenuItem, RestaurantConfig } from '../types';

import arrozPolloImg from '../assets/images/dish_arroz_frito_pollo_1793214567176.jpg';
import arrozCarneImg from '../assets/images/dish_arroz_frito_carne_1793214679334.jpg';
import arrozCamaronImg from '../assets/images/dish_arroz_frito_camaron_1793299402441.jpg';
import arrozImg from '../assets/images/dish_arroz_frito_special_1793211200095.jpg';
import yakiPolloImg from '../assets/images/dish_yakisoba_pollo_1793299563720.jpg';
import yakiCamaronImg from '../assets/images/dish_yakisoba_camaron_1793299663676.jpg';
import yakiImg from '../assets/images/dish_yakisoba_noodles_1793211200477.jpg';
import polloNormalImg from '../assets/images/dish_pollo_frito_normal_1793299840353.jpg';
import polloAgridulceImg from '../assets/images/dish_pollo_agridulce_1793300327203.jpg';
import polloPicanteImg from '../assets/images/dish_pollo_picante_1793300426009.jpg';
import polloImg from '../assets/images/dish_pollo_frito_crispy_1793211200475.jpg';
import papasPequenaImg from '../assets/images/dish_papas_pequena_1793300548287.jpg';
import papasGrandeImg from '../assets/images/dish_papas_grande_1793300730017.jpg';
import burgerPequenaImg from '../assets/images/dish_burger_pequena_1793300858602.jpg';
import burgerGrandeImg from '../assets/images/dish_burger_grande_1793300963811.jpg';

export const RESTAURANT_DEFAULT_CONFIG: RestaurantConfig = {
  name: 'Wok Crunch Oriental',
  slogan: 'Sabor oriental en cada bocado',
  whatsappPhone: '595991607393', // 0991 607 393 (Paraguay)
  displayPhone: '0991 607 393',
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
    image: arrozPolloImg || '/images/arroz_frito_pollo.jpg',
  },
  {
    id: 'arroz-2',
    name: 'Arroz frito con carne',
    category: 'arroz',
    price: 25000,
    description: 'Arroz salteado a fuego vivo con jugosa carne vacuna y especias wok hei.',
    image: arrozCarneImg || '/images/arroz_frito_carne.jpg',
  },
  {
    id: 'arroz-3',
    name: 'Arroz frito de camarón',
    category: 'arroz',
    price: 75000,
    description: 'Camarones seleccionados dorados al wok con arroz especiado y verdeo.',
    image: arrozCamaronImg || '/images/dish_arroz_frito_camaron_1793299402441.jpg',
  },

  // 🥢 Yakisoba
  {
    id: 'yaki-1',
    name: 'Yakisoba de pollo',
    category: 'yakisoba',
    price: 25000,
    description: 'Fideos ramen salteados con pollo, repollo, zanahoria y salsa agridulce oriental.',
    image: yakiPolloImg || '/images/dish_yakisoba_pollo_1793299563720.jpg',
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
    image: yakiCamaronImg || '/images/dish_yakisoba_camaron_1793299663676.jpg',
  },

  // 🍗 Pollo frito
  {
    id: 'pollo-1',
    name: 'Pollo frito normal',
    category: 'pollo',
    price: 35000,
    description: 'Trozos crujientes de pollo frito estilo oriental, dorados por fuera y jugosos por dentro.',
    image: polloNormalImg || '/images/dish_pollo_frito_normal_1793299840353.jpg',
  },
  {
    id: 'pollo-2',
    name: 'Pollo frito agridulce',
    category: 'pollo',
    price: 40000,
    description: 'Pollo ultra crocante glaseado con salsa agridulce casera y sésamo tostado.',
    image: polloAgridulceImg || '/images/dish_pollo_agridulce_1793300327203.jpg',
  },
  {
    id: 'pollo-3',
    name: 'Pollo frito picante',
    category: 'pollo',
    price: 40000,
    description: 'Pollo crujiente bañado en deliciosa salsa picante chili wok artesanal.',
    image: polloPicanteImg || '/images/dish_pollo_picante_1793300426009.jpg',
  },

  // 🍟 Papas fritas
  {
    id: 'papas-1',
    name: 'Papas fritas pequeña',
    category: 'papas',
    price: 15000,
    portion: 'Porción individual',
    description: 'Papas bastón crujientes sazonadas con sal marina.',
    image: papasPequenaImg || '/images/dish_papas_pequena_1793300548287.jpg',
  },
  {
    id: 'papas-2',
    name: 'Papas fritas grande',
    category: 'papas',
    price: 20000,
    portion: 'Porción para compartir',
    description: 'Abundante porción de papas doradas y crujientes con dip especial.',
    image: papasGrandeImg || '/images/dish_papas_grande_1793300730017.jpg',
  },

  // 🍔 Hamburguesas
  {
    id: 'burg-1',
    name: 'Hamburguesa pequeña',
    category: 'hamburguesas',
    price: 15000,
    portion: 'Simple',
    description: 'Medallón de carne sazonada, queso fundido, lechuga y tomate en pan brioche.',
    image: burgerPequenaImg || '/images/dish_burger_pequena_1793300858602.jpg',
  },
  {
    id: 'burg-2',
    name: 'Hamburguesa grande',
    category: 'hamburguesas',
    price: 25000,
    portion: 'Doble + Panceta',
    description: 'Doble carne jugosa, extra queso derretido, panceta crujiente y salsa especial.',
    image: burgerGrandeImg || '/images/dish_burger_grande_1793300963811.jpg',
  },
];
