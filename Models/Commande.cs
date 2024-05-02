using System;
using System.ComponentModel.DataAnnotations;

namespace APPCDA.Models
{
    public class Commande
    {
        [Key]
        public int IdCommande { get; set; }

        public DateTime DateDeLivraisonCommande { get; set; }

        public int NumeroCommande { get; set; }

        [MaxLength(50)]
        public string StatutCommande { get; set; }

        public int NumeroClient { get; set; }
    }
}