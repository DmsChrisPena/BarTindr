using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BarTindr.Models.ViewModel
{
    public class PlaceViewModel
    {
        public int PlaceId { get; set; }
        public string Name { get; set; }
        public int Rating { get; set; }
        public bool IsOpen { get; set; }
        public string Status { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public int Zip { get; set; }
        public string CrossStreet { get; set; }
        public string FullAddress { get; set; }
        public int Distance { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public string WebsiteUrl { get; set; }
        public string Category { get; set; }
        public string ImageUrl { get; set; }
        public int Tier { get; set; }
        public bool IsLiked { get; set; }
        public bool IsDisliked { get; set; }
    }
}