using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BarTindr.Data.Models
{
    public class Location
    {
        [Key]
        public int LocationId { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string State { get; set; }
        public string City { get; set; }
        public double Longitude { get; set; }
        public double Latitude { get; set; }
        public int ZipCode { get; set; }
        public string Country { get; set; }
        public double Radius { get; set; }
        public bool IsActive { get; set; }
        public bool IsCurrentLocation { get; set; }

        public virtual ICollection<UserLocations> UserLocations { get; set; }
    }
}
