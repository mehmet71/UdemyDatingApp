using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using API.Entities;
using API.interfaces;
using Microsoft.IdentityModel.Tokens;

namespace API.Services
{
    public class TokenService : ITokenService
    {
        private readonly SymmetricSecurityKey _key;

        public TokenService(IConfiguration config)
        {
            _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));
        }

        public string CreateToken(AppUser user)
        {
            /** 
                die Behauptungen des Tokens 
                in diesem Fall wird behauptet die angegebene Identität zu haben
            */
            var claims = new List<Claim>{
                new Claim(JwtRegisteredClaimNames.NameId, user.Username)
            };

            // die Credentials mit denen der Token vom Server gesignt wird
            var creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature);

            // Descriptor beschreibt unseren Token und seine Bestandteile, also wie unser Token aussieht
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(7),
                SigningCredentials = creds
            };

            // der TokenHandler wird verwendet um Token zu erstellen oder zu verifizieren
            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}