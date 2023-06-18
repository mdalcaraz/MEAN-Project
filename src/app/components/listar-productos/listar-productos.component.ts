import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar-productos.component.html',
  styleUrls: ['./listar-productos.component.css'],
})
export class ListarProductosComponent {
  listarProductos: Producto[] = [];

  constructor(
    private _productoServices: ProductoService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos() {
    this._productoServices.getProductos().subscribe(
      (data) => {
        console.log(data);
        this.listarProductos = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  eliminarProducto(id: any) {
    this._productoServices.eliminarProducto(id).subscribe(
      (data) => {
        this.toastr.error('El producto fue eliminado', 'Produco Eliminado');
        this.obtenerProductos();
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
