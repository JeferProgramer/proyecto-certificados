import { Component } from '@angular/core';

interface Certificado {
  codigo: string;
  nombre: string;
  fecha: string;
  // ... cualquier otro campo que quieras incluir
}

@Component({
  selector: 'app-certificados',
  templateUrl: './certificados.component.html',
  styleUrls: ['./certificados.component.css']
})
export class CertificadosComponent {
  codigo = '';
  certificados: Certificado[] = [
    { codigo: '124', nombre: 'María Rodríguez', fecha: '2023-09-13' },
    { codigo: '125', nombre: 'Carlos Soto', fecha: '2023-09-12' },
    { codigo: '126', nombre: 'Ana Gómez', fecha: '2023-09-11' },
    { codigo: '127', nombre: 'Pedro Castillo', fecha: '2023-09-10' },
    { codigo: '128', nombre: 'Luisa Fernández', fecha: '2023-09-09' },
    { codigo: '129', nombre: 'Diego Morales', fecha: '2023-09-08' },
    { codigo: '130', nombre: 'Sofía Peña', fecha: '2023-09-07' }
  ];
  columnsToDisplay = ['codigo', 'nombre', 'fecha'];
  archivoCSV: File = null;

  cargarCSV(event: any):void {
    // tu código aquí
    const fileList: FileList = event.target.files;
    if(fileList.length > 0){
      this.archivoCSV = fileList[0];
    }
  }

  buscar() {
    []
  }
}
