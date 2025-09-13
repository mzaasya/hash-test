import { inject, Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { FirebaseError } from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = inject(Auth);

  async login(email: string, password: string) {
    const result = {
      success: true,
      message: 'Login successful.',
    };
    try {
      await signInWithEmailAndPassword(this.auth, email, password);
      return result;
    } catch (error) {
      const err = error as FirebaseError;
      result.success = false;
      result.message =
        err.code === 'auth/invalid-credential'
          ? 'Invalid credential.'
          : 'Something went wrong.';
      return result;
    }
  }

  logout() {
    return signOut(this.auth);
  }
}
