import { Component, computed, input, InputSignal, signal, WritableSignal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

export type InputType = 'text' | 'email' | 'password' | 'tel'

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-input-field',
  styleUrl: './input-field.css',
  templateUrl: './input-field.html',
})
export class InputField {
  readonly control = input.required<FormControl<string>>();
  readonly type = input.required<InputType>();
  readonly label = input.required<string>();
  readonly forLabel = input.required<string>();
  readonly placeholder = input.required<string>();
  readonly errors = input<Record<string, string>>({});

  readonly hide = signal<boolean>(true);
  readonly isPassword = computed(() => this.type() === 'password');
  readonly inputType = computed<InputType>(() =>
    this.isPassword() && !this.hide() ? 'text' : this.type(),
  );

  toggleHide(): void {
    this.hide.update((v) => !v);
  }

  showError(): boolean {
    return this.control().invalid && (this.control().touched || this.control().dirty);
  }

  errorMessage(): string {
    const key = Object.keys(this.control().errors ?? {})[0];
    return this.errors()[key] ?? '';
  }
}
