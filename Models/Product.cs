        using System;
        using System.ComponentModel.DataAnnotations;
        using System.ComponentModel.DataAnnotations.Schema;

        namespace APPCDA.Models
        {
            public class Product
            {
                [Key]
                public int IdUtilisateur { get; set; }

                [MaxLength(50)]
                public string? Nom { get; set; }

                [MaxLength(50)]
                public string? Prenom { get; set; }

                public int Telephone { get; set; }
                public int Fixe { get; set; }
                public int Age { get; set; }

                [Required]
                [EmailAddress]
                [MaxLength(100)]
                public string? Email { get; set; }

                [MaxLength(50)]
                public string? Ville { get; set; }

                public int CodePostal { get; set; }
                public bool Newsletter { get; set; }

                [Required]
                [MaxLength(255)]
                public string? MotDePasse { get; set; }

                [MaxLength(255)]
                public string? PhotoPath { get; set; }

                [MaxLength(50)]
                public string? Role { get; set; }

                [MaxLength(50)]
                public string? NumeroClient { get; set; }
            }
        }

    /* {
        "product": {
            "idUtilisateur": 10,
            "nom": "Personne",
            "prenom": "Theo",
            "telephone": 6567876765,
            "fixe": 9876543212,
            "age": 23,
            "email": "theo@theo.com",
            "ville": "Paris",
            "codePostal": 34890,
            "newsletter": true,
            "motDePasse": "theo",
            "photoPath": "string",
            "role": "admin",
            "numeroClient": "client10"
        },
        "IdUtilisateur": 10,
        "Nom": "Personne",
        "Prenom": "Theo",
        "Telephone": 6567876765,
        "Fixe": 9876543212,
        "Age": 23,
        "Email": "theo@theo.com",
        "Ville": "Paris",
        "CodePostal": 34890,
        "Newsletter": true,
        "MotDePasse": "theo",
        "PhotoPath": "string",
        "Role": "admin",
        "NumeroClient": "client10"
    }
*/