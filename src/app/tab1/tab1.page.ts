import { Component } from '@angular/core';
import { Database, object, ref, set } from '@angular/fire/database';
import { LocalNotifications } from '@capacitor/local-notifications';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  ledColor: boolean = false;

  ph1Color: number = 0;
  ph2Color: number = 0;
  ph1Sensor: number = 0;
  ph2Sensor: number = 0;
  nutriSensor1: number = 0;
  nutriSensor2: number = 0;
  solid1Sen: number = 0;
  solid2Sen: number = 0;
  conduc1: number = 0;
  conduc2: number = 0;
  pasoAgua1: boolean = true;
  pasoAgua2: boolean = true;

  constructor(private database: Database) {}

  async ngOnInit(message: string) {
    await LocalNotifications.requestPermissions(); // Solicitar permisos de la app
    await LocalNotifications.schedule({ // Elaboración del objeto notificación
      notifications: [
        {
          title: "Alerta",
          body: message,
          id: new Date().getTime(), // ID único para cada notificación
          schedule:{
            allowWhileIdle:true // Permite que la notificación se ejecute incluso durante el modo Reposo
          }
        }
      ]

    });

    this.checkNotifications(); // Llamar a la función de verificación de notificaciones al inicializar el componente
  }

  async checkNotifications() {
    const route = ref(this.database, 'sensores');
    object(route).subscribe(attributes => {
      const valores_db = attributes.snapshot.val();

      // Verificar pH del cultivo 1
      if (valores_db.ph1 < 6) {
        this.ngOnInit("El pH del cultivo 1 está bajo.");
      } else if (valores_db.ph1 > 7.99) {
        this.ngOnInit("El pH del cultivo 1 está alto.");
      }

      // Verificar pH del cultivo 2
      // if (valores_db.ph2 < 6) {
      //   this.sendNotification("El pH del cultivo 2 está bajo.");
      // } else if (valores_db.ph2 > 7.99) {
      //   this.sendNotification("El pH del cultivo 2 está alto.");
      // }

      // Verificar nutrientes
      if (valores_db.nutrientes1 <= 25) {
        this.ngOnInit("Los niveles de nutrientes están bajos.");
      }

      // Actualizar valores de sensores
      this.ph1Sensor = valores_db.ph1;
      this.ph2Sensor = valores_db.ph2;
      this.nutriSensor1 = valores_db.nutrientes1;
      this.nutriSensor2 = valores_db.nutrientes2;
      this.solid1Sen = valores_db.tds1;
      this.solid2Sen = valores_db.tds2;
    });
  }

  async BTNBombas() {
    // Cambiar el estado del LED
    this.ledColor = !this.ledColor;
    // Cambiar el estado del dormitorio en la base de datos
    const routeBombas = ref(this.database, '/sensores/bomba1');
    set(routeBombas, this.ledColor);
    // Actualizar el color del botón basado en el estado del dormitorio
    this.pasoAgua1 = this.ledColor;
    // Agregar un mensaje de registro para mostrar el estado actual de encendido
    console.log('Estado del dormitorio:', this.ledColor);
  }

  async BTNBombas2() {
    // Cambiar el estado del LED
    this.ledColor = !this.ledColor;
    // Cambiar el estado del dormitorio en la base de datos
    const routeBombas2 = ref(this.database, '/sensores/bomba2');
    set(routeBombas2, this.ledColor);
    // Actualizar el color del botón basado en el estado del dormitorio
    this.pasoAgua2 = this.ledColor;
    // Agregar un mensaje de registro para mostrar el estado actual de encendido
    console.log('Estado del dormitorio:', this.ledColor);
  }

  getColorClass() {
    if (this.ph1Sensor >= 0 && this.ph1Sensor <= 1) {
      return 'red';
    } else if (this.ph1Sensor >= 2 && this.ph1Sensor <= 3) {
      return 'orange';
    } else if (this.ph1Sensor >= 4 && this.ph1Sensor <= 5) {
      return 'yellow';
    } else if (this.ph1Sensor >= 6 && this.ph1Sensor <= 7) {
      return 'lightgreen';
    } else if (this.ph1Sensor >= 8 && this.ph1Sensor <= 10) {
      return 'darkgreen';
    } else if (this.ph1Sensor >= 11 && this.ph1Sensor <= 12) {
      return 'darkblue';
    } else if (this.ph1Sensor >= 13 && this.ph1Sensor <= 15) {
      return 'purple';
    }
    return 'black'; // Valor predeterminado si ninguno de los bloques if se cumple
  }
  getColorClass2() {
    if (this.ph2Sensor >= 0 && this.ph2Sensor <= 1) {
      return 'red';
    } else if (this.ph2Sensor >= 2 && this.ph2Sensor <= 3) {
      return 'orange';
    } else if (this.ph2Sensor >= 4 && this.ph2Sensor <= 5) {
      return 'yellow';
    } else if (this.ph2Sensor >= 6 && this.ph2Sensor <= 7) {
      return 'lightgreen';
    } else if (this.ph2Sensor >= 8 && this.ph2Sensor <= 10) {
      return 'darkgreen';
    } else if (this.ph2Sensor >= 11 && this.ph2Sensor <= 12) {
      return 'darkblue';
    } else if (this.ph2Sensor >= 13 && this.ph2Sensor <= 15) {
      return 'purple';
    }
    return 'black'; // Valor predeterminado si ninguno de los bloques if se cumple
  }
  getColorClass3() {
    if (this.nutriSensor1 >= 0 && this.nutriSensor1 <= 25) {
      return 'red';
    } else if (this.nutriSensor1 >= 26 && this.nutriSensor1 <= 49) {
      return 'yellow';
    } else if (this.nutriSensor1 >= 50 && this.nutriSensor1 <= 100) {
      return 'lightgreen';
    }
    return 'black'; // Valor predeterminado si ninguno de los bloques if se cumple
  }

  getColorClass4() {
    if (this.nutriSensor2 >= 0 && this.nutriSensor2 <= 25) {
      return 'red';
    } else if (this.nutriSensor2 >= 26 && this.nutriSensor2 <= 49) {
      return 'yellow';
    } else if (this.nutriSensor2 >= 50 && this.nutriSensor2 <= 100) {
      return 'lightgreen';
    }
    return 'black'; // Valor predeterminado si ninguno de los bloques if se cumple
  }

  getColorClass5() {
    if (this.solid1Sen >= 0 && this.solid1Sen <= 25) {
      return 'red';
    } else if (this.solid1Sen >= 26 && this.solid1Sen <= 49) {
      return 'yellow';
    } else if (this.solid1Sen >= 50 && this.solid1Sen <= 100) {
      return 'lightgreen';
    }
    return 'black'; // Valor predeterminado si ninguno de los bloques if se cumple
  }

  getColorClass6() {
    if (this.solid2Sen >= 0 && this.solid2Sen <= 25) {
      return 'red';
    } else if (this.solid2Sen >= 26 && this.solid2Sen <= 49) {
      return 'yellow';
    } else if (this.solid2Sen >= 50 && this.solid2Sen <= 100) {
      return 'lightgreen';
    }
    return 'black'; // Valor predeterminado si ninguno de los bloques if se cumple
  }
}
