using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;
using BarTindr.Models;
using BarTindr.Data.Models;
using BarTindr.Data;
using SendGrid;
using System.Net.Mail;
using System.Net;

namespace BarTindr
{
    // Configure the application user manager used in this application. UserManager is defined in ASP.NET Identity and is used by the application.

    public class ApplicationUserManager : UserManager<ApplicationUser>
    {
        public ApplicationUserManager(IUserStore<ApplicationUser> store)
            : base(store)
        {
        }

        public override Task SendEmailAsync(string userId, string subject, string body)
        {
            return base.SendEmailAsync(userId, subject, body);
        }

        public Task SendConfirmEmailAsync(string email)
        {
            string subject = "Welcome To BarTindr";
            string htmlBody = "<p>Hello World!</p>";
            string textBody = "Hello World plain text!";

            Models.EmailService emailService = new Models.EmailService();

            return emailService.SendAsync(subject: subject, htmlBody: htmlBody, textBody: textBody, destination: email);
        }

        public static ApplicationUserManager Create(IdentityFactoryOptions<ApplicationUserManager> options, IOwinContext context)
        {
            var manager = new ApplicationUserManager(new UserStore<ApplicationUser>(context.Get<ApplicationDbContext>()));
            // Configure validation logic for usernames
            manager.UserValidator = new UserValidator<ApplicationUser>(manager)
            {
                AllowOnlyAlphanumericUserNames = false,
                RequireUniqueEmail = true
            };
            // Configure validation logic for passwords
            manager.PasswordValidator = new PasswordValidator
            {
                RequiredLength = 6,
                RequireNonLetterOrDigit = false,
                RequireDigit = false,
                RequireLowercase = true,
                RequireUppercase = false,
            };
            var dataProtectionProvider = options.DataProtectionProvider;
            if (dataProtectionProvider != null)
            {
                manager.UserTokenProvider = new DataProtectorTokenProvider<ApplicationUser>(dataProtectionProvider.Create("ASP.NET Identity"));
            }

            manager.EmailService = new EmailService();
            return manager;
        }
    }
}
