import { useState, useRef, useEffect } from 'react';
import './index.css';
import Window from './components/Window';
import Blog from './components/Blog';
import Documentos from './components/Documentos';
import Navegador from './components/Navegador';
import Contacto from './components/Contacto';
import { Camera } from 'lucide-react';

// Import icons
import iconNavegador from './assets/icon_navegador.png';
import iconBlog from './assets/icon_blog.png';
import iconVideos from './assets/icon_videos.png';
import iconDocumentos from './assets/icon_documentos.png';
import iconPapelera from './assets/icon_papelera.png';
import iconSistema from './assets/icon_sistema.png';

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const videoRef = useRef(null);
  
  const [openWindows, setOpenWindows] = useState([]);

  useEffect(() => {
    if (hasInteracted && videoRef.current) {
      videoRef.current.play().catch(e => console.error("Error playing video:", e));
    }
  }, [hasInteracted]);

  const handleVideoEnd = () => setShowIntro(false);
  const startIntro = () => setHasInteracted(true);
  const openLink = (url) => window.open(url, '_blank');

  const openWindow = (id, title, Component, props = {}) => {
    if (!openWindows.find(w => w.id === id)) {
      setOpenWindows([...openWindows, { id, title, Component, props }]);
    }
  };

  const closeWindow = (id) => {
    setOpenWindows(openWindows.filter(w => w.id !== id));
  };

  if (showIntro) {
    if (!hasInteracted) {
      return (
        <div className="intro-video-container" style={{ flexDirection: 'column', gap: '20px', backgroundColor: '#008080' }}>
          <Window title="Sistema Boot" onClose={() => {}} style={{ position: 'relative' }}>
            <div style={{ textAlign: 'center' }}>
              <p>Presiona el botón para encender el sistema.</p>
              <button onClick={startIntro}>Encender</button>
            </div>
          </Window>
        </div>
      );
    }

    return (
      <div className="intro-video-container" onClick={handleVideoEnd}>
        <video 
          ref={videoRef}
          className="intro-video" 
          src={`${import.meta.env.BASE_URL}intro.webm`} 
          onEnded={handleVideoEnd}
        />
      </div>
    );
  }

  return (
    <div className="desktop">
      <div className="desktop-icons">
        <div className="desktop-icon" onDoubleClick={() => openLink('https://patreon.com/cgpc')}>
          <img src={iconSistema} alt="Sistema" /><span>Sistema</span>
        </div>
        <div className="desktop-icon" onDoubleClick={() => openWindow('papelera', 'Papelera', () => <div>La papelera está vacía. (¡O no!)</div>)}>
          <img src={iconPapelera} alt="Papelera" /><span>Papelera</span>
        </div>
        <div className="desktop-icon" onDoubleClick={() => openLink('https://www.youtube.com/@cgpc')}>
          <img src={iconVideos} alt="Videos" /><span>Videos</span>
        </div>
        <div className="desktop-icon" onDoubleClick={() => openLink('https://www.instagram.com/realcgpc')}>
          <div style={{ width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#c0c0c0', border: '2px outset #dfdfdf', margin: '0 auto 4px auto' }}>
            <Camera size={32} />
          </div>
          <span>Fotos</span>
        </div>
        <div className="desktop-icon" onDoubleClick={() => openWindow('documentos', 'Documentos', Documentos)}>
          <img src={iconDocumentos} alt="Documentos" /><span>Documentos</span>
        </div>
        <div className="desktop-icon" onDoubleClick={() => openWindow('navegador', 'Navegador Web', Navegador, { initialView: 'sobre-mi' })}>
          <img src={iconNavegador} alt="Navegador" /><span>Navegador</span>
        </div>
        <div className="desktop-icon" onDoubleClick={() => openWindow('blog', 'Blog de CGPC', Navegador, { initialView: 'archivos' })}>
          <img src={iconBlog} alt="Blog" /><span>Blog</span>
        </div>
      </div>

      {openWindows.map((win, idx) => (
        <Window 
          key={win.id} 
          title={win.title} 
          onClose={() => closeWindow(win.id)}
          style={{ top: `${15 + (idx * 5)}%`, left: `${25 + (idx * 5)}%`, width: '800px', height: '600px' }}
        >
          <win.Component {...win.props} />
        </Window>
      ))}

      {/* Taskbar */}
      <div className="window" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '35px', margin: 0, zIndex: 9999, display: 'flex', alignItems: 'center', padding: '2px 4px', borderRadius: 0, borderRight: 'none', borderBottom: 'none', borderLeft: 'none' }}>
        <button style={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px', height: '100%', padding: '0 8px' }}>
          <img src={iconSistema} alt="Start" style={{ width: 16, height: 16 }} />
          Inicio
        </button>
        <div style={{ flexGrow: 1, display: 'flex', gap: '4px', marginLeft: '10px', height: '100%' }}>
          {openWindows.map(win => (
            <button key={win.id} style={{ fontWeight: 'bold', height: '100%', minWidth: '120px', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', paddingLeft: '8px', boxShadow: 'inset -1px -1px #0a0a0a, inset 1px 1px #fff, inset -2px -2px #dfdfdf, inset 2px 2px #fff' }}>
              {win.title}
            </button>
          ))}
        </div>
        <div className="status-bar-field" style={{ margin: 0, padding: '2px 10px', height: '100%', display: 'flex', alignItems: 'center' }}>
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
}

export default App;
