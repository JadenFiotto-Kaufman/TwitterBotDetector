using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tweetinvi;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using System.IO;
using System.Reflection;
using System.Net.Http;
using Newtonsoft.Json.Linq;
using Tweetinvi.Models;
using Microsoft.AspNetCore.Http;

namespace Tweetect.Controllers
{
    [Route("[controller]")]
    public class V1Controller : Controller
    {
        private string CONSUMER_KEY = "Yq2nTsdKdK9PJukcuqXV1wNK0";
        private string CONSUMER_SECRET = "T0iFhOH7lpWESscrRm4erUlM9FBiYfdXgoHdZhQqSUSkhzcVnZ";

        [HttpGet("Get/{json}")]
        public ActionResult Get(string json, string filters = "")
        {
            JObject d = JObject.Parse(json);
            try
            {
                ProcessStartInfo start = new ProcessStartInfo();
                start.FileName = Directory.GetCurrentDirectory() + "\\Python64\\python.exe";
                start.Arguments = string.Format("\"{0}\" \"{1}\" \"{2}\" \"{3}\"", Directory.GetCurrentDirectory() + "\\Python64\\CODE\\__init__.py", d["handle"].ToString(), d["access_token"].ToString(), d["access_secret"].ToString());
                start.UseShellExecute = false;
                start.CreateNoWindow = true;
                start.RedirectStandardOutput = true;
                start.RedirectStandardError = true; 
                string result = "";
                using (Process process = Process.Start(start))
                {
                    using (StreamReader reader = process.StandardOutput)
                    {
                        string stderr = process.StandardError.ReadToEnd();
                        result = reader.ReadToEnd();

                    }
                    process.WaitForExit();
                }
                JObject data = JObject.Parse(result);
                data["Status"] = "OK";
                return new JsonResult(data);
            }
            catch (Exception e) {
                var x  = String.Join(":::",Directory.GetDirectories(Directory.GetCurrentDirectory(), "*", SearchOption.AllDirectories));
                var xy = JObject.Parse(e.ToJson<Exception>());
                xy["DEARGOD"] = x;
                return new JsonResult(xy);
            }
        }      
        [HttpGet("Block/{json}")]
        public string Block(string json) {
            JObject d = JObject.Parse(json);
            Auth.SetUserCredentials(CONSUMER_KEY, CONSUMER_SECRET, d["access_token"].ToString(), d["access_secret"].ToString());
            Tweetinvi.User.BlockUser(d["handle"].ToString());
            return "Done";
        }
        [HttpGet("TwitterAuth")]
        public ActionResult TwitterAuth()
        {
            var appCreds = new ConsumerCredentials(CONSUMER_KEY, CONSUMER_SECRET);
            var redirectURL = "http://" + Request.Host.Value + "/V1/ValidateTwitterAuth";
            var authenticationContext = AuthFlow.InitAuthentication(appCreds, redirectURL);

            return new RedirectResult(authenticationContext.AuthorizationURL);
        }
        [HttpGet("ValidateTwitterAuth")]
        public ViewResult ValidateTwitterAuth()
        {
            ViewData["Auth"] = false;
            ViewData["access_token"] = "";
            ViewData["access_secret"] = "";
            if (Request.Query.ContainsKey("oauth_verifier") && Request.Query.ContainsKey("authorization_id"))
            {
                var verifierCode = Request.Query["oauth_verifier"];
                var authorizationId = Request.Query["authorization_id"];

                var userCreds = AuthFlow.CreateCredentialsFromVerifierCode(verifierCode, authorizationId);

                ViewData["access_token"] = userCreds.AccessToken;
                ViewData["access_secret"] = userCreds.AccessTokenSecret;
                ViewData["Auth"] = true;
            }
            return View("Auth");
        }

    }
}
