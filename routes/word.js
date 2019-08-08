const express = require('express')
const router = express.Router()

const debug = require('debug')('word')

const {Word} = require('../models/word')

router.post('',async(req,res)=>{

	let data = req.body

	let word = await new Word({
		word: data.word,
		date: data.date,
		location: data.percent
	}).save();

	res.send(JSON.stringify(req.body))
})

router.get('',async(req,res)=>{

	let data = {};

	let rowCount = await Word.find().countDocuments();

	let sort = {}
	let offset = 0;
	let currentPage = 1;
	let perPage = 20;

	if(req.query.field){
		sort[req.query.field] = parseInt(req.query.type);
	}
	if(req.query.page != null){
		currentPage = req.query.page >= 1 ? parseInt(req.query.nextPage) : parseInt(req.query.previousPage) <= 1 ? 1 : parseInt(req.query.previousPage) ;
		offset = (currentPage - 1) * perPage;
	}

	data['data'] = await Word.find().sort(sort).limit(perPage).skip(offset);
	data['prev'] = currentPage - 1 ;
	data['next'] = rowCount > (offset ? currentPage*perPage : perPage) ? 1 : 0;
	data['nextPage'] = data['next'] ? currentPage + 1 : 0;
	data['currentPage'] = currentPage;
	data['rowCount'] = rowCount;

	// debug(req.query,data['prev'],data['next'],data['nextPage'],data['currentPage']);		
	// debug(currentPage,offset,offset ? currentPage*10 : 10)
	res.send(JSON.stringify(data));
})

module.exports = router