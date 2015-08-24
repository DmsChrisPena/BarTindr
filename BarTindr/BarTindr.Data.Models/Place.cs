using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BarTindr.Data.Models
{
    public class Place
    {
        [Key]
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

        public virtual ICollection<UserPlaces> UserPlaces { get; set; }

    }
}
