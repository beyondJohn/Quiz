import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  @Input() questionText: string;
  questions: {};
  question: string;
  questionTypes: {};
  types: Array<string>;
  type: string;
  falsies: {};
  falseAnswers: Array<string>;
  truths: {};
  trueAnswers: Array<string>;
  answerArray: Array<string>;
  randomQuestionNumTracker: number;
  result = false;
  isSelected: Array<number>;
  selectedQuestions: Array<number>;
  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.selectedQuestions = [];
    this.getQuestions().subscribe(data => {
      this.questions = data;
      this.getQuestionTypes().subscribe(data => {
        this.questionTypes = data;
        this.types = this.questionTypes['types'];
        this.getFalsies().subscribe(data => {
          this.falsies = data;
          this.getTruths().subscribe(data => {
            this.truths = data;
            this.selectQuestion();
          })
        });
      });
    });
  }
  public isActive(index) {
    return this.isSelected.indexOf(index) != -1 ? true : false;
  }
  public selected(index) {
    if (this.isSelected.indexOf(index) == -1) {
      if (this.trueAnswers.indexOf(this.answerArray[index]) != -1 && !this.result) {
        this.result = true;
        console.log("True");
      }
      else {
        if(!this.result){
          this.result = false;
          this.isSelected.push(index);
          console.log("False");
        }
      }
    }

  }
  getQuestions() {
    return this.http.get('/assets/quiz.json');
  }
  getQuestionTypes() {
    return this.http.get('/assets/quesTypes.json');
  }
  setQuestion(qNum: number, type: string) {
    this.question = this.questions['question'][qNum][0][type];
  }
  getFalsies() {
    return this.http.get('/assets/falsies.json');
  }
  setFalsies(type: string) {
    this.falseAnswers = this.falsies[type];
  }
  getTruths() {
    return this.http.get('/assets/truth.json');
  }
  setTruths(type: string) {
    this.trueAnswers = this.truths[type];
  }
  setTypes(qNum: number) {
    return this.types[qNum];
  }
  getRandom(): number {
    let random = Math.floor(Math.random() * this.types.length);
    if (this.randomQuestionNumTracker) {
      // the following is intended to make sure that the same questions don't get repeated
      if (this.selectedQuestions.indexOf(random) == -1
        && this.selectedQuestions.length < this.types.length) {
        this.selectedQuestions.push(random);
      }
      else {
        // duplicate question found, rerun random
        if(this.selectedQuestions.length < this.types.length){
          return this.getRandom();
        }
        else{
          // if all questions have been asked, reset the array tracking asked questions
          this.selectedQuestions = [];
          return this.getRandom();
        }
      }
      if (random === this.randomQuestionNumTracker) {
        return this.getRandom();
      }
    }
    this.randomQuestionNumTracker = random;
    return random;
  }
  public selectQuestion() {
    this.isSelected = [];
    const qnum = this.getRandom();
    const type = this.setTypes(qnum);
    this.type = type;
    this.setQuestion(qnum, type);
    this.setFalsies(type);
    this.setTruths(type);
    this.mixAnswers();
    this.result = false;
  }
  mixAnswers() {
    let tempArray = [];
    this.falseAnswers.forEach(element => {
      tempArray.push(element);
    });
    this.trueAnswers.forEach(element => {
      tempArray.push(element);
    });
    this.answerArray = this.shuffle(tempArray);
  }
  shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }
}
