import React, { useState } from 'react';

export const Footer: React.FC = () => {
  const [activeModal, setActiveModal] = useState<'privacy' | 'support' | null>(null);

  return (
    <>
      <footer id="main-footer" className="w-full py-5 px-6 md:px-10 bg-[#f9f9fb] border-t border-[#eeeef0] flex flex-col sm:flex-row items-center justify-between text-xs text-[#8e7164] gap-3 mt-auto">
        <div className="flex items-center gap-2 font-medium">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>2024 Smart Systems</span>
          <span className="text-[#e2bfb0]">|</span>
          <span className="text-[#1a1c1d] font-semibold">Status: Operational</span>
        </div>

        <div className="flex items-center gap-6 font-medium">
          <button
            id="footer-privacy-btn"
            onClick={() => setActiveModal('privacy')}
            className="hover:text-[#a04100] transition-colors cursor-pointer"
          >
            Privacy
          </button>
          <button
            id="footer-support-btn"
            onClick={() => setActiveModal('support')}
            className="hover:text-[#a04100] transition-colors cursor-pointer"
          >
            Support
          </button>
        </div>
      </footer>

      {/* Modal Dialog for Privacy & Support */}
      {activeModal && (
        <div id="footer-dialog-overlay" className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#eeeef0]">
            <h3 className="text-xl font-extrabold text-[#1a1c1d] mb-3">
              {activeModal === 'privacy' ? 'Política de Privacidad' : 'Soporte Técnico Smart Systems'}
            </h3>
            
            {activeModal === 'privacy' ? (
              <div className="text-sm text-[#5a4136] space-y-3 leading-relaxed">
                <p>
                  Smart Systems cumple con los más altos estándares corporativos de protección y privacidad de datos.
                </p>
                <p>
                  Todas las credenciales, métricas financieras y registros de talento se almacenan con cifrado de nivel bancario AES-256.
                </p>
              </div>
            ) : (
              <div className="text-sm text-[#5a4136] space-y-3 leading-relaxed">
                <p>
                  ¿Necesitas asistencia técnica o soporte personalizado para tu tablero empresarial?
                </p>
                <div className="bg-[#eeeef0] p-3 rounded-xl space-y-1 font-mono text-xs text-[#1a1c1d]">
                  <p><strong>Mesa de Ayuda:</strong> soporte@smartsystems.io</p>
                  <p><strong>Atención Directa:</strong> +1 (800) 555-SMART</p>
                  <p><strong>Horario:</strong> 24/7 Monitoreo Continuo</p>
                </div>
              </div>
            )}

            <div className="mt-6 flex justify-end">
              <button
                id="footer-dialog-close-btn"
                onClick={() => setActiveModal(null)}
                className="bg-[#a04100] hover:bg-[#883700] text-white font-bold px-5 py-2 rounded-xl text-xs transition-colors cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
