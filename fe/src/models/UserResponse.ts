import Question from "./Question";
import QuestionResponse from "./QuestionResponse";

class UserResponse{
    public id: number | Question;
    public question: number | Question;
    public participation: number;
    public choices: {response: number}[];

    public constructor(id: number, question: number | Question, participation: number, choices: []){
        this.id = id;
        this.question = question
        this.participation = participation
        this.choices = choices
    }

    public static initialise(){
        return new UserResponse(0, 0, 0, [])
    }
}

export default UserResponse