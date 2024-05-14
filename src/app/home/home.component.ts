import { Component, HostListener, Injectable, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

interface Comida {
  id: number;
  titulo: string;
  dificultad: string;
  imagen: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})

@Injectable({
  providedIn: 'root'
})

export class HomeComponent implements OnInit {

  data: any[] = [];
  chistes: any[] = [];
  comida: any[] = [];
  columnasComidas: string[] = ['id', 'title', 'difficulty', 'image'];
  chisteActual: string = '';
  nuevoChiste: string = '';
  columnas = ['nombre', 'descripcion', 'imagen', 'acciones'];
  imgUrl: string = '';
  platoId: string = '';
  platoNombre: string = '';
  platoDescripcion: string = '';
  formulario!: FormGroup;

  

  

  constructor (private apiService: ApiService, private http: HttpClient, private formBuilder: FormBuilder,
    private router: Router
  ){}

  ngOnInit(): void {
    this.crearFormulario();
    this.dejaSoloDiezRegistros();
    //this.cargarDiezRegistro();
  }

  verDetalle(id: number): void {
    this.router.navigate(['/detalle', id]);
  }


  
  llenarTablaConDatos() {
    this.apiService.getListaComida().subscribe((data: any[]) => {
      this.comida = data.map(item => ({
        id: item.id,
        title: item.title,
        difficulty: item.difficulty,
        image: item.image
      }));
      this.guardarComidas(); // Guardar los datos en localStorage si es necesario
    });
  }

  crearFormulario(): void {
    this.formulario = this.formBuilder.group({
      id: ['', Validators.required],
      title: ['', Validators.required],
      difficulty: ['', Validators.required],
      image: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.formulario.valid) {
      this.comida.push(this.formulario.value);
      this.formulario.reset();
      console.log(this.comida);
      this.guardarComidas(); // Guardar los datos en localStorage si es necesario
      this.obtenerComidasDeLocalStorage();
    }
  
  }



  dejaSoloDiezRegistros() {
    this.apiService.getListaComida().subscribe((data: any[]) => {
      // Solo añade los primeros 10 elementos a la lista
      this.comida = data.slice(0, 10);
    });
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

  obtenerComidasDeLocalStorage() {
    try {
      const chistesGuardados = localStorage.getItem('comidas');
      if (chistesGuardados) {
        this.comida = JSON.parse(chistesGuardados);
      }
    } catch (error) {
      console.error('Error al obtener comidas de localStorage:', error);
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
    this.apiService.getApiData().subscribe(data => {
        this.chistes.push({
            id: data.id,
            nombre: data.name,
            descripcion: data.description,
            imagen: data.image
        });

        this.guardarChistes();
        this.obtenerChistesFromLocalStorage();
        console.log("data:", data);
    });
}

cargarDiezRegistro() {
  this.apiService.getListaComida().subscribe(data => {
      this.comida.push({
          id: data.id,
          title: data.title,
          difficulty: data.difficulty,
          image: data.image
      });

     // this.guardarComidas();
     //  this.obtenerComidasDeLocalStorage();
      console.log("data de mexicano comidiño:", data);
  });
}

  guardarChistes() {
    try {
      localStorage.setItem('chistes', JSON.stringify(this.chistes));
    } catch (error) {
      console.error('Error al guardar chistes en localStorage:', error);
    }
  }

  guardarComidas() {
    try {
      localStorage.setItem('comidas', JSON.stringify(this.comida));
    } catch (error) {
      console.error('Error al guardar comidas en localStorage:', error);
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
