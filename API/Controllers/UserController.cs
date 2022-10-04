using System.Threading.Tasks;
using API.DTOs;
using API.Models.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        public UserController(UserManager<User> userManager, SignInManager<User> signInManager)
        {
            _signInManager = signInManager;
            _userManager = userManager;

        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.FindByEmailAsync(loginDto.Email);

            if (user == null)
            {
                return Unauthorized("Korisnik sa tim mejlom nije pronadjen.");
            }

            //TRUE atribute when user tries to brute-force over and over again 2 many times so he is locked out
            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, true);

            if (!result.Succeeded)
            {
                return Unauthorized("Loznika nije ispravna.");
            }

            return new UserDto
            {
                Email = user.Email,
                Token = "OVO JE TOKEN",
                UserName = user.UserName
            };
        }
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            var user = new User
            {
                UserName = registerDto.UserName,
                Email = registerDto.Email
            };

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (!result.Succeeded)
            {
                return BadRequest("Greska pri registrovanju gorisnika.");
            }

            return new UserDto
            {
                UserName = user.UserName,
                Token = "OVO JE TOKEN",
                Email = user.Email
            };
        }
    }
}