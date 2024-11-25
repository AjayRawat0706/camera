// import { CommonModule } from '@angular/common';
// import { Component } from '@angular/core';
// import { WebcamImage, WebcamModule } from 'ngx-webcam';
// import { Observable, Subject } from 'rxjs';

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [ WebcamModule, CommonModule],
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
import { WebcamImage, WebcamModule } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ WebcamModule, CommonModule],
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

  // Request camera with 1:1 aspect ratio (e.g., 640x640 resolution)
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
    this.capturedImage = event.imageAsDataUrl;  // Capturing the image as data URL (base64 encoded)
  }

  captureImage = () => {
    this.trigger.next();  // Trigger the capture of the image
  }
}
