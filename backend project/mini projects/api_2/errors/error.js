export class HandleError extends Error {
    constructor(Status, Message) {
      super(Message); 
      this.Status = Status;
      this.Message = Message;
  
      this.name = 'HandleError';
    }
  }
  