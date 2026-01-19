import { CanActivateFn } from "@angular/router";

export const authGuard: CanActivateFn = () => {

    if(localStorage.getItem('auth_token'))
        return true;

    alert('Forbiddin');
    return false;

}