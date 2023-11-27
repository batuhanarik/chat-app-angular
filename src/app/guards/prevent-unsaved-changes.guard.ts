import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  CanDeactivate,
  CanDeactivateFn,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { MemberEditComponent } from '../components/member-edit/member-edit.component';

export class PreventUnsavedChangesGuard {
  canDeactivate(component: MemberEditComponent): boolean {
    if (component.editForm.dirty) {
      return confirm(
        'Are you sure you want to continue? Any unsaved changes will be lost.'
      );
    }
    return true;
  }
}
