/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { RotateCcw } from 'lucide-react';

interface ResetButtonProps {
  onReset: () => void;
  disabled: boolean;
}

export const ResetButton: React.FC<ResetButtonProps> = ({ onReset, disabled }) => {
  const handleResetCheck = () => {
    if (disabled) return;
    
    const confirmed = window.confirm(
      "Voulez-vous vraiment réinitialiser toutes vos réponses ? Cette action effacera votre progression actuelle de préparation."
    );
    
    if (confirmed) {
      onReset();
    }
  };

  return (
    <button
      type="button"
      onClick={handleResetCheck}
      disabled={disabled}
      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold tracking-wide transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 ${
        disabled
          ? 'bg-gray-150 border border-gray-200 text-gray-400 cursor-not-allowed'
          : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-red-600 hover:border-red-200 focus:ring-red-400 focus:text-red-600 shadow-sm'
      }`}
      id="btn-reset-checklist"
      aria-label="Réinitialiser toutes les cases à cocher"
    >
      <RotateCcw size={15} className="shrink-0" />
      <span>Réinitialiser la checklist</span>
    </button>
  );
};
