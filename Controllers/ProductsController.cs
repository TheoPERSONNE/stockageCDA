using System;
using System.IdentityModel.Tokens.Jwt;
using System.Net.Sockets;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using APPCDA.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using APPCDA.Data;



[Route("api/[controller]")]
[ApiController]
[EnableCors("OpenCORSPolicy")]
public class ProductsController : ControllerBase
{
    private readonly AppDbContext _appDbContext;
    private readonly IConfiguration _configuration;
    private readonly IWebHostEnvironment _webHostEnvironment;

    public ProductsController(AppDbContext appDbContext, IConfiguration configuration, IWebHostEnvironment webHostEnvironment)
        //paramettre 
    {
        _appDbContext = appDbContext;
        _configuration = configuration;
        _webHostEnvironment = webHostEnvironment;
    }
    //USER
    [HttpGet("getUtilisateur")]
    public async Task<IActionResult> GetProducts()
    {
        try
        {
            var products = await _appDbContext.Products.ToListAsync();
            return Ok(products);
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, $"Erreur lors de la récupération des produits : {ex.Message}");
        }
    }
    [HttpPost("ajout")]
    public async Task<IActionResult> AddProduct([FromBody] Product product)
    {
        try
        {

            var existingUser = await _appDbContext.Products.FirstOrDefaultAsync(u => u.IdUtilisateur == product.IdUtilisateur);
            if (existingUser != null)
            {
                return Conflict($"Un utilisateur avec l'ID {product.IdUtilisateur} existe déjà.");
            }


            product.MotDePasse = HashPassword(product.MotDePasse);


            _appDbContext.Products.Add(product);
            await _appDbContext.SaveChangesAsync();

            return Ok(product);
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, $"Erreur lors de l'ajout du produit : {ex.Message}");
        }
    }

    [HttpDelete("deleteUtilisateur/{idUtilisateur}")]
    public async Task<IActionResult> DeleteUser(int idUtilisateur)
    {
        try
        {
            var userToDelete = await _appDbContext.Products.FindAsync(idUtilisateur);

            if (userToDelete == null)
            {
                return NotFound($"Utilisateur avec l'ID '{idUtilisateur}' non trouvé.");
            }

            _appDbContext.Products.Remove(userToDelete);
            await _appDbContext.SaveChangesAsync();

            return Ok($"L'utilisateur avec l'ID '{idUtilisateur}' a été supprimé avec succès.");
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, $"Erreur lors de la suppression de l'utilisateur : {ex.Message}");
        }
    }


    private string HashPassword(string password)
    {
        if (password == null)
        {
            throw new ArgumentNullException(nameof(password));
        }

        using (var sha256 = SHA256.Create())
        {
            byte[] hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
            // Convertir les bytes hachés en une chaîne hexadécimale
            string hexString = BitConverter.ToString(hashedBytes).Replace("-", "");
            return hexString;
        }
    }

    private string GenerateJwtToken(Product user)
    {
        var claims = new List<Claim>
{
    new Claim(ClaimTypes.NameIdentifier, user.IdUtilisateur.ToString()),
    new Claim(ClaimTypes.Email, user.Email), 
    new Claim(ClaimTypes.Name, $"{user.Nom} {user.Prenom}"), 
    new Claim(ClaimTypes.Role, user.Role) 
};


        if (!string.IsNullOrEmpty(_configuration["JwtSettings:SecretKey"]) &&
            !string.IsNullOrEmpty(_configuration["JwtSettings:Issuer"]) &&
            !string.IsNullOrEmpty(_configuration["JwtSettings:Audience"]))
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtSettings:SecretKey"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _configuration["JwtSettings:Issuer"],
                audience: _configuration["JwtSettings:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(2),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
        else
        {
            throw new Exception("JWT settings are not properly configured.");
        }
    }
    private bool VerifyPassword(string enteredPassword, string storedHashedPassword)
    {
        using (var sha256 = SHA256.Create())
        {
            // Calculer le hachage du mot de passe entré
            byte[] enteredPasswordHashBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(enteredPassword));
            string enteredPasswordHash = BitConverter.ToString(enteredPasswordHashBytes).Replace("-", "");

            // Comparer le hachage du mot de passe entré avec le hachage stocké
            return enteredPasswordHash.Equals(storedHashedPassword);
        }
    }


    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] Product product)
    {
        try
        {
            var user = await _appDbContext.Products.FirstOrDefaultAsync(u => u.Email == product.Email);

            // Vérifier si l'utilisateur existe
            if (user == null)
            {
                return Unauthorized(new { message = "Invalid username or password" });
            }

            // Vérifier si le mot de passe est correct en utilisant la méthode VerifyPassword
            if (!VerifyPassword(product.MotDePasse, user.MotDePasse))
            {
                return Unauthorized(new { message = "Invalid username or password" });
            }

            // Si le mot de passe est correct, générer le jeton JWT
            var token = GenerateJwtToken(user);

            return Ok(new { message = "Successful login", token });
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, new { error = ex.Message });
        }
    }




        [HttpGet("userinfo")]
        public async Task<IActionResult> GetUserInfo()
        {
            try
            {
                var userEmail = User.FindFirst(ClaimTypes.Email)?.Value;

                // Ajouter un journal de bord pour afficher les informations récupérées
                Console.WriteLine($"Informations de l'utilisateur récupérées : Email = {userEmail}");

                if (userEmail == null)
                {
                    Console.WriteLine("L'utilisateur n'est pas authentifié");
                    return Unauthorized(new { message = "L'utilisateur n'est pas authentifié" });
                }

                var user = await _appDbContext.Products.FirstOrDefaultAsync(u => u.Email == userEmail);

                if (user == null)
                {
                    Console.WriteLine("Utilisateur non trouvé");
                    return NotFound(new { message = "Utilisateur non trouvé" });
                }

                Console.WriteLine($"Informations de l'utilisateur récupérées avec succès : {user.IdUtilisateur}, {user.Email}");

                return Ok(new
                {
                    userId = user.IdUtilisateur,
                    userName = $"{user.Nom} {user.Prenom}",
                    userEmail = user.Email,
                    userVille = user.Ville,
                    userTelephone = user.Telephone,
                    userCodePostal = user.CodePostal,
                    userFixe = user.Fixe,
                    userRole = user.Role,
                    userNumeroClient = user.NumeroClient,
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erreur lors de la récupération des informations de l'utilisateur : {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, new { error = ex.Message });
            }
        }





    [HttpGet("client/{clientId}")]
    [Authorize(Roles = "commercial")] // Assurez-vous que seuls les commerciaux ont accès à cette API
    public async Task<IActionResult> GetClientInfo(int clientId)
    {
        try
        {
            var client = await _appDbContext.Products
                .FirstOrDefaultAsync(u => u.IdUtilisateur == clientId);

            if (client == null)
            {
                return NotFound(new { message = "Client non trouvé" });
            }

            // Retournez les informations du client
            return Ok(new
            {
                clientId = client.IdUtilisateur,
                clientName = $"{client.Nom} {client.Prenom}",
                // Ajoutez d'autres propriétés du client selon vos besoins
            });
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, new { error = ex.Message });
        }
    }




    [HttpPatch("updatephoto")]
    public async Task<IActionResult> UpdatePhoto([FromBody] string photoPath)
    {
        try
        {
            if (string.IsNullOrEmpty(photoPath))
            {

                return BadRequest(new { message = "Le chemin d'accès à la photo est vide ou NULL." });
            }

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var user = await _appDbContext.Products
                .FirstOrDefaultAsync(u => u.IdUtilisateur.ToString() == userId);

            if (user == null)
            {
                return NotFound(new { message = "Utilisateur non trouvé" });
            }

            user.PhotoPath = photoPath;
            await _appDbContext.SaveChangesAsync();

            return Ok(new { message = "Photo de profil mise à jour avec succès" });
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, new { error = ex.Message });
        }
    }

    //ARTICLE
    [HttpPost("ajoutArticle")]
    public async Task<IActionResult> AddArticle([FromBody] Article article)
    {
        try
        {
            var existingArticle = await _appDbContext.Article.FirstOrDefaultAsync(u => u.IdArticle == article.IdArticle);
            if (existingArticle != null)
            {
                return Conflict($"Un article avec l'ID {article.IdArticle} existe déjà.");
            }

            _appDbContext.Article.Add(article);
            await _appDbContext.SaveChangesAsync();

            return Ok(article);
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, $"Erreur lors de l'ajout de l'article : {ex.Message}");
        }
    }

    [HttpGet("getArticle")]
    public async Task<IActionResult> GetArticle()
    {
        try
        {
            var articles = await _appDbContext.Article.ToListAsync();
            return Ok(articles);
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, $"Erreur lors de la récupération des articles : {ex.Message}");
        }
    }

    [HttpPut("updateArticle/{id}")]
    public async Task<IActionResult> UpdateArticle(int id, [FromBody] Article articleToUpdate)
    {
        try
        {
            var existingArticle = await _appDbContext.Article.FindAsync(id);

            if (existingArticle == null)
            {
                return NotFound($"Article avec l'ID {id} non trouvé.");
            }

            // Mettre à jour les propriétés de l'article existant avec les nouvelles valeurs
            existingArticle.Titre = articleToUpdate.Titre;
            existingArticle.SousTitre = articleToUpdate.SousTitre;
            existingArticle.Description = articleToUpdate.Description;
            existingArticle.Actif = articleToUpdate.Actif;

            _appDbContext.Article.Update(existingArticle);
            await _appDbContext.SaveChangesAsync();

            return Ok($"Article avec l'ID {id} mis à jour avec succès.");
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, $"Erreur lors de la mise à jour de l'article : {ex.Message}");
        }
    }


    //TICKET
    [HttpGet("getTicket")]
    public async Task<IActionResult> GetTicket()
    {
        try
        {
            var tickets = await _appDbContext.Ticket.ToListAsync();
            return Ok(tickets);
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, $"Erreur lors de la récupération des tickets : {ex.Message}");
        }
    }

    [HttpPost("ajoutTicket")]
    public async Task<IActionResult> AddTicket([FromBody] Ticket ticket)
    {
        try
        {
            var existingTicket = await _appDbContext.Ticket.FirstOrDefaultAsync(t => t.IdTicket == ticket.IdTicket);
            if (existingTicket != null)
            {
                return Conflict($"Un ticket avec l'ID {ticket.IdTicket} existe déjà.");
            }

            _appDbContext.Ticket.Add(ticket);
            await _appDbContext.SaveChangesAsync();

            return Ok(ticket);
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, $"Erreur lors de l'ajout du ticket : {ex.Message}");
        }
    }

    //COMMANDE
    [HttpGet("getCommande")]
    public async Task<IActionResult> GetCommande()
    {
        try
        {
            var commandes = await _appDbContext.Commande.ToListAsync();
            return Ok(commandes);
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, $"Erreur lors de la récupération des tickets : {ex.Message}");
        }
    }

    [HttpGet("getCommande/{id}")]
    public async Task<IActionResult> GetCommandeById(int id)
    {
        try
        {
            var commande = await _appDbContext.Commande.FindAsync(id);

            if (commande == null)
            {
                return NotFound($"La commande avec l'ID {id} n'a pas été trouvée.");
            }

            return Ok(commande);
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, $"Erreur lors de la récupération de la commande : {ex.Message}");
        }
    }
