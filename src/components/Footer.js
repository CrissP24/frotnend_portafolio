import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaWhatsapp, FaEnvelope, FaHeart, FaCode } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: FaGithub, href: 'https://github.com/cristhoper', label: 'GitHub' },
    { icon: FaLinkedin, href: 'https://linkedin.com/in/cristhoper', label: 'LinkedIn' },
    { icon: FaWhatsapp, href: 'https://wa.me/593987654321', label: 'WhatsApp' },
    { icon: FaEnvelope, href: 'mailto:cristhoper@email.com', label: 'Email' }
  ];

  const quickLinks = [
    { name: 'Inicio', href: '#hero' },
    { name: 'Sobre mí', href: '#about' },
    { name: 'Proyectos', href: '#projects' },
    { name: 'Servicios', href: '#services' },
    { name: 'Contacto', href: '#contact' }
  ];

  const services = [
    'Desarrollo Web',
    'Sistemas Administrativos',
    'Dashboards Interactivos',
    'Clases de Programación',
    'Automatizaciones'
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-dark-gray text-white">
      <div className="container-custom px-4">
        {/* Main Footer Content */}
        <div className="py-12 sm:py-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-1"
            >
              <div className="flex items-center space-x-3 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-r from-pastel-blue to-pastel-green rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm sm:text-lg md:text-xl">CP</span>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold">Cristhoper Pincay</h3>
                  <p className="text-gray-400 text-xs sm:text-sm">Full Stack Developer</p>
                </div>
              </div>
              
              <p className="text-gray-400 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                Desarrollador full stack especializado en crear soluciones web modernas 
                para negocios, emprendimientos y educación.
              </p>

              {/* Social Links */}
              <div className="flex space-x-3 sm:space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-gray-700 hover:bg-pastel-blue rounded-lg flex items-center justify-center transition-all duration-300"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <social.icon className="text-xs sm:text-sm md:text-lg" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h4 className="text-sm sm:text-base md:text-lg font-semibold mb-3 sm:mb-4 md:mb-6">Enlaces Rápidos</h4>
              <ul className="space-y-1 sm:space-y-2 md:space-y-3">
                {quickLinks.map((link, index) => (
                  <motion.li
                    key={link.name}
                    whileHover={{ x: 5 }}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-gray-400 hover:text-pastel-blue transition-colors duration-300 text-xs sm:text-sm md:text-base"
                    >
                      {link.name}
                    </button>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="text-lg font-semibold mb-6">Servicios</h4>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <motion.li
                    key={service}
                    whileHover={{ x: 5 }}
                    className="text-gray-400 hover:text-pastel-green transition-colors duration-300"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {service}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h4 className="text-lg font-semibold mb-6">Contacto</h4>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <FaEnvelope className="text-pastel-blue" />
                  <span className="text-gray-400">cristhoper@email.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaWhatsapp className="text-pastel-green" />
                  <span className="text-gray-400">+593 98 765 4321</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaCode className="text-pastel-purple" />
                  <span className="text-gray-400">Ecuador, Latam</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-gray-700 py-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-gray-400">
              <span>© {currentYear} Cristhoper Damian Pincay.</span>
              <span>Todos los derechos reservados.</span>
            </div>
            
            <div className="flex items-center space-x-2 text-gray-400">
              <span>Hecho con</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <FaHeart className="text-pastel-orange" />
              </motion.div>
              <span>en Ecuador</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
