import { Component, HostListener, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {

  data: any[] = [];
  chistes: string[] = [];
  chisteActual: string = '';
  nuevoChiste: string = '';
  columnas = ['chiste', 'acciones'];

  constructor (private apiService: ApiService, private http: HttpClient){}

  ngOnInit(): void {
  }



  obtenerChistesFromLocalStorage() {
    try {
      const chistesGuardados = localStorage.getItem('chistes');
      if (chistesGuardados) {
        this.chistes = JSON.parse(chistesGuardados);
      }
    } catch (error) {
      console.error('Error al obtener chistes de localStorage:', error);
    }
  }

  agregarNuevoChiste() {
    const nuevoChiste = prompt('Ingrese un nuevo chiste:');
    if (nuevoChiste !== null && nuevoChiste.trim() !== '' && nuevoChiste.trim() !== '' && /^[a-zA-Z\s]*$/.test(nuevoChiste)) {
      this.chistes.push(nuevoChiste.trim()); // Agregar el nuevo chiste al arreglo de chistes
      this.guardarChistes(); // Guardar los chistes en el localStorage
    } else {
      alert('Por favor ingrese un chiste válido.'); // Mostrar un mensaje de error si el campo está vacido o lleva algun simbolo no deseado
    }
    this.obtenerChistesFromLocalStorage();
  }

  @HostListener('window:beforeunload', ['$event'])
  clearLocalStorage(event: any) {
    localStorage.clear(); // Limpiar localStorage al reiniciar la pagina
  }
  
  agregarChiste() {
    // Simula una llamada a una API que devuelve un chiste aleatorio
    const nuevoChiste = '¡Este es un chiste aleatorio!';
    this.apiService.getApiData().subscribe(data => {
    this.data = data;
    this.chistes.push(JSON.stringify(data[0].joke)); //Para agregar chiste a lista "chiste"
    this.guardarChistes();
    this.obtenerChistesFromLocalStorage();
    console.log("data:", data); });
  }

  guardarChistes() {
    try {
      localStorage.setItem('chistes', JSON.stringify(this.chistes));
    } catch (error) {
      console.error('Error al guardar chistes en localStorage:', error);
    }
  }

  editarChiste(chiste: string) {
    const indice = this.chistes.indexOf(chiste);
    const nuevoChiste = prompt('Editar chiste:', chiste);
    if (nuevoChiste !== null && nuevoChiste.trim() !== '' && /^[a-zA-Z\s]*$/.test(nuevoChiste)) {
      this.chistes[indice] = nuevoChiste.trim();
      this.guardarChistes();
    } else {
      alert('Por favor ingrese un chiste válido.'); //Mostrar un mensaje de error si el campo está vacío o lleva algun simbolo no deseado
    }
    this.obtenerChistesFromLocalStorage();
  }

  eliminarChiste(chiste: string) {
    if (confirm('¿Estás seguro de eliminar este chiste?')) {
      const indice = this.chistes.indexOf(chiste);
      this.chistes.splice(indice, 1);
      this.guardarChistes();
    }
    this.obtenerChistesFromLocalStorage();
  }


  
 /* llenardata(){
      //LLama a metodo getApiData desde api.service.ts
      this.apiService.getApiData().subscribe(data => {
      this.data = data;
      console.log("data:", data); });
  }*/
  

}
