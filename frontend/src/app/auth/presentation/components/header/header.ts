import { Component, input, InputSignal } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink, MatToolbar],
  selector: 'app-header',
  styleUrl: './header.css',
  templateUrl: './header.html',
})
export class Header {

  readonly question: InputSignal<string> = input.required<string>()
  readonly questionAnchor: InputSignal<string> = input.required<string>()
  readonly questionEntryPoint: InputSignal<string> = input.required<string>()
}
