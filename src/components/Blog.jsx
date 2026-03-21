import React, { useState } from 'react';
import blogData from '../assets/blogData.json';
import BrowserChrome from './BrowserChrome';

const Blog = () => {
  const [selectedArticleId, setSelectedArticleId] = useState(null);
  const [filterCategory, setFilterCategory] = useState('All');

  // Derive unique categories
  const categories = ['All', ...new Set(blogData.map(a => a.category))];
  
  const filteredArticles = blogData.filter(a => filterCategory === 'All' || a.category === filterCategory);
  
  const selectedArticle = blogData.find(a => a.id === selectedArticleId);

  return (
    <BrowserChrome url="http://www.cgpc.com/blog">
      <div style={{ display: 'flex', height: '100%', minHeight: '400px', flexDirection: 'row', gap: '10px', padding: '10px', boxSizing: 'border-box' }}>
      
      {/* Sidebar */}
      <div style={{ width: '200px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <fieldset>
          <legend>Categoría</legend>
          <select 
            value={filterCategory} 
            onChange={e => setFilterCategory(e.target.value)} 
            style={{ width: '100%' }}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </fieldset>
        
        <div className="sunken-panel" style={{ flexGrow: 1, padding: '4px', overflowY: 'auto' }}>
          <ul className="tree-view" style={{ border: 'none', background: 'transparent' }}>
            {filteredArticles.map(article => (
              <li key={article.id} onClick={() => setSelectedArticleId(article.id)} style={{ cursor: 'pointer', fontWeight: selectedArticleId === article.id ? 'bold' : 'normal' }}>
                {article.title}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="sunken-panel" style={{ flexGrow: 1, padding: '10px', overflowY: 'auto', backgroundColor: '#fff' }}>
        {selectedArticle ? (
          <div>
            <h2 style={{ marginTop: 0 }}>{selectedArticle.title}</h2>
            <div style={{ color: '#888', fontSize: '11px', marginBottom: '10px' }}>
              Categoría: <strong>{selectedArticle.category}</strong> | Estado: {selectedArticle.state}
            </div>
            
            {selectedArticle.targetImage && (
              <div style={{ marginBottom: '15px', textAlign: 'center' }}>
                <img src={selectedArticle.targetImage} alt="Cover" style={{ maxWidth: '100%', maxHeight: '300px', border: '1px solid #ccc' }} />
              </div>
            )}

            {/* Basic split by lines for paragraphs */}
            {selectedArticle.content.split('\n\n').map((p, i) => (
              <p key={i} style={{ fontSize: '14px', lineHeight: '1.5' }}>{p}</p>
            ))}
          </div>
        ) : (
          <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
            Selecciona un artículo en el panel izquierdo para leer.
          </div>
        )}
      </div>

    </div>
    </BrowserChrome>
  );
};

export default Blog;
