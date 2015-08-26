using BarTindr.Models.ViewModel;
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
    public class PlacesController : ApiController
    {
        private new Repositories _repo = new Repositories();

        public IHttpActionResult Get()
        {
            var userId = User.Identity.GetUserId();
            var places = _repo.GetActiveLocation(userId);

            return Ok(places);
        }

        public IHttpActionResult Post(PlaceViewModel vm)
        {
            var userId = User.Identity.GetUserId();
            _repo.LikePlaceSave(vm, userId);

            return Ok("It worked");
        }

    }
}
