import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { QuestionComponent } from './question/question.component';
import { ModalComponent } from './modal/modal.component';

import { ModalService } from './services/modal-service.service';
import { BehaviorSubjectService } from './services/behavior-subject.service';

@NgModule({
  declarations: [
    AppComponent,
    QuestionComponent,
    ModalComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    NgbModule.forRoot()
  ],
  providers: [NgbActiveModal,ModalComponent,ModalService,BehaviorSubjectService],
  entryComponents:[ModalComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
