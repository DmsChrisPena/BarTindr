namespace BarTindr.Data.Migrations
{
    using Models;
    using Microsoft.AspNet.Identity.EntityFramework;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;
    using Microsoft.AspNet.Identity;

    internal sealed class Configuration : DbMigrationsConfiguration<BarTindr.Data.ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(BarTindr.Data.ApplicationDbContext context)
        {
            UserStore<ApplicationUser> userStore = new UserStore<ApplicationUser>(context);
            UserManager<ApplicationUser> userManager = new UserManager<ApplicationUser>(userStore);

            Location[] location =
            {
                new Location { State = "Texas", City = "Houston", Latitude = 654.265465476587,  Longitude = 465.546543648398, IsActive = true, ZipCode = 77450, Country = "USA", Radius = 15, Name = "Work", Address = "707 Hunters Creek Way", IsCurrentLocation = false }
            };

            context.Locations.AddOrUpdate(l => l.State, location);

            Place[] place =
            {
                new Place { Name = "Chuy/'s", Rating = 5, IsClosed = false, DisplayPhone = "725-555-2288", TextSnipit = "This place rocks", ImageUrl = "http://goo.gl/KX1sP4", Category = "Tex-Mex", IsChosen = true },
                new Place { Name = "Chimy/'s", Rating = 5, IsClosed = false, DisplayPhone = "806-555-1584", TextSnipit = "Favorite place on planet earth", ImageUrl = "http://goo.gl/aUaVi2", Category = "Margaritas", IsChosen = true }
            };

            context.Places.AddOrUpdate(p => p.Name, place);

            var cade = userManager.FindByName("cadeawinter@gmail.com");

            if (cade == null)
            {
                cade = new ApplicationUser
                {
                    UserName = "cadeawinter@gmail.com",
                    Email = "cadeawinter@gmail.com",
                    IsActive = true
                };

                userManager.Create(cade, "123456");
            }

            var chris = userManager.FindByName("chrispena@gmail.com");

            if (chris == null)
            {
                chris = new ApplicationUser
                {
                    UserName = "chrispena@gmail.com",
                    Email = "chrispena@gmail.com",
                    IsActive = true
                };

                userManager.Create(chris, "123456");
            }
        }
    }
}
