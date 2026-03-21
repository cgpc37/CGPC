import React from 'react';
import heroImage from '../assets/profile/sobre_mi_main.png';

const SobreMi = () => {
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

        {/* Content Area */}
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
              CGPC EMPLEADO DEL MES<br/>
              <span style={{ fontSize: '24px', opacity: 0.7 }}>(UNICO EMPLEADO)</span>
            </h1>
            <div style={{ 
              marginTop: '16px', 
              display: 'flex', 
              gap: '12px',
              flexWrap: 'wrap'
            }}>
              {['DESIGNER', 'COLLECTOR', 'OBSERVER'].map(badge => (
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
            lineHeight: '1.8', 
            fontSize: '18px', 
            color: '#2E3334',
            opacity: 0.9,
            maxWidth: '500px'
          }}>
            <p style={{ marginBottom: '24px' }}>
              Escribiendo historia y creando videos dentro de una relacion de aspecto 4:3 en una sociedad de 16:9 o peor aun, 9:16.
            </p>
            <p>
              Este es mi cv personal, por favor de no ver a menos que tenga certeza de una oferta laboral, de ser asi, con mucho gusto, adelante, observe, sacie su deleite visual con las maravillas que vera aqui.
            </p>
          </div>

          <div style={{ marginTop: '40px', display: 'flex', gap: '24px' }}>
            <div style={{ borderLeft: '1px solid #AEB3B4', paddingLeft: '16px' }}>
              <div style={{ fontSize: '10px', color: '#5B6061' }}>STATUS</div>
              <div style={{ fontSize: '14px', fontWeight: 700 }}>ACTIVE_RESEARCH</div>
            </div>
            <div style={{ borderLeft: '1px solid #AEB3B4', paddingLeft: '16px' }}>
              <div style={{ fontSize: '10px', color: '#5B6061' }}>LOCATION</div>
              <div style={{ fontSize: '14px', fontWeight: 700 }}>DIGITAL_VOID</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SobreMi;
