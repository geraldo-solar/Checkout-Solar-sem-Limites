import React from 'react';
import { Icons } from '../constants';

interface ConfirmationProps {
  message: string;
}

export const Confirmation: React.FC<ConfirmationProps> = ({ message }) => {
  return (
    <div className="h-full flex flex-col items-center justify-center p-8 md:p-12 bg-white text-center animate-in fade-in duration-700">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-moss-800 mb-6 shadow-sm">
        <Icons.Check />
      </div>

      <h2 className="font-serif text-4xl text-moss-800 mb-4">Pedido Confirmado!</h2>
      
      <div className="w-16 h-1 bg-gold-500 mb-8 mx-auto"></div>

      <div className="bg-sand-100 p-8 rounded-xl border border-sand-200 max-w-md w-full shadow-sm relative overflow-hidden">
        {/* Decorative corner */}
        <div className="absolute top-0 right-0 w-16 h-16 bg-gold-400/10 rounded-bl-full"></div>
        
        <p className="text-lg text-gray-700 leading-relaxed font-light italic">
          "{message}"
        </p>
      </div>
      
      <div className="mt-8 space-y-3">
         <p className="text-sm text-gray-500 uppercase tracking-widest font-bold">Próximos Passos</p>
         <div className="flex flex-col gap-2 text-gray-600 text-sm">
            <span>1. Verifique sua caixa de entrada.</span>
            <span>2. Acesse o portal do aluno.</span>
            <span>3. Comece sua jornada solar.</span>
         </div>
      </div>
      
      <button 
        onClick={() => window.location.reload()}
        className="mt-12 text-moss-800 font-bold hover:text-gold-600 underline decoration-gold-500 decoration-2 underline-offset-4 transition-colors"
      >
        Voltar para o início
      </button>
    </div>
  );
};