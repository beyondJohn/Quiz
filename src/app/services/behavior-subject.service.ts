import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class BehaviorSubjectService {

  constructor() { }
  //notifications
  myBehaviorObj: object = {text:'question Text'};
  behaviorSubject = new BehaviorSubject<object>(this.updateBehaviorSubject());
  setbehaviorSubject(text): void {
    console.log("behaviorSubject: ", text);
      this.myBehaviorObj = {text: text['text']};
      this.behaviorSubject.next(text);
  }
  private updateBehaviorSubject(): object {
      return this.myBehaviorObj;
  }

  //
  myStatusObj: object = {status:'close'};
  status = new BehaviorSubject<object>(this.updateStatus());
  setStatus(text): void {
    console.log("status: ", text);
      this.myStatusObj = {text: text['text']};
      this.status.next(text);
  }
  private updateStatus(): object {
      return this.myStatusObj;
  }
}