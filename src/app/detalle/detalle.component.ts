import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrl: './detalle.component.css'
})

@Injectable({
  providedIn: 'root'
})
export class DetalleComponent implements OnInit {

  id!: number;
  titulo!: string;

  constructor(private route: ActivatedRoute, private home: HomeComponent) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      console.log(this.id);
      //this.buscarComidaPorId(this.id);
    });
  }

  /*buscarComidaPorId(id: number): void {
const chisteEncontrado = this.home.buscarChistePorId(id);
if (chisteEncontrado) {
  console.log('Chiste encontrado:', chisteEncontrado);
} else {
  console.log('No se encontró ningún chiste con el ID proporcionado.');
}
  }*/

}
