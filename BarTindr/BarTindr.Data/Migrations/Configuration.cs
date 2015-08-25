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
                new Location { State = "Texas", City = "Houston", FullAddress = "707 Hunters Creek Way, Houston, TX 77450, USA", Latitude = 654.265465476587,  Longitude = 465.546543648398, IsActive = true, ZipCode = 77450, Country = "USA", Radius = 15, Name = "Work", Address = "707 Hunters Creek Way", IsCurrentLocation = false }
            };

            context.Locations.AddOrUpdate(l => l.State, location);

            Place[] place =
            {
                new Place { Name = "Chuy/'s", Rating = 5, IsOpen = false, Status = "Opens at 11 am", Phone = "725-555-2288", Address = "1714 Turkey Track Trail, Sugar Land, TX 77854", ImageUrl = "http://goo.gl/KX1sP4", WebsiteUrl = "https://www.chuys.com/", Category = "Tex-Mex", IsLiked = true, IsDisliked = false, Latitude = 30.2500, Longitude =  97.7500 },
                new Place { Name = "Chimy/'s", Rating = 5, IsOpen = false, Status = "Closes at 12 am", Phone = "806-655-1584", Address = "2500 Broadway, Lubbock, TX 79015", ImageUrl = "http://goo.gl/KX1sP4", WebsiteUrl = "http://chimys.com/", Category = "Greatest Place Ever!!!", IsLiked = true, IsDisliked = false, Latitude = 34.4258, Longitude = 119.7142 }
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
