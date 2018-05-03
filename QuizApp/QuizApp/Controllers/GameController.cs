using Microsoft.AspNetCore.Mvc;
using QuizApp.Data;
using QuizApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuizApp.Controllers
{
    public class GameController : Controller
    {
        private readonly ApplicationDbContext context;

        public GameController(ApplicationDbContext _context)
        {
            context = _context;
        }
    }
}
