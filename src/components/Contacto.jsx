import React from 'react';

const Contacto = () => {
  return (
    <div style={{ padding: '10px', display: 'flex', flexDirection: 'column', gap: '10px', height: '300px' }}>
      <p>Please fill out the form below to contact me:</p>
      <div className="sunken-panel" style={{ flexGrow: 1, backgroundColor: 'white' }}>
        <p style={{ textAlign: 'center', marginTop: '40px', color: '#666' }}>
          [Notion Form Embed Placeholder]<br/><br/>
          (The actual form iframe will go here once the Notion Form URL is ready)
        </p>
      </div>
    </div>
  );
};

export default Contacto;
