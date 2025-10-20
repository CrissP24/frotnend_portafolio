import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaCode, FaStar, FaComment } from 'react-icons/fa';
import api from '../config/api';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await api.get('/api/projects');
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
      // Mostrar proyectos de ejemplo si hay error
      setProjects([
        {
          id: 1,
          title: 'Syllabus Backend',
          description: 'Sistema de gestión de cursos online con autenticación y administración completa',
          technologies: ['Node.js', 'Express', 'PostgreSQL', 'JWT'],
          github_url: 'https://github.com/cristhoper/syllabus-backend',
          demo_url: 'https://syllabus-demo.com',
          category: 'backend',
          featured: true
        },
        {
          id: 2,
          title: 'Museo Interactivo Jipijapa',
          description: 'Experiencia 3D y Realidad Aumentada para museo virtual',
          technologies: ['Three.js', 'React', 'WebXR', 'Blender'],
          github_url: 'https://github.com/cristhoper/museo-jipijapa',
          demo_url: 'https://museo-jipijapa.com',
          category: 'web',
          featured: true
        },
        {
          id: 3,
          title: 'ExactApp',
          description: 'Sistema de gestión de cursos vacacionales con reservas y pagos',
          technologies: ['Laravel', 'MySQL', 'Bootstrap', 'Stripe'],
          github_url: 'https://github.com/cristhoper/exactapp',
          demo_url: 'https://exactapp.com',
          category: 'web',
          featured: true
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { id: 'all', name: 'Todos', color: 'bg-gray-500' },
    { id: 'web', name: 'Web', color: 'bg-pastel-blue' },
    { id: 'backend', name: 'Backend', color: 'bg-pastel-green' },
    { id: 'mobile', name: 'Mobile', color: 'bg-pastel-purple' }
  ];

  const filteredProjects = projects.filter(project => 
    filter === 'all' || project.category === filter
  );

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
      <section id="projects" className="section-padding">
        <div className="container-custom">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pastel-blue mx-auto"></div>
            <p className="mt-4 text-gray-600">Cargando proyectos...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="section-padding bg-white">
      <div className="container-custom px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-dark-gray mb-3 sm:mb-4 md:mb-6">
            Proyectos <span className="text-gradient">Destacados</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Una selección de mis mejores trabajos, desde aplicaciones web hasta sistemas complejos
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8 md:mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(category.id)}
              className={`px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-full font-medium transition-all duration-300 text-xs sm:text-sm md:text-base ${
                filter === category.id
                  ? `${category.color} text-white shadow-lg`
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              className="card group cursor-pointer"
            >
              {/* Project Image */}
              <div className="relative overflow-hidden rounded-t-xl">
                {project.image_url ? (
                  <img
                    src={`http://localhost:5000${project.image_url}`}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div 
                  className={`w-full h-48 bg-gradient-to-br from-pastel-blue to-pastel-green flex items-center justify-center ${project.image_url ? 'hidden' : 'flex'}`}
                >
                  <FaCode className="text-white text-4xl" />
                </div>
                
                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-4 right-4 bg-pastel-orange text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                    <FaStar className="text-xs" />
                    <span>Destacado</span>
                  </div>
                )}
              </div>

              {/* Project Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-dark-gray group-hover:text-pastel-blue transition-colors duration-300">
                    {project.title}
                  </h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    project.category === 'web' ? 'bg-pastel-blue text-white' :
                    project.category === 'backend' ? 'bg-pastel-green text-white' :
                    project.category === 'mobile' ? 'bg-pastel-purple text-white' :
                    'bg-gray-500 text-white'
                  }`}>
                    {project.category}
                  </span>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.slice(0, 3).map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  {project.github_url && (
                    <motion.a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2"
                    >
                      <FaGithub />
                      <span>GitHub</span>
                    </motion.a>
                  )}
                  
                  {project.demo_url && (
                    <motion.a
                      href={project.demo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 bg-pastel-blue hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2"
                    >
                      <FaExternalLinkAlt />
                      <span>Demo</span>
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-primary text-lg px-8 py-4"
          >
            ¿Tienes un proyecto en mente? ¡Hablemos!
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
