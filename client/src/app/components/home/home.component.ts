import { Component, signal } from '@angular/core';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RegisterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  showRegisterForm = signal<boolean>(false);

  cancelRegistration(registrationCancelled: boolean): void {
    this.showRegisterForm.set(!registrationCancelled)
  }
}
