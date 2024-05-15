import QuestionResponse from "./QuestionResponse";

class Question{

    public id: number | null;
    public question_text: string;
    public duration: number;
    public quizId: number | null;
    public responses: QuestionResponse[] | []

    public constructor(id: number | null, questionText: string, duration: number, 
        quizID: number | null, responses: QuestionResponse[] | []){
        this.id = id;
        this.question_text = questionText;
        this.duration = duration;
        this.quizId = quizID
        this.responses = responses
    }

    public static initialise(){
        return new Question(null, '', 0, null, [QuestionResponse.initialise(), QuestionResponse.initialise()])
    }
}

export default Question