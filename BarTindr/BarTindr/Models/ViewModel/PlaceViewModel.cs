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
        public bool IsClosed { get; set; }
        public string DisplayPhone { get; set; }
        public string TextSnipit { get; set; }
        public string ImageUrl { get; set; }
        public string Category { get; set; }
        public bool IsChosen { get; set; }
    }
}