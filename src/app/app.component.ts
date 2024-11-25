// import { CommonModule } from '@angular/common';
// import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
// import { WebcamImage, WebcamModule } from 'ngx-webcam';
// import { Observable, Subject } from 'rxjs';

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [RouterOutlet, WebcamModule, CommonModule],
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent {
//   title = 'cameraPractice';
//   permissionStatus: string = '';
//   camData: any = '';
//   capturedImage: any = '';
//   trigger: Subject<void> = new Subject();

//   get $trigger(): Observable<void> {
//     return this.trigger.asObservable();
//   }

//   checkPermission = () => {
//     navigator.mediaDevices.getUserMedia({ video: { width: 640, height: 640 } }).then((response) => {
//       this.permissionStatus = 'Allowed';
//       this.camData = response;
//       console.log(this.camData);
//     }).catch(errr => {
//       this.permissionStatus = 'Denied';
//       console.log(this.permissionStatus);
//     });
//   }

//   capture = (event: WebcamImage) => {
//     console.log("event", event);
//     this.capturedImage = event.imageAsDataUrl;
//   }

//   captureImage = () => {
//     this.trigger.next();
//   }
// }



import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WebcamImage, WebcamModule } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, WebcamModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cameraPractice';
  permissionStatus: string = '';
  camData: any = '';
  capturedImage: any = '';
  trigger: Subject<void> = new Subject();

  get $trigger(): Observable<void> {
    return this.trigger.asObservable();
  }

  checkPermission = () => {
    navigator.mediaDevices.getUserMedia({ video: { width: 640, height: 640 } }).then((response) => {
      this.permissionStatus = 'Allowed';
      this.camData = response;
      console.log(this.camData);
    }).catch(errr => {
      this.permissionStatus = 'Denied';
      console.log(this.permissionStatus);
    });
  }

  capture = (event: WebcamImage) => {
    console.log("event", event);
    
    const image = new Image();
    image.src = event.imageAsDataUrl;

    image.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      const size = Math.min(image.width, image.height);
      const offsetX = (image.width - size) / 2;
      const offsetY = (image.height - size) / 2;

      canvas.width = size;
      canvas.height = size;

      ctx.drawImage(image, offsetX, offsetY, size, size, 0, 0, size, size);

      this.capturedImage = canvas.toDataURL('image/png');
    };
  }

  captureImage = () => {
    this.trigger.next();
  }

  downloadImage() {
    const a = document.createElement('a');
    a.href = this.capturedImage;
    a.download = 'captured-image.png';
    a.click();
  }
}

