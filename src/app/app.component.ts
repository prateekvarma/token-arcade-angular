import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  error: string = '';
  totalTokens: number = 0;
  receivedLedger: {type: string, name?: string, tokens: number, cost?: number}[] = [];

  constructor(private http: HttpClient) { }

  onTokenBuy(tokenAmount: { form_token_amount: string }) {
    if(tokenAmount.form_token_amount === '') return;
    this.error = '';
    this.http.post<{totalTokens: number, ledger: {type: string, name?: string, tokens: number, cost?: number}[]}>('http://localhost:8080/api/buy-tokens', tokenAmount)
              .subscribe((res) => {
                this.totalTokens = res.totalTokens;
                this.receivedLedger = res.ledger;
              });
  }

  onBuyGame(name: string, tokens: number) {
    if(this.totalTokens < tokens) {
      this.error = "You don't have enough tokens to make this purchase";
      return;
    }
    this.error = '';
    this.http.post<{totalTokens: number, ledger: {type: string, name?: string, tokens: number, cost?: number}[]}>('http://localhost:8080/api/get-game', { name, tokens })
              .subscribe((res) => {
                this.totalTokens = res.totalTokens;
                this.receivedLedger = res.ledger;
              });
  }
}
