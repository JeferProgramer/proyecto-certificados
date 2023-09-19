import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Certificado {
  id: string;
  certificate_title: string;
  certificate_code: string;
  certificate_date: string;
  certificate_hours: number;
  created_at: string;
  viewed_at: string;
  usuario: string;
}

@Component({
  selector: 'app-certificados',
  templateUrl: './certificados.component.html',
  styleUrls: ['./certificados.component.css']
})
export class CertificadosComponent implements OnInit {
  codigo = '';
  certificados: Certificado[] = [];
  columnas: string[] = [];
  dataSource = new MatTableDataSource<Certificado>(this.certificados);

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {
    this.columnas = ['certificado', 'código', 'fecha', 'horas', 'email'];
  }

  archivoCSV: File | null = null;

  isLoading = true;

  subirArchivo(): void {
    if (!this.archivoCSV) {
      alert('Por favor, seleccione un archivo primero');
      return;
    }

    const formData = new FormData();
    formData.append('csv', this.archivoCSV, this.archivoCSV.name);

    this.http.post('http://127.0.0.1:8000/general_actions/upload_certificado/', formData).subscribe(
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

  buscar(): void {
    const searchTerm = this.codigo.trim().toLowerCase();

    if (!isNaN(Number(searchTerm))) {  // Si es un número
      this.getData(`http://127.0.0.1:8000/general_actions/certificados/?certificate_code=${searchTerm}`);
    } else if (this.isEmail(searchTerm)) {  // Si parece un correo electrónico
      this.getData(`http://127.0.0.1:8000/general_actions/certificados/?certificate_user_email=${searchTerm}`);
    } else {
      this.snackBar.open('No hay datos disponibles', 'Cerrar', {
        duration: 3000
      });
    }
  }

  isEmail(value: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(value);
  }

  getData(url: string): void {
    this.http.get<Certificado[]>(url).subscribe(
      data => {
        if (data && data.length) {
          this.certificados = data;
          this.dataSource.data = this.certificados;
        } else {
          this.certificados = data;
          this.dataSource.data = this.certificados;
          this.snackBar.open('No hay datos disponibles', 'Cerrar', {
            duration: 20000,
            panelClass: ['custom-snackbar']
          });
        }
      },
      error => {
        console.error("Error", error);
        this.snackBar.open('Error al obtener los datos', 'Cerrar', {
          duration: 3000
        });
      }
    );
  }

  ngOnInit(): void {
    // Hacer la petición HTTP al montar el componente
    this.http.get<Certificado[]>('http://127.0.0.1:8000/general_actions/certificados/')
      .subscribe(
        data => {
          this.certificados = data;  // Actualizar el array de certificados
          this.dataSource.data = this.certificados;  // Actualizar la data del MatTableDataSource
          this.isLoading = false;  // Detener el loading
        },
        error => {
          console.error("Error", error);
          this.isLoading = false;  // Detener el loading
        }
      );
  }
}
