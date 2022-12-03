import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.css']
})
export class TokenComponent {
  username: string = "John";
  @Input() ledger: {type: string, name?: string, tokens: number, cost?: number}[] = [];
}
