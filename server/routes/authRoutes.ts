import express from 'express';
//import { Router } from 'express';//
import passport from 'passport';
import { signUp } from '../controllers/authController';

const router = express.Router();

router.post('/signup', signUp);
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
    res.redirect('/'); // Redirect to your desired page
});
router.get('/auth/facebook', passport.authenticate('facebook'));
router.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/' }), (req, res) => {
    res.redirect('/'); // Redirect to your desired page
});

export default router;
