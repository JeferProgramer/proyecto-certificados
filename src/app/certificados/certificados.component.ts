import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MsalService } from '@azure/msal-angular';



interface Certificado {
  codigo: string;
  nombre: string;
  fecha: string;
  email: string;
}

@Component({
  selector: 'app-certificados',
  templateUrl: './certificados.component.html',
  styleUrls: ['./certificados.component.css']
})
export class CertificadosComponent {


  codigo = '';
  certificados: Certificado[] = [
    { codigo: '124', nombre: 'María Rodríguez', fecha: '2023-09-13', email: 'mariarodriguez@example.com' },
    { codigo: '125', nombre: 'Carlos Soto', fecha: '2023-09-12', email: 'carlossoto@example.com' },
    { codigo: '126', nombre: 'Ana Gómez', fecha: '2023-09-11', email: 'anagomez@example.com' },
    { codigo: '127', nombre: 'Pedro Castillo', fecha: '2023-09-10', email: 'pedrocastillo@example.com' },
    { codigo: '128', nombre: 'Luisa Fernández', fecha: '2023-09-09', email: 'luisafernandez@example.com' },
    { codigo: '129', nombre: 'Diego Morales', fecha: '2023-09-08', email: 'diegomorales@example.com' },
    { codigo: '130', nombre: 'Sofía Peña', fecha: '2023-09-07', email: 'sofiapena@example.com' }
  ];
  columnsToDisplay = ['codigo', 'nombre', 'fecha', 'email'];
  archivoCSV: File | null = null;
  certificadosFiltrados: Certificado[] = [];
  userInfo: any;
  constructor(private http: HttpClient, private authService: MsalService) {

    this.userInfo = this.authService.instance.getAllAccounts();
  }


  logout() {
    this.authService.logout();
  }

  subirArchivo(): void {
    if (!this.archivoCSV) {
      alert('Por favor, seleccione un archivo primero');
      return;
    }

    const formData = new FormData();
    formData.append('csv', this.archivoCSV, this.archivoCSV.name);

    this.http.post('http://127.0.0.1:8000/general_actions/certificados/', formData).subscribe(
      response => {
        console.log("Archivo subido", response);
      },
      error => {
        console.error("Error", error);
      }
    );
  }

  cargarCSV(event: any): void {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.archivoCSV = fileList[0];
    }
  }

  buscar() {
    const searchTerm = this.codigo.trim().toLowerCase();
    console.log("serachTearm", searchTerm);

    if (!searchTerm) {
      return;
    }

    this.certificados = this.certificados.filter(certificado =>
      certificado.codigo.toLowerCase().includes(searchTerm) ||
      certificado.email.toLowerCase().includes(searchTerm)
    );
  }

  ngOnInit() {
    this.certificadosFiltrados = [...this.certificados];
  }
}
