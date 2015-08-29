using BarTindr.Data;
using BarTindr.Data.Models;
using BarTindr.Models.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BarTindr.Repository
{
    public class Repositories
    {
        ApplicationDbContext _db = new ApplicationDbContext();

        public List<SendPlacesViewModel> GetPlaces()
        {
            List<SendPlacesViewModel> vm = new List<SendPlacesViewModel>();

            var places = _db.Places;

            foreach (var place in places)
            {
                vm.Add(new SendPlacesViewModel
                {
                    PlaceId = place.PlaceId,
                    Name = place.Name,
                    Rating = place.Rating,
                    IsOpen = place.IsOpen,
                    Status = place.Status,
                    Phone = place.Phone,
                    Address = place.Address,
                    City = place.City,
                    State = place.State,
                    Zip = place.Zip,
                    CrossStreet = place.CrossStreet,
                    FullAddress = place.FullAddress,
                    Distance = place.Distance,
                    Latitude = place.Latitude,
                    Longitude = place.Longitude,
                    WebsiteUrl = place.WebsiteUrl,
                    Category = place.Category,
                    Prefix = place.Prefix,
                    Suffix = place.Suffix,
                    Height = place.Height,
                    Width = place.Width,
                    Tier = place.Tier,
                    IsLiked = place.IsLiked,
                    IsDisliked = place.IsDisliked,
                    CanonicalName = place.CanonicalName
                });
            }

            return vm;
        }

        public List<LocationViewModel> GetLocations()
        {
            List<LocationViewModel> vm = new List<LocationViewModel>();

            var locations = _db.Locations;

            foreach (var location in locations)
            {
                vm.Add(new LocationViewModel
                {
                    LocationId = location.LocationId,
                    Name = location.Name,
                    Address = location.Address,
                    Country = location.Country,
                    ZipCode = location.ZipCode,
                    State = location.State,
                    City = location.City,
                    FullAddress = location.FullAddress,
                    Longitude = location.Longitude,
                    Latitude = location.Latitude,
                    Radius = location.Radius,
                    IsActive = location.IsActive,
                    IsCurrentLocation = location.IsCurrentLocation
                });
            }

            return vm;
        }

        public List<UserViewModel> GetUserLocations(string userId)
        {

            var user = _db.Users;

            var vm = user.Where(i => i.Id == userId).Select(u => new UserViewModel {
                UserId = u.Id,
                Email = u.Email,
                IsDeleted = u.IsDeleted,
                Locations = u.Locations.Select(l => new LocationViewModel
                {
                    LocationId = l.LocationId,
                    Name = l.Name,
                    Address = l.Address,
                    State = l.State,
                    City = l.City,
                    ZipCode = l.ZipCode,
                    Country = l.Country,
                    FullAddress = l.FullAddress,
                    Longitude = l.Longitude,
                    Latitude = l.Latitude,
                    PlacesNumber = l.Places.Count(),
                    Radius = l.Radius,
                    IsActive = l.IsActive,
                    IsCurrentLocation = l.IsCurrentLocation
                }).ToList()
            }).ToList();

            return vm;
        }

        public void SetNewLocation(LocationViewModel location, string userId)
        {
            var oldLoc = _db.Locations.Where(l => l.UserId == userId && l.IsActive).FirstOrDefault();

            if(oldLoc != null)
            {
                oldLoc.IsActive = false;
            }


            var loc = new Location
            {
                Name = location.Name,
                Latitude = location.Latitude,
                Longitude = location.Longitude,
                Address = location.Address,
                City = location.City,
                State = location.State,
                ZipCode = location.ZipCode,
                Country = location.Country,
                FullAddress = location.FullAddress,
                Radius = location.Radius,
                IsActive = true,
                IsCurrentLocation = location.IsCurrentLocation,
                UserId = userId
            };

            _db.Locations.Add(loc);

            _db.SaveChanges();

        }

        public void UpdateLocation(LocationViewModel location)
        {
            var loc = _db.Locations.Where(l => l.LocationId == location.LocationId).FirstOrDefault();

            if(loc != null)
            {
                if (location.Name != null) loc.Name = location.Name;
                if (location.Address != null) loc.Address = location.Address;
                if (location.State != null) loc.State = location.State;
                if (location.City != null) loc.City = location.City;
                if (location.FullAddress != null) loc.FullAddress = location.FullAddress;
                if (!location.Longitude.Equals(0)) loc.Longitude = location.Longitude;
                if (!location.Latitude.Equals(0)) loc.Latitude = location.Latitude;
                if (location.ZipCode != 0) loc.ZipCode = location.ZipCode;
                if (location.Country != null) loc.Country = location.Country;
                if (!location.Radius.Equals(0)) loc.Radius = location.Radius;
            }

            _db.SaveChanges();
        }

        public LocationViewModel GetEditLocation(int locationId)
        {
            var locations = _db.Locations;

            var location = locations.Where(l => l.LocationId == locationId).Select(u => new LocationViewModel
            {
                LocationId = u.LocationId,
                Name = u.Name,
                Address = u.Address,
                State =  u.State,
                City = u.City,
                ZipCode = u.ZipCode,
                Country = u.Country,
                FullAddress = u.FullAddress,
                Longitude = u.Longitude,
                Latitude = u.Latitude,
                Radius = u.Radius,
                IsActive = u.IsActive,
                IsCurrentLocation = u.IsCurrentLocation
            }).FirstOrDefault();

            return location;
        }

        public UserViewModel GetActiveLocation(string userId)
        {
            var user = _db.Users;

            var vm = user.Where(i => i.Id == userId).Select(u => new UserViewModel
            {
                UserId = u.Id,
                Email = u.Email,
                IsDeleted = u.IsDeleted,
                Locations = u.Locations.Select(l => new LocationViewModel
                {
                    LocationId = l.LocationId,
                    Name = l.Name,
                    Address = l.Address,
                    State = l.State,
                    City = l.City,
                    ZipCode = l.ZipCode,
                    Country = l.Country,
                    FullAddress = l.FullAddress,
                    Longitude = l.Longitude,
                    Latitude = l.Latitude,
                    Radius = l.Radius,
                    IsActive = l.IsActive,
                    IsCurrentLocation = l.IsCurrentLocation
                }).Where(t => t.IsActive == true).ToList()
            }).FirstOrDefault();

            return vm;
        }

        public void ChangeActiveLocation(int locationId, string userId)
        {
            var loc = _db.Locations;

            var oldLoc = loc.Where(l => l.IsActive == true && l.UserId == userId).FirstOrDefault();

            if(oldLoc != null)
            {
                oldLoc.IsActive = false;
            }

            var newLoc = loc.Where(l => l.LocationId == locationId && l.UserId == userId).FirstOrDefault();

            newLoc.IsActive = true;

            _db.SaveChanges();

        }

        public void DeleteLocation(int locationId)
        {
            var loc = _db.Locations.Where(l => l.LocationId == locationId).FirstOrDefault();

            _db.Locations.Remove(loc);

            _db.SaveChanges();
        }

        public void LikePlaceSave(PlaceViewModel place, string userId)
        {
            var pla = new Place();
            var location = _db.Locations;
            if(place.ImageUrl != null && place.Tier != null && place.Hours != null)
            {
                pla = new Place
                {
                    Name = place.Name,
                    Rating = place.Rating,
                    IsOpen = place.Hours.IsOpen,
                    Status = place.Hours.Status,
                    Phone = place.Phone,
                    Address = place.Address,
                    City = place.City,
                    State = place.State,
                    Zip = place.Zip,
                    CrossStreet = place.CrossStreet,
                    FullAddress = place.FullAddress,
                    Distance = place.Distance,
                    Latitude = place.Latitude,
                    Longitude = place.Longitude,
                    WebsiteUrl = place.WebsiteUrl,
                    Category = place.Category,
                    Prefix = place.ImageUrl.Items.FirstOrDefault().Prefix,
                    Suffix = place.ImageUrl.Items.FirstOrDefault().Suffix,
                    Height = place.ImageUrl.Items.FirstOrDefault().Height,
                    Width = place.ImageUrl.Items.FirstOrDefault().Width,
                    Tier = place.Tier.Tier,
                    IsLiked = place.IsLiked,
                    IsDisliked = place.IsDisliked,
                    CanonicalName = place.CanonicalName,
                    LocationId = location.Where(l => l.IsActive == true && l.UserId == userId).FirstOrDefault().LocationId
                };
            } else if(place.ImageUrl != null && place.Tier != null)
            {
                pla = new Place
                {
                    Name = place.Name,
                    Rating = place.Rating,
                    IsOpen = false,
                    Status = "Call to Check",
                    Phone = place.Phone,
                    Address = place.Address,
                    City = place.City,
                    State = place.State,
                    Zip = place.Zip,
                    CrossStreet = place.CrossStreet,
                    FullAddress = place.FullAddress,
                    Distance = place.Distance,
                    Latitude = place.Latitude,
                    Longitude = place.Longitude,
                    WebsiteUrl = place.WebsiteUrl,
                    Category = place.Category,
                    Prefix = place.ImageUrl.Items.FirstOrDefault().Prefix,
                    Suffix = place.ImageUrl.Items.FirstOrDefault().Suffix,
                    Height = place.ImageUrl.Items.FirstOrDefault().Height,
                    Width = place.ImageUrl.Items.FirstOrDefault().Width,
                    Tier = place.Tier.Tier,
                    IsLiked = place.IsLiked,
                    IsDisliked = place.IsDisliked,
                    CanonicalName = place.CanonicalName,
                    LocationId = location.Where(l => l.IsActive == true && l.UserId == userId).FirstOrDefault().LocationId
                };
            } else if(place.ImageUrl != null)
            {
                pla = new Place
                {
                    Name = place.Name,
                    Rating = place.Rating,
                    IsOpen = false,
                    Status = "Call to Check",
                    Phone = place.Phone,
                    Address = place.Address,
                    City = place.City,
                    State = place.State,
                    Zip = place.Zip,
                    CrossStreet = place.CrossStreet,
                    FullAddress = place.FullAddress,
                    Distance = place.Distance,
                    Latitude = place.Latitude,
                    Longitude = place.Longitude,
                    WebsiteUrl = place.WebsiteUrl,
                    Category = place.Category,
                    Prefix = place.ImageUrl.Items.FirstOrDefault().Prefix,
                    Suffix = place.ImageUrl.Items.FirstOrDefault().Suffix,
                    Height = place.ImageUrl.Items.FirstOrDefault().Height,
                    Width = place.ImageUrl.Items.FirstOrDefault().Width,
                    Tier = 1,
                    IsLiked = place.IsLiked,
                    IsDisliked = place.IsDisliked,
                    CanonicalName = place.CanonicalName,
                    LocationId = location.Where(l => l.IsActive == true && l.UserId == userId).FirstOrDefault().LocationId
                };
            }
            else
            {
                pla = new Place
                {
                    Name = place.Name,
                    Rating = place.Rating,
                    IsOpen = false,
                    Status = "Call to Check",
                    Phone = place.Phone,
                    Address = place.Address,
                    City = place.City,
                    State = place.State,
                    Zip = place.Zip,
                    CrossStreet = place.CrossStreet,
                    FullAddress = place.FullAddress,
                    Distance = place.Distance,
                    Latitude = place.Latitude,
                    Longitude = place.Longitude,
                    WebsiteUrl = place.WebsiteUrl,
                    Category = place.Category,
                    Prefix = "",
                    Suffix = "",
                    Height = 0,
                    Width = 0,
                    Tier = 1,
                    IsLiked = place.IsLiked,
                    IsDisliked = place.IsDisliked,
                    CanonicalName = place.CanonicalName,
                    LocationId = location.Where(l => l.IsActive == true && l.UserId == userId).FirstOrDefault().LocationId
                };
            }


            _db.Places.Add(pla);
            _db.SaveChanges();
        }

        public LocationViewModel GetPlaces(string userId)
        {
            var loc = _db.Locations;

            var activePlace = loc.Where(l => l.UserId == userId && l.IsActive == true).Select(u => new LocationViewModel
            {
                Name = u.Name,
                Address = u.Address,
                State = u.State,
                City = u.City,
                ZipCode = u.ZipCode,
                Country = u.Country,
                FullAddress = u.FullAddress,
                Longitude = u.Longitude,
                Latitude = u.Latitude,
                Radius = u.Radius,
                IsActive = u.IsActive,
                IsCurrentLocation = u.IsCurrentLocation,
                Places = u.Places.Select(p => new SendPlacesViewModel
                {
                    PlaceId = p.PlaceId,
                    Name = p.Name,
                    Rating = p.Rating,
                    IsOpen = p.IsOpen,
                    Status = p.Status,
                    Phone = p.Phone,
                    Address = p.Address,
                    City = p.City,
                    State = p.State,
                    Zip = p.Zip,
                    CrossStreet = p.CrossStreet,
                    FullAddress = p.FullAddress,
                    Distance = p.Distance,
                    Latitude = p.Latitude,
                    Longitude = p.Longitude,
                    WebsiteUrl = p.WebsiteUrl,
                    Category = p.Category,
                    Prefix = p.Prefix,
                    Suffix = p.Suffix,
                    Height = p.Height,
                    Width = p.Width,
                    Tier = p.Tier,
                    IsLiked = p.IsLiked,
                    IsDisliked = p.IsDisliked,
                    CanonicalName = p.CanonicalName
                }).ToList()
            }
            ).FirstOrDefault();

            return activePlace;

        }

        public void DeleteSpot(int placeId)
        {
            var spot = _db.Places.Where(p => p.PlaceId == placeId).FirstOrDefault();

            _db.Places.Remove(spot);

            _db.SaveChanges();
        }

    }
}