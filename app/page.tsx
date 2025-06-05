"use client";

import type React from "react";
import { useState, useMemo, useCallback } from "react";
import Header from "@/components/header";
import Hero from "@/components/hero";
import ProductGrid from "@/components/product-grid";
import Footer from "@/components/footer";
import WhatsAppButton from "@/components/whatsapp-button";
import Cart from "@/components/cart";
import CategoryFilter from "@/components/category-filter";
import SpecFilter from "@/components/spec-filter";
import ActiveFilters from "@/components/active-filters";
import FeaturedProducts from "@/components/featured-products";
import PaymentMethods from "@/components/payment-methods";
import FeaturedCategories from "@/components/featured-categories";
import SubcategoryFilter from "@/components/subcategory-filter";
import type { Product } from "@/types/product";
import PerformanceMonitor from "@/components/performance-monitor";

// Mover productos fuera del componente para evitar recreación
const PRODUCTS: Product[] = [
  // CELULARES
  {
    id: 1,
    name: "Samsung Galaxy A15",
    price: 385000,
    image: "/celulares/Samsung-Galaxy-A15-varios-colores-66e4a331d102d-O.webp",
    quantity: 0,
    specs: {
      colors: ["Negro", "Blanco", "Amarillo"],
      storage: ["128GB", "256GB"],
    },
    category: "Celulares",
    subcategory: "Samsung",
    rating: 4,
    discount: 10,
    featured: true,
    description:
      "Colores: Negro, Blanco, Amarillo. Almacenamiento: 128GB, 256GB. Smartphone con pantalla AMOLED de 6.5 pulgadas, cámara triple de 50MP y batería de larga duración.",
    detailedSpecs: {
      "Colores disponibles": ["Negro", "Blanco", "Amarillo"],
      "Almacenamiento disponible": ["128GB", "256GB"],
      Pantalla: "6.5 pulgadas Super AMOLED",
      "Cámara principal": "50MP + 5MP + 2MP",
      Procesador: "MediaTek Helio G99",
      RAM: "6GB",
      Batería: "5000mAh con carga rápida 25W",
      "Sistema operativo": "Android 14 con One UI 6.0",
    },
  },
  {
    id: 2,
    name: "Samsung Galaxy A06",
    price: 253000,
    image:
      "/celulares/sm-a065f_galaxy_a06_blue_black_green_front-back_1_1 (1).webp",
    quantity: 0,
    specs: {
      colors: ["Blanco", "Negro", "Verde Menta"],
      storage: ["64GB", "128GB"],
    },
    category: "Celulares",
    subcategory: "Samsung",
    rating: 4,
    description:
      "Colores: Blanco, Negro, Verde Menta. Almacenamiento: 64GB, 128GB. Smartphone económico con gran rendimiento y batería de larga duración.",
    detailedSpecs: {
      "Colores disponibles": ["Blanco", "Negro", "Verde Menta"],
      "Almacenamiento disponible": ["64GB", "128GB"],
      Pantalla: "6.6 pulgadas HD+",
      "Cámara principal": "50MP + 2MP",
      Procesador: "MediaTek Helio G85",
      RAM: "4GB",
      Batería: "5000mAh",
      "Sistema operativo": "Android 14 con One UI 6.0",
    },
  },
  {
    id: 3,
    name: "Samsung Galaxy A05",
    price: 247000,
    image: "/celulares/samsung_a05_fa37c0bd-1c45-40d1-bf65-47a79848cf1f.webp",
    quantity: 0,
    specs: {
      colors: ["Verde Lima", "Negro", "Blanco"],
      storage: ["64GB", "128GB"],
    },
    category: "Celulares",
    subcategory: "Samsung",
    rating: 3,
    discount: 15,
    description:
      "Colores: Verde Lima, Negro, Blanco. Almacenamiento: 64GB, 128GB. Smartphone de entrada con excelente relación calidad-precio.",
    detailedSpecs: {
      "Colores disponibles": ["Verde Lima", "Negro", "Blanco"],
      "Almacenamiento disponible": ["64GB", "128GB"],
      Pantalla: "6.7 pulgadas HD+",
      "Cámara principal": "50MP + 2MP",
      Procesador: "MediaTek Helio G85",
      RAM: "4GB",
      Batería: "5000mAh",
      "Sistema operativo": "Android 13 con One UI 5.1",
    },
  },
  {
    id: 4,
    name: "Motorola Moto G24 Power",
    price: 213000,
    image: "/celulares/1a7fb4cf-c093-441f-99f8-76cf61681d91.jpg",
    quantity: 0,
    specs: {
      colors: ["Azul Claro", "Negro"],
      storage: ["128GB", "256GB"],
    },
    category: "Celulares",
    subcategory: "Motorola",
    rating: 4,
    featured: true,
    description:
      "Smartphone con batería de 6000mAh para una autonomía excepcional.",
    detailedSpecs: {
      "Colores disponibles": ["Azul Claro", "Negro"],
      "Almacenamiento disponible": ["128GB", "256GB"],
      Pantalla: "6.56 pulgadas HD+",
      "Cámara principal": "50MP + 2MP",
      Procesador: "MediaTek Helio G85",
      RAM: "4GB",
      Batería: "6000mAh con carga rápida 33W",
      "Sistema operativo": "Android 14",
    },
  },
  {
    id: 5,
    name: "Motorola Moto G42",
    price: 140000,
    image: "/celulares/moto_g42_128gb_verde_atl_ntico_1.webp",
    quantity: 0,
    specs: {
      colors: ["Verde Atlántico"],
      storage: ["128GB"],
    },
    category: "Celulares",
    subcategory: "Motorola",
    rating: 4,
    featured: true,
    description:
      "Colores: Verde Atlántico. Almacenamiento: 128GB. Smartphone con pantalla OLED y sonido estéreo para una experiencia multimedia completa.",
    detailedSpecs: {
      "Colores disponibles": ["Verde Atlántico"],
      "Almacenamiento disponible": ["128GB"],
      Pantalla: "6.4 pulgadas OLED FHD+",
      "Cámara principal": "50MP + 8MP + 2MP",
      Procesador: "Snapdragon 680",
      RAM: "4GB",
      Batería: "5000mAh con carga rápida 20W",
      "Sistema operativo": "Android 12",
    },
  },
  {
    id: 6,
    name: "Tecno Spark Go 1",
    price: 190000,
    image: "/celulares/86c673ae-3714-48d5-982a-fba5bc0981f2.jpg",
    quantity: 0,
    specs: {
      colors: ["Blanco"],
      storage: ["64GB"],
    },
    category: "Celulares",
    subcategory: "Tecno",
    rating: 3,
    discount: 5,
    description: "Smartphone económico con conectividad 4.5G y gran pantalla.",
    detailedSpecs: {
      "Colores disponibles": ["Blanco"],
      "Almacenamiento disponible": ["64GB"],
      Pantalla: "6.6 pulgadas HD+",
      "Cámara principal": "13MP + 2MP",
      Procesador: "Unisoc T606",
      RAM: "3GB",
      Batería: "5000mAh",
      "Sistema operativo": "Android 13 Go Edition",
    },
  },

  {
    id: 8,
    name: "Itel A50",
    price: 247250,
    image: "/celulares/D_Q_NP_2X_948177-MLA84688735574_052025-V.webp",
    quantity: 0,
    specs: {
      colors: ["Negro", "Blanco"],
      storage: ["256GB"],
    },
    category: "Celulares",
    subcategory: "Honor",
    rating: 4,
    new: true,
    featured: true,
    description:
      "Smartphone con diseño elegante y cámara circular de alta resolución.",
    detailedSpecs: {
      "Colores disponibles": ["Negro", "Blanco"],
      "Almacenamiento disponible": ["256GB"],
      Pantalla: "6.7 pulgadas AMOLED FHD+",
      "Cámara principal": "108MP + 5MP + 2MP",
      Procesador: "Snapdragon 6 Gen 1",
      RAM: "8GB",
      Batería: "4500mAh con carga rápida 35W",
      "Sistema operativo": "Android 13 con MagicOS 7.2",
    },
  },
  {
    id: 2001,
    name: "Tecno Spark 30C",
    price: 359999,
    image: "/public/celulares/c30.png",
    quantity: 0,
    specs: {
      colors: ["Orbit White", "Magic Skin Green"],
      storage: ["256GB"],
    },
    category: "Celulares",
    subcategory: "Tecno",
    rating: 4,
    description:
      "Tecno Spark 30C 256GB + 4GB RAM. Orbit White y Magic Skin Green.",
    detailedSpecs: {
      "Colores disponibles": ["Orbit White", "Magic Skin Green"],
      "Almacenamiento disponible": ["256GB"],
      RAM: "4GB",
    },
  },

    
  // NOTEBOOKS
  {
    id: 9,
    name: "Lenovo IdeaPad 3 15.6",
    price: 350000,
    image: "/notebooks/D_Q_NP_2X_666691-MLA82794187380_032025-V.webp",
    quantity: 0,
    specs: {
      colors: ["Gris", "Azul"],
      processor: ["Intel Core i3", "Intel Core i5"],
    },
    category: "Notebooks",
    rating: 4,
    description:
      "Notebook versátil para trabajo y estudio con excelente rendimiento.",
    detailedSpecs: {
      "Colores disponibles": ["Gris", "Azul"],
      "Procesador disponible": ["Intel Core i3-1115G4", "Intel Core i5-1135G7"],
      Pantalla: "15.6 pulgadas Full HD",
      Memoria: "8GB DDR4",
      Almacenamiento: "256GB SSD",
      Gráficos: "Intel UHD Graphics",
      Batería: "Hasta 7 horas",
      "Sistema operativo": "Windows 11 Home",
    },
  },
  
  // LAVARROPAS Y SECARROPAS
  {
    id: 13,
    name: "Lavarropas Drean Next 8.12 ECO",
    price: 380000,
    image: "/lavarropas/D_Q_NP_2X_607477-MLU78397062461_082024-V.webp",
    quantity: 0,
    specs: {
      colors: ["Blanco"],
      capacity: ["8kg"],
    },
    category: "Lavarropas y Secarropas",
    subcategory: "Lavarropas",
    rating: 4,
    description:
      "Lavarropas de carga frontal con 12 programas de lavado y eficiencia energética A+++.",
    detailedSpecs: {
      "Colores disponibles": ["Blanco"],
      "Capacidad disponible": ["8kg"],
      "Velocidad de centrifugado": "1200 RPM",
      "Eficiencia energética": "A+++",
      Programas: "12 programas",
      Display: "LED",
      Dimensiones: "60cm x 60cm x 85cm",
      Garantía: "1 año",
    },
  },
  
  // AUDIO
  {
    id: 15,
    name: "Parlante Bluetooth JBL Charge 5",
    price: 95000,
    image: "/audio/D_Q_NP_2X_948177-MLA84688735574_052025-V.webp",
    quantity: 0,
    specs: {
      colors: ["Negro", "Azul", "Rojo"],
    },
    category: "Audio",
    subcategory: "Parlantes",
    rating: 5,
    featured: true,
    description:
      "Parlante Bluetooth resistente al agua con 20 horas de reproducción y powerbank integrado.",
    detailedSpecs: {
      "Colores disponibles": ["Negro", "Azul", "Rojo"],
      Potencia: "40W",
      Batería: "Hasta 20 horas",
      Resistencia: "IP67 (agua y polvo)",
      Conectividad: "Bluetooth 5.1",
      Powerbank: "Sí",
      Dimensiones: "22cm x 9.5cm x 9.5cm",
      Garantía: "1 año",
    },
  },
  
  // AIRES ACONDICIONADOS
 
  {
    id: 18,
    name: "Aire Acondicionado Portátil Philco 3500W",
    price: 250000,
    image: "/placeholder.svg?height=300&width=300",
    quantity: 0,
    specs: {
      power: ["3500W"],
      efficiency: ["A"],
    },
    category: "Aires Acondicionados",
    rating: 3,
    description:
      "Aire acondicionado portátil solo frío con control remoto y temporizador.",
    detailedSpecs: {
      "Potencia disponible": ["3500W"],
      Tipo: "Portátil",
      Función: "Solo frío",
      Tecnología: "Estándar",
      "Eficiencia energética": "A",
      Cobertura: "Hasta 25m²",
      "Gas refrigerante": "R410A",
      Garantía: "1 año",
    },
  },
  // ELECTRODOMÉSTICOS
  {
    id: 19,
    name: 'Ventilador de Pie Liliana 20"',
    price: 45000,
    image: "/placeholder.svg?height=300&width=300",
    quantity: 0,
    specs: {
      power: ["100W"],
      features: ["Oscilante", "3 velocidades"],
    },
    category: "Electrodomésticos",
    subcategory: "Ventiladores",
    rating: 4,
    description:
      "Ventilador de pie con 3 velocidades, oscilación y altura regulable.",
    detailedSpecs: {
      "Potencia disponible": ["100W"],
      Diámetro: "20 pulgadas",
      Velocidades: "3",
      Oscilación: "Sí",
      "Altura regulable": "Sí",
      Timer: "No",
      Dimensiones: "50cm x 40cm x 130cm",
      Garantía: "6 meses",
    },
  },
  
  // BICICLETAS
  
  {
    id: 22,
    name: "Bicicleta Plegable Rodado 20",
    price: 120000,
    image: "/placeholder.svg?height=300&width=300",
    quantity: 0,
    specs: {
      colors: ["Negro", "Blanco"],
      size: ["Única"],
    },
    category: "Bicicletas",
    subcategory: "Plegables",
    rating: 4,
    new: true,
    description:
      "Bicicleta plegable ideal para ciudad y transporte público, con 6 velocidades.",
    detailedSpecs: {
      "Colores disponibles": ["Negro", "Blanco"],
      "Tallas disponibles": ["Única"],
      Rodado: "20",
      "Material cuadro": "Acero",
      Velocidades: "6",
      Frenos: "V-Brake",
      Plegado: "Rápido en 15 segundos",
      Garantía: "1 año",
    },
  },
  // HELADERAS GAFA BLANCA
  {
    id: 1001,
    name: "Heladera con freezer Gafa HGF388AFB Blanca",
    price: 1084000,
    image: "/heladeras/86c673ae-3714-48d5-982a-fba5bc0981f2.jpg",
    quantity: 0,
    specs: {},
    category: "Heladeras",
    subcategory: "Gafa",
    rating: 0,
    description: "Heladera con freezer Gafa HGF388AFB Blanca",
    detailedSpecs: {},
  },
  {
    id: 1002,
    name: "Heladera con freezer Gafa HGF368AFB Blanca",
    price: 953669,
    image: "/heladeras/86c673ae-3714-48d5-982a-fba5bc0981f2.jpg",
    quantity: 0,
    specs: {},
    category: "Heladeras",
    subcategory: "Gafa",
    rating: 0,
    description: "Heladera con freezer Gafa HGF368AFB Blanca",
    detailedSpecs: {},
  },
  {
    id: 1003,
    name: "Heladera con freezer Gafa HGF358AFB Blanca",
    price: 870170,
    image: "/heladeras/86c673ae-3714-48d5-982a-fba5bc0981f2.jpg",
    quantity: 0,
    specs: {},
    category: "Heladeras",
    subcategory: "Gafa",
    rating: 0,
    description: "Heladera con freezer Gafa HGF358AFB Blanca",
    detailedSpecs: {},
  },
  // HELADERAS GAFA GRIS
  {
    id: 1004,
    name: "Heladera con freezer Gafa HGF388AFP Plata",
    price: 1081000,
    image: "/heladeras/1a7fb4cf-c093-441f-99f8-76cf61681d91.jpg",
    quantity: 0,
    specs: {},
    category: "Heladeras",
    subcategory: "Gafa",
    rating: 0,
    description: "Heladera con freezer Gafa HGF388AFP Plata",
    detailedSpecs: {},
  },
  {
    id: 1005,
    name: "Heladera con freezer Gafa HGF368AFP Plata",
    price: 1039600,
    image: "/heladeras/1a7fb4cf-c093-441f-99f8-76cf61681d91.jpg",
    quantity: 0,
    specs: {},
    category: "Heladeras",
    subcategory: "Gafa",
    rating: 0,
    description: "Heladera con freezer Gafa HGF368AFP Plata",
    detailedSpecs: {},
  },
  {
    id: 1006,
    name: "Heladera con freezer Gafa HGF358AFP Plata",
    price: 776942,
    image: "/heladeras/1a7fb4cf-c093-441f-99f8-76cf61681d91.jpg",
    quantity: 0,
    specs: {},
    category: "Heladeras",
    subcategory: "Gafa",
    rating: 0,
    description: "Heladera con freezer Gafa HGF358AFP Plata",
    detailedSpecs: {},
  },
];

