import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaQuoteLeft, FaUser, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import api from '../config/api';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      // Por ahora usaremos testimonios estáticos, pero se puede conectar con la API
      const staticTestimonials = [
        {
          id: 1,
          author_name: 'María González',
          author_email: 'maria@empresa.com',
          content: 'Cristhoper me ayudó a digitalizar mi tienda y a crear un sistema de reservas sencillo. Muy profesional y rápido.',
          rating: 5,
          project_title: 'Sistema de Reservas'
        },
        {
          id: 2,
          author_name: 'Carlos Mendoza',
          author_email: 'carlos@startup.com',
          content: 'Excelente trabajo en nuestro dashboard. La interfaz es intuitiva y los datos se actualizan en tiempo real.',
          rating: 5,
          project_title: 'Dashboard Empresarial'
        },
        {
          id: 3,
          author_name: 'Ana Rodríguez',
          author_email: 'ana@universidad.edu',
          content: 'Las clases de programación son muy didácticas. Aprendí React desde cero y ahora puedo crear aplicaciones web.',
          rating: 5,
          project_title: 'Curso de React'
        },
        {
          id: 4,
          author_name: 'Luis Fernández',
          author_email: 'luis@restaurante.com',
          content: 'El sistema de gestión de inventario ha optimizado nuestros procesos. Muy recomendado.',
          rating: 4,
          project_title: 'Sistema de Inventario'
        }
      ];
      
      setTestimonials(staticTestimonials);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  if (loading) {
    return (
      <section id="testimonials" className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pastel-blue mx-auto"></div>
            <p className="mt-4 text-gray-600">Cargando testimonios...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="testimonials" className="section-padding bg-white">
      <div className="container-custom px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-dark-gray mb-3 sm:mb-4 md:mb-6">
            Lo que dicen mis <span className="text-gradient">clientes</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Testimonios reales de emprendedores, empresas y estudiantes que han trabajado conmigo
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="relative max-w-4xl mx-auto"
        >
          {/* Main Testimonial */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-pastel-blue to-pastel-green rounded-2xl p-4 sm:p-6 md:p-8 lg:p-12 text-white relative overflow-hidden"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12"></div>
            </div>

            <div className="relative z-10">
              {/* Quote Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="mb-6"
              >
                <FaQuoteLeft className="text-4xl text-pastel-orange" />
              </motion.div>

              {/* Testimonial Content */}
              <motion.blockquote
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed mb-4 sm:mb-6 md:mb-8"
              >
                "{testimonials[currentIndex]?.content}"
              </motion.blockquote>

              {/* Rating */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex items-center space-x-1 mb-6"
              >
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`text-lg ${
                      i < (testimonials[currentIndex]?.rating || 5)
                        ? 'text-pastel-orange'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </motion.div>

              {/* Author Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex items-center space-x-4"
              >
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <FaUser className="text-xl" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">
                    {testimonials[currentIndex]?.author_name}
                  </h4>
                  <p className="text-pastel-orange">
                    {testimonials[currentIndex]?.project_title}
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Navigation Buttons */}
          <div className="flex justify-center items-center space-x-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevTestimonial}
              className="w-12 h-12 bg-pastel-blue hover:bg-blue-600 text-white rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <FaChevronLeft />
            </motion.button>

            {/* Dots Indicator */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-pastel-blue scale-125'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextTestimonial}
              className="w-12 h-12 bg-pastel-blue hover:bg-blue-600 text-white rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <FaChevronRight />
            </motion.button>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 sm:mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-8"
        >
          {[
            { number: '50+', label: 'Proyectos Completados' },
            { number: '100%', label: 'Clientes Satisfechos' },
            { number: '3+', label: 'Años de Experiencia' },
            { number: '24/7', label: 'Soporte Disponible' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              whileHover={{ scale: 1.05, y: -5 }}
              className="text-center p-3 sm:p-4 md:p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-pastel-blue mb-1 sm:mb-2">
                {stat.number}
              </div>
              <div className="text-xs sm:text-sm text-gray-600 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
