const express = require('express');
const redisClient = require('../redis/redis-client');

const userModel = require('../models/user');

exports.addUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({ error: 'Please enter all data' });
    }

    const newUser = new userModel({
      name,
      email,
      password,
    });

    const data = await newUser.save();
    return res.json({ message: 'User saved successfully', data });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    return res.status(500).json({ error: 'Something went wrong' });
  }
};


exports.getUser = async (req, res) => {
  try {
    const data = await userModel.find({});

    res.status(200).json({success:true,data:data})
    
  } catch (error) {
    console.log(error)
  }
}
