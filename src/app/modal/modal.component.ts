import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubjectService } from '../services/behavior-subject.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor(
    public activeModal: NgbActiveModal,
    public _modal: NgbModal,
    private _behaviorSubject: BehaviorSubjectService) { }
  result = this._behaviorSubject.myBehaviorObj['text'];
  incorrect = this._behaviorSubject.myBehaviorObj['incorrect'];
  report:string;
  successReport: Array<string> = [
    "Move forward 4 Spaces! Please show the other players this result.",
    "Move forward 3 Spaces! Please show the other players this result.",
    "Move forward 1 Space! Please show the other players this result.",
    "Stay where you are and enjoy the beautiful Vermont scenery while you lose your next turn, sorry! Please show the other players this result."
  ]
  ngOnInit() {
    if(this._behaviorSubject.myBehaviorObj["text"].indexOf('Correct, Great Job!') != -1){
        this.report = this.successReport[this.incorrect];
    }
    else{
      this.report = "";
    }
  }

  open(component: Object) {
    const componentref = component['component'];
    const text = component['text'];
    const modalRef = this._modal.open(componentref);
  }

}
