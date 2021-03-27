using Microsoft.EntityFrameworkCore;
using TaskerReact.Models;

namespace Tasker_React.Models
{
    public class TaskerDbContext: DbContext
    {
        public DbSet<Objective> Objectives { get; set; }
        public TaskerDbContext(DbContextOptions<TaskerDbContext> options)
            : base(options)
        {
        }
    }
}
