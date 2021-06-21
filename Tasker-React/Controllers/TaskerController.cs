using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Tasker_React.Models;
using TaskerReact.Models;

namespace Tasker_React.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TaskerController : ControllerBase
    {
        private readonly ILogger<TaskerController> _logger;
        private readonly TaskerDbContext _db;

        public TaskerController(ILogger<TaskerController> logger, TaskerDbContext context)
        {
            _logger = logger;
            _db = context;
        }

        [HttpGet]
        public async Task<IEnumerable<Objective>> GetAllAsync() =>
            await _db.Objectives
                .Where(objective => !objective.Completed)
                .OrderByDescending(objective => objective.Id)
                .ToListAsync();

        [HttpGet("{id:int}")]
        public async Task<Objective> GetAsync(int id) =>
            await _db.Objectives.FindAsync(id);

        [HttpPost]
        public async Task<Objective> AddAsync(Objective newObjective)
        {
            _db.Objectives.Add(newObjective);

            await _db.SaveChangesAsync();

            return newObjective;
        }

        [HttpPut]
        public async Task UpdateAsync([FromBody]Objective objective)
        {
            var oldObjective = await _db.Objectives.FindAsync(objective.Id);

            oldObjective.Task = objective.Task;

            oldObjective.Completed = objective.Completed;

            await _db.SaveChangesAsync();

        }

        [HttpDelete]
        public async Task RemoveAsync([FromBody] Objective removingObjective)
        {
            var objective = await _db.Objectives.FirstOrDefaultAsync(p => p.Id == removingObjective.Id);

            _db.Objectives.Remove(objective);

            await _db.SaveChangesAsync();

        }
    }
}
