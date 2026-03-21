import React from 'react';

// Import icons from assets
import iconBack from '../assets/browser_icons/back.svg';
import iconForward from '../assets/browser_icons/forward.svg';
import iconStop from '../assets/browser_icons/stop.svg';
import iconRefresh from '../assets/browser_icons/refresh.svg';
import iconHome from '../assets/browser_icons/home.svg';
import iconSearch from '../assets/browser_icons/search.svg';
import iconFavorites from '../assets/browser_icons/favorites.svg';
import iconPrint from '../assets/browser_icons/print.svg';

const ToolbarButton = ({ icon, label, disabled }) => (
  <button style={{ 
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center', 
    padding: '4px 8px', 
    minWidth: '55px',
    backgroundColor: 'transparent',
    border: 'none',
    opacity: disabled ? 0.3 : 1,
    cursor: disabled ? 'default' : 'pointer'
  }}>
    <img src={icon} alt={label} style={{ width: '16px', height: '16px', marginBottom: '2px' }} />
    <span style={{ fontSize: '10px', fontFamily: '"Work Sans", sans-serif' }}>{label}</span>
  </button>
);

const BrowserChrome = ({ url, children }) => {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100%', 
      backgroundColor: '#D5DBDC',
      color: '#2E3334',
      overflow: 'hidden'
    }}>
      {/* Menu Bar */}
      <div style={{ 
        display: 'flex', 
        gap: '16px', 
        padding: '2px 8px', 
        fontSize: '14px',
        fontFamily: '"Work Sans", sans-serif',
        borderBottom: '1px solid #AEB3B4'
      }}>
        <span style={{cursor: 'default'}}>File</span>
        <span style={{cursor: 'default'}}>Edit</span>
        <span style={{cursor: 'default'}}>View</span>
        <span style={{cursor: 'default'}}>Go</span>
        <span style={{cursor: 'default'}}>Favorites</span>
        <span style={{cursor: 'default'}}>Help</span>
      </div>

      {/* Toolbar */}
      <div style={{ 
        display: 'flex', 
        gap: '10px', 
        padding: '4px 8px', 
        alignItems: 'center',
        borderBottom: '1px solid #AEB3B4'
      }}>
        <div style={{ display: 'flex', borderRight: '1px solid #767C7C', paddingRight: '10px' }}>
          <ToolbarButton icon={iconBack} label="Back" />
          <ToolbarButton icon={iconForward} label="Forward" />
          <ToolbarButton icon={iconStop} label="Stop" />
          <ToolbarButton icon={iconRefresh} label="Refresh" />
          <ToolbarButton icon={iconHome} label="Home" />
        </div>
        
        <div style={{ display: 'flex', borderRight: '1px solid #767C7C', paddingRight: '10px' }}>
          <ToolbarButton icon={iconSearch} label="Search" />
          <ToolbarButton icon={iconFavorites} label="Favorites" />
        </div>

        <div style={{ display: 'flex' }}>
          <ToolbarButton icon={iconPrint} label="Print" />
        </div>
      </div>

      {/* Address Bar */}
      <div style={{ 
        display: 'flex', 
        gap: '8px', 
        padding: '4px 8px', 
        alignItems: 'center',
        borderBottom: '1px solid #AEB3B4'
      }}>
        <span style={{ fontSize: '14px', fontFamily: '"Work Sans", sans-serif' }}>Address:</span>
        <div style={{ 
          flexGrow: 1, 
          backgroundColor: '#FFFFFF', 
          border: '1.5px solid #767C7C', 
          padding: '4px 8px', 
          fontSize: '14px', 
          display: 'flex', 
          alignItems: 'center',
          fontFamily: '"Work Sans", sans-serif',
          boxShadow: 'inset 1.5px 1.5px 0px 0px rgba(0,0,0,0.1)'
        }}>
          <img src={iconHome} alt="icon" style={{ width: '12px', height: '12px', marginRight: '5px', opacity: 0.5 }} />
          {url}
        </div>
        <button style={{ 
          padding: '4px 12px', 
          backgroundColor: '#D5DBDC', 
          border: 'none',
          boxShadow: 'inset -1.5px -1.5px 0px 0px #767C7C, inset 1.5px 1.5px 0px 0px #FFFFFF',
          fontSize: '14px',
          fontWeight: 700,
          fontFamily: '"Work Sans", sans-serif'
        }}>
          Go
        </button>
      </div>

      {/* Page Content */}
      <div style={{ flexGrow: 1, overflow: 'auto', backgroundColor: '#FFFFFF', position: 'relative' }}>
        {children}
      </div>

      {/* Status Bar */}
      <div style={{ 
        height: '24px', 
        borderTop: '1px solid #AEB3B4', 
        display: 'flex', 
        alignItems: 'center', 
        padding: '0 8px',
        fontSize: '12px',
        fontFamily: '"Work Sans", sans-serif',
        gap: '10px'
      }}>
        <div style={{ flexGrow: 1 }}>Done</div>
        <div style={{ borderLeft: '1px solid #AEB3B4', padding: '0 8px' }}>Internet Zone</div>
        <div style={{ borderLeft: '1px solid #AEB3B4', padding: '0 8px' }}>100%</div>
      </div>
    </div>
  );
};

export default BrowserChrome;
