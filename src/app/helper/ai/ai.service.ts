import { Injectable } from '@angular/core';
import { InferenceClient } from '@huggingface/inference';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AiService {
  private hf = new InferenceClient(environment.hfKey);

  async textPrompt(text: string) {
    const content = `What do you think about this word ${text}`;
    return await this.hf
      .chatCompletion({
        model: 'meta-llama/Llama-3.1-8B-Instruct',
        messages: [{ role: 'user', content: content }],
        max_tokens: 512,
      })
      .then((res) => {
        return res.choices[0].message.content;
      })
      .catch((err) => {
        return err.message;
      });
  }
}
