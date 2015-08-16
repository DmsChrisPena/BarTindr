using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BarTindr.Models.ViewModel
{
    public class LocationViewModel
    {
        public int LocationId { get; set; }
        public string State { get; set; }
        public string City { get; set; }
        public decimal Longitude { get; set; }
        public decimal Latitude { get; set; }
        public bool IsActive { get; set; }
    }
}