using System;
using System.ComponentModel.DataAnnotations;

namespace TaskerReact.Models
{
    public class Objective
    {
        public int Id { get; set; }

        [Required]
        public string Task { get; set; }

        [DisplayFormat(DataFormatString = "{0:U}")]
        public DateTime Created { get; set; } = DateTime.UtcNow;

        public bool Completed { get; set; }
    }
}
