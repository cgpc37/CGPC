import React from 'react';
import blogData from '../assets/blogData.json';

const Archivos = ({ onSelectPost }) => {
  const articlesDesc = [...blogData].reverse();

  return (
    <div style={{ 
      padding: '40px', 
      backgroundColor: '#FFFFFF', 
      minHeight: '100%',
      fontFamily: '"Work Sans", sans-serif'
    }}>
      <div style={{ marginBottom: '40px', borderLeft: '4px solid #4B53BC', paddingLeft: '20px' }}>
        <h1 style={{ 
          fontSize: '48px', 
          margin: 0, 
          fontFamily: '"Space Grotesk", sans-serif',
          fontWeight: 700,
          textTransform: 'lowercase',
          letterSpacing: '-1px'
        }}>archivos</h1>
        <p style={{ margin: '8px 0 0 0', color: '#5B6061', fontSize: '14px' }}>
          DOCUMENTOS_RECUPERADOS // INDICE_TOTAL
        </p>
      </div>

      <div style={{ display: 'flex', gap: '40px' }}>
        {/* Main Articles List */}
        <div style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: '40px' }}>
          {articlesDesc.map((article, index) => {
            const paragraphs = article.content.split('\n\n');
            const previewText = paragraphs.slice(0, 2).join(' ').substring(0, 200) + '...';
            
            return (
              <div 
                key={article.id} 
                style={{ 
                  position: 'relative',
                  cursor: 'pointer',
                  display: 'flex',
                  gap: '24px',
                  backgroundColor: '#FFFFFF',
                  padding: '12px',
                  border: '1px solid #2E3334',
                  boxShadow: '4px 4px 0px rgba(0,0,0,0.1)'
                }} 
                onClick={() => onSelectPost(article)}
              >
                {/* Image with Blue Overlay */}
                {article.targetImage && (
                  <div style={{ 
                    position: 'relative', 
                    width: '240px', 
                    height: '160px', 
                    flexShrink: 0,
                    border: '1px solid #2E3334',
                    overflow: 'hidden'
                  }}>
                    <img 
                      src={article.targetImage} 
                      alt={article.title} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                    {/* Blue Overlay / Shading */}
                    <div style={{ 
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: 'rgba(75, 83, 188, 0.25)',
                      mixBlendMode: 'multiply',
                      pointerEvents: 'none'
                    }} />
                    <div style={{ 
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '50%',
                      background: 'linear-gradient(to top, rgba(75, 83, 188, 0.4), transparent)',
                      pointerEvents: 'none'
                    }} />
                  </div>
                )}
  
                {/* Text Content */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ 
                    fontSize: '10px', 
                    fontWeight: 700, 
                    color: '#4B53BC', 
                    marginBottom: '8px',
                    textTransform: 'uppercase'
                  }}>
                    [{article.category}] // {article.state || 'PUBLISHED'}
                  </div>
                  
                  <h2 style={{ 
                    marginTop: 0, 
                    marginBottom: '12px', 
                    fontSize: '24px', 
                    fontFamily: '"Space Grotesk", sans-serif',
                    lineHeight: 1.1,
                    fontWeight: 700
                  }}>
                    {article.title}
                  </h2>
  
                  <p style={{ 
                    fontSize: '14px', 
                    margin: 0, 
                    color: '#2E3334', 
                    lineHeight: '1.6',
                    opacity: 0.8,
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical'
                  }}>
                    {previewText}
                  </p>
  
                  <div style={{ marginTop: 'auto', paddingTop: '16px' }}>
                    <span style={{ 
                      fontSize: '12px', 
                      fontWeight: 700, 
                      textDecoration: 'underline',
                      color: '#4B53BC'
                    }}>DECODE_LOG →</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Persistent Right Panel */}
        <div style={{ 
          width: '260px', 
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: '24px'
        }}>
          <div style={{ 
            backgroundColor: '#2E3334', 
            color: '#FFFFFF', 
            padding: '20px',
            border: '1px solid #2E3334'
          }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '14px', letterSpacing: '2px', color: '#FAF9F9' }}>
              CORRUPTED_FILES
            </h3>
            <p style={{ fontSize: '11px', lineHeight: '1.6', opacity: 0.8, marginBottom: '20px' }}>
              WARNING: THESE LOGS MAY CONTAIN BROKEN IMAGES OR OUTDATED CSS.
            </p>
            <button style={{ 
              width: '100%', 
              backgroundColor: 'transparent', 
              border: '1px solid #FAF9F9', 
              color: '#FAF9F9',
              padding: '8px',
              fontSize: '11px',
              fontWeight: 700,
              cursor: 'pointer'
            }}>
              ACCESS_HIDDEN_LOGS
            </button>
          </div>

          <div style={{ 
            border: '1px solid #AEB3B4',
            padding: '20px'
          }}>
            <div style={{ fontSize: '10px', color: '#5B6061', marginBottom: '8px' }}>SYSTEM_STATUS</div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#45C272' }}>● OPTIMAL</div>
            <div style={{ height: '1px', backgroundColor: '#AEB3B4', margin: '16px 0' }} />
            <div style={{ fontSize: '10px', color: '#5B6061', marginBottom: '8px' }}>BUFFER_CAPACITY</div>
            <div style={{ fontSize: '14px', fontWeight: 700 }}>64% :: ACTIVE</div>
          </div>
          
          <div style={{ 
            backgroundColor: '#45C272', 
            height: '100px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            color: '#FFFFFF',
            fontWeight: 700,
            fontSize: '12px'
          }}>
            88x31 BADGES
          </div>
        </div>
      </div>
    </div>
  );
};

export default Archivos;
