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
    public class UserController : ApiController
    {
        private new Repositories _repo = new Repositories();

        [Authorize]
        public IHttpActionResult Get()
        {
            var userId = User.Identity.GetUserId();

            var user = _repo.GetUserPlaces(userId);

            return Ok(user);
        }

    }
}
