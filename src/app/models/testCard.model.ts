
export interface TestCardModel {
  id?: any;
  topic?: string
  name? : string;
  questionType?:number;
  questionText?:string;
  answerRight?:string[];
  answerWrong?:string[];
  creationDate?: Date;
}
