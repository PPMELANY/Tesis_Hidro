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

  async ngOnInit() {
    await LocalNotifications.requestPermissions(); // Solicitar permisos de la app
    await LocalNotifications.schedule({ // Elaboracion del objeto notificacion
        notifications: [
            {
                title: "HidroGuard",
                body: "¡No dejes que tus plantas te hagan la 'raíz cuadrada'! ¡Revisa tu app de cultivos y haz que crezcan felices!",
                id: 1,
                schedule:{
                  allowWhileIdle:true// Permite que la notificación se ejecute incluso durante el modo Reposo
                }
            }
        ]
    });

    const route = ref(this.database, 'sensores');
    object(route).subscribe(attributes => {
        const valores_db = attributes.snapshot.val();
        console.log(valores_db);
        this.ph1Sensor = valores_db.ph1;
        this.ph2Sensor = valores_db.ph2;
        this.nutriSensor1 = valores_db.nutrientes1;
        this.nutriSensor2 = valores_db.nutrientes2;
        this.solid1Sen = valores_db.tds1;
        this.solid2Sen = valores_db.tds2;

         // Ajustar el valor de ph1Sensor según la nueva tabla
    if (this.ph1Sensor >= 5202 && this.ph1Sensor <= 8000) {
      this.ph1Sensor = 15;
    } else if (this.ph1Sensor >= 4902 && this.ph1Sensor <= 5201) {
      this.ph1Sensor = 14;
    } else if (this.ph1Sensor >= 4602 && this.ph1Sensor <= 4901) {
      this.ph1Sensor = 13;
    } else if (this.ph1Sensor >= 4302 && this.ph1Sensor <= 4601) {
      this.ph1Sensor = 12;
    } else if (this.ph1Sensor >= 4002 && this.ph1Sensor <= 4301) {
      this.ph1Sensor = 11;
    } else if (this.ph1Sensor >= 3702 && this.ph1Sensor <= 4001) {
      this.ph1Sensor = 10;
    } else if (this.ph1Sensor >= 3402 && this.ph1Sensor <= 3701) {
      this.ph1Sensor = 9;
    } else if (this.ph1Sensor >= 3102 && this.ph1Sensor <= 3401) {
      this.ph1Sensor = 8;
    } else if (this.ph1Sensor >= 2801 && this.ph1Sensor <= 3101) {
      this.ph1Sensor = 7;
    } else if (this.ph1Sensor >= 2500 && this.ph1Sensor <= 2800) {
      this.ph1Sensor = 6;
    } else if (this.ph1Sensor >= 2200 && this.ph1Sensor <= 2499) {
      this.ph1Sensor = 5;
    } else if (this.ph1Sensor >= 1900 && this.ph1Sensor <= 2199) {
      this.ph1Sensor = 4;
    } else if (this.ph1Sensor >= 1600 && this.ph1Sensor <= 1899) {
      this.ph1Sensor = 3;
    } else if (this.ph1Sensor >= 1300 && this.ph1Sensor <= 1599) {
      this.ph1Sensor = 2;
    } else if (this.ph1Sensor >= 701 && this.ph1Sensor <= 1299) {
      this.ph1Sensor = 1;
    } else {
      this.ph1Sensor = 0;
    }
                                     // NUTRIENTES----------------------------
    if (this.nutriSensor1 >= 0 && this.nutriSensor1 <= 699) {
      this.nutriSensor1 = 0;
    } else if (this.nutriSensor1 >= 700 && this.nutriSensor1 <= 1999) {
      this.nutriSensor1 = 25;
    } else if (this.nutriSensor1 >= 2000 && this.nutriSensor1 <= 2350) {
      this.nutriSensor1 = 50;
    } else if (this.nutriSensor1 >= 2351 && this.nutriSensor1 <= 3000) {
      this.nutriSensor1 = 75;
    }else if (this.nutriSensor1 >= 3001 && this.nutriSensor1 <= 7000) {
      this.nutriSensor1 = 100;
    }

                                     // tds----------------------------
if (this.solid1Sen >= 0 && this.solid1Sen <= 699) {
      this.solid1Sen = 0;
    } else if (this.solid1Sen >= 700 && this.solid1Sen <= 1999) {
      this.solid1Sen = 25;
    } else if (this.solid1Sen >= 2000 && this.solid1Sen <= 2350) {
      this.solid1Sen = 50;
    } else if (this.solid1Sen >= 2351 && this.solid1Sen <= 3000) {
      this.solid1Sen = 75;
    }else if (this.solid1Sen >= 3001 && this.solid1Sen <= 7000) {
      this.solid1Sen = 100;
    }

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
      return 'darkblue';
    } else if (this.nutriSensor1 >= 26 && this.nutriSensor1 <= 49) {
      return 'yellow';
    } else if (this.nutriSensor1 >= 50 && this.nutriSensor1 <= 74) {
      return 'lightgreen';
    }else if (this.nutriSensor1 >= 75 && this.nutriSensor1 <= 100) {
      return 'red';
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
      return 'darkblue';
    } else if (this.solid1Sen >= 26 && this.solid1Sen <= 49) {
      return 'yellow';
    } else if (this.solid1Sen >= 50 && this.solid1Sen <= 74) {
      return 'lightgreen';
    }else if (this.solid1Sen >= 75 && this.solid1Sen <= 100) {
      return 'red';
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