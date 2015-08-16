using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BarTindr.Data.Models
{
    public class UserPlaces
    {
        [Key]
        public int UserPlacesId { get; set; }

        public int ApplicationUserId { get; set; }
        [ForeignKey("ApplicationUserId")]
        [InverseProperty("Places")]
        public virtual ApplicationUser ApplicationUser { get; set; }

        public int PlaceId { get; set; }
        [ForeignKey("PlaceId")]
        [InverseProperty("ApplicationUsers")]
        public virtual Place Place { get; set; }

    }
}
