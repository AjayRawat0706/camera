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
import { RouterOutlet } from '@angular/router';
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

  // Capture image and ensure it is square
  capture = (event: WebcamImage) => {
    console.log("event", event);
    
    // Create an image object from the captured data URL
    const image = new Image();
    image.src = event.imageAsDataUrl;
  
    // Wait for the image to load before proceeding
    image.onload = () => {
      // Create a canvas to draw the image onto a square canvas
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
  
      // Ensure ctx is not null
      if (ctx) {
        // Get the smallest dimension of the image (width or height) to ensure it's square
        const size = Math.min(image.width, image.height);
  
        // Set the canvas size to be square
        canvas.width = size;
        canvas.height = size;
  
        // Draw the image onto the canvas, centered (crop if necessary)
        const offsetX = (image.width - size) / 2;
        const offsetY = (image.height - size) / 2;
        ctx.drawImage(image, offsetX, offsetY, size, size, 0, 0, size, size);
  
        // Get the image data as a base64 string (png format)
        this.capturedImage = canvas.toDataURL('image/png');
      } else {
        console.error('Failed to get canvas context');
      }
    };
  }
  
  captureImage = () => {
    this.trigger.next();  // Trigger the capture of the image
  }

  // Download the captured image
  downloadImage() {
    const a = document.createElement('a');
    a.href = this.capturedImage;  // The image data URL from the canvas
    a.download = 'captured-image.png';  // Set the download filename
    a.click();  // Trigger the download
  }
}
