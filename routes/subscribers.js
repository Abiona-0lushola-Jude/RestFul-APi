const { json } = require('express')
const express  = require('express')
const subscriber = require('../model/subscriber')
const router = express.Router()

router.get('/',async (req,res)=>{
    try {
        const subscribers = await subscriber.find().sort({subscribedDate: 'desc'})
        res.json(subscribers)
    } catch (error) {
        res.json({message: error.message})
    }
})

// cretaing one
router.post('/', async (req,res)=>{
    const subscriberNew = new subscriber({
        name:req.body.name,
        subscribedToChannel:req.body.subscribedToChannel
    })
    try {
        const newSubscriber = await subscriberNew.save()
        res.json(newSubscriber)
    } catch (error) {
        res.json({message:error.message})
    }
})


// getting one
router.get('/:id', getSubscriber,(req,res)=>{
    res.json(res.subscriber)
})

// Deleting one
router.delete(('/:id'),getSubscriber, async (req,res)=>{
    try {
        await res.subscriber.remove()
        res.json({message: "Data removed from database"})
    } catch (err) {
        res.json({message: err.message})
    }
})

// Updating One
router.patch('/:id',getSubscriber,async (req,res)=>{
    if(req.body.name !== null){
        res.subscriber.name = req.body.name
    }
    if(req.body.subscribedToChannel !==null){
        res.subscriber.subscribedToChannel = req.body.subscribedToChannel
    }
    try {
        const upatedSubscriber = await res.subscriber.save()
        res.json(upatedSubscriber)
    } catch (err) {
        res.json({message:err.message})
    }
})





// creating a middleWare to cgeck for ids
async function getSubscriber(req,res,next){
    let Subscribed
    try {
        Subscribed = await subscriber.findById(req.params.id)
        if(subscriber == null){
            return res,json({message:"cannot find subscriber"})
        }
    } catch (err) {
        res.json({message:err.message})
    }
    res.subscriber = Subscribed
    next()
}
module.exports = router