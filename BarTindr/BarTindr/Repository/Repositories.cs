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

        public List<PlaceViewModel> GetPlaces()
        {
            List<PlaceViewModel> vm = new List<PlaceViewModel>();

            var places = _db.Places;

            foreach (var place in places)
            {
                vm.Add(new PlaceViewModel
                {
                    PlaceId = place.PlaceId,
                    Name = place.Name,
                    Rating = place.Rating,
                    IsOpen = place.IsOpen,
                    Status = place.Status,
                    Phone = place.Phone,
                    Address = place.Address,
                    WebsiteUrl = place.WebsiteUrl,
                    ImageUrl = place.ImageUrl,
                    Category = place.Category,
                    IsLiked = place.IsLiked,
                    IsDisliked = place.IsDisliked
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

        public List<UserViewModel> GetUserPlaces(string userId)
        {

            var user = _db.Users;

            var vm = user.Where(i => i.Id == userId).Select(u => new UserViewModel {
                UserId = u.Id,
                Email = u.Email,
                IsActive = u.IsActive,
                Places = u.UserPlaces.Select(p => new PlaceViewModel
                {
                    PlaceId = p.PlaceId,
                    Name = p.Place.Name,
                    Rating = p.Place.Rating,
                    IsOpen = p.Place.IsOpen,
                    Status = p.Place.Status,
                    Phone = p.Place.Phone,
                    Address = p.Place.Address,
                    WebsiteUrl = p.Place.WebsiteUrl,
                    ImageUrl = p.Place.ImageUrl,
                    Category = p.Place.Category,
                    IsLiked = p.Place.IsLiked,
                    IsDisliked = p.Place.IsDisliked
                }).ToList(),
                Locations = u.UserLocations.Select(l => new LocationViewModel
                {
                    LocationId = l.LocationId,
                    Name = l.Location.Name,
                    Address = l.Location.Address,
                    State = l.Location.State,
                    City = l.Location.City,
                    ZipCode = l.Location.ZipCode,
                    Country = l.Location.Country,
                    FullAddress = l.Location.FullAddress,
                    Longitude = l.Location.Longitude,
                    Latitude = l.Location.Latitude,
                    Radius = l.Location.Radius,
                    IsActive = l.Location.IsActive,
                    IsCurrentLocation = l.Location.IsCurrentLocation
                }).ToList()
            }).ToList();

            return vm;
        }

        public void SetNewLocation(LocationViewModel location, string user)
        {
            var oldLoc = _db.Locations.Where(l => l.UserLocations.FirstOrDefault().ApplicationUserId == user && l.IsActive).FirstOrDefault();

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
                IsCurrentLocation = location.IsCurrentLocation
            };

            _db.Locations.Add(loc);

            _db.SaveChanges();


            var userLocation = new UserLocations
            {
                LocationId = loc.LocationId,
                ApplicationUserId = user
            };

            _db.UserLocations.Add(userLocation);

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

    }
}