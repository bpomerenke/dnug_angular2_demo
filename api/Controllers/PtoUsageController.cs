using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/[controller]")]
    public class PtoUsageController : Controller
    {
        public static List<PtoUsage> ptoUsages = new List<PtoUsage> {
            new PtoUsage {id= 1, startDate= "1-13-17", endDate= "1-13-17", hoursUsed= 4, title= "???"},
            new PtoUsage{id= 2, startDate= "1-27-17", endDate= "1-27-17", hoursUsed= 2, title= "???"},
            new PtoUsage{id= 3, startDate= "2-10-17", endDate= "2-10-17", hoursUsed= 1, title= "???"},
            new PtoUsage{id= 4, startDate= "2-15-17", endDate= "2-15-17", hoursUsed= 1, title= "???"},
            new PtoUsage{id= 5, startDate= "3-13-17", endDate= "3-13-17", hoursUsed= 1, title= "???"},
            new PtoUsage{id= 6, startDate= "3-20-17", endDate= "3-28-17", hoursUsed= 39, title= "ski trip"},
            new PtoUsage{id= 7, startDate= "3-31-17", endDate= "4-07-17", hoursUsed= 2, title= "???"}, 
            new PtoUsage{id= 8, startDate= "4-28-17", endDate= "4-28-17", hoursUsed= 3, title= "holly wedding"}, 
            new PtoUsage{id= 5, startDate= "5-12-17", endDate= "5-31-17", hoursUsed= 12, title= "???"},
            new PtoUsage{id= 9, startDate= "6-1-17", endDate= "6-5-17", hoursUsed= 20, title= "john wedding / DC"},
            new PtoUsage{id= 9, startDate= "6-23-17", endDate= "6-23-17", hoursUsed= 8, title= "durham bach party"},
            new PtoUsage{id= 9, startDate= "7-7-17", endDate= "7-7-17", hoursUsed= 8, title= "durham wedding"},
            new PtoUsage{id= 10, startDate= "7-17-17", endDate= "7-21-17", hoursUsed= 40, title= "lake trip"},
            new PtoUsage{id= 11, startDate= "8-18-17", endDate= "8-18-17", hoursUsed= 8, title= "nate wedding"}, 
            new PtoUsage{id= 12, startDate= "12-25-17", endDate= "12-31-17", hoursUsed= 24, title= "holidays"}
        };

        // GET api/ptousage
        [HttpGet]
        public IEnumerable<PtoUsage> Get()
        {
            return ptoUsages;
        }

        // GET api/ptousage/5
        [HttpGet("{id}")]
        public PtoUsage Get(int id)
        {
            return ptoUsages.FirstOrDefault(x=>x.id == id);
        }

        // POST api/ptousage
        [HttpPost]
        public void Post([FromBody]PtoUsage value)
        {
            ptoUsages.Add(value);
        }

        // PUT api/ptousage/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]PtoUsage value)
        {
            var existingPtoUsage = ptoUsages.FirstOrDefault(x=>x.id == id);

            if(existingPtoUsage != null){
                existingPtoUsage.startDate = value.startDate;
                existingPtoUsage.endDate = value.endDate;
                existingPtoUsage.title = value.title;
                existingPtoUsage.hoursUsed = value.hoursUsed;
            }
        }

        // DELETE api/ptousage/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        
        }
    }
}
