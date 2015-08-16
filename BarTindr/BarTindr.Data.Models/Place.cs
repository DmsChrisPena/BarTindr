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
        public bool IsClosed { get; set; }
        public string DisplayPhone { get; set; }
        public string TextSnipit { get; set; }
        public string ImageUrl { get; set; }
        public string Category { get; set; }
        public bool IsChosen { get; set; }

        public virtual ICollection<ApplicationUser> ApplicationUsers { get; set; }
    }
}
