using System;
using System.ComponentModel.DataAnnotations;

namespace APPCDA.Models
{
    public class ContactUs
    {
        [Key]
        public int IdContactUs { get; set; }


        public string? Email { get; set; }

        public string? Question { get; set; }
    }
}