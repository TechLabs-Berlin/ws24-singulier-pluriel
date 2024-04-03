const bcrypt = require('bcrypt');
const User = require('../db/userModel.js');


module.exports.accountActivation = async (req, res) => {
    const { email, sid, password } = req.body;
    const user = await User.findOne({ sid, email }).populate('role');
    if(!user) {
        return res.status(403).json({
            message: 'Wrong credentials.'
        });
    }

    const hash = await bcrypt.hash(password, 12);
    if(user.hash || user.status){
        return res.status(403).json({
            message: 'Account was already activated.'
        });
    }
    user.hash = hash;
    user.status = 'active';
    await user.save();

    const { _id, role } = user;
    const userInfo = { _id, sid, role };

    req.session.user = userInfo;

    res.json({
        message: 'Account activated!',
        accountStatus: 'active',
        userInfo
    });
};


module.exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).populate('role');
    if(!user){
        console.log('Wrong email or password.');
        return res.status(403).json({
            message: 'Wrong email or password.'
        });
    } else if (!user.hash || !user.status){
        console.log('Account was not activated.');
        return res.status(403).json({
            message: 'Account was not activated.'
        });
    }

    const passwordValid = await bcrypt.compare(password.toString(), user.hash);
    if(passwordValid){
        const { _id, sid, role } = user;
        const userInfo = { _id, sid, role };
        
        req.session.user = userInfo;

        res.json({
            message: 'Authentication successful!',
            loggedIn: true,
            user: userInfo
        });
    } else {
        return res.status(404).json({
            message: 'Wrong email or password.',
            loggedIn: false
        });
    };
};


module.exports.logout = (req, res) => {
    req.session.destroy(function(err) {
        if (err){
            console.log(err);
            return res.status(400).json({
                message: 'Something went wrong.'
            });
        }
    })

    res.json({
        message: 'User logged out!',
        loggedOut: true
    });
};


module.exports.userprofile = async (req, res) => {
    const userId = req.session.user._id;
    const user = await User.findOne({ _id: userId }).populate('role');
    res.json({ name: `${ user.firstname } ${ user.lastname }`, role: user.role.name });
};