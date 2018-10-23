class MessagesController < ApplicationController

  def create
    @message = Message.new(message_params)
    
    if @message.save
      MessageMailer.email(@message).deliver
      render json: ['Message delivered successfully.'], status: 200
    else
      render json: ['Message delivery failed.'], status: 422
    end
  end

  private

  def message_params
    params.require(:message).permit(:name, :email, :message)
  end
  
end