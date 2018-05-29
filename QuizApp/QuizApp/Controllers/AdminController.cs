using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using QuizApp.Data;
using QuizApp.Models;

namespace QuizApp.Controllers
{
    [Produces("application/json")]
    [Route("api/Admin")]
    public class AdminController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> userManager;

        public AdminController(ApplicationDbContext context, UserManager<ApplicationUser> _userManager)
        {
            _context = context;
            userManager = _userManager;
        }

        [HttpGet("GetUser")]
        public async Task<ActionResult> GetUser()
        {
            var user = await userManager.GetUserAsync(HttpContext.User);

            if (user == null)
                return View();

            return CreatedAtAction("Home", user.IsAdmin);
        }
    }
}
