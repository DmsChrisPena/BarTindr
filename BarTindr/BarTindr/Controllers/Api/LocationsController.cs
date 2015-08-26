using BarTindr.Models.ViewModel;
using BarTindr.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Microsoft.AspNet.Identity;

namespace BarTindr.Controllers.Api
{
    public class LocationsController : ApiController
    {
        private new Repositories _repo = new Repositories();

        public IHttpActionResult Get()
        {
            var locations = _repo.GetLocations();

            return Ok(locations);
        }

        [Route("api/Locations/{locationId}")]
        public IHttpActionResult Get(int locationId)
        {
            var location = _repo.GetEditLocation(locationId);

            return Ok(location);
        }

        [Authorize]
        public IHttpActionResult Post(LocationViewModel location)
        {
            var userId = User.Identity.GetUserId();

            _repo.SetNewLocation(location, userId);

            return Ok();
        }

        [Authorize]
        public IHttpActionResult Put(LocationViewModel location)
        {
            _repo.UpdateLocation(location);

            return Ok();
        }

        [Authorize]
        [Route("api/Locations/{locationId}")]
        public IHttpActionResult Post(int locationId)
        {
            _repo.ChangeActiveLocation(locationId);

            return Ok();
        }
    }
}
