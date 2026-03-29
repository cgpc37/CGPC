import React, { useState, useEffect, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import HTMLFlipBook from 'react-pageflip';
import docsData from '../assets/docsData.json';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const PageWrapper = React.forwardRef(({ pageNumber }, ref) => {
  return (
    <div ref={ref} className="page-wrapper" style={{ backgroundColor: '#fff', boxShadow: 'inset 0 0 10px rgba(0,0,0,0.1)' }}>
      <Page 
        pageNumber={pageNumber} 
        width={350} 
        renderTextLayer={false}
        renderAnnotationLayer={false}
      />
    </div>
  );
});

const Documentos = () => {
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const bookRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedDoc && numPages && bookRef.current) {
        if (e.key === 'ArrowRight') {
          bookRef.current.pageFlip().flipNext();
        } else if (e.key === 'ArrowLeft') {
          bookRef.current.pageFlip().flipPrev();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedDoc, numPages]);

  const revistas = docsData.filter(d => d.category === 'Revista');
  const comics = docsData.filter(d => d.category === 'Comic');

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const handleDocClick = (doc) => {
    setSelectedDoc(doc);
    setNumPages(null);
    setCurrentPage(0);
  };

  const closeDoc = () => {
    setSelectedDoc(null);
    setCurrentPage(0);
  };

  const onFlip = (e) => {
    setCurrentPage(e.data);
  };

  return (
    <div style={{ display: 'flex', height: '100%', backgroundColor: '#FAF9F9', fontFamily: '"Work Sans", sans-serif' }}>
      
      {/* Left Sidebar */}
      <div style={{ width: '220px', borderRight: '1px solid #AEB3B4', backgroundColor: '#FFFFFF', overflowY: 'auto' }}>
        <div style={{ padding: '15px' }}>
          <h3 style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#5B6061', textTransform: 'uppercase' }}>Documentos</h3>
          
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ margin: '0 0 5px 0', fontSize: '12px', color: '#2E3334' }}>Revistas</h4>
            <ul className="tree-view" style={{ border: 'none', background: 'transparent', paddingLeft: 0, margin: 0 }}>
              {revistas.map(doc => (
                <li key={doc.id} style={{ cursor: 'pointer', marginBottom: '4px', fontSize: '12px', textDecoration: selectedDoc?.id === doc.id ? 'underline' : 'none' }} onClick={() => handleDocClick(doc)}>
                  {doc.title}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={{ margin: '0 0 5px 0', fontSize: '12px', color: '#2E3334' }}>Cómics</h4>
            <ul className="tree-view" style={{ border: 'none', background: 'transparent', paddingLeft: 0, margin: 0 }}>
              {comics.map(doc => (
                <li key={doc.id} style={{ cursor: 'pointer', marginBottom: '4px', fontSize: '12px', textDecoration: selectedDoc?.id === doc.id ? 'underline' : 'none' }} onClick={() => handleDocClick(doc)}>
                  {doc.title}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Main Area */}
      <div style={{ flex: 1, padding: '20px', overflowY: 'auto', backgroundColor: '#EBEBEB', display: 'flex', flexDirection: 'column' }}>
        
        {selectedDoc ? (
          <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
            {/* Viewer Center Panel */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                <button onClick={closeDoc}>← Volver a Biblioteca</button>
                <h2 style={{ margin: 0, fontSize: '18px' }}>{selectedDoc.title}</h2>
                {selectedDoc.downloadUrl ? (
                  <button onClick={() => window.open(selectedDoc.downloadUrl, '_blank')}>Descargar (Patreon)</button>
                ) : <div style={{width: '100px'}}></div>}
              </div>
              
              <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', overflow: 'hidden' }}>
                {selectedDoc.fileUrl ? (
                  <Document 
                    file={selectedDoc.fileUrl} 
                    onLoadSuccess={onDocumentLoadSuccess}
                    loading={<div style={{ padding: '20px' }}>Cargando PDF...</div>}
                  >
                    {numPages && (
                      <HTMLFlipBook 
                        width={350} 
                        height={495} 
                        size="fixed"
                        minWidth={315}
                        maxWidth={400}
                        minHeight={400}
                        maxHeight={600}
                        maxShadowOpacity={0.5}
                        showCover={true}
                        mobileScrollSupport={true}
                        usePortrait={false}
                        className="flip-book"
                        ref={bookRef}
                        onFlip={onFlip}
                      >
                        {Array.from(new Array(numPages), (el, index) => (
                          <PageWrapper key={`page_${index + 1}`} pageNumber={index + 1} />
                        ))}
                      </HTMLFlipBook>
                    )}
                  </Document>
                ) : (
                  <div style={{ textAlign: 'center' }}>
                    <p>Este documento no tiene visualización en PDF disponible.</p>
                    {selectedDoc.coverImage && (
                      <img src={selectedDoc.coverImage} alt={selectedDoc.title} style={{ maxWidth: '300px', border: '1px solid #000' }} />
                    )}
                  </div>
                )}
              </div>
              {numPages && <div style={{ marginTop: '15px', color: '#555', fontSize: '12px' }}>Haz clic, usa las flechas del teclado, o arrastra las esquinas para pasar de página</div>}
            </div>
            
            {/* Right Navigation Panel */}
            {numPages && (
              <div style={{ width: '150px', marginLeft: '20px', borderLeft: '2px solid #AEB3B4', paddingLeft: '15px', overflowY: 'auto' }}>
                <h4 style={{ margin: '0 0 10px 0', fontSize: '12px', color: '#2E3334' }}>Navegación</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {Array.from(new Array(numPages), (el, index) => {
                    const isCurrent = currentPage === index || (currentPage > 0 && index === currentPage + 1);
                    return (
                      <li 
                        key={index}
                        style={{ 
                          cursor: 'pointer', 
                          marginBottom: '6px', 
                          fontSize: '12px', 
                          textDecoration: isCurrent ? 'underline' : 'none', 
                          color: isCurrent ? '#4B53BC' : '#2E3334', 
                          fontWeight: isCurrent ? 'bold' : 'normal' 
                        }}
                        onClick={() => {
                          if (bookRef.current) {
                            bookRef.current.pageFlip().turnToPage(index);
                          }
                        }}
                      >
                        Página {index + 1}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        ) : (
          <div>
            <h2 style={{ margin: '0 0 20px 0', fontSize: '24px', borderBottom: '2px solid #AEB3B4', paddingBottom: '10px' }}>Librería Central</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '20px' }}>
              
              {docsData.map(doc => (
                <div 
                  key={doc.id} 
                  onClick={() => handleDocClick(doc)}
                  style={{ 
                    cursor: 'pointer', 
                    padding: '10px', 
                    backgroundColor: '#FFF', 
                    border: '1px solid #AEB3B4', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    boxShadow: '2px 2px 5px rgba(0,0,0,0.1)',
                    transition: 'transform 0.1s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  {doc.coverImage ? (
                    <img src={doc.coverImage} alt={doc.title} style={{ width: '100%', height: '220px', objectFit: 'cover', border: '1px solid #EEE' }} />
                  ) : (
                    <div style={{ width: '100%', height: '220px', backgroundColor: '#EEE', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #CCC' }}>Sin Portada</div>
                  )}
                  <h3 style={{ fontSize: '14px', margin: '10px 0 5px 0', textAlign: 'center', height: '35px', overflow: 'hidden' }}>{doc.title}</h3>
                  <span style={{ fontSize: '10px', color: '#888', textTransform: 'uppercase' }}>{doc.category}</span>
                </div>
              ))}

            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Documentos;
