
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
    <div className="flex flex-col gap-2 w-full md:w-64">
      <label className="text-xs uppercase tracking-widest text-[#aaaaaa] font-semibold">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as OduName)}
          className="w-full appearance-none bg-[#282828] border border-[#333333] text-[#f0f0f0] px-5 py-4 rounded-lg cursor-pointer transition-all hover:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/30 text-lg"
        >
          <option value="">Selecione...</option>
          {ODUS_OLORI.map((odu) => (
            <option key={odu} value={odu}>
              {odu}
            </option>
          ))}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#FFD700]">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
