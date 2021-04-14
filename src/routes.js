//const { req, res } = require('express');
const express = require('express');
const routes = express.Router()

const views = __dirname + "/views/"

const Profile = {
    data:
        {name: "Diogo",
        avatar: "https://avatars.githubusercontent.com/u/10672704?v=4",
        "monthly-budget": 3000,
        "hours-per-day": 5,
        "days-per-week": 5, 
        "vacation-per-year": 4,
        "value-hour": 75},
    controllers: {
        index(req, res){
            res.render(views + "/profile",{profile: Profile.data})
        },
        update(req, res){
            
        }

    }
    
}

const Job = {
    data: 
        [{
            id: 1,
            name: "vvvv",
            "daily-hours": 3,
            "total-hours": 1,
            budget: 45000,
            remaining:3,
            status:"progress",
            createdAt: Date.now()
        },
        {
            id: 2,
            name: "xxxx",
            "daily-hours": 2,
            "total-hours": 37,
            budget: 45000,
            remaining:3,
            status:"done",
            createdAt: Date.now()
        }],
    controllers: {
        index(req, res) {
            //calculos jobs
            const updatedJobs = Job.data.map((job) => {
            
            const remaining = Job.services.remainingDays(job)
            const status = remaining <= 0 ? 'done' : 'progress'
            
                return {...job,
                     remaining,
                      status,
                      budget: Profile.data["value-hour"]*job["total-hours"]}
            })
        res.render(views + "index", { jobs: updatedJobs })
            
        },
        save(req,res){

            Job.data.push({
            
            id: Job.data.length + 1,
            name: req.body.name,
            "daily-hours": req.body["daily-hours"],
            "total-hours": req.body["total-hours"],
            createdAt: Date.now(),
            })
            return res.redirect('/')
        },
        create(req, res){
            res.render(views + "/job")
        }
    },
    services: {
        remainingDays(job){
            const remainingDays = (job['total-hours']/ job['daily-hours']).toFixed()
            const createdDate = new Date(job.createdAt)
            const dueDay = createdDate.getDate() + Number(remainingDays)
            const dueDateMs = createdDate.setDate(dueDay)
        
            const timeDiffMs = dueDateMs - Date.now()
        
            const dayMs = 1000*60*60*24
            const dayDiff = Math.floor(timeDiffMs/dayMs)
            
        
        
            return dayDiff
        }
    }
}



routes.get('/', Job.controllers.index)
routes.get('/job', Job.controllers.create)
routes.post('/job', Job.controllers.save)
routes.get('/job/edit', (req, res) => res.render(views + "/job-edit"))
routes.get('/profile',Profile.controllers.index)
routes.post('/profile',Profile.controllers.update)



module.exports = routes;