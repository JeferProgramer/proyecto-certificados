import { MatDialogRef } from '@angular/material/dialog';
import { Component } from '@angular/core';

@Component({
  selector: 'app-type-dialog',
  template: `
    <h1 mat-dialog-title>Selecciona el tipo</h1>
    <div mat-dialog-actions>
      <button mat-button (click)="select('certificado')">Certificado</button>
      <button mat-button (click)="select('webinar')">Webinar</button>
    </div>
  `
})
export class TypeDialogComponent {

  constructor(public dialogRef: MatDialogRef<TypeDialogComponent>) { }

  select(type: string): void {
    this.dialogRef.close(type);
  }
}
