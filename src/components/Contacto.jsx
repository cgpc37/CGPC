import React from 'react';
import heroImage from '../assets/profile/sobre_mi_main.png';

const Contacto = () => {
  return (
    <div style={{ 
      padding: '60px 40px', 
      backgroundColor: '#FFFFFF', 
      minHeight: '100%',
      fontFamily: '"Work Sans", sans-serif'
    }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', gap: '60px', alignItems: 'center', flexWrap: 'wrap' }}>
        
        {/* Profile Image with Stacked Paper Effect */}
        <div style={{ position: 'relative', width: '300px', height: '300px' }}>
          <div style={{ 
            position: 'absolute', 
            top: '15px', 
            left: '15px', 
            right: '-15px', 
            bottom: '-15px', 
            border: '1px solid #AEB3B4',
            zIndex: 0
          }} />
          <div style={{ 
            position: 'relative',
            width: '100%', 
            height: '100%', 
            backgroundColor: '#FAF9F9', 
            border: '2px solid #2E3334', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            overflow: 'hidden',
            zIndex: 1
          }}>
            <img src={heroImage} alt="Christian CGPC" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>

        {/* Content Area - Formulario */}
        <div style={{ flex: 1, minWidth: '300px' }}>
          <div style={{ marginBottom: '32px' }}>
            <h1 style={{ 
              fontSize: '48px', 
              margin: 0, 
              fontFamily: '"Space Grotesk", sans-serif',
              fontWeight: 700,
              lineHeight: 1,
              letterSpacing: '-1px',
              textTransform: 'uppercase',
              color: '#2E3334'
            }}>
              PONTE EN<br/>
              <span style={{ fontSize: '48px', opacity: 1, color: '#4B53BC' }}>CONTACTO</span>
            </h1>
            <div style={{ 
              marginTop: '16px', 
              display: 'flex', 
              gap: '12px',
              flexWrap: 'wrap'
            }}>
              {['BUSINESS', 'COLLAB', 'INQUIRIES'].map(badge => (
                <div key={badge} style={{ 
                  fontSize: '12px', 
                  fontWeight: 700, 
                  color: '#4B53BC',
                  letterSpacing: '2px',
                  border: '1px solid #4B53BC',
                  padding: '2px 8px',
                  borderRadius: '2px'
                }}>
                  {badge}
                </div>
              ))}
            </div>
          </div>

          <div style={{ 
            width: '100%',
            backgroundColor: '#FAF9F9',
            border: '1px solid #AEB3B4',
            padding: '10px'
          }}>
             <iframe src="https://cgpc.notion.site/ebd//331a17b597bf80b19df0c8c956930137" width="100%" height="600" frameBorder="0" allowFullScreen /> 
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contacto;