[HttpPost("ajoutCommande")]
    public async Task<IActionResult> AddCommande([FromBody] Commande commande)
    {
        try
        {
            var existingCommande = await _appDbContext.Commande.FirstOrDefaultAsync(c => c.IdCommande == commande.IdCommande);
            if (existingCommande != null)
            {
                return Conflict($"Une commande avec l'ID {commande.IdCommande} existe déjà.");
            }

            _appDbContext.Commande.Add(commande);
            await _appDbContext.SaveChangesAsync();

            return Ok(commande);
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, $"Erreur lors de l'ajout de la commande : {ex.Message}");
        }
    }

    [HttpGet("getContactUS")]
    public async Task<IActionResult> GetContact()
    {
        try
        {
            var contactus = await _appDbContext.ContactUs.ToListAsync();
            return Ok(contactus);
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, $"Erreur lors de la récupération des produits : {ex.Message}");
        }
    }

    [HttpPost("ajoutContactUs")]
    public async Task<IActionResult> AddContact([FromBody] ContactUs contactus)
    {
        try
        {
            var existingContactUs = await _appDbContext.ContactUs.FirstOrDefaultAsync(c => c.IdContactUs == contactus.IdContactUs);
            if (existingContactUs != null)
            {
                return Conflict($"Une commande avec l'ID {contactus.IdContactUs} existe déjà.");
            }

            _appDbContext.ContactUs.Add(contactus);
            await _appDbContext.SaveChangesAsync();

            return Ok(contactus);
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, $"Erreur lors de l'ajout de contactus : {ex.Message}");
        }
    }
}