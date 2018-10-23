class MessagesController < ApplicationController

  def create
    @message = Message.new(message_params)

    respond_to do |format|
      # if @message.save
        MessageMailer.email(@message).deliver
        format.json { render json: 'Message delivered successfully.', status: 200 }
      # else
      #   format.json { render json: 'Message delivery failed.', status: 422 }
      # end
    end
  end

  private

  def message_params
    params.require(:message).permit(:name, :email, :message)
  end
  
end