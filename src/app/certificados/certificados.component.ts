import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { environment } from '../../environment/environment';
import { TypeDialogComponent } from '../type-dialog-component/type-dialog-component.component';
import { MatDialog } from '@angular/material/dialog';

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
  selectedType: 'certificado' | 'webinar' = 'certificado';
  dataSource = new MatTableDataSource<Certificado>(this.certificados);

  constructor(private http: HttpClient, private snackBar: MatSnackBar, private router: Router, public dialog: MatDialog) {
    this.columnas = ['certificado', 'código', 'fecha', 'horas', 'email'];
  }

  archivoCSV: any = null;

  isLoading = true;

  subirArchivo(): void {
    if (!this.archivoCSV) {
      alert('Por favor, seleccione un archivo primero');
      return;
    }
    const formData = new FormData();
    formData.append('file', this.archivoCSV!, this.archivoCSV.name!);

    this.http.post(`${environment.baseUrl}general_actions/upload_certificado/?type=${this.selectedType}`, formData).subscribe(
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

    if (!isNaN(Number(searchTerm))) {
      this.getData(`${environment.baseUrl}general_actions/certificados/?certificate_code=${searchTerm}`);
    } else if (searchTerm) {
      this.getData(`${environment.baseUrl}general_actions/certificados/?certificate_user_email=${searchTerm}`);
    } else {
      this.snackBar.open('No hay datos disponibles', 'Cerrar', {
        duration: 3000
      });
    }
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
            duration: 3000,
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

  logoutFake() {
    localStorage.removeItem('loginStatus');

    this.router.navigate(['/login']);
  }

  buscarFechaHoy(){
    this.getData(`${environment.baseUrl}general_actions/certificados/?certificate_today=true`)
  }

  ngOnInit(): void {
    const loginStatus = localStorage.getItem('loginStatus');

    if (!loginStatus || loginStatus !== 'true') {
      this.router.navigate(['/login']);
    }
    this.http.get<Certificado[]>(`${environment.baseUrl}general_actions/certificados/`)
      .subscribe(
        data => {
          this.certificados = data;
          this.dataSource.data = this.certificados;
          this.isLoading = false;
        },
        error => {
          console.error("Error", error);
          this.isLoading = false;
        }
      );
  }
}
