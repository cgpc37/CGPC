import React, { useState, useEffect } from 'react';
import BrowserChrome from './BrowserChrome';
import SobreMi from './SobreMi';
import Archivos from './Archivos';
import BlogPost from './BlogPost';

// Import icons from assets
import iconSobreMi from '../assets/sidebar_icons/sobre_mi.svg';
import iconArchivos from '../assets/sidebar_icons/archivos.svg';
import iconEnlaces from '../assets/sidebar_icons/enlaces.svg';
import iconError from '../assets/sidebar_icons/error.svg';

const SidebarItem = ({ icon, label, isActive, onClick }) => (
  <div 
    onClick={onClick}
    style={{ 
      display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', 
      cursor: 'pointer',
      backgroundColor: isActive ? '#FFFFFF' : 'transparent',
      color: isActive ? '#2E3334' : '#2E3334',
      borderLeft: isActive ? '4px solid #4B53BC' : '4px solid transparent',
      transition: 'all 0.2s ease',
      opacity: isActive ? 1 : 0.7
    }}
  >
    <img src={icon} alt={label} style={{ width: '20px', height: '20px' }} />
    <span style={{ 
      fontSize: '14px', 
      fontFamily: '"Work Sans", sans-serif',
      textTransform: label === 'archivos' ? 'lowercase' : 'none'
    }}>{label}</span>
  </div>
);

const Navegador = ({ initialView = 'sobre-mi' }) => {
  const [currentView, setCurrentView] = useState(initialView);
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    setCurrentView(initialView);
  }, [initialView]);

  const navigateTo = (view) => {
    setCurrentView(view);
    if (view !== 'blog-post') {
      setSelectedArticle(null);
    }
  };

  const handleSelectPost = (article) => {
    setSelectedArticle(article);
    setCurrentView('blog-post');
  };

  let url = "http://www.cgpc.com";
  if (currentView === 'archivos') url += "/archivos";
  if (currentView === 'blog-post') url += `/post/${selectedArticle?.id}`;
  if (currentView === 'sobre-mi') url += "/sobre-mi";

  return (
    <BrowserChrome url={url}>
      <div style={{ display: 'flex', height: '100%', backgroundColor: '#FFFFFF', margin: 0 }}>
        {/* Sidebar Menu */}
        <div style={{ 
          width: '200px', 
          backgroundColor: '#FAF9F9', 
          borderRight: '1px solid #AEB3B4',
          display: 'flex', 
          flexDirection: 'column', 
          padding: '20px 0',
          flexShrink: 0
        }}>
          <div style={{ padding: '0 20px 20px 20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Profile Picture Container */}
            <div style={{ 
              width: '40px', 
              height: '40px', 
              borderRadius: '50%', 
              border: '1px solid #AEB3B4',
              overflow: 'hidden',
              flexShrink: 0,
              backgroundColor: '#D5DBDC'
            }}>
              <img 
                src="/CGPC/assets/profile/cgpc_profile.jpg" 
                alt="Profile" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            </div>

            <div>
              <h2 style={{ fontSize: '20px', margin: 0, fontFamily: '"Work Sans", sans-serif', fontWeight: 700 }}>cgpc</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                <div style={{ width: '8px', height: '8px', backgroundColor: '#31C845', borderRadius: '50%' }}></div>
                <span style={{ fontSize: '10px', color: '#31C845', fontWeight: 700, letterSpacing: '0.05em' }}>ONLINE</span>
              </div>
            </div>
          </div>

          <SidebarItem 
            icon={iconSobreMi}
            label="Sobre mi" 
            isActive={currentView === 'sobre-mi'} 
            onClick={() => navigateTo('sobre-mi')} 
          />
          <SidebarItem 
            icon={iconArchivos}
            label="archivos" 
            isActive={currentView === 'archivos' || currentView === 'blog-post'} 
            onClick={() => navigateTo('archivos')} 
          />
          <SidebarItem 
            icon={iconEnlaces}
            label="ENLACES" 
            isActive={false} 
            onClick={() => {}} 
          />
          <SidebarItem 
            icon={iconError}
            label="ERROR" 
            isActive={false} 
            onClick={() => {}} 
          />

          <div style={{ marginTop: 'auto', padding: '20px', backgroundColor: '#D5DBDC' }}>
            <pre style={{ fontSize: '9px', margin: 0, whiteSpace: 'pre-wrap', fontFamily: '"Work Sans", sans-serif', color: '#5B6061' }}>
              SYSTEM STATUS: STABLE{'\n'}
              MEM_LOAD: 42%{'\n'}
              LOCAL_TIME: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
            </pre>
          </div>
        </div>

        {/* Main Content Area */}
        <div style={{ flexGrow: 1, height: '100%', overflowY: 'auto', backgroundColor: '#FFFFFF' }}>
          {currentView === 'sobre-mi' && <SobreMi />}
          {currentView === 'archivos' && <Archivos onSelectPost={handleSelectPost} />}
          {currentView === 'blog-post' && <BlogPost article={selectedArticle} onBack={() => navigateTo('archivos')} />}
        </div>
      </div>
    </BrowserChrome>
  );
};

export default Navegador;
