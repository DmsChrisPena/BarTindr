using BarTindr.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

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
    }
}
