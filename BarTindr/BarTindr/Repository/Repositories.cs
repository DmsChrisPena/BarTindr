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

        public List<UserViewModel> GetUserPlaces()
        {

            var user = _db.Users;

            var vm = user.Select(u => new UserViewModel
            {
                UserId = u.Id,
                Email = u.Email,
                IsActive = u.IsActive,
                Radius = u.Radius,
                Places = u.Places.Select(p => new PlaceViewModel {
                    PlaceId = p.PlaceId,
                    Name = p.Name,
                    Rating = p.Rating,
                    IsClosed = p.IsClosed,
                    DisplayPhone = p.DisplayPhone,
                    TextSnipit = p.TextSnipit,
                    ImageUrl = p.ImageUrl,
                    Category = p.Category,
                    IsChosen = p.IsChosen
                }).ToList(),
                Locations = u.Locations.Select(l => new LocationViewModel
                {
                    LocationId = l.LocationId,
                    State = l.State,
                    City = l.City,
                    Longitude = l.Longitude,
                    Latitude = l.Latitude,
                    IsActive = l.IsActive
                }).ToList()
            }).ToList();


            return vm;
        }


    }
}