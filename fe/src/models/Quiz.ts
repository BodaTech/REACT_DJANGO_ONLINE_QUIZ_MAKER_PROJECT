import Question from "./Question";

enum QuizStatus {
    PENDING = 'pending',
    IN_PROGRESS = 'in progress',
    COMPLETED = 'comlpleted',
    CANCELLED = 'canceled'
}

class Quiz {
    public id: number | null;
    public title: string;
    public code: string;
    public created_at: Date;
    public updated_at: Date;
    public user: number | any;
    public max_number: number;
    public status: QuizStatus;
    public questions: Question[] | []

    public constructor(id: number | null, title: string, code: string, created_at: Date, updated_at: Date, 
        user_id: number, max_number: number, status: QuizStatus, questions: Question[] | []) {
        this.id = id;
        this.title = title;
        this.code = code;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.user = user_id;
        this.max_number = max_number;
        this.status = status;
        this.questions = questions;
    }
}

export default Quiz