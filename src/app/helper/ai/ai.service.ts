/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { firstValueFrom } from 'rxjs';
import { AuthService } from 'app/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AiService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  async textPrompt(text: string) {
    const token = await this.authService.getToken();
    return await firstValueFrom(
      this.http.post(
        `${environment.apiUrl}text`,
        { text },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      ),
    )
      .then((res: any) => {
        return res.result;
      })
      .catch((err) => {
        return err.message;
      });
  }
}
