import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaEye, 
  FaEyeSlash, 
  FaCheck, 
  FaTimes,
  FaComments,
  FaProjectDiagram,
  FaSignOutAlt,
  FaUpload,
  FaSave,
  FaTimes as FaClose
} from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import api from '../../config/api';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('projects');
  const [projects, setProjects] = useState([]);
  const [comments, setComments] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: '',
    github_url: '',
    demo_url: '',
    category: 'web',
    featured: false,
    image: null
  });
  const [categoryFormData, setCategoryFormData] = useState({
    name: '',
    color: '#7FB3D5',
    description: ''
  });

  useEffect(() => {
    if (!user) {
      navigate('/admin/login');
      return;
    }
    fetchData();
  }, [user, navigate]);

  const fetchData = async () => {
    try {
      const [projectsRes, commentsRes, categoriesRes] = await Promise.all([
        api.get('/api/projects'),
        api.get('/api/comments/admin'),
        api.get('/api/categories')
      ]);
      setProjects(projectsRes.data);
      setComments(commentsRes.data);
      setCategories(categoriesRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Error al cargar los datos');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
    toast.success('Sesión cerrada correctamente');
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const projectData = new FormData();
      projectData.append('title', formData.title);
      projectData.append('description', formData.description);
      projectData.append('technologies', JSON.stringify(formData.technologies.split(',').map(t => t.trim()).filter(t => t)));
      projectData.append('github_url', formData.github_url);
      projectData.append('demo_url', formData.demo_url);
      projectData.append('category', formData.category);
      projectData.append('featured', formData.featured);
      
      if (formData.image) {
        projectData.append('image', formData.image);
      }
      
      if (editingProject) {
        await api.put(`/api/projects/${editingProject.id}`, projectData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        toast.success('Proyecto actualizado correctamente');
      } else {
        await api.post('/api/projects', projectData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        toast.success('Proyecto creado correctamente');
      }
      
      setShowModal(false);
      setEditingProject(null);
      setFormData({
        title: '',
        description: '',
        technologies: '',
        github_url: '',
        demo_url: '',
        category: 'web',
        featured: false,
        image: null
      });
      fetchData();
    } catch (error) {
      console.error('Error saving project:', error);
      toast.error('Error al guardar el proyecto');
    }
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      technologies: project.technologies.join(', '),
      github_url: project.github_url || '',
      demo_url: project.demo_url || '',
      category: project.category,
      featured: project.featured,
      image: null
    });
    setShowModal(true);
  };

  const handleDeleteProject = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este proyecto?')) {
      try {
        await api.delete(`/api/projects/${id}`);
        toast.success('Proyecto eliminado correctamente');
        fetchData();
      } catch (error) {
        console.error('Error deleting project:', error);
        toast.error('Error al eliminar el proyecto');
      }
    }
  };

  const handleCommentAction = async (id, action) => {
    try {
      await api.patch(`/api/comments/${id}/approve`, { approved: action === 'approve' });
      toast.success(action === 'approve' ? 'Comentario aprobado' : 'Comentario rechazado');
      fetchData();
    } catch (error) {
      console.error('Error processing comment:', error);
      toast.error('Error al procesar el comentario');
    }
  };

  const handleDeleteComment = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este comentario?')) {
      try {
        await api.delete(`/api/comments/${id}`);
        toast.success('Comentario eliminado correctamente');
        fetchData();
      } catch (error) {
        console.error('Error deleting comment:', error);
        toast.error('Error al eliminar el comentario');
      }
    }
  };

  // Funciones para gestión de categorías
  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingCategory) {
        await api.put(`/api/categories/${editingCategory.id}`, categoryFormData);
        toast.success('Categoría actualizada correctamente');
      } else {
        await api.post('/api/categories', categoryFormData);
        toast.success('Categoría creada correctamente');
      }
      
      setShowCategoryModal(false);
      setEditingCategory(null);
      setCategoryFormData({
        name: '',
        color: '#7FB3D5',
        description: ''
      });
      fetchData();
    } catch (error) {
      console.error('Error saving category:', error);
      toast.error('Error al guardar la categoría');
    }
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setCategoryFormData({
      name: category.name,
      color: category.color,
      description: category.description || ''
    });
    setShowCategoryModal(true);
  };

  const handleDeleteCategory = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta categoría?')) {
      try {
        await api.delete(`/api/categories/${id}`);
        toast.success('Categoría eliminada correctamente');
        fetchData();
      } catch (error) {
        console.error('Error deleting category:', error);
        toast.error('Error al eliminar la categoría');
      }
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pastel-blue mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando panel administrativo...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-pastel-blue to-pastel-green rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">CP</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-dark-gray">Panel Administrativo</h1>
                <p className="text-gray-600">Bienvenido, {user?.email}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <a
                href="/"
                className="text-gray-600 hover:text-pastel-blue transition-colors duration-300"
              >
                Ver Portafolio
              </a>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-red-600 hover:text-red-700 transition-colors duration-300"
              >
                <FaSignOutAlt />
                <span>Cerrar Sesión</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-8">
          {[
            { id: 'projects', name: 'Proyectos', icon: FaProjectDiagram },
            { id: 'comments', name: 'Comentarios', icon: FaComments },
            { id: 'categories', name: 'Categorías', icon: FaCheck }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-white text-pastel-blue shadow-md'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <tab.icon />
              <span>{tab.name}</span>
            </button>
          ))}
        </div>

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-dark-gray">Gestión de Proyectos</h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setEditingProject(null);
                  setFormData({
                    title: '',
                    description: '',
                    technologies: '',
                    github_url: '',
                    demo_url: '',
                    category: 'web',
                    featured: false,
                    image: null
                  });
                  setShowModal(true);
                }}
                className="bg-pastel-blue hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-300"
              >
                <FaPlus />
                <span>Nuevo Proyecto</span>
              </motion.button>
            </div>

            <div className="grid gap-6">
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-lg shadow-md p-6"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-semibold text-dark-gray">{project.title}</h3>
                        {project.featured && (
                          <span className="bg-pastel-orange text-white px-2 py-1 rounded-full text-xs">
                            Destacado
                          </span>
                        )}
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          project.category === 'web' ? 'bg-pastel-blue text-white' :
                          project.category === 'backend' ? 'bg-pastel-green text-white' :
                          'bg-pastel-purple text-white'
                        }`}>
                          {project.category}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-3">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, index) => (
                          <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex space-x-2 ml-4">
                      <button
                        onClick={() => handleEditProject(project)}
                        className="p-2 text-pastel-blue hover:bg-blue-50 rounded-lg transition-colors duration-300"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteProject(project.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-300"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Comments Tab */}
        {activeTab === 'comments' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-dark-gray mb-6">Gestión de Comentarios</h2>
            
            <div className="grid gap-4">
              {comments.map((comment) => (
                <motion.div
                  key={comment.id}
                  whileHover={{ scale: 1.01 }}
                  className="bg-white rounded-lg shadow-md p-6"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-semibold text-dark-gray">{comment.author_name}</h4>
                        <span className="text-gray-500 text-sm">{comment.author_email}</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          comment.approved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {comment.approved ? 'Aprobado' : 'Pendiente'}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-2">{comment.content}</p>
                      <p className="text-sm text-gray-500">Proyecto: {comment.project_title}</p>
                      {comment.rating && (
                        <div className="flex items-center space-x-1 mt-2">
                          <span className="text-sm text-gray-600">Calificación:</span>
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={`text-sm ${
                              i < comment.rating ? 'text-pastel-orange' : 'text-gray-300'
                            }`}>★</span>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex space-x-2 ml-4">
                      {!comment.approved && (
                        <button
                          onClick={() => handleCommentAction(comment.id, 'approve')}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-300"
                        >
                          <FaCheck />
                        </button>
                      )}
                      <button
                        onClick={() => handleCommentAction(comment.id, 'reject')}
                        className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors duration-300"
                      >
                        <FaTimes />
                      </button>
                      <button
                        onClick={() => handleDeleteComment(comment.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-300"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Categories Tab */}
        {activeTab === 'categories' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-dark-gray">Gestión de Categorías</h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setEditingCategory(null);
                  setCategoryFormData({
                    name: '',
                    color: '#7FB3D5',
                    description: ''
                  });
                  setShowCategoryModal(true);
                }}
                className="bg-pastel-green hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-300"
              >
                <FaPlus />
                <span>Nueva Categoría</span>
              </motion.button>
            </div>

            <div className="grid gap-6">
              {categories.map((category) => (
                <motion.div
                  key={category.id}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-lg shadow-md p-6"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <div 
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: category.color }}
                        ></div>
                        <h3 className="text-xl font-semibold text-dark-gray">{category.name}</h3>
                      </div>
                      {category.description && (
                        <p className="text-gray-600 mb-3">{category.description}</p>
                      )}
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>Color: {category.color}</span>
                        <span>Proyectos: {category.project_count || 0}</span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2 ml-4">
                      <button
                        onClick={() => handleEditCategory(category)}
                        className="p-2 text-pastel-blue hover:bg-blue-50 rounded-lg transition-colors duration-300"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(category.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-300"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Project Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-dark-gray">
                {editingProject ? 'Editar Proyecto' : 'Nuevo Proyecto'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-300"
              >
                <FaClose className="text-xl" />
              </button>
            </div>

            <form onSubmit={handleProjectSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Título
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pastel-blue focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Categoría
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pastel-blue focus:border-transparent"
                  >
                    <option value="web">Web</option>
                    <option value="backend">Backend</option>
                    <option value="mobile">Mobile</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descripción
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pastel-blue focus:border-transparent resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tecnologías (separadas por comas)
                </label>
                <input
                  type="text"
                  value={formData.technologies}
                  onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                  placeholder="React, Node.js, PostgreSQL"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pastel-blue focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Imagen del Proyecto
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-pastel-blue transition-colors duration-300">
                  <div className="space-y-1 text-center">
                    <FaUpload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="image-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-pastel-blue hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-pastel-blue"
                      >
                        <span>Subir una imagen</span>
                        <input
                          id="image-upload"
                          name="image-upload"
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                      </label>
                      <p className="pl-1">o arrastra y suelta</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF hasta 10MB
                    </p>
                    {formData.image && (
                      <p className="text-sm text-green-600 font-medium">
                        ✓ {formData.image.name}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    GitHub URL
                  </label>
                  <input
                    type="url"
                    value={formData.github_url}
                    onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pastel-blue focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Demo URL
                  </label>
                  <input
                    type="url"
                    value={formData.demo_url}
                    onChange={(e) => setFormData({ ...formData, demo_url: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pastel-blue focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4 text-pastel-blue border-gray-300 rounded focus:ring-pastel-blue"
                />
                <label htmlFor="featured" className="text-sm font-medium text-gray-700">
                  Proyecto destacado
                </label>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-300"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-pastel-blue hover:bg-blue-600 text-white rounded-lg transition-colors duration-300 flex items-center space-x-2"
                >
                  <FaSave />
                  <span>{editingProject ? 'Actualizar' : 'Crear'}</span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Category Modal */}
      {showCategoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-8 w-full max-w-md"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-dark-gray">
                {editingCategory ? 'Editar Categoría' : 'Nueva Categoría'}
              </h3>
              <button
                onClick={() => setShowCategoryModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-300"
              >
                <FaClose className="text-xl" />
              </button>
            </div>

            <form onSubmit={handleCategorySubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre de la categoría
                </label>
                <input
                  type="text"
                  value={categoryFormData.name}
                  onChange={(e) => setCategoryFormData({ ...categoryFormData, name: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pastel-blue focus:border-transparent"
                  placeholder="Ej: Web, Mobile, Backend"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Color
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    value={categoryFormData.color}
                    onChange={(e) => setCategoryFormData({ ...categoryFormData, color: e.target.value })}
                    className="w-12 h-12 border border-gray-300 rounded-lg cursor-pointer"
                  />
                  <input
                    type="text"
                    value={categoryFormData.color}
                    onChange={(e) => setCategoryFormData({ ...categoryFormData, color: e.target.value })}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pastel-blue focus:border-transparent"
                    placeholder="#7FB3D5"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descripción (opcional)
                </label>
                <textarea
                  value={categoryFormData.description}
                  onChange={(e) => setCategoryFormData({ ...categoryFormData, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pastel-blue focus:border-transparent resize-none"
                  placeholder="Descripción de la categoría..."
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowCategoryModal(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-300"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-pastel-green hover:bg-green-600 text-white rounded-lg transition-colors duration-300 flex items-center space-x-2"
                >
                  <FaSave />
                  <span>{editingCategory ? 'Actualizar' : 'Crear'}</span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
