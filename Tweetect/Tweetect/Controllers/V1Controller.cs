using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tweetinvi;
using Microsoft.AspNetCore.Mvc;
using Helpers;

namespace Tweetect.Controllers
{
    [Route("[controller]")]
    public class V1Controller : Controller
    {
        private string CONSUMER_KEY = "Yq2nTsdKdK9PJukcuqXV1wNK0";
        private string CONSUMER_SECRET = "T0iFhOH7lpWESscrRm4erUlM9FBiYfdXgoHdZhQqSUSkhzcVnZ";
        private string ACCESS_TOKEN = "956558327265230848-10HVJZai0cbcFonR1TyPHaJhroMcoA1";
        private string ACCESS_TOKEN_SECRET = "V1wMppm5YHTUfp1NpFG551GEv3AtpXubG1PFuqElsRsOr";

        [HttpGet("{handle}")]
        public string Get(string handle)
        {

            Auth.SetUserCredentials(CONSUMER_KEY, CONSUMER_SECRET, ACCESS_TOKEN, ACCESS_TOKEN_SECRET);
            var account = Tweetinvi.User.GetUserFromScreenName(handle);
            PythonScripting.run(handle);
            return "Got: " + handle;
        }

    }
}
