import React from 'react'

const Footer = () => {
  return (
    <footer className={`grid grid-cols-1 justify-items-center mt-12 pt-6 pb-6 md:grid-cols-3 md:justify-items-center text-white bg-black relative z-50`}>
    <div className='text-center mb-4 '>
      <h3 className='font-bold'>Equipo de desarrollo</h3>
      <p>Gonzalo Errandonea</p>
      <p>Gonzalo Romero</p>
      <hr className='mt-2 mb-2'/>
      <h3 className='font-bold'>Diseño</h3>
      <p>Tomas Alaluf</p>
      <p>Gabriel Ramos</p>
      <hr className='mt-2 mb-2'/>
      <h3 className='font-bold'>Test</h3>
      <p>Alexis Brunetti</p>
      <p>Tomas Alaluf</p>
    </div>
    <div className='text-center mb-4'>
      <h3 className='font-bold'>Enlaces Útiles</h3>
      <p>Sobre nosotros</p>
      <p>Politicas de uso</p>
      <p>Haz un reclamo</p>
      <p>Contactate con nosotros</p>
    </div>
    <div className='text-center mb-6'>
      <h3 className='font-bold'>Información de Contacto</h3>
        <p><strong> Email:</strong> tucan@example.com</p>
        <p><strong> Direccion:</strong> siempreviva 123</p>
        <p><strong> Teléfono:</strong> 11-6666666</p>
    </div>
  </footer>
  )
}

export default Footer