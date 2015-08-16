namespace BarTindr.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class initial : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Locations",
                c => new
                    {
                        LocationId = c.Int(nullable: false, identity: true),
                        State = c.String(),
                        City = c.String(),
                        Longitude = c.Decimal(nullable: false, precision: 18, scale: 2),
                        Latitude = c.Decimal(nullable: false, precision: 18, scale: 2),
                        IsActive = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.LocationId);
            
            CreateTable(
                "dbo.AspNetUsers",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        IsActive = c.Boolean(nullable: false),
                        Radius = c.Int(nullable: false),
                        Email = c.String(maxLength: 256),
                        EmailConfirmed = c.Boolean(nullable: false),
                        PasswordHash = c.String(),
                        SecurityStamp = c.String(),
                        PhoneNumber = c.String(),
                        PhoneNumberConfirmed = c.Boolean(nullable: false),
                        TwoFactorEnabled = c.Boolean(nullable: false),
                        LockoutEndDateUtc = c.DateTime(),
                        LockoutEnabled = c.Boolean(nullable: false),
                        AccessFailedCount = c.Int(nullable: false),
                        UserName = c.String(nullable: false, maxLength: 256),
                    })
                .PrimaryKey(t => t.Id)
                .Index(t => t.UserName, unique: true, name: "UserNameIndex");
            
            CreateTable(
                "dbo.AspNetUserClaims",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        UserId = c.String(nullable: false, maxLength: 128),
                        ClaimType = c.String(),
                        ClaimValue = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.AspNetUsers", t => t.UserId, cascadeDelete: true)
                .Index(t => t.UserId);
            
            CreateTable(
                "dbo.AspNetUserLogins",
                c => new
                    {
                        LoginProvider = c.String(nullable: false, maxLength: 128),
                        ProviderKey = c.String(nullable: false, maxLength: 128),
                        UserId = c.String(nullable: false, maxLength: 128),
                    })
                .PrimaryKey(t => new { t.LoginProvider, t.ProviderKey, t.UserId })
                .ForeignKey("dbo.AspNetUsers", t => t.UserId, cascadeDelete: true)
                .Index(t => t.UserId);
            
            CreateTable(
                "dbo.Places",
                c => new
                    {
                        PlaceId = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Rating = c.Int(nullable: false),
                        IsClosed = c.Boolean(nullable: false),
                        DisplayPhone = c.String(),
                        TextSnipit = c.String(),
                        ImageUrl = c.String(),
                        Category = c.String(),
                        IsChosen = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.PlaceId);
            
            CreateTable(
                "dbo.AspNetUserRoles",
                c => new
                    {
                        UserId = c.String(nullable: false, maxLength: 128),
                        RoleId = c.String(nullable: false, maxLength: 128),
                    })
                .PrimaryKey(t => new { t.UserId, t.RoleId })
                .ForeignKey("dbo.AspNetUsers", t => t.UserId, cascadeDelete: true)
                .ForeignKey("dbo.AspNetRoles", t => t.RoleId, cascadeDelete: true)
                .Index(t => t.UserId)
                .Index(t => t.RoleId);
            
            CreateTable(
                "dbo.AspNetRoles",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        Name = c.String(nullable: false, maxLength: 256),
                        Discriminator = c.String(nullable: false, maxLength: 128),
                    })
                .PrimaryKey(t => t.Id)
                .Index(t => t.Name, unique: true, name: "RoleNameIndex");
            
            CreateTable(
                "dbo.ApplicationUserLocations",
                c => new
                    {
                        ApplicationUser_Id = c.String(nullable: false, maxLength: 128),
                        Location_LocationId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.ApplicationUser_Id, t.Location_LocationId })
                .ForeignKey("dbo.AspNetUsers", t => t.ApplicationUser_Id, cascadeDelete: true)
                .ForeignKey("dbo.Locations", t => t.Location_LocationId, cascadeDelete: true)
                .Index(t => t.ApplicationUser_Id)
                .Index(t => t.Location_LocationId);
            
            CreateTable(
                "dbo.PlaceApplicationUsers",
                c => new
                    {
                        Place_PlaceId = c.Int(nullable: false),
                        ApplicationUser_Id = c.String(nullable: false, maxLength: 128),
                    })
                .PrimaryKey(t => new { t.Place_PlaceId, t.ApplicationUser_Id })
                .ForeignKey("dbo.Places", t => t.Place_PlaceId, cascadeDelete: true)
                .ForeignKey("dbo.AspNetUsers", t => t.ApplicationUser_Id, cascadeDelete: true)
                .Index(t => t.Place_PlaceId)
                .Index(t => t.ApplicationUser_Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.AspNetUserRoles", "RoleId", "dbo.AspNetRoles");
            DropForeignKey("dbo.AspNetUserRoles", "UserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.PlaceApplicationUsers", "ApplicationUser_Id", "dbo.AspNetUsers");
            DropForeignKey("dbo.PlaceApplicationUsers", "Place_PlaceId", "dbo.Places");
            DropForeignKey("dbo.AspNetUserLogins", "UserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.ApplicationUserLocations", "Location_LocationId", "dbo.Locations");
            DropForeignKey("dbo.ApplicationUserLocations", "ApplicationUser_Id", "dbo.AspNetUsers");
            DropForeignKey("dbo.AspNetUserClaims", "UserId", "dbo.AspNetUsers");
            DropIndex("dbo.PlaceApplicationUsers", new[] { "ApplicationUser_Id" });
            DropIndex("dbo.PlaceApplicationUsers", new[] { "Place_PlaceId" });
            DropIndex("dbo.ApplicationUserLocations", new[] { "Location_LocationId" });
            DropIndex("dbo.ApplicationUserLocations", new[] { "ApplicationUser_Id" });
            DropIndex("dbo.AspNetRoles", "RoleNameIndex");
            DropIndex("dbo.AspNetUserRoles", new[] { "RoleId" });
            DropIndex("dbo.AspNetUserRoles", new[] { "UserId" });
            DropIndex("dbo.AspNetUserLogins", new[] { "UserId" });
            DropIndex("dbo.AspNetUserClaims", new[] { "UserId" });
            DropIndex("dbo.AspNetUsers", "UserNameIndex");
            DropTable("dbo.PlaceApplicationUsers");
            DropTable("dbo.ApplicationUserLocations");
            DropTable("dbo.AspNetRoles");
            DropTable("dbo.AspNetUserRoles");
            DropTable("dbo.Places");
            DropTable("dbo.AspNetUserLogins");
            DropTable("dbo.AspNetUserClaims");
            DropTable("dbo.AspNetUsers");
            DropTable("dbo.Locations");
        }
    }
}
