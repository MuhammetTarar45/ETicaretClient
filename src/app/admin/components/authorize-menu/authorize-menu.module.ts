import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorizeMenuComponent } from './authorize-menu.component';
import { RouterModule } from '@angular/router';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    AuthorizeMenuComponent
  ],
  imports: [
    CommonModule, MatIconModule, MatButtonModule, MatCheckbox, MatCardModule, MatDividerModule,
    MatTreeModule,
    RouterModule.forChild([
      { path: '', component: AuthorizeMenuComponent }
    ])
  ]
})
export class AuthorizeMenuModule { }
