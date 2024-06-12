import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserDataService } from './services/UserDataService';
import { User } from './models/user.model';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatTableModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  #userDataService = inject(UserDataService)

  displayedColumns: string[] = ['id', 'userName'];
  dataSource = [];

  title = 'Dating App';
  users: User[] = []; 
  
  ngOnInit(): void {
    this.#userDataService.GetUsers().subscribe({
      //kann man vllt deklarativ programmieren, wenn ich die User einfach nur in View anzeigen muss
      next: users => this.users = users,
      error: error => console.log(error)
    }
    );
  }
}
