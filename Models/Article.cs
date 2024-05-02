using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace APPCDA.Models
{
    public class Article
    {
        [Key]
        public int IdArticle { get; set; }

        public DateTime? DateDeCréationArticle{ get; set; }

        [MaxLength(50)]
        public string? Titre { get; set; }

        [MaxLength(50)]
        public string? SousTitre  { get; set; }

        [MaxLength(200)]
        public string? Description { get; set; }

        public int Actif { get; set; }
    }
}