import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaReact, 
  FaNodeJs, 
  FaLaravel, 
  FaDatabase, 
  FaCode, 
  FaRocket,
  FaGraduationCap,
  FaLightbulb,
  FaUsers
} from 'react-icons/fa';

const About = () => {
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

  const skills = [
    { icon: FaReact, name: 'React', color: 'text-blue-500', bg: 'bg-blue-50' },
    { icon: FaNodeJs, name: 'Node.js', color: 'text-green-500', bg: 'bg-green-50' },
    { icon: FaLaravel, name: 'Laravel', color: 'text-red-500', bg: 'bg-red-50' },
    { icon: FaDatabase, name: 'PostgreSQL', color: 'text-blue-600', bg: 'bg-blue-50' },
    { icon: FaCode, name: 'JavaScript', color: 'text-yellow-500', bg: 'bg-yellow-50' },
    { icon: FaRocket, name: 'Three.js', color: 'text-purple-500', bg: 'bg-purple-50' }
  ];

  const values = [
    {
      icon: FaLightbulb,
      title: 'Innovación',
      description: 'Siempre busco las mejores tecnologías y metodologías para crear soluciones únicas.',
      color: 'text-pastel-orange'
    },
    {
      icon: FaUsers,
      title: 'Colaboración',
      description: 'Trabajo en equipo para lograr objetivos comunes y compartir conocimiento.',
      color: 'text-pastel-green'
    },
    {
      icon: FaGraduationCap,
      title: 'Aprendizaje',
      description: 'Me mantengo actualizado con las últimas tendencias en desarrollo web.',
      color: 'text-pastel-blue'
    }
  ];

  return (
    <section id="about" className="section-padding bg-gray-50">
      <div className="container-custom px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-16 items-center"
        >
          {/* Content */}
          <motion.div variants={itemVariants}>
            <motion.h2 
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-dark-gray mb-4 sm:mb-6"
              whileHover={{ scale: 1.02 }}
            >
              Sobre <span className="text-gradient">mí</span>
            </motion.h2>
            
            <motion.div 
              className="space-y-4 sm:space-y-6 text-base sm:text-lg text-gray-700 leading-relaxed"
              variants={itemVariants}
            >
              <p>
                Soy programador full stack con experiencia en aplicaciones web, APIs, 
                sistemas de gestión y proyectos interactivos. Me apasiona crear soluciones 
                digitales que faciliten procesos, optimicen negocios y enseñen nuevas 
                habilidades a estudiantes y emprendedores.
              </p>
              
              <p>
                Con más de 3 años de experiencia en desarrollo web, he trabajado en 
                proyectos que van desde sitios web corporativos hasta aplicaciones complejas 
                con realidad aumentada y sistemas de gestión empresarial.
              </p>
              
              <p>
                Mi enfoque se centra en crear experiencias de usuario excepcionales y 
                soluciones técnicas robustas que impulsen el crecimiento de los negocios.
              </p>
            </motion.div>

            {/* Values */}
            <motion.div 
              className="mt-12 space-y-6"
              variants={itemVariants}
            >
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  whileHover={{ scale: 1.02, x: 10 }}
                  className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <div className={`p-3 rounded-lg ${value.color} bg-opacity-10`}>
                    <value.icon className={`text-2xl ${value.color}`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-dark-gray mb-2">
                      {value.title}
                    </h3>
                    <p className="text-gray-600">
                      {value.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Skills & Image */}
          <motion.div variants={itemVariants} className="space-y-8">
            {/* Profile Image Placeholder */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative"
            >
              <div className="w-64 h-64 sm:w-80 sm:h-80 mx-auto bg-gradient-to-br from-pastel-blue to-pastel-green rounded-2xl shadow-2xl flex items-center justify-center">
                <div className="w-48 h-48 sm:w-64 sm:h-64 bg-white bg-opacity-20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <span className="text-4xl sm:text-6xl font-bold text-white">CP</span>
                </div>
              </div>
              
              {/* Floating elements */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-4 -right-4 w-16 h-16 bg-pastel-orange rounded-full flex items-center justify-center shadow-lg"
              >
                <FaCode className="text-white text-xl" />
              </motion.div>
              
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -bottom-4 -left-4 w-12 h-12 bg-pastel-purple rounded-full flex items-center justify-center shadow-lg"
              >
                <FaRocket className="text-white text-lg" />
              </motion.div>
            </motion.div>

            {/* Skills Grid */}
            <motion.div 
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-3 sm:gap-4"
              variants={itemVariants}
            >
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-4 rounded-xl ${skill.bg} shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center space-x-3">
                    <skill.icon className={`text-2xl ${skill.color}`} />
                    <span className="font-semibold text-dark-gray">{skill.name}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div 
              className="grid grid-cols-3 gap-2 sm:gap-4"
              variants={itemVariants}
            >
              {[
                { number: '50+', label: 'Proyectos' },
                { number: '3+', label: 'Años Exp.' },
                { number: '100%', label: 'Satisfacción' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ scale: 1.1 }}
                  className="text-center p-3 sm:p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="text-xl sm:text-2xl font-bold text-pastel-blue mb-1">
                    {stat.number}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
