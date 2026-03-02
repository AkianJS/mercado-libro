import React from 'react'

const Footer = () => {
  return (
    <footer className={`grid grid-cols-1 justify-items-center mt-12 pt-8 pb-8 md:grid-cols-3 md:justify-items-center text-slate-300 bg-slate-900 dark:bg-slate-950 border-t border-slate-800 relative z-50 transition-colors duration-300`}>
    <div className='text-center mb-4'>
      <h3 className='font-semibold text-white mb-2'>Equipo de desarrollo</h3>
      <p className='text-slate-400'>Gonzalo Errandonea</p>
      <p className='text-slate-400'>Gonzalo Romero</p>
      <hr className='mt-3 mb-3 border-slate-700'/>
      <h3 className='font-semibold text-white mb-2'>Diseno</h3>
      <p className='text-slate-400'>Tomas Alaluf</p>
      <p className='text-slate-400'>Gabriel Ramos</p>
      <hr className='mt-3 mb-3 border-slate-700'/>
      <h3 className='font-semibold text-white mb-2'>Test</h3>
      <p className='text-slate-400'>Alexis Brunetti</p>
      <p className='text-slate-400'>Tomas Alaluf</p>
    </div>
    <div className='text-center mb-4'>
      <h3 className='font-semibold text-white mb-2'>Enlaces Utiles</h3>
      <p className='text-slate-400 hover:text-indigo-400 cursor-pointer transition-colors'>Sobre nosotros</p>
      <p className='text-slate-400 hover:text-indigo-400 cursor-pointer transition-colors'>Politicas de uso</p>
      <p className='text-slate-400 hover:text-indigo-400 cursor-pointer transition-colors'>Haz un reclamo</p>
      <p className='text-slate-400 hover:text-indigo-400 cursor-pointer transition-colors'>Contactate con nosotros</p>
    </div>
    <div className='text-center mb-6'>
      <h3 className='font-semibold text-white mb-2'>Informacion de Contacto</h3>
        <p className='text-slate-400'><strong className='text-slate-300'> Email:</strong> tucan@example.com</p>
        <p className='text-slate-400'><strong className='text-slate-300'> Direccion:</strong> siempreviva 123</p>
        <p className='text-slate-400'><strong className='text-slate-300'> Telefono:</strong> 11-6666666</p>
    </div>
  </footer>
  )
}

export default Footer
