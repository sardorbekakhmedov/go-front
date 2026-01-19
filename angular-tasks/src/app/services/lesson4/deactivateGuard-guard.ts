import type { CanDeactivateFn } from '@angular/router';

export const deactivateGuardGuard: CanDeactivateFn<FinishedFormComponent> = (component, currentRoute, currentState, nextState) => {
  return true;
};


export interface FinishedFormComponent {
  canDeactivate: () => boolean;
}
