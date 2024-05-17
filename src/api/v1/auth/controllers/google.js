const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const jwt = require("jsonwebtoken");
const { Profile } = require("../../../../models");
const { getTransfromSingleData } = require("../../../../utils/responseData");
const { tokenGenerator } = require("../../../../lib/auth");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:4000/api/auth/google/callback",
      scope: ["profile", "email"],
      prompt: "select_account",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await Profile.findItemByGoogleId(profile.id);

        if (!user.rows[0]) {
          user = await Profile.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            googleid: profile.id,
            role: "user",
          });
        } else {
          user = user.rows[0];
        }

        console.log(user);

        const payload = getTransfromSingleData({
          item: user,
          selection: ["id", "name", "email", "role"],
        });
    
        // generate a token
        const token = await tokenGenerator(payload);

        done(null, { user, token });
      } catch (err) {
        done(err, null);
      }
    }
  )
);

passport.serializeUser((data, done) => {
  done(null, data.user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    // find a single user by googleid
    const user = await Profile.findById(id);

    done(null, user.rows[0]);
  } catch (err) {
    done(err, null);
  }
});

const googleAuthController = (req, res) => {
  const { user, token } = req.user;

  const payload = getTransfromSingleData({
    item: user,
    selection: ["id", "name", "email", "role"],
  });

  res.redirect(`http://localhost:5173/dashboard?token=${token}&user=${encodeURIComponent(JSON.stringify(payload))}`);
};

module.exports = {
  googleAuth: passport.authenticate("google", { scope: ["profile", "email"] }),
  authCallback: passport.authenticate("google", {
    failureRedirect: "http://localhost:5173/account",
    session: false,
  }),
  googleAuthController,
};