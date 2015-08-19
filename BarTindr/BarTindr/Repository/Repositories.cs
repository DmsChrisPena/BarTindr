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
                    Name = place.Name,
                    Rating = place.Rating,
                    IsClosed = place.IsClosed,
                    DisplayPhone = place.DisplayPhone,
                    TextSnipit = place.TextSnipit,
                    ImageUrl = place.ImageUrl,
                    Category = place.Category,
                    IsChosen = place.IsChosen
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
                    State = location.State,
                    City = location.City,
                    Longitude = location.Longitude,
                    Latitude = location.Latitude,
                    IsActive = location.IsActive
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
                Radius = u.Radius,
                Places = u.UserPlaces.Select(p => new PlaceViewModel
                {
                    PlaceId = p.PlaceId,
                    Name = p.Place.Name,
                    Rating = p.Place.Rating,
                    IsClosed = p.Place.IsClosed,
                    DisplayPhone = p.Place.DisplayPhone,
                    TextSnipit = p.Place.TextSnipit,
                    ImageUrl = p.Place.ImageUrl,
                    Category = p.Place.Category,
                    IsChosen = p.Place.IsChosen
                }).ToList(),
                Locations = u.UserLocations.Select(l => new LocationViewModel
                {
                    LocationId = l.LocationId,
                    State = l.Location.State,
                    City = l.Location.City,
                    ZipCode = l.Location.ZipCode,
                    Country = l.Location.Country,
                    Longitude = l.Location.Longitude,
                    Latitude = l.Location.Latitude,
                    IsActive = l.Location.IsActive
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
                Latitude = location.Latitude,
                Longitude = location.Longitude,
                City = location.City,
                State = location.State,
                ZipCode = location.ZipCode,
                Country = location.Country,
                IsActive = true
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


    }
}