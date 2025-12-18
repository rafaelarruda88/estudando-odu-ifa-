
import React, { useState, useEffect } from 'react';
import { Sparkles, Loader2, BookOpen, Heart, Info, Scroll, Sun, Wind, Mountain, Droplets } from 'lucide-react';
import Dropdown from './components/Dropdown';
import { fetchOduContent } from './services/geminiService';
import { OduInfo, OduName } from './types';
import { COLORS } from './constants';

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
    return leftOdu === rightOdu ? `Odù ${rightOdu} Meji` : `Odù ${rightOdu} ${leftOdu}`;
  };

  const getElementIcon = (elementos: string) => {
    const el = elementos.toLowerCase();
    if (el.includes('fogo')) return <Sun className="w-5 h-5 text-orange-600" />;
    if (el.includes('água') || el.includes('agua')) return <Droplets className="w-5 h-5 text-blue-600" />;
    if (el.includes('ar')) return <Wind className="w-5 h-5 text-gray-500" />;
    if (el.includes('terra')) return <Mountain className="w-5 h-5 text-amber-800" />;
    return <Sparkles className="w-5 h-5 text-[#C5A059]" />;
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-12 px-4">
      <header className="max-w-4xl w-full text-center mb-16 fade-in">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-[#C5A059] blur-2xl opacity-10 rounded-full"></div>
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center border-2 border-[#C5A059]/20 shadow-xl relative overflow-hidden">
               {/* Decorative pattern inside icon circle */}
               <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h20L10 10z' fill='%23000'/%3E%3C/svg%3E")` }}></div>
               <Sparkles className="text-[#C5A059] w-10 h-10" />
            </div>
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-serif text-[#2C1E11] mb-6 tracking-tight">
          Estudando os Odús de Ifá
        </h1>
        <div className="max-w-2xl mx-auto flex flex-col items-center">
          <div className="w-16 h-1 bg-[#C5A059]/30 rounded-full mb-6"></div>
          <p className="text-[#6B5A4B] text-lg font-light leading-relaxed">
            Esse app não tem como objetivo formar sacerdotes e nem ser auxiliar de consultas, é um aplicativo para iniciantes estudarem e aprenderem superficialmente sobre os Odús.
          </p>
        </div>
      </header>

      <main className="max-w-4xl w-full flex flex-col gap-10">
        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-10 border border-[#E8E2D9] shadow-xl relative overflow-hidden">
          {/* African geometric pattern accents */}
          <div className="absolute top-0 left-0 w-full h-1 bg-[#C5A059]/40"></div>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-10 mb-12">
            <Dropdown 
              label="Esquerda" 
              value={leftOdu} 
              onChange={setLeftOdu} 
            />
            <div className="text-[#C5A059] text-3xl font-serif opacity-30 hidden md:block select-none">❖</div>
            <Dropdown 
              label="Direita" 
              value={rightOdu} 
              onChange={setRightOdu} 
            />
          </div>

          <div className="text-center relative">
            <div className="absolute left-1/2 -translate-x-1/2 -top-4 w-12 h-px bg-[#E8E2D9]"></div>
            <h2 className="text-3xl md:text-4xl text-[#2C1E11] font-serif font-bold tracking-wide mt-4">
              {getDisplayName()}
            </h2>
          </div>
        </div>

        {loading && (
          <div className="bg-white/50 backdrop-blur-sm rounded-3xl p-20 border border-[#E8E2D9] flex flex-col items-center justify-center gap-6 shadow-sm">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-[#C5A059]/10 border-t-[#C5A059] rounded-full animate-spin"></div>
              <Loader2 className="w-8 h-8 text-[#C5A059] absolute inset-0 m-auto animate-pulse" />
            </div>
            <div className="text-center">
              <p className="text-[#C5A059] font-semibold text-xl mb-2">Carregando</p>
              <p className="text-[#6B5A4B] text-sm italic font-body-serif max-w-xs">
                "A sabedoria é como um saco de pele de cabra: cada um carrega a sua."
              </p>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-100 text-[#C0392B] p-8 rounded-3xl text-center shadow-sm">
            <p className="font-semibold">{error}</p>
          </div>
        )}

        {oduData && (
          <div className="flex flex-col gap-8 fade-in">
            {/* Summary Card */}
            <div className="bg-white rounded-3xl p-10 border border-[#E8E2D9] shadow-xl relative overflow-hidden">
               <div className="absolute top-0 right-0 p-8 opacity-[0.03] rotate-12">
                 <Scroll className="w-48 h-48 text-[#2C1E11]" />
               </div>
               
               <div className="flex items-center gap-4 mb-8 text-[#C5A059]">
                 <div className="p-3 bg-[#C5A059]/5 rounded-xl">
                   <BookOpen className="w-6 h-6" />
                 </div>
                 <h3 className="text-2xl font-serif font-bold text-[#2C1E11] tracking-wide">Resumo Geral</h3>
               </div>
               
               <div className="text-[#4A3D31] leading-relaxed text-lg font-body-serif whitespace-pre-wrap italic opacity-95">
                 {oduData.resumo}
               </div>
            </div>

            {/* Advice & Characteristics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-3xl p-10 border border-[#E8E2D9] shadow-xl hover:shadow-2xl transition-shadow duration-300">
                 <div className="flex items-center gap-4 mb-8 text-[#A65D47]">
                   <div className="p-3 bg-[#A65D47]/5 rounded-xl">
                     <Heart className="w-6 h-6" />
                   </div>
                   <h3 className="text-xl font-serif font-bold text-[#2C1E11] uppercase tracking-wider">Conselho</h3>
                 </div>
                 <p className="text-[#4A3D31] leading-relaxed text-lg font-body-serif bg-[#FDFBF7] p-6 rounded-2xl border-l-4 border-[#A65D47]/30 shadow-inner">
                   "{oduData.conselho}"
                 </p>
              </div>

              <div className="bg-white rounded-3xl p-10 border border-[#E8E2D9] shadow-xl hover:shadow-2xl transition-shadow duration-300">
                 <div className="flex items-center gap-4 mb-8 text-[#C5A059]">
                   <div className="p-3 bg-[#C5A059]/5 rounded-xl">
                     <Info className="w-6 h-6" />
                   </div>
                   <h3 className="text-xl font-serif font-bold text-[#2C1E11] uppercase tracking-wider">Personalidade</h3>
                 </div>
                 <ul className="space-y-4">
                   {oduData.caracteristicas.map((c, i) => (
                     <li key={i} className="flex items-start gap-4 text-[#4A3D31]">
                       <span className="flex-shrink-0 w-2 h-2 rounded-full bg-[#C5A059] mt-2.5"></span>
                       <span className="text-lg font-light leading-snug">{c}</span>
                     </li>
                   ))}
                 </ul>
              </div>
            </div>

            {/* Footer metadata */}
            <div className="flex justify-center items-center bg-white p-8 rounded-3xl border border-[#E8E2D9] shadow-md border-b-4 border-b-[#C5A059]/30">
              <div className="flex items-center gap-3 px-6 py-3 bg-[#FDFBF7] rounded-full border border-[#E8E2D9]">
                {getElementIcon(oduData.elementos)}
                <span className="text-[#6B5A4B] text-base font-medium">
                  Elementos: <strong className="text-[#2C1E11] font-semibold">{oduData.elementos}</strong>
                </span>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="mt-24 py-12 border-t border-[#E8E2D9] w-full text-center max-w-4xl">
        <div className="mb-6 flex justify-center gap-1 opacity-20">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-2 h-2 rotate-45 bg-[#2C1E11]"></div>
          ))}
        </div>
        <p className="text-[#6B5A4B] text-sm font-light">
          Desenvolvido por <strong className="text-[#2C1E11] font-semibold">Rafael Arruda - ifagbami Agboola</strong>
        </p>
        <p className="text-[#C5A059] text-xs mt-4 uppercase tracking-[0.3em] font-bold">Aṣẹ o!</p>
      </footer>
    </div>
  );
};

export default App;