export default function Home() {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedSpecs, setSelectedSpecs] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>(
    []
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    address: "",
  });

  // Obtener todas las especificaciones disponibles para el filtro
  const allSpecs = useMemo(() => {
    const specsSet = new Set<string>();
    PRODUCTS.forEach((product) => {
      Object.values(product.specs).forEach((specArray) => {
        if (Array.isArray(specArray)) {
          specArray.forEach((spec) => specsSet.add(spec));
        }
      });
    });
    return Array.from(specsSet).sort();
  }, []);

  // Obtener todas las categorías disponibles para el filtro
  const allCategories = useMemo(() => {
    const categoriesSet = new Set<string>();
    PRODUCTS.forEach((product) => {
      categoriesSet.add(product.category);
    });
    return Array.from(categoriesSet).sort();
  }, []);

  // Obtener todas las subcategorías disponibles para el filtro
  const allSubcategories = useMemo(() => {
    const subcategoriesSet = new Set<string>();
    PRODUCTS.forEach((product) => {
      if (product.subcategory) {
        subcategoriesSet.add(product.subcategory);
      }
    });
    return Array.from(subcategoriesSet).sort();
  }, []);

  const handleSpecFilter = useCallback((spec: string) => {
    if (spec === "clear") {
      setSelectedSpecs([]);
      return;
    }
    setSelectedSpecs((prev) =>
      prev.includes(spec) ? prev.filter((s) => s !== spec) : [...prev, spec]
    );
  }, []);

  const handleCategoryFilter = useCallback((category: string) => {
    if (category === "clear") {
      setSelectedCategories([]);
      return;
    }
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  }, []);

  const handleSubcategoryFilter = useCallback((subcategory: string) => {
    if (subcategory === "clear") {
      setSelectedSubcategories([]);
      return;
    }
    setSelectedSubcategories((prev) =>
      prev.includes(subcategory)
        ? prev.filter((s) => s !== subcategory)
        : [...prev, subcategory]
    );
  }, []);

  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  // Función para limpiar todos los filtros
  const clearAllFilters = useCallback(() => {
    setSelectedSpecs([]);
    setSelectedCategories([]);
    setSelectedSubcategories([]);
    setSearchTerm("");
  }, []);

  // Función para seleccionar una categoría específica
  const handleCategorySelect = useCallback((category: string) => {
    setSelectedCategories([category]);
    setSelectedSubcategories([]);
    setSelectedSpecs([]);
    setSearchTerm("");
  }, []);

  // Función para navegar a productos
  const navigateToProducts = useCallback(() => {
    const element = document.getElementById("productos");
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  }, []);

  // Función para navegar a destacados
  const navigateToFeatured = useCallback(() => {
    const element = document.getElementById("destacados");
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  }, []);

  const addToCart = useCallback((product: Product, selectedSpec: string) => {
    setCartItems((prevItems) => {
      const existingProductIndex = prevItems.findIndex(
        (item) => item.id === product.id && item.selectedSpec === selectedSpec
      );

      if (existingProductIndex >= 0) {
        const updatedItems = [...prevItems];
        updatedItems[existingProductIndex].quantity += 1;
        return updatedItems;
      } else {
        return [...prevItems, { ...product, quantity: 1, selectedSpec }];
      }
    });
  }, []);

  const toggleCart = useCallback(() => {
    setIsCartOpen(!isCartOpen);
  }, [isCartOpen]);

  const totalItems = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems]
  );

  const handleCustomerInfoChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setCustomerInfo((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    []
  );

  // Verificar si hay algún filtro activo
  const hasActiveFilters = useMemo(
    () =>
      selectedSpecs.length > 0 ||
      selectedCategories.length > 0 ||
      selectedSubcategories.length > 0 ||
      searchTerm.trim() !== "",
    [selectedSpecs, selectedCategories, selectedSubcategories, searchTerm]
  );

  // Productos destacados (featured)
  const featuredProducts = useMemo(
    () => PRODUCTS.filter((p) => p.featured || p.new || p.discount),
    []
  );

  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      <PerformanceMonitor />
      <Header
        cartCount={totalItems}
        toggleCart={toggleCart}
        onSearch={handleSearch}
        onCategorySelect={handleCategorySelect}
        searchTerm={searchTerm}
      />

      {isCartOpen && (
        <Cart
          items={cartItems}
          setItems={setCartItems}
          onClose={() => setIsCartOpen(false)}
          customerInfo={customerInfo}
          onCustomerInfoChange={handleCustomerInfoChange}
        />
      )}

      <Hero
        onNavigateToProducts={navigateToProducts}
        onNavigateToFeatured={navigateToFeatured}
      />

      <FeaturedCategories onCategorySelect={handleCategorySelect} />

      <FeaturedProducts
        title="Productos Destacados"
        subtitle="Descubre nuestra selección especial de productos con las mejores ofertas y novedades del mercado"
        products={featuredProducts}
        addToCart={addToCart}
        onViewAll={navigateToProducts}
      />

      <PaymentMethods />

      <section
        id="productos"
        className="py-16 px-4 max-w-7xl mx-auto w-full bg-white rounded-lg shadow-sm"
      >
        <h2 className="text-3xl font-bold mb-8 text-center">
          Catálogo Completo
        </h2>

        <div className="mb-8 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <CategoryFilter
              availableCategories={allCategories}
              selectedCategories={selectedCategories}
              onCategoryChange={handleCategoryFilter}
            />

            <SubcategoryFilter
              availableSubcategories={allSubcategories}
              selectedSubcategories={selectedSubcategories}
              onSubcategoryChange={handleSubcategoryFilter}
              categoryName="producto"
            />

            <SpecFilter
              availableSpecs={allSpecs}
              selectedSpecs={selectedSpecs}
              onSpecChange={handleSpecFilter}
              specName="especificación"
            />
          </div>
        </div>

        {hasActiveFilters && (
          <ActiveFilters
            selectedSpecs={selectedSpecs}
            selectedCategories={selectedCategories}
            searchTerm={searchTerm}
            onRemoveSpec={(spec) =>
              setSelectedSpecs(selectedSpecs.filter((s) => s !== spec))
            }
            onRemoveCategory={(category) =>
              setSelectedCategories(
                selectedCategories.filter((c) => c !== category)
              )
            }
            onClearSearch={() => setSearchTerm("")}
            onClearAll={clearAllFilters}
          />
        )}

        <ProductGrid
          products={PRODUCTS}
          addToCart={addToCart}
          selectedSpecs={selectedSpecs}
          selectedCategories={selectedCategories}
          selectedSubcategories={selectedSubcategories}
          searchTerm={searchTerm}
          priceRange={{ min: 0, max: 1000000 }}
        />
      </section>

      <Footer />

      <WhatsAppButton cartItems={cartItems} customerInfo={customerInfo} />
    </main>
  );
}
