using Microsoft.AspNet.Identity;
using SendGrid;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using System.Web;

namespace BarTindr.Models
{
    public class EmailService : IIdentityMessageService
    {
        public async Task SendAsync(IdentityMessage message)
        {
            await configSendGridasync(message);
        }

        public async Task SendAsync(string subject, string htmlBody, string textBody, string destination)
        {
            await configSendGridasync(subject, htmlBody, textBody, destination);
        }

        // Use NuGet to install SendGrid (Basic C# client lib) 
        private async Task configSendGridasync(IdentityMessage message)
        {
            await configSendGridasync(message.Subject, message.Body, message.Body, message.Destination);
        }

        private async Task configSendGridasync(string subject, string htmlBody, string textBody, string destination)
        {
            var myMessage = new SendGridMessage();

            myMessage.AddTo(destination);
            myMessage.From = new MailAddress("Bartindr.Welcome@gmail.com");
            myMessage.Subject = subject;
            myMessage.Text = textBody;
            myMessage.Html = htmlBody;

            var credentials = new NetworkCredential(ConfigurationManager.AppSettings["emailService:Account"],
                                                    ConfigurationManager.AppSettings["emailService:Password"]);

            // Create a Web transport for sending email.
            var transportWeb = new Web(credentials);

            // Send the email.
            if (transportWeb != null)
            {
                await transportWeb.DeliverAsync(myMessage);
            }
            else
            {
                //Trace.TraceError("Failed to create Web transport.");
                await Task.FromResult(0);
            }
        }
    }
}