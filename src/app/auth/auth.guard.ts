import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth, authState, User } from '@angular/fire/auth';
import { firstValueFrom } from 'rxjs';

export const authGuard: CanActivateFn = async () => {
  const auth = inject(Auth);
  const router = inject(Router);

  const user: User | null = await firstValueFrom(authState(auth));

  console.log(user);

  if (user) {
    return true;
  } else {
    return router.createUrlTree(['/login']);
  }
};
