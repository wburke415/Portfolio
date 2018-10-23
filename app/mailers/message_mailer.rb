class MessageMailer < ApplicationMailer
  default from: 'whitmanburke@gmail.com'

  def email(message)
    @message = message
    mail(to: 'whitmanburke@gmail.com', subject: "Portfolio Site message from: #{@message.name}")
  end
  
end
