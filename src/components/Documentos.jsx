import React from 'react';

const Documentos = () => {
  const mockDocs = [
    { title: 'Revista #1', type: 'Revista' },
    { title: 'Comic: El Regreso', type: 'Comic' },
    { title: 'Revista #2 (WIP)', type: 'Revista' },
  ];

  return (
    <div style={{ padding: '10px', height: '300px', display: 'flex', flexDirection: 'column' }}>
      <p>Librería de Documentos, Revistas y Cómics:</p>
      <div className="sunken-panel" style={{ flexGrow: 1, padding: '10px', backgroundColor: '#fff', overflowY: 'auto' }}>
        <ul className="tree-view" style={{ border: 'none', background: 'transparent' }}>
          {mockDocs.map((doc, idx) => (
            <li key={idx} style={{ marginBottom: '5px' }}>
              <strong>{doc.title}</strong> - <span style={{ color: '#666' }}>{doc.type}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Documentos;
