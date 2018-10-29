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

  ngOnInit() {
  }
  result = this._behaviorSubject.myBehaviorObj['text'];
  open(component: Object) {
    const componentref = component['component'];
    const text = component['text'];
    const modalRef = this._modal.open(componentref);
  }

}
