import React from 'react';

const BlogPost = ({ article, onBack }) => {
  if (!article) return null;

  return (
    <div style={{ 
      padding: '40px', 
      backgroundColor: '#FFFFFF', 
      minHeight: '100%',
      fontFamily: '"Work Sans", sans-serif'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <button 
          onClick={onBack} 
          style={{ 
            marginBottom: '40px', 
            cursor: 'pointer', 
            padding: '8px 16px', 
            fontFamily: '"Space Grotesk", sans-serif',
            backgroundColor: 'transparent',
            border: '1px solid #2E3334',
            fontWeight: 700,
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#2E3334';
            e.currentTarget.style.color = '#FFFFFF';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#2E3334';
          }}
        >
          ← VOLVER_A_ARCHIVOS
        </button>
        
        <div style={{ position: 'relative' }}>
          {/* Stacked Paper Effect Back */}
          <div style={{ 
            position: 'absolute', 
            top: '10px', 
            left: '10px', 
            right: '-10px', 
            bottom: '-10px', 
            border: '1px solid #AEB3B4',
            zIndex: 0
          }} />

          {/* Main Content Card */}
          <div style={{ 
            position: 'relative',
            backgroundColor: '#FFFFFF', 
            border: '1px solid #2E3334', 
            padding: '60px',
            zIndex: 1
          }}>
            <div style={{ 
              fontSize: '12px', 
              fontWeight: 700, 
              color: '#4B53BC', 
              marginBottom: '20px',
              textTransform: 'uppercase',
              letterSpacing: '2px'
            }}>
              [{article.category}] // ESTADO: {article.state}
            </div>

            <h1 style={{ 
              marginTop: 0, 
              fontSize: '64px', 
              marginBottom: '40px', 
              fontFamily: '"Space Grotesk", sans-serif',
              fontWeight: 700,
              lineHeight: 1,
              letterSpacing: '-2px'
            }}>
              {article.title}
            </h1>
            
            {article.targetImage && (
              <div style={{ marginBottom: '60px', border: '1px solid #AEB3B4' }}>
                <img 
                  src={article.targetImage} 
                  alt={article.title} 
                  style={{ width: '100%', maxHeight: '500px', objectFit: 'cover' }} 
                />
              </div>
            )}
            
            <div style={{ 
              lineHeight: '1.8', 
              fontSize: '18px', 
              color: '#2E3334',
              maxWidth: '650px'
            }}>
              {article.content.split('\n\n').map((para, idx) => (
                <p key={idx} style={{ marginBottom: '24px' }}>{para}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
