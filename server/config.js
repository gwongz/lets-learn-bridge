// server side pre create user hook 
Accounts.onCreateUser(function(options, user) {
    // setProfile(options, user);
    if (!options.profile){
        profile = {'superuser': false};
        user.profile = profile;
    } else {
        options.profile.superuser = false;
        user.profile = options.profile;
    }
    
    return user;
});
