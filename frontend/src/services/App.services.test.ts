import AppServices from './App.services';
import apiCLient from '../common/http-client'; // Adjust path if needed
import { getToken } from '../utils/HelperFucntions';

jest.mock('../common/http-client'); // Mock the http client
jest.mock('../utils/HelperFucntions'); // Mock getToken as well

// Mockea el cliente API completo
// jest.mock('../common/http-client', () => ({
//   post: jest.fn(),  // Mockea el método post
// }));

describe('AppServices', () => {
  describe('login', () => {
    it('should make a POST request to /auth/login with the provided payload', async () => {
      const mockPayload = { username: 'testuser', password: 'password123' };
      const mockResponse = { data: 'mocked response data' }; 
      (apiCLient.post as jest.Mock).mockResolvedValue(mockResponse);

      const response = await AppServices.login(mockPayload);

      expect(apiCLient.post).toHaveBeenCalledTimes(1);
      expect(apiCLient.post).toHaveBeenCalledWith('/auth/login', mockPayload);
      expect(response).toEqual(mockResponse); // Check if response is returned correctly
    });

    // Add more tests to handle error scenarios, 
    // different response codes, etc. if needed
  });

  describe('singup', () => {
    it('should make a POST request to /auth/signup with the provided payload', async () => {
      
      //  console.log('apiCLient before mock:', apiCLient); // Check if apiCLient is mocked
      const mockPayload = {
        email: "taliban.prieto@gmail.com",
        password: "12345",
        firstName: "Andrea Flores",
        lastName: "MEndoza Prieto"
      };

      const mockResponse = { data: 'mocked response data' };

      // Mockea el método post
      (apiCLient.post as jest.Mock).mockResolvedValue(mockResponse);
  
      // Llama a la función de signup
      const response = await AppServices.singup(mockPayload);
  
      // Verifica si el mock fue llamado
      //expect(apiCLient.post).toHaveBeenCalledTimes(1);
      expect(apiCLient.post).toHaveBeenCalledWith('/auth/signup', mockPayload);
      expect(response).toEqual(mockResponse);
    });

    it('should handle a 400 Bad Request (e.g., email already exists)', async () => {
      const mockPayload = { 
        email: 'demo@demo.com', 
        password: 'password123',
        firtName: 'password123',
        lastName: 'password123',
      };
      const mockError = { response: { status: 400, data: { message: 'Email already exists' } } };
      (apiCLient.post as jest.Mock).mockRejectedValue(mockError);

      try {
        await AppServices.singup(mockPayload);
      } catch (error) {
        expect(error).toEqual(mockError); // Check if the error is as expected
      }
    });

    it('should handle a 500 Internal Server Error', async () => {
      const mockPayload = { 
        email: 'demo@demo.com', 
        password: 'password123',
        firtName: 'password123',
        lastName: 'password123',
      };
      const mockError = { response: { status: 500, data: { message: 'Internal server error' } } };
      (apiCLient.post as jest.Mock).mockRejectedValue(mockError);

      try {
        await AppServices.singup(mockPayload);
      } catch (error) {
        expect(error).toEqual(mockError); 
      }
    });

    it('should handle network errors', async () => {
      const mockPayload = { 
        email: 'demo@demo.com', 
        password: 'password123',
        firtName: 'password123',
        lastName: 'password123',
      };
      const mockError = new Error('Network error');
      (apiCLient.post as jest.Mock).mockRejectedValue(mockError);

      try {
        await AppServices.singup(mockPayload);
      } catch (error:any) {
        expect(error?.message).toEqual('Network error'); 
      }
    });
  });

  describe('getTasks', () => {
    it('should make a GET request to /api/v1/tasks/ with the Authorization header', async () => {
      const mockToken = 'mocked_user_token';
      (getToken as jest.Mock).mockReturnValue(mockToken); 
      const mockResponse = { data: [{ /* Mock task data */ }] };
      (apiCLient.get as jest.Mock).mockResolvedValue(mockResponse);

      const response = await AppServices.getTasks();

      expect(getToken).toHaveBeenCalledTimes(1);
      expect(apiCLient.defaults.headers.common['Authorization']).toBe(`Bearer ${mockToken}`);
      expect(apiCLient.get).toHaveBeenCalledTimes(1);
      expect(apiCLient.get).toHaveBeenCalledWith('/api/v1/tasks/');
      expect(response).toEqual(mockResponse); 
    });

    // Add tests for error scenarios:
    // - getToken throws an error
    // - API returns an error status code
  });

  describe('addTasks', () => {
    it('should make a POST request to /api/v1/tasks with the Authorization header and payload', async () => {
      const mockToken = 'mocked_user_token';
      (getToken as jest.Mock).mockReturnValue(mockToken); 

      const mockPayload =  {
        'title': "test demo",
        'description': "nuevo description demo",
        'dueDate': "11-11-2024",
        'status': 'Pending'
      };
      const mockResponse = { data: { /* Mock response data, e.g., the created task */ } };
      (apiCLient.post as jest.Mock).mockResolvedValue(mockResponse);

      const response = await AppServices.addTasks(mockPayload);

      expect(apiCLient.defaults.headers.common['Authorization']).toBe(`Bearer ${mockToken}`);
      //expect(apiCLient.post).toHaveBeenCalledTimes(1);
      expect(apiCLient.post).toHaveBeenCalledWith('/api/v1/tasks', mockPayload);
      expect(response).toEqual(mockResponse); 
    });

    // Add tests for error scenarios:
    // - getToken throws an error
    // - API returns an error status code (e.g., 400 Bad Request)
  });

  describe('updateTask', () => {
    it('should make a PUT request to /api/v1/tasks/:taskId with the Authorization header and payload', async () => {
      const mockToken = 'mocked_user_token';
      (getToken as jest.Mock).mockReturnValue(mockToken); 

      const mockTaskId = '123'; // Example task ID
      const mockPayload = { /* Your mock updated task data */ };
      const mockResponse = { data: { /* Mock response data, e.g., the updated task */ } };
      (apiCLient.put as jest.Mock).mockResolvedValue(mockResponse);

      const response = await AppServices.updateTask(mockTaskId, mockPayload);

      expect(apiCLient.defaults.headers.common['Authorization']).toBe(`Bearer ${mockToken}`);
      //expect(apiCLient.put).toHaveBeenCalledTimes(1);
      expect(apiCLient.put).toHaveBeenCalledWith(`/api/v1/tasks/${mockTaskId}`, mockPayload);
      expect(response).toEqual(mockResponse); 
    });

    // Add tests for error scenarios:
    // - getToken throws an error
    // - API returns an error status code (e.g., 400 Bad Request, 404 Not Found)
  });
  describe('deleteTask', () => {
    it('should make a DELETE request to /api/v1/tasks/:taskId with the Authorization header', async () => {
      const mockToken = 'mocked_user_token';
      (getToken as jest.Mock).mockReturnValue(mockToken);

      const mockTaskId = '123'; // Example task ID
      const mockResponse = { data: { /* Mock response data, e.g., success message */ } };
      (apiCLient.delete as jest.Mock).mockResolvedValue(mockResponse);

      const response = await AppServices.deleteTask(mockTaskId);


      expect(apiCLient.defaults.headers.common['Authorization']).toBe(`Bearer ${mockToken}`);
      //expect(apiCLient.delete).toHaveBeenCalledTimes(1);
      expect(apiCLient.delete).toHaveBeenCalledWith(`/api/v1/tasks/${mockTaskId}`);
      expect(response).toEqual(mockResponse);
    });

    // Add tests for error scenarios:
    // - getToken throws an error
    // - API returns an error status code (e.g., 404 Not Found)
  });
  
});