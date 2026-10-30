/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ChecklistStatus = 'OK' | 'REPRENDRE' | null;

export interface ChecklistItem {
  id: number;
  element: string;
  actionRequired: string;
}

export interface UserStates {
  [id: number]: ChecklistStatus;
}
