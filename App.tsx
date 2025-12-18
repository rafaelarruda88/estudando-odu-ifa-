
import React, { useState, useEffect } from 'react';
import { Sparkles, Loader2, BookOpen, Heart, Info, Scroll } from 'lucide-react';
import Dropdown from './components/Dropdown';
import { fetchOduContent } from './services/geminiService';
import { OduInfo, OduName } from './types';

const App: React.FC = () => {
  const [leftOdu, setLeftOdu] = useState<OduName | "">("");
  const [rightOdu, setRightOdu] = useState<OduName | "">("");
  const [loading, setLoading] = useState(false);
  const [oduData, setOduData] = useState<OduInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSelection = async () => {
    if (!leftOdu || !rightOdu) return;
    
    setLoading(true);
    setError(null);
    setOduData(null);

    try {
      const data = await fetchOduContent(leftOdu, rightOdu);
      setOduData(data);
    } catch (err: any) {
      setError(err.message || "Erro espiritual ao conectar com o oráculo.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (leftOdu && rightOdu) {
      handleSelection();
    }
  }, [leftOdu, rightOdu]);

  const getDisplayName = () => {
    if (!leftOdu || !rightOdu) return "Aguardando Seleção...";
    // A lógica solicitada: O da direita vem antes.
    return leftOdu === rightOdu ? `Odù ${rightOdu} Meji` : `Odù ${rightOdu} ${leftOdu}`;
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-12 px-4 selection:bg-[#FFD700] selection:text-[#121212]">
      <header className="max-w-4xl w-full text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-[#1e1e1e] rounded-full flex items-center justify-center border border-[#FFD700]/30 gold-glow">
            <Sparkles className="text-[#FFD700] w-8 h-8" />
          </div>
        </div>
        <h1 className="text-4xl md:text-6xl font-serif text-[#FFD700] mb-4 gold-text-glow">
          Estudando os Odús de Ifá
        </h1>
        <p className="text-[#aaaaaa] text-lg max-w-2xl mx-auto">
          Esse app não tem como objetivo formar sacerdotes e nem ser auxiliar de consultas, é um aplicativo para iniciantes estudarem e aprenderem superficialmente sobre os Odús.
        </p>
      </header>

      <main className="max-w-4xl w-full flex flex-col gap-8">
        <div className="bg-[#1e1e1e] rounded-2xl p-8 border border-[#333333] shadow-2xl">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-10">
            <Dropdown 
              label="Lado Esquerdo" 
              value={leftOdu} 
              onChange={setLeftOdu} 
            />
            <div className="text-[#FFD700] text-2xl font-serif opacity-50 hidden md:block">×</div>
            <Dropdown 
              label="Lado Direito" 
              value={rightOdu} 
              onChange={setRightOdu} 
            />
          </div>

          <div className="text-center">
            <h2 className="text-2xl md:text-3xl text-[#FFD700] font-medium min-h-[1.5em]">
              {getDisplayName()}
            </h2>
          </div>
        </div>

        {loading && (
          <div className="bg-[#1e1e1e] rounded-2xl p-16 border border-[#333333] flex flex-col items-center justify-center gap-4">
            <Loader2 className="w-12 h-12 text-[#FFD700] animate-spin" />
            <p className="text-[#FFD700] font-medium animate-pulse text-xl">Carregando...</p>
            <p className="text-[#aaaaaa] text-sm italic">"A sabedoria é como um saco de pele de cabra: cada um carrega a sua."</p>
          </div>
        )}

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-6 rounded-2xl text-center">
            {error}
          </div>
        )}

        {oduData && (
          <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Summary Card */}
            <div className="bg-[#1e1e1e] rounded-2xl p-8 border border-[#333333] shadow-xl relative overflow-hidden">
               <div className="absolute top-0 right-0 p-6 opacity-5">
                 <Scroll className="w-32 h-32 text-white" />
               </div>
               <div className="flex items-center gap-3 mb-6 text-[#FFD700]">
                 <BookOpen className="w-6 h-6" />
                 <h3 className="text-xl font-semibold uppercase tracking-wider">O Itan (O Mito)</h3>
               </div>
               <div className="text-[#f0f0f0] leading-relaxed text-lg whitespace-pre-wrap font-light">
                 {oduData.resumo}
               </div>
            </div>

            {/* Advice & Characteristics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#1e1e1e] rounded-2xl p-8 border border-[#333333] shadow-xl">
                 <div className="flex items-center gap-3 mb-6 text-[#FFD700]">
                   <Heart className="w-6 h-6" />
                   <h3 className="text-xl font-semibold uppercase tracking-wider">Conselho do Oráculo</h3>
                 </div>
                 <p className="text-[#f0f0f0] leading-relaxed italic">
                   "{oduData.conselho}"
                 </p>
              </div>

              <div className="bg-[#1e1e1e] rounded-2xl p-8 border border-[#333333] shadow-xl">
                 <div className="flex items-center gap-3 mb-6 text-[#FFD700]">
                   <Info className="w-6 h-6" />
                   <h3 className="text-xl font-semibold uppercase tracking-wider">Personalidade</h3>
                 </div>
                 <ul className="space-y-3">
                   {oduData.caracteristicas.map((c, i) => (
                     <li key={i} className="flex items-start gap-3 text-[#f0f0f0]">
                       <span className="text-[#FFD700] mt-1.5">•</span>
                       <span>{c}</span>
                     </li>
                   ))}
                 </ul>
              </div>
            </div>

            {/* Footer metadata */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-[#1e1e1e] p-6 rounded-2xl border border-[#333333]">
              <div className="flex gap-4">
                <span className="text-[#aaaaaa] text-sm">Elementos: <strong className="text-[#FFD700] font-normal">{oduData.elementos}</strong></span>
              </div>
              <div className="text-[#FFD700] font-serif text-lg italic">
                {oduData.saudacao}
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="mt-20 py-8 border-t border-[#333333] w-full text-center">
        <p className="text-[#aaaaaa] text-sm">
          Desenvolvido por <strong className="text-[#FFD700] font-normal">Rafael Arruda - ifagbami Agboola</strong>
        </p>
        <p className="text-[#666666] text-xs mt-2 uppercase tracking-widest">Aṣẹ o!</p>
      </footer>
    </div>
  );
};

export default App;
