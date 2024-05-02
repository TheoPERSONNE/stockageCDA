using System;
using System.ComponentModel.DataAnnotations;

namespace APPCDA.Models
{
    public class Ticket
    {
        [Key]
        public int IdTicket { get; set; }

        [MaxLength(50)]
        public string NomTicket { get; set; }

        [MaxLength(255)]
        public string ProblemeTicket { get; set; }

        [MaxLength(1000)]
        public string DescriptionTicket { get; set; }

        public int NumeroTicket { get; set; }

        public DateTime CommencementTicket { get; set; }

        public DateTime FinTicket { get; set; }

        public int NumeroClient { get; set; }

        [MaxLength(50)]
        public string StatutTicket { get; set; }
    }
}