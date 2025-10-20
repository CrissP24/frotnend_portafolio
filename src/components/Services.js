import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaCode, 
  FaGraduationCap, 
  FaRobot, 
  FaLaptopCode, 
  FaDatabase, 
  FaMobile,
  FaChartLine,
  FaUsers,
  FaCog
} from 'react-icons/fa';

const Services = () => {
  const services = [
    {
      icon: FaLaptopCode,
      title: 'Desarrollo Web',
      description: 'Páginas web modernas y responsivas para emprendedores y negocios',
      features: ['Diseño responsivo', 'SEO optimizado', 'Carga rápida', 'Seguridad avanzada'],
      color: 'pastel-blue',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-500'
    },
    {
      icon: FaDatabase,
      title: 'Sistemas Administrativos',
      description: 'Sistemas internos para control de inventarios, reservas y asistencia',
      features: ['Gestión de inventario', 'Sistema de reservas', 'Control de asistencia', 'Reportes automáticos'],
      color: 'pastel-green',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-500'
    },
    {
      icon: FaChartLine,
      title: 'Dashboards Interactivos',
      description: 'Paneles administrativos con visualización de datos en tiempo real',
      features: ['Gráficos interactivos', 'Tiempo real', 'Exportación de datos', 'Alertas automáticas'],
      color: 'pastel-purple',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-500'
    },
    {
      icon: FaGraduationCap,
      title: 'Clases de Programación',
      description: 'Formación en React, Node.js, Laravel y bases de datos',
      features: ['Modalidad online/presencial', 'Material grabado', 'Proyectos prácticos'],
      color: 'pastel-orange',
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-500'
    },
    {
      icon: FaRobot,
      title: 'Automatizaciones',
      description: 'Bots personalizados y automatizaciones para optimizar procesos',
      features: ['Chatbots inteligentes', 'Automatización de tareas', 'Integración de APIs', 'Monitoreo 24/7'],
      color: 'pastel-blue',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-500'
    },
    {
      icon: FaMobile,
      title: 'Aplicaciones Móviles',
      description: 'Apps nativas e híbridas para iOS y Android',
      features: ['Diseño nativo', 'Offline first', 'Push notifications', 'Store deployment'],
      color: 'pastel-green',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-500'
    }
  ];

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

  return (
    <section id="services" className="section-padding bg-gray-50">
      <div className="container-custom px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-dark-gray mb-3 sm:mb-4 md:mb-6">
            ¿Qué <span className="text-gradient">ofrezco</span>?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Soluciones tecnológicas completas para impulsar tu negocio y desarrollo profesional
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              className={`card group cursor-pointer ${service.bgColor} hover:shadow-2xl transition-all duration-500`}
            >
              <div className="p-8">
                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  className={`w-16 h-16 ${service.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:shadow-lg transition-all duration-300`}
                >
                  <service.icon className={`text-3xl ${service.iconColor}`} />
                </motion.div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-dark-gray mb-4 group-hover:text-pastel-blue transition-colors duration-300">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, featureIndex) => (
                    <motion.li
                      key={featureIndex}
                      whileHover={{ x: 5 }}
                      className="flex items-center space-x-3 text-gray-700"
                    >
                      <div className={`w-2 h-2 bg-${service.color} rounded-full`}></div>
                      <span className="text-sm">{feature}</span>
                    </motion.li>
                  ))}
                </ul>

                {/* CTA Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className={`w-full bg-${service.color} hover:opacity-90 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl`}
                >
                  Consultar Servicio
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Process Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-dark-gray mb-4">
              Mi <span className="text-gradient">Proceso</span> de Trabajo
            </h3>
            <p className="text-lg text-gray-600">
              Metodología probada para garantizar el éxito de tu proyecto
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
            {[
              { step: '01', title: 'Consulta', description: 'Analizamos tus necesidades y objetivos' },
              { step: '02', title: 'Propuesta', description: 'Diseñamos la solución más adecuada' },
              { step: '03', title: 'Desarrollo', description: 'Implementamos con metodologías ágiles' },
              { step: '04', title: 'Entrega', description: 'Deploy y capacitación del equipo' }
            ].map((process, index) => (
              <motion.div
                key={process.step}
                whileHover={{ scale: 1.05 }}
                className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 bg-pastel-blue text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {process.step}
                </div>
                <h4 className="text-xl font-semibold text-dark-gray mb-3">
                  {process.title}
                </h4>
                <p className="text-gray-600">
                  {process.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
