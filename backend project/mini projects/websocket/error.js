class AppError extends Error {
    constructor() {
        super()
    }
    create(Status , Message){
      this.Status = Status;
      this.Message = Message;
    }
}