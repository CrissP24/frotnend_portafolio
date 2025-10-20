import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaWhatsapp, FaCode, FaRocket } from 'react-icons/fa';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
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

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 py-8">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900"></div>
      
      {/* Overlay Pattern */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10"></div>
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute top-20 left-10 w-20 h-20 bg-pastel-blue bg-opacity-20 rounded-full blur-xl"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: '1s' }}
          className="absolute top-40 right-20 w-32 h-32 bg-pastel-green bg-opacity-20 rounded-full blur-xl"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: '2s' }}
          className="absolute bottom-40 left-20 w-24 h-24 bg-pastel-purple bg-opacity-20 rounded-full blur-xl"
        />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center text-white w-full max-w-6xl mx-auto"
        >
          {/* Main Content */}
          <motion.div variants={itemVariants} className="mb-8">
            <motion.h1 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight"
              whileHover={{ scale: 1.02 }}
            >
              <span className="block text-white drop-shadow-2xl">Cristhoper</span>
              <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent drop-shadow-2xl font-extrabold">Damian Pincay</span>
            </motion.h1>
            
            <motion.p 
              className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 max-w-4xl mx-auto leading-relaxed px-4"
              variants={itemVariants}
            >
              <span className="text-white drop-shadow-lg font-medium block mb-2">
                Desarrollador Full Stack | React, Node.js, Laravel
              </span>
              <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-500 bg-clip-text text-transparent font-bold drop-shadow-lg text-lg sm:text-xl md:text-2xl block">
                Soluciones web modernas para negocios, emprendimientos y educación
              </span>
            </motion.p>
          </motion.div>

          {/* Tech Icons */}
          <motion.div 
            variants={itemVariants}
            className="flex justify-center items-center gap-2 sm:gap-3 md:gap-4 mb-8 sm:mb-12 flex-wrap px-4"
          >
            {[
              { icon: FaCode, name: 'React', color: 'text-blue-400' },
              { icon: FaRocket, name: 'Node.js', color: 'text-green-400' },
              { icon: FaCode, name: 'Laravel', color: 'text-red-400' },
              { icon: FaCode, name: 'PostgreSQL', color: 'text-blue-300' }
            ].map((tech, index) => (
              <motion.div
                key={tech.name}
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="flex flex-col items-center space-y-1 sm:space-y-2 p-2 sm:p-3 md:p-4 bg-white/10 rounded-xl backdrop-blur-md border border-white/20 shadow-2xl hover:bg-white/20 transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <tech.icon className={`text-lg sm:text-xl md:text-2xl ${tech.color} drop-shadow-md`} />
                <span className="text-xs sm:text-sm font-medium text-white drop-shadow-md">{tech.name}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-4 md:space-x-6 px-4 w-full max-w-md sm:max-w-none mx-auto"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 md:px-8 rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center space-x-2 text-base sm:text-lg md:text-xl drop-shadow-lg"
            >
              <FaRocket />
              <span>Ver Portafolio</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 md:px-8 rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center space-x-2 text-base sm:text-lg md:text-xl drop-shadow-lg"
            >
              <FaWhatsapp />
              <span>Contacto</span>
            </motion.button>
          </motion.div>

          {/* Social Links */}
          <motion.div 
            variants={itemVariants}
            className="flex justify-center items-center space-x-4 sm:space-x-6 mt-8 sm:mt-12"
          >
            {[
              { icon: FaGithub, href: 'https://github.com/cristhoper', color: 'hover:text-gray-300' },
              { icon: FaLinkedin, href: 'https://linkedin.com/in/cristhoper', color: 'hover:text-blue-300' },
              { icon: FaWhatsapp, href: 'https://wa.me/593987654321', color: 'hover:text-green-300' }
            ].map((social, index) => (
              <motion.a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.3, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
                className={`text-lg sm:text-xl md:text-2xl text-white ${social.color} transition-colors duration-300 drop-shadow-md`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <social.icon />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-white rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
