using BarTindr.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BarTindr.Models.ViewModel
{
    public class UserViewModel
    {
        public string UserId { get; set; }
        public string Email { get; set; }
        public int Radius { get; set; }
        public bool IsActive { get; set; }

        public List<PlaceViewModel> Places { get; set; }
        public List<LocationViewModel> Locations { get; set; }


        //public int PlaceId { get; set; }
        //public string PlaceName { get; set; }
        //public int Rating { get; set; }
        //public bool IsClosed { get; set; }
        //public string DisplayPhone { get; set; }
        //public string TextSnipit { get; set; }
        //public string PlaceImageUrl { get; set; }
        //public string PlaceCategory { get; set; }
        //public bool IsChosen { get; set; }


        //public int LocationId { get; set; }
        //public string State { get; set; }
        //public string City { get; set; }
        //public decimal Longitude { get; set; }
        //public decimal Latitude { get; set; }
        //public bool LocationIsActive { get; set; }
    }
}