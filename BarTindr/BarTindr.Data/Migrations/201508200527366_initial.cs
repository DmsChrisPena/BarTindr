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
                        Name = c.String(),
                        State = c.String(),
                        City = c.String(),
                        Longitude = c.Double(nullable: false),
                        Latitude = c.Double(nullable: false),
                        ZipCode = c.Int(nullable: false),
                        Country = c.String(),
                        Radius = c.Double(nullable: false),
                        IsActive = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.LocationId);
            
            CreateTable(
                "dbo.UserLocations",
                c => new
                    {
                        UserLocationsId = c.Int(nullable: false, identity: true),
                        ApplicationUserId = c.String(maxLength: 128),
                        LocationId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.UserLocationsId)
                .ForeignKey("dbo.AspNetUsers", t => t.ApplicationUserId)
                .ForeignKey("dbo.Locations", t => t.LocationId, cascadeDelete: true)
                .Index(t => t.ApplicationUserId)
                .Index(t => t.LocationId);
            
            CreateTable(
                "dbo.AspNetUsers",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        IsActive = c.Boolean(nullable: false),
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
                "dbo.UserPlaces",
                c => new
                    {
                        UserPlacesId = c.Int(nullable: false, identity: true),
                        ApplicationUserId = c.String(maxLength: 128),
                        PlaceId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.UserPlacesId)
                .ForeignKey("dbo.AspNetUsers", t => t.ApplicationUserId)
                .ForeignKey("dbo.Places", t => t.PlaceId, cascadeDelete: true)
                .Index(t => t.ApplicationUserId)
                .Index(t => t.PlaceId);
            
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
                "dbo.AspNetRoles",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        Name = c.String(nullable: false, maxLength: 256),
                        Discriminator = c.String(nullable: false, maxLength: 128),
                    })
                .PrimaryKey(t => t.Id)
                .Index(t => t.Name, unique: true, name: "RoleNameIndex");
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.AspNetUserRoles", "RoleId", "dbo.AspNetRoles");
            DropForeignKey("dbo.UserLocations", "LocationId", "dbo.Locations");
            DropForeignKey("dbo.UserPlaces", "PlaceId", "dbo.Places");
            DropForeignKey("dbo.UserPlaces", "ApplicationUserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.UserLocations", "ApplicationUserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.AspNetUserRoles", "UserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.AspNetUserLogins", "UserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.AspNetUserClaims", "UserId", "dbo.AspNetUsers");
            DropIndex("dbo.AspNetRoles", "RoleNameIndex");
            DropIndex("dbo.UserPlaces", new[] { "PlaceId" });
            DropIndex("dbo.UserPlaces", new[] { "ApplicationUserId" });
            DropIndex("dbo.AspNetUserRoles", new[] { "RoleId" });
            DropIndex("dbo.AspNetUserRoles", new[] { "UserId" });
            DropIndex("dbo.AspNetUserLogins", new[] { "UserId" });
            DropIndex("dbo.AspNetUserClaims", new[] { "UserId" });
            DropIndex("dbo.AspNetUsers", "UserNameIndex");
            DropIndex("dbo.UserLocations", new[] { "LocationId" });
            DropIndex("dbo.UserLocations", new[] { "ApplicationUserId" });
            DropTable("dbo.AspNetRoles");
            DropTable("dbo.Places");
            DropTable("dbo.UserPlaces");
            DropTable("dbo.AspNetUserRoles");
            DropTable("dbo.AspNetUserLogins");
            DropTable("dbo.AspNetUserClaims");
            DropTable("dbo.AspNetUsers");
            DropTable("dbo.UserLocations");
            DropTable("dbo.Locations");
        }
    }
}
