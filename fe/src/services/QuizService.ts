import { AxiosInstance, AxiosResponse } from "axios";
import Quiz from "../models/Quiz";
import defaultInstance from "../api/axios";

const QuizService = {
  generateQuiz: async (data: Quiz, instance: AxiosInstance = defaultInstance): Promise<AxiosResponse<any>> => {
    try {
      const response: AxiosResponse<any> = await instance.post('quiz/', data);
      return response;
    } catch (error) {
      throw error;
    }
  },

  findQuiz: async (code: string, instance: AxiosInstance = defaultInstance): Promise<AxiosResponse<any>> => {
    try {
      const response: AxiosResponse<any> = await instance.get(`quiz/participations/${code}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  participate: async (quizId: number, quizCode: string, instance: AxiosInstance): Promise<number> => {
    try {
      const data = {
        quiz: quizId
      };
      const response: AxiosResponse<any> = await instance.post(`quiz/participations/${quizCode}`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  answer: async (data: {
    participation: number,
    choices: {response: number}[]
  }, questionId: number, instance: AxiosInstance = defaultInstance): Promise<AxiosResponse<any>> => {
    try {
      const response = await instance.post(`question/${questionId}/answer`, data);
      return response;
    } catch (error) {
      throw error;
    }
  },

  updateScore: async (data: {
    score: number,
    }, userResponseId: number, 
    instance: AxiosInstance = defaultInstance): Promise<any> => {
    try {
      await instance.put(`quiz/user/response/${userResponseId}`, data);
      return;
    } catch (error) {
      throw error;
    }
  },

  updateGlobalScore: async (data: {
    score: number,
    }, participation: number, 
    instance: AxiosInstance = defaultInstance): Promise<any> => {
    try {
      await instance.put(`quiz/user/response/${participation}/final`, data);
      return;
    } catch (error) {
      throw error;
    }
  },

  getUserQuizzes: async (instance: AxiosInstance = defaultInstance):  Promise<AxiosResponse<any>> => {
    try {
      const response = await instance.get(`quiz/user/all`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  delete: async (instance: AxiosInstance = defaultInstance, id: number): Promise<AxiosResponse<any>> => {
    try {
      const response = await instance.delete(`quiz/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export default QuizService;
