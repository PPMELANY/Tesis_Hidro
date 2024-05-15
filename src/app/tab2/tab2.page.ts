import { Component } from '@angular/core';
import { Database, ref, set, onValue } from '@angular/fire/database';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  cultivo1Text: string = ''; // Texto para mostrar el cultivo 1
  cultivo2Text: string = ''; // Texto para mostrar el cultivo 2

  constructor(private database: Database) {}

  ngOnInit() {
    // Suscribirse a cambios en la base de datos para actualizar los valores locales
    const route = ref(this.database, 'cultivos');
    onValue(route, (snapshot) => {
      const valores_db = snapshot.val();
      this.cultivo1Text = this.getTextFromValue(valores_db.cult1);
      this.cultivo2Text = this.getTextFromValue(valores_db.cult2);
    });
  }
  
  // Función para obtener el texto correspondiente al valor numérico
  private getTextFromValue(valor: number): string {
    switch (valor) {
      case 1:
        return 'Brote';
      case 2:
        return 'Crecimiento';
      case 3:
        return 'Cosecha';
      default:
        return '---'; // Valor inicial
    }
  }
}
