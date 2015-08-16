using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BarTindr.Data.Models
{
    public class UserLocations
    {

        [Key]
        public int UserLocationsId { get; set; }

        public int ApplicationUserId { get; set; }
        [ForeignKey("ApplicationUserId")]
        [InverseProperty("Locations")]
        public virtual ApplicationUser ApplicationUser { get; set; }

        public int LocationId { get; set; }
        [ForeignKey("LocationId")]
        [InverseProperty("ApplicationUsers")]
        public virtual Location Location { get; set; }

    }
}
