/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ChecklistStatus, UserStates } from '../types';
import { CheckCircle2, AlertCircle, HelpCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface ProgressIndicatorProps {
  states: UserStates;
  total: number;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ states, total }) => {
  const okCount = Object.values(states).filter((status) => status === 'OK').length;
  const alertCount = Object.values(states).filter((status) => status === 'REPRENDRE').length;
  const neutralCount = total - okCount - alertCount;
  
  const percentage = total > 0 ? (okCount / total) * 100 : 0;

  return (
    <div 
      className="bg-white rounded-xl shadow-md border border-gray-200 p-5 mb-6"
      id="progress-card"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
        <div>
          <h2 className="text-xs font-bold text-gray-400 font-sans tracking-widest uppercase" id="progress-heading">
            VOTRE PROGRESSION
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Suivi automatique de votre préparation pour la session.
          </p>
        </div>
        <div className="text-right flex items-baseline gap-1.5 self-start sm:self-center font-sans">
          <span 
            className="text-2xl font-bold text-accent-pres tracking-tight"
            id="validation-ratio"
            aria-live="polite"
          >
            {okCount} <span className="text-gray-400 text-sm font-normal">/ {total}</span>
          </span>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">validés OK</span>
        </div>
      </div>

      {/* Progress Bar Container */}
      <div 
        className="w-full bg-gray-250 rounded-full h-3 overflow-hidden mb-5"
        role="progressbar"
        aria-valuenow={okCount}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-label={`Progression de préparation : ${okCount} sur ${total} éléments validés`}
      >
        <motion.div 
          className="h-full bg-accent-pres rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>

      {/* Summary Chips with bold typography elements */}
      <div className="grid grid-cols-3 gap-3">
        <div 
          className="bg-green-50 border border-green-100 rounded-lg p-2.5 flex flex-col items-center justify-center text-center"
          id="stat-ok"
        >
          <div className="flex items-center gap-1.5 text-green-700 text-[10px] font-bold tracking-widest uppercase mb-0.5">
            <CheckCircle2 size={12} className="shrink-0" />
            <span>Prêts</span>
          </div>
          <span className="text-xl font-bold text-green-800 tracking-tight font-sans">{okCount}</span>
        </div>

        <div 
          className="bg-orange-50 border border-orange-100 rounded-lg p-2.5 flex flex-col items-center justify-center text-center"
          id="stat-reprendre"
        >
          <div className="flex items-center gap-1.5 text-orange-700 text-[10px] font-bold tracking-widest uppercase mb-0.5">
            <AlertCircle size={12} className="shrink-0" />
            <span>À reprendre</span>
          </div>
          <span className="text-xl font-bold text-orange-800 tracking-tight font-sans">{alertCount}</span>
        </div>

        <div 
          className="bg-gray-50 border border-gray-150 rounded-lg p-2.5 flex flex-col items-center justify-center text-center"
          id="stat-neutral"
        >
          <div className="flex items-center gap-1.5 text-gray-500 text-[10px] font-bold tracking-widest uppercase mb-0.5">
            <HelpCircle size={12} className="shrink-0" />
            <span>Non évalués</span>
          </div>
          <span className="text-xl font-bold text-gray-700 tracking-tight font-sans">{neutralCount}</span>
        </div>
      </div>
    </div>
  );
};
