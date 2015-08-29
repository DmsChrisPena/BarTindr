using BarTindr.Repository;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace BarTindr.Controllers.Api
{
    public class ActivePlacesController : ApiController
    {
        private new Repositories _repo = new Repositories();

        [Authorize]
        public IHttpActionResult Get()
        {
            var userId = User.Identity.GetUserId();
            var vm = _repo.GetPlaces(userId);

            return Ok(vm);
        }

        [Authorize]
        [Route("api/ActivePlaces/{locationId}")]
        public IHttpActionResult Delete(int locationId)
        {
            _repo.DeleteSpots(locationId);

            return Ok();
        }
    }
}
