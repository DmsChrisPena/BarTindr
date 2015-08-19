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
    }
}