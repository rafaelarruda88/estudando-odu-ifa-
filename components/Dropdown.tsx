
import React from 'react';
import { ODUS_OLORI } from '../constants';
import { OduName } from '../types';

interface DropdownProps {
  label: string;
  value: string;
  onChange: (val: OduName) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ label, value, onChange }) => {
  return (
    <div className="flex flex-col gap-3 w-full md:w-72 group">
      <label className="text-[10px] uppercase tracking-[0.2em] text-[#A65D47] font-bold px-1 transition-colors group-focus-within:text-[#C5A059]">
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as OduName)}
          className="w-full appearance-none bg-[#FDFBF7] border-2 border-[#E8E2D9] text-[#2C1E11] px-6 py-5 rounded-2xl cursor-pointer transition-all hover:border-[#C5A059]/50 focus:outline-none focus:ring-4 focus:ring-[#C5A059]/10 focus:border-[#C5A059] text-lg font-medium shadow-sm"
        >
          <option value="">Selecione um Odù...</option>
          {ODUS_OLORI.map((odu) => (
            <option key={odu} value={odu}>
              {odu}
            </option>
          ))}
        </select>
        <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-[#C5A059]">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
