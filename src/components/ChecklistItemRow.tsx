/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ChecklistItem, ChecklistStatus } from '../types';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ChecklistItemRowProps {
  item: ChecklistItem;
  currentStatus: ChecklistStatus;
  onStatusChange: (itemId: number, newStatus: ChecklistStatus) => void;
}

export const ChecklistItemRow: React.FC<ChecklistItemRowProps> = ({
  item,
  currentStatus,
  onStatusChange,
}) => {
  const handleToggle = (option: 'OK' | 'REPRENDRE') => {
    if (currentStatus === option) {
      // Toggle off to neutral
      onStatusChange(item.id, null);
    } else {
      onStatusChange(item.id, option);
    }
  };

  // State-based Styling
  let rowBgClass = 'bg-white';
  let borderHighlight = 'border-gray-200/60';
  let statusIcon: React.ReactNode = null;

  if (currentStatus === 'OK') {
    rowBgClass = 'bg-[#F0FDF4] border-l-4 border-l-[#16A34A]';
    borderHighlight = 'border-green-150';
    statusIcon = (
      <motion.div
        initial={{ scale: 0, rotate: -45 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="text-[#16A34A] shrink-0"
        id={`icon-ok-${item.id}`}
      >
        <CheckCircle2 size={18} />
      </motion.div>
    );
  } else if (currentStatus === 'REPRENDRE') {
    rowBgClass = 'bg-[#FFF7ED] border-l-4 border-l-[#EA580C]';
    borderHighlight = 'border-orange-150';
    statusIcon = (
      <motion.div
        initial={{ scale: 0, rotate: 45 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="text-[#EA580C] shrink-0"
        id={`icon-rep-${item.id}`}
      >
        <AlertCircle size={18} />
      </motion.div>
    );
  }

  return (
    <tr 
      className={`block md:table-row border-b border-gray-200/80 last:border-b-0 hover:bg-gray-50/40 transition-all duration-300 ${rowBgClass}`}
      id={`row-item-${item.id}`}
    >
      {/* COLUMN 1 & Column 2 wrapper on mobile for modern stacking */}
      <td className="block md:table-cell md:w-[45%] p-4 md:py-5 md:px-6 align-middle">
        <div className="flex flex-col gap-2">
          {/* Mobile Badge indicator for columns */}
          <span className="text-[10px] font-bold text-gray-400 tracking-wider uppercase md:hidden">
            Élément à vérifier
          </span>
          <div className="flex items-start gap-2.5">
            <span className="text-gray-900 text-[14px] md:text-[15px] font-semibold leading-relaxed">
              {item.element}
            </span>
            <AnimatePresence mode="popLayout">
              {statusIcon && (
                <div className="mt-0.5">
                  {statusIcon}
                </div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Mobile Version of Column 2 structured directly inside the cell */}
          <div className="md:hidden mt-2 p-3 bg-gray-50/80 rounded-lg border border-gray-200 flex flex-col gap-1.5 shadow-xs">
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
              À faire si incomplet
            </span>
            <span className="text-gray-600 italic text-xs leading-relaxed font-normal">
              {item.actionRequired}
            </span>
          </div>
        </div>
      </td>

      {/* COLUMN 2 (À faire si incomplet) - Desktop only cell */}
      <td className="hidden md:table-cell md:w-[35%] py-5 px-4 align-middle">
        <span className="text-gray-500 italic text-[14px] leading-relaxed block font-medium">
          {item.actionRequired}
        </span>
      </td>

      {/* COLUMN 3 (Statut) */}
      <td className="block md:table-cell md:w-[20%] p-4 md:py-5 md:px-6 align-middle border-t md:border-t-0 border-gray-150">
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-bold text-gray-400 tracking-wider uppercase md:hidden mb-1">
            Statut
          </span>
          
          <fieldset className="flex items-center gap-3" id={`fieldset-${item.id}`}>
            <legend className="sr-only">Statut pour : {item.element}</legend>
            
            {/* OK Button */}
            <button
              type="button"
              role="radio"
              aria-checked={currentStatus === 'OK'}
              aria-label={`${item.element} — Statut OK`}
              onClick={() => handleToggle('OK')}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-lg border text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                currentStatus === 'OK'
                  ? 'bg-[#16A34A] border-[#16A34A] text-white focus:ring-green-400 shadow-sm'
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-55 focus:ring-accent-pres'
              }`}
              id={`btn-ok-${item.id}`}
            >
              <CheckCircle2 size={13} className={currentStatus === 'OK' ? 'text-white' : 'text-gray-400'} />
              <span>OK</span>
            </button>

            {/* À Reprendre Button */}
            <button
              type="button"
              role="radio"
              aria-checked={currentStatus === 'REPRENDRE'}
              aria-label={`${item.element} — À reprendre`}
              onClick={() => handleToggle('REPRENDRE')}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-lg border text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                currentStatus === 'REPRENDRE'
                  ? 'bg-[#EA580C] border-[#EA580C] text-white focus:ring-orange-400 shadow-sm'
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-55 focus:ring-accent-pres'
              }`}
              id={`btn-rep-${item.id}`}
            >
              <AlertCircle size={13} className={currentStatus === 'REPRENDRE' ? 'text-white' : 'text-gray-400'} />
              <span>À reprendre</span>
            </button>
          </fieldset>
        </div>
      </td>
    </tr>
  );
};
