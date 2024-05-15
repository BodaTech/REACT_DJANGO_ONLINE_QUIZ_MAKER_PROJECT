class QuestionResponse{
    
    public id: number | null;
    public response_text: string;
    public is_correct: boolean;
    public questionId: number | null;
    public explanation: string;

    public constructor(id: number | null, responseText: string, 
        isCorrect: boolean, questionId: number | null,
        explanation: string){
        
        this.id = id;
        this.response_text = responseText;
        this.is_correct = isCorrect;
        this.questionId = questionId
        this.explanation = explanation
    }

    public static initialise(){
        return new QuestionResponse(null, '', false, null, '');
    }
}

export default QuestionResponse