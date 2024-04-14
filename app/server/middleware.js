module.exports.isLoggedIn = (req, res, next) => {
    try {
        const { user } = req.session;
        if(!user){
            return res.status(401).json({
                message: 'Unauthorized - Login needed'
            });
        };
    } catch (err) {
        console.log(err);
    }
    next();
};

module.exports.isTeacher = (req, res, next) => {
    const { user } = req.session;
    if(user.role.name !== 'teacher'){
        return res.status(403).json({
            message: 'Forbidden - Teachers/Admin rights needed'
        });
    };
    next();
}