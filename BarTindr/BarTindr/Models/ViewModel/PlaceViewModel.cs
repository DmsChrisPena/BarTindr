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
        public string WebsiteUrl { get; set; }
        public string ImageUrl { get; set; }
        public string Category { get; set; }
        public bool IsChosen { get; set; }
    }
}