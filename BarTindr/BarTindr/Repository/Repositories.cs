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

        public UserViewModel GetUser()
        {

            var user = _db.Users.First();

            UserViewModel vm = new UserViewModel()
            {
                Email = user.Email,
                Radius = user.Radius,
                IsActive = user.IsActive,
                LocationId = user.Location.LocationId,
                State = user.Location.State,
                City = user.Location.City,
                Longitude = user.Location.Longitude,
                Latitude = user.Location.Latitude,
                LocationIsActive = user.Location.IsActive,
                PlaceId = user.Place.PlaceId,
                PlaceName = user.Place.Name,
                Rating = user.Place.Rating,
                IsClosed = user.Place.IsClosed,
                DisplayPhone = user.Place.DisplayPhone,
                TextSnipit = user.Place.TextSnipit,
                PlaceImageUrl = user.Place.ImageUrl,
                PlaceCategory = user.Place.Category,
                IsChosen = user.Place.IsChosen
            };




            //foreach (var use in user)
            //{
            //    vm.Add(new UserViewModel
            //    {
            //          Email = use.Email,
            //        Radius = use.Radius,
            //        IsActive = use.IsActive,
            //        LocationId = use.Location.LocationId,
            //        State = use.Location.State,
            //        City = use.Location.City,
            //        Longitude = use.Location.Longitude,
            //        Latitude = use.Location.Latitude,
            //        LocationIsActive = use.Location.IsActive,
            //        PlaceId = use.Place.PlaceId,
            //        PlaceName = use.Place.Name,
            //        Rating = use.Place.Rating,
            //        IsClosed = use.Place.IsClosed,
            //        DisplayPhone = use.Place.DisplayPhone,
            //        TextSnipit = use.Place.TextSnipit,
            //        PlaceImageUrl = use.Place.ImageUrl,
            //        PlaceCategory = use.Place.Category,
            //        IsChosen = use.Place.IsChosen
            //    });
            //}

            return vm;
        }

    }
}