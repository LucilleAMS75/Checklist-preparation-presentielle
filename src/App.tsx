/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { checklistItems } from './data';
import { UserStates, ChecklistStatus } from './types';
import { ProgressIndicator } from './components/ProgressIndicator';
import { ChecklistItemRow } from './components/ChecklistItemRow';
import { ResetButton } from './components/ResetButton';
import { BookOpen, CheckSquare, Info, Calendar } from 'lucide-react';
import { motion } from 'motion/react';

export default function App() {
  // Sync state from localStorage on init
  const [states, setStates] = useState<UserStates>(() => {
    try {
      const saved = localStorage.getItem('checklist_presentiel_v1');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Erreur de chargement de checklist_presentiel_v1 depuis localStorage", e);
    }
    return {};
  });

  // Save state to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('checklist_presentiel_v1', JSON.stringify(states));
    } catch (e) {
      console.error("Erreur de sauvegarde de checklist_presentiel_v1 dans localStorage", e);
    }
  }, [states]);

  const handleStatusChange = (itemId: number, newStatus: ChecklistStatus) => {
    setStates((prev) => {
      const updated = { ...prev };
      if (newStatus === null) {
        delete updated[itemId];
      } else {
        updated[itemId] = newStatus;
      }
      return updated;
    });
  };

  const handleReset = () => {
    setStates({});
  };

  const hasAnyAnswers = Object.keys(states).length > 0;
  const totalItems = checklistItems.length;

  return (
    <div className="min-h-screen bg-[#F9F9FB] text-gray-800 py-8 px-4 sm:px-6 lg:px-8 font-sans selection:bg-accent-pres/10 selection:text-accent-pres">
      <div className="max-w-4xl mx-auto">
        


        {/* Banner Headers / Identity */}
        <header className="mb-6" id="activity-header">
          <div className="flex items-center gap-2 text-accent-pres font-bold tracking-widest text-[10px] uppercase mb-2">
            <BookOpen size={13} aria-hidden="true" />
            <span>Activité Pédagogique Interactive</span>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-gray-200/80 pb-5">
            <div>
              <h1 className="sr-only">Checklist de préparation à la journée présentielle</h1>
              <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 font-sans uppercase leading-none">
                CHECKLIST <span className="text-accent-pres">PRÉSENTIEL</span>
              </div>
              <p className="text-gray-500 font-medium text-sm sm:text-[1.05rem] mt-2">
                Finalisez votre préparation avant le Jour J
              </p>
            </div>
            <div className="flex items-center gap-1.5 self-start bg-accent-pres/5 border border-accent-pres/10 text-accent-pres px-3.5 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest">
              <Calendar size={12} aria-hidden="true" />
              <span>Jour J présentiel</span>
            </div>
          </div>
        </header>

        {/* Progress Card Section */}
        <ProgressIndicator states={states} total={totalItems} />

        {/* Informational Banner */}
        <div 
          className="bg-blue-50/60 border border-blue-100 rounded-xl p-4 mb-6 flex gap-3 text-sm text-blue-800"
          id="info-banner"
          role="note"
        >
          <Info size={18} className="shrink-0 mt-0.5 text-blue-600" aria-hidden="true" />
          <div>
            <span className="font-semibold">Comment ça marche ?</span> Pour chaque élément, indiquez par <span className="font-semibold text-green-700">OK</span> si vous êtes prêt, ou par <span className="font-semibold text-orange-700">À reprendre</span> s'il reste à travailler. Cliquez à nouveau sur une option pour la désélectionner (retour au statut neutre). Vos réponses sont sauvegardées automatiquement.
          </div>
        </div>

        {/* Table/List Container */}
        <div 
          className="bg-white rounded-xl shadow-xs border border-gray-200 overflow-hidden mb-6"
          id="checklist-container"
        >
          <table className="w-full block md:table border-collapse" id="checklist-table">
            
            {/* Semantic Header, Hidden on mobile */}
            <thead className="hidden md:table-header-group bg-accent-pres">
              <tr>
                <th scope="col" className="text-left py-4 px-6 text-[11px] font-bold text-white uppercase tracking-widest leading-none w-[45%]">
                  Élément à vérifier
                </th>
                <th scope="col" className="text-left py-4 px-4 text-[11px] font-bold text-white uppercase tracking-widest leading-none w-[35%]">
                  À faire si incomplet
                </th>
                <th scope="col" className="text-left py-4 px-6 text-[11px] font-bold text-white uppercase tracking-widest leading-none w-[20%]">
                  Statut
                </th>
              </tr>
            </thead>

            {/* List of items */}
            <tbody className="block md:table-row-group divide-y divide-gray-150">
              {checklistItems.map((item) => (
                <ChecklistItemRow
                  key={item.id}
                  item={item}
                  currentStatus={states[item.id] || null}
                  onStatusChange={handleStatusChange}
                />
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Actions */}
        <footer className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6 pb-12" id="activity-footer">
          <ResetButton onReset={handleReset} disabled={!hasAnyAnswers} />
          
          <div className="flex items-center gap-2 text-xs text-gray-500" id="local-storage-indicator">
            <CheckSquare size={13} className="text-green-500 shrink-0 animate-pulse" aria-hidden="true" />
            <span>Sauvegarde automatique locale activée • Clé : <code className="bg-gray-150 text-gray-700 px-1.5 py-0.5 rounded font-mono text-[10px]">checklist_presentiel_v1</code></span>
          </div>
        </footer>

      </div>
    </div>
  );
}
